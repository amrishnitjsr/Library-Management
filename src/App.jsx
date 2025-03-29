import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="your-client-id-here">
      <Navbar />
      <Outlet />
    </GoogleOAuthProvider>
  )
}

export default App
