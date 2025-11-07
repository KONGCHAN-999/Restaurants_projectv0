import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleScan = () => {
    // In real life, use QR scanner library.
    // Simulating a scanned tableId = 101
    const tableId = "101";
    navigate(`/menu/${tableId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Welcome to Buffet Restaurant</h1>
      <button
        onClick={handleScan}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Scan Table QR
      </button>
    </div>
  );
}
