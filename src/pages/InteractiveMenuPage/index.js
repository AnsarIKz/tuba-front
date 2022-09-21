import Dish from "../../entities/Dish";
import Block from "../../shared/Block";
import PointHeader from "../../widgets/PointHeader";
import menuListStore from "../../shared/store/menuListStore";
import "./style.css";
import { observer } from "mobx-react-lite";
import cartStore from "../../shared/store/cartStore";
import pointDetail from "../../shared/store/pointDetail";
import { useState } from "react";

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
  let previousCategory = "";
  return (
    <>
      <PointHeader></PointHeader>
      <Block>
        {/* Сериализовать по категориям и создать два перебора массива */}
        <div className="montHeader">Меню</div>
        <div className="dish-list">
          {menuListStore.menuListDict.dishes?.map(
            ({ name, description, price, category, id, photo }) => {
              if (previousCategory !== category?.id) {
                previousCategory = category?.id;
                return (
                  <>
                    <div
                      style={{}}
                      className="dish-list__category-name montTitle topMargin48"
                    >
                      {category?.name}
                    </div>
                    <Dish
                      img={photo}
                      newLine={true}
                      title={name}
                      description={description}
                      price={price}
                      category={category}
                      id={id}
                      key={id}
                    ></Dish>
                  </>
                );
              } else {
                return (
                  <Dish
                    key={id}
                    img={photo}
                    title={name}
                    description={description}
                    price={price}
                    category={category}
                    id={id}
                  ></Dish>
                );
              }
            }
          )}
        </div>
      </Block>
      <OrderInfo></OrderInfo>
    </>
  );
}

export default MenuPage;
