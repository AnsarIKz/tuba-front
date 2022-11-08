import { observer } from "mobx-react-lite";
import { useState } from "react";
import API from "../../shared/API";
import { useCookies } from "react-cookie";

import "./style.css";
import { toDataUrl } from "../../shared/service";

const SaveEdits = observer(({ id, data }) => {
  const [cookies, , removeCookies] = useCookies();
  function handleClick() {
    let formData = new FormData();
    let photo = document.querySelector("#image");
    formData.append("photo", photo.files[0]);
    formData.append("name", data.inputName);
    formData.append("description", data.inputDescription);
    formData.append("price", data.inputPrice);
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

function DishEdit({ title, img, description, price, id, category }) {
  const [inputPrice, setPrice] = useState(price);
  const [inputDescription, setDescription] = useState(description);
  const [inputName, setName] = useState(title);

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
          ></input>

          <SaveEdits
            data={{ inputPrice, inputDescription, inputName }}
            id={id}
          ></SaveEdits>
        </div>
      </div>
    </div>
  );
}

export default DishEdit;
