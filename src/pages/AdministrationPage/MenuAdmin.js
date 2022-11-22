import "../InteractiveMenuPage/style.css";

import Block from "../../shared/Block";
import PointHeader from "../../widgets/PointHeader";
import menuListStore from "../../shared/store/menuListStore";
import categoryList from "../../shared/store/categoryList";

import { useCookies } from "react-cookie";

import { useCallback, useEffect, useRef, useState } from "react";
import DishEdit from "../../entities/Dish/dishEdit";
import API from "../../shared/API";
import pointDetail from "../../shared/store/pointDetail";
import { useNavigate } from "react-router-dom";

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
                <div
                  key={`${id} + ${category}`}
                  style={{}}
                  className="dish-list__category-name montTitle topMargin48"
                >
                  {category?.name}
                </div>
                <DishEdit
                  img={photo}
                  newLine={true}
                  title={name}
                  description={description}
                  price={price}
                  category={category}
                  id={id}
                  key={`${id} + ${name}`}
                ></DishEdit>
              </>
            );
          } else {
            return (
              <DishEdit
                img={photo}
                title={name}
                description={description}
                price={price}
                category={category}
                id={id}
                key={`${id} + ${name}`}
              ></DishEdit>
            );
          }
        })}
    </div>
  );
};

function CreateDishForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [cookies, , removeCookies] = useCookies();

  function createDish(e) {
    if (!category) {
      setCategory(1);
    }
    e.preventDefault();

    let formData = new FormData();
    let imgValue = document.querySelector("#createFormImage");
    console.log(category);
    if (imgValue.files.length > 0) {
      formData.append("photo", imgValue.files[0]);
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("menu_cafe", pointDetail.pointDetailDict.id);
    API.post(`/menu/dish/create/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${cookies?.token}`,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => {
        if (err.response.status === 401) {
          removeCookies("token");
        }
      });
  }
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px 0px",
      }}
      onSubmit={createDish}
    >
      <input id="createFormImage" type={"file"} />
      <input
        className="subscribe-news__input border topMargin12"
        onChange={(e) => setName(e.target.value)}
        value={name}
        type={"text"}
        placeholder="Name"
      />
      <textarea
        className="subscribe-news__input border topMargin12"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type={"text"}
        placeholder="Description"
      />
      <input
        className="subscribe-news__input border topMargin12"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        type={"number"}
        placeholder="price"
      />
      <select
        className="subscribe-news__input border topMargin12"
        onChange={(e) => {
          setCategory(e.target.value);
          console.log(e.target.value);
        }}
        value={category}
        required
      >
        {categoryList.categoryListArr?.map(({ id, name }) => (
          <option key={id} value={id}>{`${name} ID${id}`}</option>
        ))}
      </select>
      <input
        style={{ color: "white" }}
        className="bgPrimary subscribe-news__input topMargin12"
        type={"submit"}
        value={"Добавить"}
      ></input>
    </form>
  );
}

function MenuAdmin() {
  const navigation = useNavigate();

  return (
    <>
      <PointHeader></PointHeader>
      <Block>
        {/* Сериализовать по категориям и создать два перебора массива */}
        <div className="montHeader">Меню</div>
        <div
          onClick={() => navigation("/admin/menu")}
          className="pressable topMargin24 bottomMargin24 bodyBold"
        >
          Go Back To Choose Menu
        </div>
        <div>
          <div className="montTitle">Добавить блюдо</div>
          <CreateDishForm></CreateDishForm>
        </div>
        <DishList></DishList>
      </Block>
    </>
  );
}

export default MenuAdmin;
