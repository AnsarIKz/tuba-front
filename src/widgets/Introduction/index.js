import CustomButton from "../../shared/CustomButton";
import "./style.css";
import Steak from "../../assets/img/steak.png";
import Meat from "../../assets/img/meat.png";
import Burger from "../../assets/img/burger.png";
import Pancake from "../../assets/img/pancake.png";

import scroller from "../../shared/store/scroller";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

function Introduction({ scrollRef }) {
  // const navigation = useNavigate();
  // function scrollTo(elem) {
  //   elem.current.scrollIntoView({ behavior: "smooth", block: "start" });
  // }
  return (
    <>
      <div className="introduction bottomLayer">
        <div className="introduction-bg__circle bgCircleOne middleLayer"></div>
        <div className="introduction-bg__circle bgCircleTwo middleLayer"></div>
        <div className="introduction-bg__circle bgCircleThree middleLayer"></div>{" "}
        <div className="introduction__content topLayer">
          <div className="introduction__text">
            <div className="montHeader fontWhiteColor">
              Мы не про еду, <br />
              Мы про <span className="fontPrimaryColor">ощущения</span>
            </div>
            <div className="topMargin48 bodyRegular fontWhiteColor">
              Tuba - Сеть Кафе и Ресторанов, мы предлагаем вам лучшее качество.
              <br></br> Выбирайте лучшее, выбирайте для себя
            </div>
            {/* <div className="introduction__actions topMargin48">
              <CustomButton
                title="Наши точки"
                action={() => {
                  scrollTo(scrollRef);
                }}
              ></CustomButton>
              <span className="leftMargin24 fontWhiteColor bodyRegular">
                или
                <span
                  onClick={() => navigation("/about-us/")}
                  className="bodyBold fontPrimaryColor leftMargin8 pressable"
                >
                  Tuba Group
                </span>
              </span>
            </div> */}
          </div>
          <IntroductionAnimationPart></IntroductionAnimationPart>
        </div>
      </div>
    </>
  );
}

const IntroductionAnimationPart = observer(() => {
  return (
    <div className="introduction__animation middleLayer">
      <img
        className={
          scroller.scroll < 170 ? "canvas__elem1" : "canvas__elem1 canvas__end1"
        }
        src={Steak}
      ></img>
      <img
        className={
          scroller.scroll < 170 ? "canvas__elem2" : "canvas__elem2 canvas__end2"
        }
        src={Pancake}
      ></img>
      <img
        className={
          scroller.scroll < 170 ? "canvas__elem3" : "canvas__elem3 canvas__end3"
        }
        src={Burger}
      ></img>
      <img
        className={
          scroller.scroll < 170 ? "canvas__elem4" : "canvas__elem4 canvas__end4"
        }
        src={Meat}
      ></img>
    </div>
  );
});

export default Introduction;
