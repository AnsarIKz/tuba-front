import "./style.css";

import { useState } from "react";
import { getRateArray } from "../../shared/service";
import API from "../../shared/API";
import pointDetail from "../../shared/store/pointDetail";
import useAlert from "../../shared/Alert/useAlert";

function ReviewForm({ closeDisplayReview }) {
  const size = 3;
  const { setAlert } = useAlert();
  //
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rate, setRate] = useState(0);
  //
  function sendForm() {
    console.log(name, text);
    API.post("review/create/", {
      author: name,
      message: text,
      rating: rate,
      cafe: pointDetail.pointDetailDict.id,
    })
      .then((res) => setAlert("Успех!", "success"))
      .catch((error) => setAlert("Отправьте корректный запрос!", "error"));
    closeDisplayReview();
  }

  const rating = getRateArray(rate).map((elem, i) => (
    <svg
      onClick={() => setRate(i + 1)}
      key={i}
      width={size * 10}
      height={size * 10}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.5"
        d="M4.436 1.01809C4.63284 0.619323 5.20147 0.619324 5.3983 1.01809L6.40438 3.05629C6.48247 3.2145 6.63335 3.32421 6.80792 3.34972L9.05865 3.6787C9.49859 3.743 9.67393 4.28378 9.35543 4.59401L7.72766 6.17945C7.6011 6.30272 7.54333 6.4804 7.57319 6.65453L7.95724 8.8937C8.03242 9.33206 7.57228 9.66633 7.17864 9.45931L5.1669 8.40136C5.01055 8.31914 4.82375 8.31914 4.6674 8.40136L2.65566 9.45931C2.26202 9.66633 1.80188 9.33206 1.87707 8.8937L2.26111 6.65453C2.29098 6.4804 2.23321 6.30272 2.10664 6.17945L0.478877 4.59401C0.160372 4.28378 0.335715 3.743 0.775658 3.6787L3.02638 3.34972C3.20096 3.32421 3.35183 3.2145 3.42993 3.05629L4.436 1.01809Z"
        fill={elem ? "#FFD600" : "#C7C8D2"}
      />
    </svg>
  ));
  return (
    <>
      <div
        className="review-form-bg"
        onClick={() => closeDisplayReview()}
      ></div>

      <form className="review-form">
        <div className="montTitle">Оставьте отзыв</div>
        <div className="topMargin16" style={{ display: "flex" }}>
          {rating}
        </div>

        <input
          value={name}
          className="review-form__input topMargin32"
          type={"text"}
          onChange={(el) => {
            setName(el.target.value);
          }}
          placeholder={"Введите Имя"}
        ></input>
        <textarea
          value={text}
          className="review-form__textarea review-form__input topMargin8"
          type={"text"}
          rows={4}
          placeholder={"Введите Текст"}
          onChange={(el) => {
            setText(el.target.value);
          }}
        ></textarea>
        <input
          className="topMargin16 review-form__button bodyRegular fontWhiteColor pressable"
          type={"button"}
          value={"Оставить отзыв"}
          onClick={() => sendForm()}
        ></input>
      </form>
    </>
  );
}

export default ReviewForm;
