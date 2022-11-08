import "./style.css";
import cake from "../../assets/img/cake.png";

import { useState } from "react";
import API from "../../shared/API";
import { validateEmail } from "../../shared/service";
import useAlert from "../../shared/Alert/useAlert";

function SubscribeNews() {
  const { setAlert } = useAlert();
  const [email, setEmail] = useState();
  const [state, setState] = useState("pending");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function subscribe(e) {
    e.preventDefault();
    if (validateEmail(email)) {
      API.post("email/subscribe/", {
        email: email,
      });
      setState("done");
      setAlert("Успех!", "success");
    } else {
      setState("error");
      setAlert("Введите корректную почту", "error");
    }
  }
  return (
    <div className="subscribe-news casualTransition">
      <div className="subscribe-news__img">
        <img alt="cake" src={cake} height={400}></img>
      </div>
      <div className="subscribe-news__content">
        <div className="subscribe-news__info">
          {/* {isDone && <img src={partyImg}></img>} */}

          <>
            <div className="montHeader2 fontWhiteColor">
              Будьте в курсе новостей!
            </div>
            <div className="fontWhiteColor topMargin16">
              Подпишитесь на нашу рассылку для того чтобы узнавать самые свежие
              новости первым
            </div>
            <form className="subscribe-news__form topMargin24">
              <input
                value={email}
                onChange={handleChangeEmail}
                className={
                  "subscribe-news__input bodyRegular casualTransition " +
                  (state === "error" ? "subscribe-news__error-input" : "")
                }
                type={"email"}
                placeholder="Эл. Почта"
                disabled={state === "done"}
              ></input>
              <button
                className={
                  " subscribe-news__button bodyBold fontWhiteColor casualTransition " +
                  (state !== "done" ? "pressable" : "disabled")
                }
                disabled={state === "done"}
                onClick={subscribe}
              >
                Подписаться
              </button>
            </form>
          </>
        </div>
      </div>
    </div>
  );
}

export default SubscribeNews;
