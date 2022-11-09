import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import API from "../../shared/API";
import Block from "../../shared/Block";
import pointListStore from "../../shared/store/pointList";

function ChoiceCafe() {
  const navigation = useNavigate();
  return (
    <Block>
      <ol>
        {pointListStore.pointList.map((i, index) => (
          <li
            key={index}
            className="montTitle pressable"
            onClick={() => navigation(`/admin/menu/${i.id}`)}
          >
            {i.name}
          </li>
        ))}
      </ol>
    </Block>
  );
}

export function PageAdmin() {
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function logIn() {
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
    return <ChoiceCafe></ChoiceCafe>;
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
