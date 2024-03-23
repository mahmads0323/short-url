import { Route, Routes } from "react-router-dom";
import HomePage from "./components/home";
import Redirect from "./components/redirect";
import Navbar from "./components/navbar";
import Contact from "./components/contactUs";
import LoginAndSignup from "./components/loginAndSignup";
import UserPage from "./components/user";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:shortUrl" element={<Redirect />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/get-started" element={<LoginAndSignup />} />
        <Route
          path="*"
          element={
            <p className="flex h-screen w-screen justify-center items-center">
              404 not found!
            </p>
          }
        />
      </Routes>
    </>
  );
}

export default App;
