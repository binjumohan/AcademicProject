import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageEvents from "./pages/admin/ManageEvents";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Login from "./pages/Login";
import SignUp from "./pages/signUp";
import Calender from "./pages/Calender";
import Map from "./pages/Map";
import EventDetails from "./pages/EventDetails";
import AdminUsers from "./pages/admin/AdminUsers";
import MyBookmarks from "./pages/MyBookmarks";
import FloatingChatbot from "./pages/FloatingChatbot";
import AuthProvider from "./hooks/AuthProvider";
import AddEvent from "./pages/admin/addEvent";
import Chatbot from "./pages/ChatBoat";
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/admin/events" element={<ManageEvents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/calendar" element={<Calender />} />
          <Route path="/map" element={<Map />} />
          <Route path="/admin/addEvent" element={<AddEvent/>} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/bookmarks" element={<MyBookmarks />} />
            <Route path="/chat" element={<Chatbot />} />
        </Routes>
        <>
 

  <FloatingChatbot /> {/*  appears on all pages */}
</>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
