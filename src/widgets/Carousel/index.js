import "./style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import newsListStore from "../../shared/store/newsList";

function Carousel({ eventRef }) {
  const [state, setState] = useState("pending");
  const [index, setIndex] = useState(0);
  //
  const navigation = useNavigate();

  useEffect(() => {
    if (state !== "done") {
      newsListStore.fetchNewsList(setState);
    }
  }, []);

  function handleClick() {
    let id = newsListStore.newsListArr[index].id;
    navigation(`/`);
  }

  if (state !== "done") {
    return <></>;
  } else {
    return (
      <div onClick={handleClick} ref={eventRef} className="carousel">
        <div
          className="carousel__content"
          style={{ backgroundImage: `` }}
        ></div>
        <div className="carousel__slider topMargin24">
          {newsListStore.newsListArr.map((el, index) => {
            return <div key={index} className="carousel__sliderPoint"></div>;
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
