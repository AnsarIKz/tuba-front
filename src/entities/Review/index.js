import Rating from "../../features/Rating";
import "./style.css";

function Review({
  name = "Anonym",
  rating = "3",
  text = "",
  published_date = new Date(),
}) {
  function stringToColor(str) {
    let hash = 0;
    let color = "#";
    let i;
    let value;
    let strLength;

    if (!str) {
      return color + "333333";
    }

    strLength = str.length;

    for (i = 0; i < strLength; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (i = 0; i < 3; i++) {
      value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }

    return color;
  }

  return (
    <div className="review topMargin32">
      <div>
        <div className="review__content">
          <div
            style={{ backgroundColor: `${stringToColor(name)}` }}
            className="review__avatar bodyBold"
          >
            {name[0]}
          </div>
          <div className="leftMargin12">
            <div className="bodyBold">{name}</div>
            <div>
              <Rating />
            </div>
          </div>
        </div>
        <div className="review__text bodyRegular topMargin8">{text}</div>
      </div>
      <div className="captionRegular fontCaptionColor">
        {published_date.toString()}
      </div>
    </div>
  );
}

export default Review;
