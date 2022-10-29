import Dish from "../../entities/Dish";
import Block from "../../shared/Block";
import PointHeader from "../../widgets/PointHeader";
import menuListStore from "../../shared/store/menuListStore";
import "./style.css";
import { observer } from "mobx-react-lite";
import cartStore from "../../shared/store/cartStore";
import pointDetail from "../../shared/store/pointDetail";
import { useEffect, useRef, useState } from "react";

const OrderInfo = observer(() => {
  return (
    <div className="order-info">
      <div className="montTitle">
        Итого: {cartStore.getCartSum(pointDetail.pointDetailDict.id)}₸
      </div>
    </div>
  );
});

const DishList = () => {
  let previousCategory = "";

  const [elementCount, setElementCount] = useState(10);

  useEffect(() => {
    // clean up code

    window.removeEventListener("scroll", lazyLoad);
    window.addEventListener("scroll", lazyLoad, { passive: true });
    return () => window.removeEventListener("scroll", lazyLoad);
  }, []);

  let listRef = useRef();

  function lazyLoad(e) {
    if (listRef.current.scrollHeight - window.pageYOffset < 500) {
      setElementCount(
        Math.min(elementCount + 10, menuListStore.menuListDict.dishes?.length)
      );
    }
  }
  return (
    <div ref={listRef} className="dish-list">
      {menuListStore.menuListDict.dishes
        ?.slice(0, elementCount)
        .map(({ name, description, price, category, id, photo }) => {
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
        })}
    </div>
  );
};

function MenuPage() {
  return (
    <>
      <PointHeader></PointHeader>
      <Block>
        {/* Сериализовать по категориям и создать два перебора массива */}
        <div className="montHeader">Меню</div>
        <DishList></DishList>
      </Block>
      <OrderInfo></OrderInfo>
    </>
  );
}

export default MenuPage;
