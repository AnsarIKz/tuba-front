import Footer from "../../widgets/Footer";
import PointHeader from "../../widgets/PointHeader";
import "./style.css";
import Block from "../../shared/Block";
import { useEffect, useState } from "react";
import newsDetail from "../../shared/store/newsDetail";
import { useNavigate, useParams } from "react-router-dom";

function NewsDetailPage() {
  const { id } = useParams();
  const [state, setState] = useState("pending");
  useEffect(() => {
    if (state === "pending") {
      newsDetail.fetchNewsDetail(id, setState);
    } else {
    }
  }, []);

  if (state === "pending") return <></>;
  return (
    <div className="news-detail">
      <PointHeader notPoint={true}></PointHeader>
      <div>
        <Block>
          <div className="news-detail__img"></div>
        </Block>
        <Block>
          <div className="montTitle topMargin48">
            {newsDetail.newsDetailDict.name}
          </div>
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
