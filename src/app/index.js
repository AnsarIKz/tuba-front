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

function App() {
  const onScroll = () => {
    scroller.setScroll(window.scrollY);
  };

  useEffect(() => {
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
