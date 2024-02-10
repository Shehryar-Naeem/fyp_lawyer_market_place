import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Register = lazy(() => import("./pages/SignUp/index"));
const Profile = lazy(() => import("./pages/profile/index"));
function App() {
  return (
    <Router>
      <div className="container h-full">
        <Suspense>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
      </div>
      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;
