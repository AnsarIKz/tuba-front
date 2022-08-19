import { observer } from "mobx-react-lite";
import cartStore from "../../shared/store/cartStore";
import "./style.css";

const AddToCartButton = observer(({ id, data }) => {
  function handleClick() {
    if (!Boolean(cartStore.findElement(id) + 1)) {
      cartStore.addToCart({ id, data });
    } else {
      cartStore.removeFromCart(id);
    }
    console.log();
  }
  return (
    <button
      onClick={handleClick}
      className={
        "dish__add-to-cart casualTransition pressable " +
        (Boolean(cartStore.findElement(id) + 1) ? "dish__in-cart" : "")
      }
    >
      <svg
        className="casualTransition"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={
          Boolean(cartStore.findElement(id) + 1) ? { rotate: "45deg" } : {}
        }
      >
        <path
          d="M9.12012 4.22001V14.02"
          stroke={Boolean(cartStore.findElement(id) + 1) ? "#00c48c" : "white"}
          strokeWidth="1.68"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.21973 9.12001H14.0197"
          stroke={cartStore.findElement(id) + 1 ? "#00c48c" : "white"}
          strokeWidth="1.68"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
});

function Dish({ title, img, description, price, id }) {
  return (
    <div className="dish-card topMargin32 rightMargin32">
      <div className="dish-content">
        <div className="dish__img"></div>
        <div className="dish__title bodyBold topMargin8">
          {/* title */}
          {title}
          <div className="dish__description bodyRegular fontCaptionColor topMargin4">
            {description}
          </div>
        </div>
        <div className="dish__actions topMargin12">
          <div className="dish__price montTitleRegular fontPrimaryColor ">
            {price}₸
          </div>
          <AddToCartButton
            data={{ title, img, description, price }}
            id={id}
          ></AddToCartButton>
        </div>
      </div>
    </div>
  );
}

export default Dish;
