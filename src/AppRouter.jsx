import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Welcome from "@/pages/Welcome";
import EventDetail from "@/pages/EventDetail";
import MyTickets from "@/pages/MyTickets";
import CreateEvent from "@/pages/CreateEvent";
import AdminEvents from "@/pages/AdminEvents";
import Chat from "@/pages/Chat";
import KitchenOrders from "@/pages/KitchenOrders";
import TableQR from "@/pages/TableQR";
import QRGallery from "@/pages/QRGallery";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function AppRouter() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/welcome" element={<Welcome />} />

      {/* Privadas */}
      <Route
        path="/"
        element={
          <Home />
        }
      />
      <Route
        path="/evento/:id"
        element={
          <EventDetail />
        }
      />
      <Route
        path="/my-tickets"
        element={
          <PrivateRoute>
            <MyTickets />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-event"
        element={
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        }
      />
      <Route path="/chat" element={<Chat />} />
      <Route
        path="/kitchen"
        element={
          <PrivateRoute>
            <KitchenOrders />
          </PrivateRoute>
        }
      />
      <Route
        path="/qr-generator"
        element={
          <PrivateRoute>
            <TableQR />
          </PrivateRoute>
        }
      />
      <Route
        path="/qr-gallery"
        element={
          <PrivateRoute>
            <QRGallery />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
