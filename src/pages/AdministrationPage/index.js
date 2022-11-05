import { useState } from "react";
import { useCookies } from "react-cookie";
import API from "../../shared/API";
import MenuAdmin from "./MenuAdmin";

export function PageAdmin() {
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function logIn() {
    console.log({ username, password });
    API.post("/auth/token/", {
      username,
      password,
    })
      .then((res) => {
        setCookies("token", res.data.token);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          removeCookies("token");
        }
      });
  }

  if (cookies.token) {
    return <MenuAdmin></MenuAdmin>;
  } else {
    return (
      <div>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type={"text"}
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={"password"}
        ></input>
        <input onClick={logIn} type={"button"} value="log in"></input>
      </div>
    );
  }
}
