import { useNavigate } from "react-router-dom";
import Rating from "../../features/Rating";
import Category from "../Category";
import "./style.css";

const Point = ({
  id,
  average_price,
  name,
  description,
  address,
  average,
  categories,
  img,
}) => {
  const navigation = useNavigate();

  // for Example PLOOPY
  return (
    <div
      onClick={() => navigation(`/point/${id}`)}
      key={id}
      className="point pressable"
    >
      <div
        className="point__img"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* img */}
      </div>
      <div className="point__wrapper topMargin16 leftMargin16 rightMargin16">
        <div className="point__first">
          {/* title */}
          <div className="point__title bodyBold">{name}</div>
          <Rating rate={[true, true, true, true, false]}> </Rating>
        </div>
        <div className="point__second">
          {/* description */}
          <div className="point__description captionRegular fontCaptionColor topMargin8">
            {address} ◦ {average_price}₸
          </div>
        </div>

        <div className="categories bottomMargin24 topMargin12">
          <Category title={categories}></Category>
        </div>
      </div>
    </div>
  );
};

export default Point;
