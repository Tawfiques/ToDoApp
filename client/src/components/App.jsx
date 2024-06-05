import axios from "axios";
import { useEffect, useState } from "react";
import LoggedUser from "./LoggedUser";
import NotLoggedUser from "./NotLoggedUser";
import Header from "./Header";
import { BASE_URL } from "../api";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    async function checkLogin() {
      try {
        const response = await axios.get(`${BASE_URL}/auth/check`, {
          withCredentials: true,
        });
        setIsLogged(response.data.isLogged);
      } catch (error) {
        console.error(error);
      }
    }
    checkLogin();
  }, []);

  function GoogleLogin() {
    window.open(`${BASE_URL}/auth/google`, "_self");
  }

  return (
    <>
      {isLogged ? (
        <LoggedUser />
      ) : (
        <>
          {" "}
          <Header GoogleLogin={GoogleLogin} isLogged={isLogged} />
          <NotLoggedUser />{" "}
        </>
      )}
    </>
  );
}
