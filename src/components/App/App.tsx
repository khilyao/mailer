import { Route, Routes } from "react-router-dom";
import Home from "@views/Home";
import Email from "@views/Email";
import ProtectedRoute from "@components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/email"
          element={
            <ProtectedRoute>
              <Email />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
