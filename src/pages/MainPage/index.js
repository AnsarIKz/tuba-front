import { useEffect, useRef } from "react";
import Block from "../../shared/Block";
import Carousel from "../../widgets/Carousel";
import Footer from "../../widgets/Footer";
import Header from "../../widgets/Header";
import Introduction from "../../widgets/Introduction";
import PointList from "../../widgets/PointList";
import SubscribeNews from "../../widgets/SubscribeNews";

function Main() {
  const eventRef = useRef(null);
  const pointRef = useRef(null);

  return (
    <>
      <Header eventRef={eventRef} pointRef={pointRef}></Header>
      <Introduction scrollRef={pointRef}></Introduction>
      <Block>
        <div id="carousel">
          <Carousel eventRef={eventRef}></Carousel>
        </div>
      </Block>
      <Block>
        <div id="our-points" ref={pointRef} className="montTitle">
          Наши точки
        </div>
        <PointList></PointList>
      </Block>
      <SubscribeNews></SubscribeNews>
      <Footer></Footer>
    </>
  );
}
export default Main;
