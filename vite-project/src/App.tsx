import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu/:tableId" element={<MenuPage />} />
        <Route path="/order/:orderId" element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
