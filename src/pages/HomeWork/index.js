import "./style.css";
import car from "../../assets/img/cake.png";

function Car() {
  return (
    <div className="car">
      <div className="car__main">
        <img src={car} height="100px"></img>
        <div className="car__info">
          <div className="car__title">Toyota Prius 2007</div>
          <div className="car__subinfo">
            <div className="car__price">
              <span className="car__param">Price:</span>
              <span className="price"> 30 000$</span>
            </div>
            <div className="car__mileage">
              <span className="car__param">Milleage:</span> 30 000KM
            </div>
          </div>
        </div>
      </div>
      <div className="car__contact">
        <div className="contact__phone">
          <span className="contact__param">Phone: </span>
          <a href="#">+7(700)10-16-110</a>
        </div>
        <div className="contact__email">
          <span className="contact__param">Email: </span>

          <a href="#">nansarik@mail.ru</a>
        </div>
      </div>
    </div>
  );
}

function HomeWork() {
  return (
    <>
      <div className="carList">
        <Car></Car>
        <Car></Car>
        <Car></Car>
      </div>
    </>
  );
}

export default HomeWork;
