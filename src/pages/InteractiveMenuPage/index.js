import Dish from "../../entities/Dish";
import Block from "../../shared/Block";
import PointHeader from "../../widgets/PointHeader";
import menuListStore from "../../shared/store/menuListStore";
import "./style.css";
import { observer } from "mobx-react-lite";
import cartStore from "../../shared/store/cartStore";
import pointDetail from "../../shared/store/pointDetail";
import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

let CATEGORY_TYPE_ID = {
  dishes: 0,
  drinks: 1,
};

const OrderInfo = observer(() => {
  return (
    <div className="order-info">
      <div className="montTitle">
        Итого: {cartStore.getCartSum(pointDetail.pointDetailDict.id)}₸
      </div>
    </div>
  );
});

const DrinkList = () => {
  let previousCategory = "";

  const [elementCount, setElementCount] = useState(10);
  const lazyLoad = useCallback(() => {
    if (drinkListRef.current.scrollHeight - window.pageYOffset < 600) {
      setElementCount(
        Math.min(elementCount + 10, menuListStore.menuListDict.drinks?.length)
      );
    }
  });

  useEffect(() => {
    // clean up code
    window.removeEventListener("scroll", lazyLoad);
    window.addEventListener("scroll", lazyLoad, { passive: true });
    return () => window.removeEventListener("scroll", lazyLoad);
  }, [lazyLoad]);

  let drinkListRef = useRef();

  return (
    <div ref={drinkListRef} className="dish-list">
      {menuListStore.menuListDict.drinks
        ?.slice(0, elementCount)
        .map(({ name, description, price, category, id, photo }) => {
          if (previousCategory !== category?.id) {
            previousCategory = category?.id;
            return (
              <>
                <div className="dish-list__category-name montTitle topMargin48">
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
        })}
    </div>
  );
};

const DishList = () => {
  let previousCategory = "";

  const [elementCount, setElementCount] = useState(10);
  const lazyLoad = useCallback(() => {
    if (listRef.current.scrollHeight - window.pageYOffset < 600) {
      setElementCount(
        Math.min(elementCount + 10, menuListStore.menuListDict.dishes?.length)
      );
    }
  });

  useEffect(() => {
    // clean up code

    window.removeEventListener("scroll", lazyLoad);
    window.addEventListener("scroll", lazyLoad, { passive: true });
    return () => window.removeEventListener("scroll", lazyLoad);
  }, [lazyLoad]);

  let listRef = useRef();

  return (
    <div ref={listRef} className="dish-list">
      {menuListStore.menuListDict.dishes
        ?.slice(0, elementCount)
        .map(({ name, description, price, category, id, photo }) => {
          if (previousCategory !== category?.id) {
            previousCategory = category?.id;
            return (
              <>
                <div className="dish-list__category-name montTitle topMargin48">
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
        })}
    </div>
  );
};

export function DrinksPage() {
  const navigation = useNavigate();
  const { id } = useParams();
  return (
    <>
      <PointHeader></PointHeader>
      <Block>
        {/* Сериализовать по категориям и создать два перебора массива */}
        <div className="montHeader">
          Напитки{" "}
          <span
            onClick={() => navigation(`/interactive-menu/${id}`)}
            style={{ textDecoration: "none", color: "black" }}
            className="goToDrinks montTitle pressable disabled"
          >
            Блюда
          </span>
        </div>
        <DrinkList></DrinkList>
      </Block>
      <OrderInfo></OrderInfo>
    </>
  );
}

function MenuPage() {
  const navigation = useNavigate();
  const { id } = useParams();
  return (
    <>
      <PointHeader></PointHeader>
      <Block>
        {/* Сериализовать по категориям и создать два перебора массива */}
        <div className="montHeader">
          Меню{" "}
          <span
            onClick={() => navigation(`/interactive-menu/${id}/drinks`)}
            style={{ textDecoration: "none", color: "black" }}
            className="goToDrinks montTitle pressable disabled"
          >
            Напитки
          </span>
        </div>
        <DishList></DishList>
      </Block>
      <OrderInfo></OrderInfo>
    </>
  );
}

export default MenuPage;
