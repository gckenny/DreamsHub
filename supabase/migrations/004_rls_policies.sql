-- ============================================================================
-- Migration 004: Row Level Security (RLS) Policies
-- 租戶隔離與權限控制
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Enable RLS on all tables
-- ----------------------------------------------------------------------------
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tenant_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE age_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE swimmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registration_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE relay_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE relay_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- Lookup tables - public read access
ALTER TABLE genders ENABLE ROW LEVEL SECURITY;
ALTER TABLE pool_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE strokes ENABLE ROW LEVEL SECURITY;
ALTER TABLE distances ENABLE ROW LEVEL SECURITY;
ALTER TABLE rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE age_group_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE result_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE dq_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_statuses ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- Helper function: Get current user's tenant ID from JWT
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION auth.tenant_id()
RETURNS UUID AS $$
    SELECT COALESCE(
        current_setting('request.jwt.claims', true)::json->>'tenant_id',
        current_setting('app.tenant_id', true)
    )::UUID;
$$ LANGUAGE SQL STABLE;

-- ----------------------------------------------------------------------------
-- Helper function: Check if user has role in tenant
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION auth.has_tenant_role(
    p_tenant_id UUID,
    p_roles TEXT[]
)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM user_tenant_roles utr
        JOIN users u ON u.id = utr.user_id
        WHERE utr.tenant_id = p_tenant_id
          AND u.auth_id = auth.uid()
          AND utr.role = ANY(p_roles)
    );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- ----------------------------------------------------------------------------
-- Lookup Tables: Public read access
-- ----------------------------------------------------------------------------
CREATE POLICY "lookup_public_read" ON genders FOR SELECT USING (true);
CREATE POLICY "lookup_public_read" ON pool_types FOR SELECT USING (true);
CREATE POLICY "lookup_public_read" ON strokes FOR SELECT USING (true);
CREATE POLICY "lookup_public_read" ON distances FOR SELECT USING (true);
CREATE POLICY "lookup_public_read" ON rounds FOR SELECT USING (true);
CREATE POLICY "lookup_public_read" ON age_group_types FOR SELECT USING (true);
CREATE POLICY "lookup_public_read" ON competition_statuses FOR SELECT USING (true);
CREATE POLICY "lookup_public_read" ON entry_statuses FOR SELECT USING (true);
CREATE POLICY "lookup_public_read" ON result_statuses FOR SELECT USING (true);
CREATE POLICY "lookup_public_read" ON dq_codes FOR SELECT USING (true);
CREATE POLICY "lookup_public_read" ON payment_statuses FOR SELECT USING (true);

-- ----------------------------------------------------------------------------
-- Tenants
-- ----------------------------------------------------------------------------
-- Public can read basic tenant info
CREATE POLICY "tenants_public_read" ON tenants
    FOR SELECT USING (true);

-- Only super admin can create/update tenants (via service role)
CREATE POLICY "tenants_admin_write" ON tenants
    FOR ALL USING (false);

-- ----------------------------------------------------------------------------
-- Users
-- ----------------------------------------------------------------------------
-- Users can read their own data
CREATE POLICY "users_read_own" ON users
    FOR SELECT USING (auth_id = auth.uid());

-- Users can update their own data
CREATE POLICY "users_update_own" ON users
    FOR UPDATE USING (auth_id = auth.uid());

-- Tenant admins can read users in their tenant
CREATE POLICY "users_tenant_admin_read" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_tenant_roles utr
            WHERE utr.user_id = users.id
              AND auth.has_tenant_role(utr.tenant_id, ARRAY['owner', 'admin'])
        )
    );

-- ----------------------------------------------------------------------------
-- User Tenant Roles
-- ----------------------------------------------------------------------------
CREATE POLICY "roles_read_own" ON user_tenant_roles
    FOR SELECT USING (
        user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

CREATE POLICY "roles_tenant_admin" ON user_tenant_roles
    FOR ALL USING (
        auth.has_tenant_role(tenant_id, ARRAY['owner', 'admin'])
    );

-- ----------------------------------------------------------------------------
-- Age Groups (Tenant-scoped)
-- ----------------------------------------------------------------------------
CREATE POLICY "age_groups_read" ON age_groups
    FOR SELECT USING (true);

CREATE POLICY "age_groups_write" ON age_groups
    FOR ALL USING (
        auth.has_tenant_role(tenant_id, ARRAY['owner', 'admin'])
    );

-- ----------------------------------------------------------------------------
-- Teams (Tenant-scoped)
-- ----------------------------------------------------------------------------
CREATE POLICY "teams_read" ON teams
    FOR SELECT USING (true);

CREATE POLICY "teams_write" ON teams
    FOR ALL USING (
        auth.has_tenant_role(tenant_id, ARRAY['owner', 'admin', 'staff'])
    );

-- ----------------------------------------------------------------------------
-- Swimmers (Tenant-scoped)
-- ----------------------------------------------------------------------------
CREATE POLICY "swimmers_read" ON swimmers
    FOR SELECT USING (true);

CREATE POLICY "swimmers_write" ON swimmers
    FOR ALL USING (
        auth.has_tenant_role(tenant_id, ARRAY['owner', 'admin', 'staff', 'coach'])
        OR user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
    );

-- ----------------------------------------------------------------------------
-- Competitions (Tenant-scoped)
-- ----------------------------------------------------------------------------
CREATE POLICY "competitions_read" ON competitions
    FOR SELECT USING (
        status_code != 'DRAFT'
        OR auth.has_tenant_role(tenant_id, ARRAY['owner', 'admin', 'staff'])
    );

CREATE POLICY "competitions_write" ON competitions
    FOR ALL USING (
        auth.has_tenant_role(tenant_id, ARRAY['owner', 'admin'])
    );

-- ----------------------------------------------------------------------------
-- Competition Sessions
-- ----------------------------------------------------------------------------
CREATE POLICY "sessions_read" ON competition_sessions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM competitions c
            WHERE c.id = competition_id
              AND (c.status_code != 'DRAFT'
                   OR auth.has_tenant_role(c.tenant_id, ARRAY['owner', 'admin', 'staff']))
        )
    );

CREATE POLICY "sessions_write" ON competition_sessions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM competitions c
            WHERE c.id = competition_id
              AND auth.has_tenant_role(c.tenant_id, ARRAY['owner', 'admin'])
        )
    );

-- ----------------------------------------------------------------------------
-- Events
-- ----------------------------------------------------------------------------
CREATE POLICY "events_read" ON events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM competitions c
            WHERE c.id = competition_id
              AND (c.status_code != 'DRAFT'
                   OR auth.has_tenant_role(c.tenant_id, ARRAY['owner', 'admin', 'staff']))
        )
    );

CREATE POLICY "events_write" ON events
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM competitions c
            WHERE c.id = competition_id
              AND auth.has_tenant_role(c.tenant_id, ARRAY['owner', 'admin'])
        )
    );

-- ----------------------------------------------------------------------------
-- Entries
-- ----------------------------------------------------------------------------
CREATE POLICY "entries_read" ON entries
    FOR SELECT USING (
        swimmer_id IN (
            SELECT id FROM swimmers WHERE user_id IN (
                SELECT id FROM users WHERE auth_id = auth.uid()
            )
        )
        OR EXISTS (
            SELECT 1 FROM competitions c
            WHERE c.id = competition_id
              AND auth.has_tenant_role(c.tenant_id, ARRAY['owner', 'admin', 'staff', 'coach'])
        )
    );

CREATE POLICY "entries_write" ON entries
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM competitions c
            WHERE c.id = competition_id
              AND auth.has_tenant_role(c.tenant_id, ARRAY['owner', 'admin', 'staff', 'coach'])
        )
    );

-- ----------------------------------------------------------------------------
-- Results (Public read for completed competitions)
-- ----------------------------------------------------------------------------
CREATE POLICY "results_read" ON results
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM competitions c
            WHERE c.id = competition_id
              AND c.status_code IN ('IN_PROGRESS', 'COMPLETED')
        )
        OR EXISTS (
            SELECT 1 FROM competitions c
            WHERE c.id = competition_id
              AND auth.has_tenant_role(c.tenant_id, ARRAY['owner', 'admin', 'staff'])
        )
    );

CREATE POLICY "results_write" ON results
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM competitions c
            WHERE c.id = competition_id
              AND auth.has_tenant_role(c.tenant_id, ARRAY['owner', 'admin', 'staff'])
        )
    );

-- ----------------------------------------------------------------------------
-- Team Scores (Public read)
-- ----------------------------------------------------------------------------
CREATE POLICY "team_scores_read" ON team_scores
    FOR SELECT USING (true);

CREATE POLICY "team_scores_write" ON team_scores
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM competitions c
            WHERE c.id = competition_id
              AND auth.has_tenant_role(c.tenant_id, ARRAY['owner', 'admin', 'staff'])
        )
    );

-- ----------------------------------------------------------------------------
-- Registration Orders & Payments
-- ----------------------------------------------------------------------------
CREATE POLICY "orders_read" ON registration_orders
    FOR SELECT USING (
        contact_email IN (SELECT email FROM users WHERE auth_id = auth.uid())
        OR EXISTS (
            SELECT 1 FROM competitions c
            WHERE c.id = competition_id
              AND auth.has_tenant_role(c.tenant_id, ARRAY['owner', 'admin', 'staff'])
        )
    );

CREATE POLICY "orders_write" ON registration_orders
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM competitions c
            WHERE c.id = competition_id
              AND auth.has_tenant_role(c.tenant_id, ARRAY['owner', 'admin', 'staff'])
        )
    );

CREATE POLICY "payments_read" ON payment_transactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM registration_orders ro
            WHERE ro.id = order_id
              AND (ro.contact_email IN (SELECT email FROM users WHERE auth_id = auth.uid())
                   OR EXISTS (
                       SELECT 1 FROM competitions c
                       WHERE c.id = ro.competition_id
                         AND auth.has_tenant_role(c.tenant_id, ARRAY['owner', 'admin'])
                   ))
        )
    );

-- Relay tables follow similar patterns
CREATE POLICY "relay_teams_read" ON relay_teams FOR SELECT USING (true);
CREATE POLICY "relay_teams_write" ON relay_teams
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM competitions c
            WHERE c.id = competition_id
              AND auth.has_tenant_role(c.tenant_id, ARRAY['owner', 'admin', 'staff', 'coach'])
        )
    );

CREATE POLICY "relay_members_read" ON relay_team_members FOR SELECT USING (true);
CREATE POLICY "relay_members_write" ON relay_team_members
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM relay_teams rt
            JOIN competitions c ON c.id = rt.competition_id
            WHERE rt.id = relay_team_id
              AND auth.has_tenant_role(c.tenant_id, ARRAY['owner', 'admin', 'staff', 'coach'])
        )
    );
