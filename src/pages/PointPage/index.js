import { useEffect, useState } from "react";
import Review from "../../entities/Review";
import Rating from "../../features/Rating";
import Block from "../../shared/Block";
import CustomButton from "../../shared/CustomButton";
import Footer from "../../widgets/Footer";
import PointHeader from "../../widgets/PointHeader";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import pointDetailStore from "../../shared/store/pointDetail";
import { observer } from "mobx-react-lite";
import ReviewForm from "../../widgets/ReviewForm";

const PointPage = observer(() => {
  const [switchState, setSwitchState] = useState(true);
  const [displayReview, setDisplayReview] = useState(false);
  const navigation = useNavigate();
  let { id } = useParams();
  function onSwitch() {
    setSwitchState(!switchState);
  }

  return (
    <>
      {displayReview && (
        <ReviewForm closeDisplayReview={setDisplayReview}></ReviewForm>
      )}
      <PointHeader pointId={pointDetailStore.pointDetailDict.id}></PointHeader>
      <div className="page bottomMargin96 topMargin96">
        <div className="page__about ">
          <div className="montHeader bottomMargin12">
            {pointDetailStore.pointDetailDict.name}
          </div>
          <Rating global={true} size={2}></Rating>
          <div className="bodyRegular topMargin48">
            {pointDetailStore.pointDetailDict.description}
            <br></br>
            <br></br>
            <div className="bodyRegular fontCaptionColor">
              {pointDetailStore.pointDetailDict.address}, Средняя цена -{" "}
              {pointDetailStore.pointDetailDict.average_price}
            </div>
          </div>
          <CustomButton
            title={"Меню"}
            action={() => navigation(`/interactive-menu/${id}`)}
            className={"topMargin48"}
          ></CustomButton>
        </div>
        <div className="page__options" onClick={() => onSwitch()}>
          <div className="page__swiper leftMargin48">
            <div className="swiper__button pressable bodyBold fontPrimaryColor">
              Фото
            </div>
            <div className="swiper__button pressable bodyBold">Карта</div>
          </div>
          <div
            style={{
              backgroundImage: `url(${pointDetailStore.pointDetailDict.img})`,
            }}
            className={
              "page__img leftMargin32" + (switchState ? "" : " displayNone")
            }
          ></div>
          <div
            className={
              "page__map leftMargin32" + (switchState ? " displayNone" : "")
            }
          >
            <div style={{ position: "relative", overflow: "hidden" }}>
              {/* <a
                href="https://yandex.kz/maps/org/113387670850/?utm_medium=mapframe&utm_source=maps"
                style={{
                  color: "#eee",
                  fontSize: "12px",
                  position: "absolute",
                  top: "0px",
                }}
              >
                Tuba
              </a> */}
              {/* <a
                href="https://yandex.kz/maps/162/almaty/category/cafe/184106390/?utm_medium=mapframe&utm_source=maps"
                style={{
                  color: "#eee",
                  fontSize: " 12px",
                  position: "absolute",
                }}
              >
                Кафе в Алматы
              </a> */}
              <iframe
                src="https://yandex.kz/map-widget/v1/-/CCURUYRwwC"
                width="480"
                height="480"
                frameBorder="0"
                overflow="hidden"
                allowFullScreen={false}
                style={{ position: "relative" }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Block>
        <div className="reviews">
          <div className="reviews__title">
            {/* Добавить дату и фильтровать по убыванию*/}
            <div className="montTitle">Отзывы</div>
            <div
              onClick={() => setDisplayReview(!displayReview)}
              className="bodyRegular fontPrimaryColor pressable"
            >
              добавить отзыв
            </div>
          </div>
          {pointDetailStore.pointDetailDict.reviews.map((element, i) => (
            <Review
              key={i}
              name={element.author}
              text={element.message}
              rating={element.rating}
              published_date={element.published_date}
            ></Review>
          ))}
        </div>
      </Block>
      <Footer></Footer>
    </>
  );
});

export default PointPage;
