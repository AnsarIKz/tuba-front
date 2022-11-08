import "./style.css";

import wave from "../../assets/img/wave.png";
import { useNavigate } from "react-router-dom";
import MainInfoPage from "../../shared/store/MainInfoPage";
import { formatStrToNum } from "../../shared/service";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="footer">
        <div className="footer__content fontWhiteColor">
          <div className="footer__navigation">
            <div className="footer__social bottomMargin12">
              <div className="montTitleBold fontPrimaryColor bottomMargin12">
                Наши страницы
              </div>
              <div className="social__sn">
                <a
                  rel="noreferrer"
                  className="pressable"
                  href="https://www.instagram.com/tuba.bogenbaibatira/"
                  target={"_blank"}
                >
                  <svg
                    width="40"
                    height="41"
                    viewBox="0 0 40 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="20"
                      cy="20.004"
                      rx="20"
                      ry="20.004"
                      fill="#E2E2E2"
                    />
                    <path
                      d="M25 9.02539H15C12.2386 9.02539 10 11.264 10 14.0254V24.0254C10 26.7868 12.2386 29.0254 15 29.0254H25C27.7614 29.0254 30 26.7868 30 24.0254V14.0254C30 11.264 27.7614 9.02539 25 9.02539Z"
                      stroke="#383638"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23.9997 18.3952C24.1231 19.2274 23.981 20.0774 23.5935 20.8242C23.206 21.571 22.5929 22.1766 21.8413 22.5549C21.0898 22.9331 20.2382 23.0648 19.4075 22.9311C18.5768 22.7975 17.8095 22.4053 17.2145 21.8104C16.6196 21.2154 16.2274 20.4481 16.0938 19.6174C15.9601 18.7868 16.0918 17.9351 16.47 17.1836C16.8483 16.4321 17.4539 15.8189 18.2007 15.4314C18.9475 15.0439 19.7975 14.9018 20.6297 15.0252C21.4786 15.1511 22.2646 15.5467 22.8714 16.1535C23.4782 16.7604 23.8738 17.5463 23.9997 18.3952Z"
                      stroke="#383638"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M25.5 13.5254H25.51"
                      stroke="#383638"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer__links">
              <div className="montTitle bottomMargin12">Навигация</div>
              <div
                className={"pressable bodyRegular"}
                onClick={() => navigate("/")}
              >
                Главная
              </div>
              <div className={"pressable"} onClick={() => navigate("/")}>
                События
              </div>
              <div className={"pressable"} onClick={() => navigate("/")}>
                Рестораны
              </div>
              <div
                className={"pressable"}
                onClick={() => navigate("/about-us")}
              >
                О компании
              </div>
            </div>
            <div className="footer__contacts">
              <div className="montTitle bottomMargin12  ">Контакты</div>
              <div>{formatStrToNum(MainInfoPage.mainInfoDict.number)}</div>
              <div> {MainInfoPage.mainInfoDict.email}</div>
            </div>
          </div>
          <div className="footer__img">
            <img alt="wave" className="footer__wave" src={wave}></img>
          </div>
        </div>
        <div className="captionRegular footer__copyright fontWhiteColor">
          © Too Tuba Group
        </div>
      </div>
    </>
  );
};

export default Footer;
