import CartDish from "../../entities/Dish/cartDishUi";
import Block from "../../shared/Block";
import cartStore from "../../shared/store/cartStore";
import PointHeader from "../../widgets/PointHeader";

function CartPage() {
  // ВЫВЕСТИ В ДОМЕН И ВЫВЕСТИ В HOC
  return (
    <>
      <PointHeader stack={true}></PointHeader>
      <Block>
        <div className="montTitle">My Cart</div>
        <div className="cart-page">
          <div className="cart-page__dishes">
            {cartStore.cartListArr.map((item) => {
              // console.log(item.data);
              return (
                <CartDish
                  key={item.id}
                  data={item.data}
                  id={item.id}
                ></CartDish>
              );
            })}
          </div>
          <div className="cart-page__order"></div>
        </div>
      </Block>
    </>
  );
}

export default CartPage;
