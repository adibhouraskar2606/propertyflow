import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import PropertiesPage from "./pages/PropertiesPage";
import MaintenancePage from "./pages/MaintenancePage";
import AppLayout from "./components/AppLayout";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/properties/:propertyId" element={<PropertyDetailsPage />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;