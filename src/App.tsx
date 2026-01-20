import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import HomePage from "@/routes/HomePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* TODO: Add more routes */}
          {/* <Route path="/competitions" element={<CompetitionsPage />} /> */}
          {/* <Route path="/competitions/:id" element={<CompetitionDetailPage />} /> */}
          {/* <Route path="/register/:competitionId" element={<RegistrationPage />} /> */}
          {/* <Route path="/checkin" element={<CheckInPage />} /> */}
          {/* <Route path="/results" element={<ResultsPage />} /> */}
          {/* <Route path="/admin" element={<AdminLayout />}> */}
          {/*   <Route path="competitions" element={<AdminCompetitions />} /> */}
          {/*   <Route path="entries" element={<AdminEntries />} /> */}
          {/*   <Route path="results" element={<AdminResults />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
