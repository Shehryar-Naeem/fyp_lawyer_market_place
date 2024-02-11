import { Suspense, lazy, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGetUserQuery } from "./redux/api/userApi";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import UserProfile from "./pages/UserProfile";

const Register = lazy(() => import("./pages/SignUp/index"));
const Profile = lazy(() => import("./pages/profile/index"));

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery();
  useEffect(() => {
    // Check if the query is still loading
    if (isLoading) {
      return;
    }
    // Check for success or error
    if (isSuccess) {
      dispatch(userExist(data.user));

      toast.success(data?.message);
    }
    if (isError) {
      dispatch(userNotExist());
      toast.error(error.data?.message);
    }
  }, [isLoading, isSuccess, isError, data, error, dispatch]);

  return (
    <Router>
      <Suspense>
        <div className="h-full">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Routes>
        </div>
      </Suspense>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
