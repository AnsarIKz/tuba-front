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
    navigation(`/news/${id}`);
  }

  if (state !== "done") {
    return <></>;
  } else {
    return (
      <div ref={eventRef} className="carousel">
        <div
          onClick={handleClick}
          className="carousel__content pressable "
          style={{ backgroundImage: `` }}
        ></div>
        <div className="carousel__slider topMargin24">
          {newsListStore.newsListArr.map((el, elIndex) => {
            return (
              <div
                key={elIndex}
                className={
                  "carousel__sliderPoint " +
                  (index == elIndex ? "carousel__sliderPointIndex" : "")
                }
              ></div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
