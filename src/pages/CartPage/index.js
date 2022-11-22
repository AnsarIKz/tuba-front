import { useState } from "react";
import PhoneInput from "react-phone-number-input/input";
import CartDish from "../../entities/Dish/cartDishUi";
import Block from "../../shared/Block";
import cartStore from "../../shared/store/cartStore";
import pointDetail from "../../shared/store/pointDetail";
import PointHeader from "../../widgets/PointHeader";
import "./style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import API from "../../shared/API";
import { observer } from "mobx-react-lite";
import useAlert from "../../shared/Alert/useAlert";
import { useNavigate } from "react-router-dom";

const CartOrder = observer(() => {
  const [orderType, setOrderType] = useState("here");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [tableNumber, setTableNumber] = useState();

  const [formState, setFormState] = useState("ready");

  const navigation = useNavigate();
  const { setAlert } = useAlert();

  function createOrder() {
    setFormState("pending");

    if (isValidPhoneNumber(phone) && tableNumber > 0 && name.length > 1) {
      //  0 == HERE
      //  1 == DELIEVERY
      let order_type = orderType === "here" ? 0 : 1;
      API.post("order/create/", {
        menu_id: pointDetail.pointDetailDict.id,
        order_type: order_type,
        address: address,
        table_number: tableNumber,
        customer_phone: phone,
        customer_name: name,

        dishes: cartStore.cartListDict[pointDetail.pointDetailDict.id],
        info: "Заказ",
        state: "pending",
      })
        .then(() => {
          cartStore.clearCart(pointDetail.pointDetailDict.id);
          navigation(-1);
          setAlert("Заказ отправлен!", "success");
          setFormState("ready");
        })
        .catch(() => {
          setAlert("Ошибка", "error");
          setFormState("ready");
        });
    } else {
      // oshibka

      setAlert("Ошибка", "error");
      setFormState("ready");
    }
  }
  return (
    <div
      className={
        "cart-order " +
        (cartStore.cartListDict[`${pointDetail.pointDetailDict.id}`]?.length !==
          0 && formState === "ready"
          ? ""
          : "disabled")
      }
    >
      <div className="cart-order-card">
        <div className="cart-order__type bodyBold">
          <div
            onClick={() => setOrderType("delievery")}
            className={
              "cart-order__type-delievery cart-order__type-elem pressable " +
              (orderType === "delievery" ? "cart-order-focus" : " ")
            }
          >
            Доставка
          </div>
          <div
            onClick={() => setOrderType("here")}
            className={
              "cart-order__type-here cart-order__type-elem pressable " +
              (orderType === "here" ? "cart-order-focus" : " ")
            }
          >
            Здесь
          </div>
        </div>
        <div className="cart-order__inputs bodyRegular">
          <div className="topMargin16 bottomMargin16"></div>
          {orderType === "here" && (
            <input
              type={"number"}
              onChange={(e) => {
                setTableNumber(e.target.value);
              }}
              value={tableNumber}
              placeholder="Номер столика"
              className="cart-order__primary-input"
            />
          )}
          {orderType === "delievery" && (
            <input
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
              placeholder="Адрес"
              className="cart-order__primary-input"
            />
          )}

          <div className="topMargin16 bottomMargin16"></div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
            className="cart-order__secondary-input"
          />

          <div className="topMargin16 bottomMargin8 bodyBold cart-order__primary-title">
            Номер телефона
          </div>
          <PhoneInput
            className="cart-order__phone"
            value={phone}
            onChange={setPhone}
            country="KZ"
            placeholder="8 (7--) --- -- --"
          ></PhoneInput>
        </div>
      </div>
      <div className="cart-order-card cart-order__payment-info leftMargin48">
        <div className="bodyTitle bottomMargin24">Сумма оплаты</div>
        <div className="bottomMargin12 cart-order__subtotal cart-order__subtitile">
          <span>Цена</span>
          {cartStore.getCartSum(pointDetail.pointDetailDict.id)}Т
        </div>
        <div className="bottomMargin12 cart-order__service cart-order__subtitile">
          <span>Обслуживание</span>
          {cartStore.getCartSum(pointDetail.pointDetailDict.id) / 10}T
        </div>
        <div className="bottomMargin12 cart-order__delivery cart-order__subtitile">
          <span>Доставка</span>0Т
        </div>
        <div className="bottomMargin12 cart-order__total cart-order__title">
          <span>Итого</span>
          {cartStore.getCartSum(pointDetail.pointDetailDict.id) / 10 +
            cartStore.getCartSum(pointDetail.pointDetailDict.id)}
          T
        </div>
        <input
          disabled={
            formState !== "ready" ||
            cartStore.cartListDict[`${pointDetail.pointDetailDict.id}`]
              ?.length === 0
          }
          type={"submit"}
          className="cart-order__proceed bodyRegular pressable topMargin24"
          value={"Заказать"}
          onClick={createOrder}
        ></input>
      </div>
    </div>
  );
});
function CartPage() {
  // ВЫВЕСТИ В ДОМЕН И ВЫВЕСТИ В HOC
  return (
    <>
      <PointHeader stack={true}></PointHeader>
      <Block>
        <div className="montTitle">My Cart</div>
        <div className="cart-page">
          <div className="cart-page__dishes">
            {cartStore.cartListDict[`${pointDetail.pointDetailDict.id}`]?.map(
              (item) => {
                return (
                  <CartDish
                    key={item.id}
                    data={item.data}
                    id={item.id}
                  ></CartDish>
                );
              }
            )}
          </div>
        </div>
      </Block>
      <Block>
        <CartOrder></CartOrder>
      </Block>
    </>
  );
}

export default CartPage;
