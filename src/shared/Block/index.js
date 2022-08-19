import { Fade } from "react-reveal";
import "./style.css";

function Block(props) {
  return (
    <Fade>
      <div className="block">{props.children}</div>
    </Fade>
  );
}

export default Block;
