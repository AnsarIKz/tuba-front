import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import menuListStore from "../store/menuListStore";
import pointDetailStore from "../store/pointDetail";

function PointWrapper({ children }) {
  const { id } = useParams();
  const [state, setState] = useState("pending");
  useEffect(() => {
    if (
      pointDetailStore.state !== "done" ||
      pointDetailStore.pointDetailDict.id !== id
    ) {
      pointDetailStore.fetchPointDetail(id);
    }

    if (state !== "done") {
      menuListStore.fetchMenuList({ id: id, setState: setState });
    }
  }, []);

  return <>{state === "done" && children}</>;
}

export default PointWrapper;
