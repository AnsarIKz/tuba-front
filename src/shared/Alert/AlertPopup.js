// AlertPopup.js
import { Alert } from "@mui/material";
import useAlert from "./useAlert";

const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text && type) {
    return (
      <Alert
        severity={type}
        sx={{
          position: "fixed",
          top: 30,
          left: 30,
          zIndex: 10,
          transition: "0.5s",
        }}
      >
        {text}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
