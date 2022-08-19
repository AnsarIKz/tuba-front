import "./style.css";
import { useNavigate } from "react-router-dom";

function Carousel({ eventRef }) {
  const navigation = useNavigate();
  return (
    <div ref={eventRef} className="carousel">
      <div className="carousel__content" style={{ backgroundImage: `` }}></div>
      <div className="carousel__slider topMargin24">
        <div className="carousel__sliderPoint"></div>
        <div className="carousel__sliderPoint"></div>
        <div className="carousel__sliderPointIndex"></div>
      </div>
    </div>
  );
}

export default Carousel;
