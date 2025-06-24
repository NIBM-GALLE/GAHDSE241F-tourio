import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddTourRequest from "./pages/addtourrequestpage/addtourrequestpage";
import FeedbackPage from "./pages/feedbackpage/feedbackpage";
import HomePage from "./pages/homepage/homepage";
import HotelDashboard from "./pages/hoteldashboard/HotelDashboard";
import HotelProfile from "./pages/hotelprofilepage/hotelprofilepage";
import HotelsPage from "./pages/hotelspage/hotelspage";
import Login from "./pages/loginpage/loginpage";
import NotificationPage from "./pages/notificationpage/NotificationPage";
import Payment from "./pages/paymentpage/paymentpage";
import ProfilePage from "./pages/profilepage/profilepage";
import RequestsPage from "./pages/requestspage/requestspage";
import SignupPage from "./pages/singuppage/singuppage";
import TourCreationPage from "./pages/touraddpage/touraddpage";
import TourPage from "./pages/tourpage/tourpage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/paymentpage" element={<Payment/>} />
        <Route path="/touraddpage" element={<TourCreationPage/>} />
        <Route path="/tour/:id" element={<TourPage />} />
        <Route path="/hotelprofile" element={<HotelProfile/>} />
        <Route path="/hoteldashboard" element={<HotelDashboard />} />
        <Route path="/userprofile" element={<ProfilePage/>} />
        <Route path="/feedbackpage" element={<FeedbackPage />} />
        <Route path="/addtourrequest" element={<AddTourRequest />} />
        <Route path="/notifications" element={<NotificationPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
