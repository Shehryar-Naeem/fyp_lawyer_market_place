import { Suspense, lazy, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGetUserQuery } from "./redux/api/userApi";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import UserProfile from "./pages/UserProfile";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

import "primeicons/primeicons.css";
import CardSkeletonLoading from "./components/skeletonLoading/cardLoading";
import LawyerDetail from "./components/Lawyer/details";
import Gigs from "./components/Lawyer/gigs";
import Bid from "./components/Lawyer/bids";
import Chat from "./components/Lawyer/chats";

const Register = lazy(() => import("./pages/loginSignUP/index"));
const Profile = lazy(() => import("./pages/profile/index"));

function App() {
  // const dispatch = useDispatch();
  // const { data, isLoading, isSuccess, isError, error } = useGetUserQuery();
  // useEffect(() => {
  //   // Check if the query is still loading
  //   if (isLoading) {
  //     return;
  //   }
  //   // Check for success or error
  //   if (isSuccess) {
  //     dispatch(userExist(data.user));

  //     // toast.success(data?.message);
  //   }
  //   if (isError) {
  //     dispatch(userNotExist());
  //     // toast.error(error.data?.message);
  //   }

  // }, [isLoading, isSuccess, isError, data, error, dispatch]);

  return (
    <Router>
      <Suspense>
        <div className="h-full">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route exact path="/user-profile" element={<UserProfile />}>
              <Route exact path="" element={<LawyerDetail />} />
              <Route exact path="gigs" element={<Gigs />} />
              <Route exact path="bids" element={<Bid />} />
              <Route exact path="chat" element={<Chat />} />

            </Route>

            <Route path="/gigs" element={<CardSkeletonLoading />} />
          </Routes>
        </div>
      </Suspense>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
