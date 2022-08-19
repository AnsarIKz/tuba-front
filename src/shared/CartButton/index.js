import "./style.css";
import { useNavigate } from "react-router-dom";
import pointDetailStore from "../store/pointDetail";

function CartButton({ stack }) {
  const navigation = useNavigate();
  // let history = useHistory();
  function onButton() {
    if (stack) {
      navigation(-1);
    } else {
      navigation(`/cart/${pointDetailStore.pointDetailDict.id}`);
      // Разные корзины для разных магазинов
    }
  }
  return (
    <div className={`sButton pressable bgPrimary`} onClick={() => onButton()}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {!stack && (
          <>
            <path
              d="M3 3H4.37144C5.31982 3 6.13781 3.66607 6.32996 4.59479L8.67004 15.9052C8.86219 16.8339 9.68018 17.5 10.6286 17.5H17.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.82422 7H19.6743C20.3386 7 20.8183 7.6359 20.6358 8.27472L19.6217 11.8242C19.2537 13.1121 18.0765 14 16.7371 14H8.27734"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="16.5"
              cy="20.5"
              r="0.5"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              r="0.5"
              transform="matrix(1 0 0 -1 10.5 20.5)"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
        {stack && (
          <>
            <path
              d="M8 8L16 16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 8L8 16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </div>
  );
}

export default CartButton;
