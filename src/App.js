//import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import routes from "./routes/Routes";
import { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <>
      {loading ? (
        <Center w="100vw" h="100vh">
          <Spinner size={"xl"} color="green" />
        </Center>
      ) : (
        <Routes>
          {routes?.map((val) => val)}
          {/* <Route path="/home" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route> */}
        </Routes>
      )}
    </>
  );
}

export default App;
