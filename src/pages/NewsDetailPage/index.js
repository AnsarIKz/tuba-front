import Footer from "../../widgets/Footer";
import PointHeader from "../../widgets/PointHeader";
import background from "../../assets/img/aboutus-bg.png";
import "./style.css";
import Block from "../../shared/Block";

function NewsDetailPage() {
  return (
    <div className="news-detail">
      <PointHeader notPoint={true}></PointHeader>
      <div>
        <Block>
          <div className="news-detail__img"></div>
        </Block>
        <Block>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </Block>

        <Block></Block>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default NewsDetailPage;
