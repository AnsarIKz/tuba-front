import "./style.css";
import "../shared/fontStyles.css";
import "../shared/globalStyles.css";
import "../shared/marginStyles.css";

import scroller from "../shared/store/scroller";
import { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/MainPage";
import PointPage from "../pages/PointPage";
import MenuPage from "../pages/InteractiveMenuPage";
import AboutUsPage from "../pages/AboutUsPage";
import CartPage from "../pages/CartPage";
import PointWrapper from "../shared/Hoc/PointWrapper";
import AlertPopup from "../shared/Alert/AlertPopup";
import NewsDetailPage from "../pages/NewsDetailPage";
import { PageAdmin } from "../pages/AdministrationPage";
import MainInfoPage from "../shared/store/MainInfoPage";
import { useState } from "react";
import categoryList from "../shared/store/categoryList";
import pointListStore from "../shared/store/pointList";
import MenuAdmin from "../pages/AdministrationPage/MenuAdmin";

function App() {
  const onScroll = () => {
    scroller.setScroll(window.scrollY);
  };

  const [state, setState] = useState("pending");

  useEffect(() => {
    if (state === "pending") {
      categoryList.fetchCategoryList();
      MainInfoPage.fetchMainInfo(setState);
    }
    if (pointListStore.state !== "done") {
      pointListStore.fetchPointList();
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <BrowserRouter>
      <AlertPopup></AlertPopup>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route
          path="/point/:id"
          element={
            <PointWrapper>
              <PointPage />
            </PointWrapper>
          }
        ></Route>
        <Route
          path="/news/:id"
          element={<NewsDetailPage></NewsDetailPage>}
        ></Route>
        <Route
          path="/interactive-menu/:id"
          element={
            <PointWrapper>
              <MenuPage />
            </PointWrapper>
          }
        ></Route>

        <Route
          path="/cart/:id"
          element={
            <PointWrapper>
              <CartPage />
            </PointWrapper>
          }
        ></Route>
        <Route path="/about-us" element={<AboutUsPage></AboutUsPage>}></Route>
        <Route path="/admin/menu" element={<PageAdmin></PageAdmin>}></Route>
        <Route
          path="/admin/menu/:id"
          element={
            <PointWrapper>
              <MenuAdmin></MenuAdmin>
            </PointWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
