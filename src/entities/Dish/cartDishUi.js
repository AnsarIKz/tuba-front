import { observer } from "mobx-react-lite";
import { useState } from "react";
import useAlert from "../../shared/Alert/useAlert";
import cartStore from "../../shared/store/cartStore";
import "./style.css";

const Price = observer((elem, index) => {
  return (
    <div className="cart-dish__price montTitleRegular fontPrimaryColor leftMargin48">
      {cartStore.findElement(elem.id).count * elem.data.price}₸
    </div>
  );
});

const Counter = observer((elem, index) => {
  const { setAlert } = useAlert();
  return (
    <div className="cart-dish__counter">
      <button
        className={
          "counter__dec " +
          (cartStore.findElement(elem.id).count < 2 ? "disabled" : "")
        }
        disabled={cartStore.findElement(elem.id).count < 2}
        onClick={() => {
          let res = cartStore.decreaseCount(elem.id);
          if (res === "error") {
            setAlert("Данное действие невозможно", "error");
          }
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.31671 6.74194L10.4002 6.74194"
            stroke="#2B2B43"
            strokeWidth="1.51789"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className="leftMargin12 rightMargin12 montTitle"
        style={{ fontSize: "22px", verticalAlign: "middle" }}
      >
        {cartStore.findElement(elem.id).count}
      </div>
      <button
        className="counter__inc"
        onClick={() => {
          cartStore.increaseCount(elem.id);
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.47827 3.19995L6.47827 10.2834"
            stroke="#2B2B43"
            strokeWidth="1.51789"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.93652 6.74158L10.02 6.74158"
            stroke="#2B2B43"
            strokeWidth="1.51789"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
});

function CartDish({ data, id }) {
  const [state, setState] = useState("ready");
  if (state === "deleted") {
    return <></>;
  } else {
    return (
      <div className="cart-dish topMargin32">
        <div className="cart-dish__img"></div>
        <div className="cart-dish__info leftMargin24">
          <div className="cart-dish__title bodyBold topMargin8">
            {data.title}
            <div className="cart-dish__description bodyRegular fontCaptionColor topMargin4">
              {data.description}
            </div>
          </div>
        </div>

        <div className="cart-dish__actions topMargin12">
          {/* Counter */}
          <Counter id={id}></Counter>
          <Price id={id} data={data}></Price>

          <div
            className="cart-dish__delete leftMargin24 pressable"
            onClick={() => {
              setState("deleted");
              cartStore.removeFromCart(id);
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1_1276)">
                <path
                  d="M2.315 4.81348H3.66424L14.4581 4.81348"
                  stroke="#C7C8D2"
                  strokeWidth="1.3155"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.68804 4.81346L5.68804 3.46422C5.68804 3.10639 5.83019 2.7632 6.08322 2.51017C6.33625 2.25714 6.67943 2.11499 7.03727 2.11499L9.73574 2.11499C10.0936 2.11499 10.4368 2.25714 10.6898 2.51017C10.9428 2.7632 11.085 3.10639 11.085 3.46422V4.81346M13.1088 4.81346L13.1088 14.2581C13.1088 14.6159 12.9667 14.9591 12.7136 15.2122C12.4606 15.4652 12.1174 15.6073 11.7596 15.6073L5.01342 15.6073C4.65558 15.6073 4.3124 15.4652 4.05937 15.2122C3.80634 14.9591 3.66418 14.6159 3.66418 14.2581L3.66418 4.81346L13.1088 4.81346Z"
                  stroke="#C7C8D2"
                  strokeWidth="1.3155"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_1276">
                  <rect
                    width="16.1908"
                    height="16.1908"
                    fill="white"
                    transform="translate(0.291138 0.765747)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default CartDish;
