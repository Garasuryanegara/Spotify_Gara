import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProtectedPage from "./ProtectedPage";
import RegisterPage from "../pages/RegisterPage";

const routes = [
  <Route
    path="/home"
    element={
      // <ProtectedPage guestOnly={false} needLogin={true}>
      <HomePage />
      // </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/login"
    element={
      <ProtectedPage guestOnly={true} needLogin={false}>
        <LoginPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/register"
    element={
      <ProtectedPage guestOnly={true} needLogin={false}>
        <RegisterPage />
      </ProtectedPage>
    }
  ></Route>,
];

export default routes;
