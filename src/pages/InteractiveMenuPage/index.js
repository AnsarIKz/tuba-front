import Dish from "../../entities/Dish";
import Block from "../../shared/Block";
import PointHeader from "../../widgets/PointHeader";
import menuListStore from "../../shared/store/menuListStore";
import "./style.css";
import { observer } from "mobx-react-lite";
import cartStore from "../../shared/store/cartStore";
import pointDetail from "../../shared/store/pointDetail";

const OrderInfo = observer(() => {
  return (
    <div className="order-info">
      <div className="montTitle">
        Итого: {cartStore.getCartSum(pointDetail.pointDetailDict.id)}₸
      </div>
    </div>
  );
});

function MenuPage() {
  return (
    <>
      <PointHeader></PointHeader>
      <Block>
        <div className="montTitle">Меню</div>
        <div className="dish-list">
          {menuListStore.menuListDict.dishes?.map(
            ({ name, description, price, category, id }) => (
              <Dish
                key={id}
                title={name}
                description={description}
                price={price}
                category={category}
                id={id}
              ></Dish>
            )
          )}
        </div>
      </Block>
      <OrderInfo></OrderInfo>
    </>
  );
}

export default MenuPage;
