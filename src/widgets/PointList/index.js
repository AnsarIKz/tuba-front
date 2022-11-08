import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Point from "../../entities/Point";
import pointListStore from "../../shared/store/pointList";
import "./style.css";

const PointList = observer(() => {
  useEffect(() => {
    if (pointListStore.state !== "done") {
      pointListStore.fetchPointList();
    }
  }, []);
  return (
    <div className="pointList">
      {pointListStore.pointList.map((item) => {
        return <Point key={item.id} {...item}></Point>;
      })}
    </div>
  );
});

export default PointList;
