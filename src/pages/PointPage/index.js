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
import { getRateArray } from "../../shared/service";

const PointPage = observer(() => {
  const [displayReview, setDisplayReview] = useState(false);
  const navigation = useNavigate();
  let { id } = useParams();
  useEffect(
    () =>
      pointDetailStore.fetchPointAverageRating(
        pointDetailStore.pointDetailDict.id
      ),
    []
  );

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
          <Rating
            rate={getRateArray(pointDetailStore.pointAverageRating)}
            global={true}
            size={2}
          ></Rating>
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
        <div className="page__options">
          <div
            style={{
              backgroundImage: `url(${pointDetailStore.pointDetailDict.img})`,
            }}
            className={"page__img leftMargin32"}
          ></div>
        </div>
      </div>
      <Block>
        <div className={"page__map"}>
          <iframe
            title="tuba_address"
            src={pointDetailStore.pointDetailDict.map_url}
            width="100%"
            height="200px"
            style={{ border: "0px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Block>
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
          {pointDetailStore.pointDetailDict.reviews?.map((element, i) => (
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
