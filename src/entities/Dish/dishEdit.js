import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import API from "../../shared/API";
import { useCookies } from "react-cookie";

import "./style.css";
import { toDataUrl } from "../../shared/service";

const SaveEdits = observer(({ id, data, photoRef }) => {
  const [cookies, , removeCookies] = useCookies();
  function handleClick() {
    let formData = new FormData();
    let photo = document.querySelector("#image");
    console.log({
      name: data.inputName,
      description: data.inputDescription,
      price: data.inputPrice,
      category: data.category.id,
    });
    if (photo.files.length > 0) {
      console.log({ photo: photo.files[0] });
      formData.append("photo", photo.files[0]);
    }
    formData.append("name", data.inputName);

    formData.append("description", data.inputDescription);
    formData.append("price", data.inputPrice);
    formData.append("category", data.category.id);

    API.put(`/menu/dish/edit/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${cookies?.token}`,
      },
    })
      .then((res) => res)
      .catch((err) => {
        if (err.response.status === 401) {
          removeCookies("token");
        }
      });
  }
  return (
    <button
      onClick={handleClick}
      className={"dish__add-to-cart casualTransition pressable "}
    >
      <span style={{ color: "white" }}>Save</span>
    </button>
  );
});

function DishEdit({ title, img, description, price, id, category, menuId }) {
  const [inputPrice, setPrice] = useState(price);
  const [inputDescription, setDescription] = useState(description);
  const [inputName, setName] = useState(title);
  let photoRef = useRef();

  return (
    <div className="dish-card topMargin32">
      <div className="dish-content">
        <div
          className="dish__img"
          style={{
            backgroundImage: `url(${img})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <input
          value={toDataUrl(img, (x) => x)}
          type={"file"}
          ref={photoRef}
          id="image"
        ></input>
        <input
          onChange={(e) => setName(e.target.value)}
          className="dish__title bodyBold topMargin8"
          value={inputName}
        ></input>
        <textarea
          style={{
            width: "100%",
            height: "150px",
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
          }}
          value={inputDescription}
          onChange={(e) => setDescription(e.target.value)}
          className="dish__description bodyRegular fontCaptionColor topMargin4"
        ></textarea>

        <div className="dish__actions topMargin12">
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={inputPrice}
            className="dish__price montTitleRegular fontPrimaryColor "
            style={{ width: "150px" }}
          ></input>

          <SaveEdits
            data={{
              inputPrice,
              inputDescription: "",
              inputName,
              photoRef,
              menuId,
              category,
            }}
            id={id}
          ></SaveEdits>
        </div>
      </div>
    </div>
  );
}

export default DishEdit;
