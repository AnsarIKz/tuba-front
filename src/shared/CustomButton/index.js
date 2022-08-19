import "./style.css";

function CustomButton({ title, action, ...props }) {
  return (
    <input
      {...props}
      type={"button"}
      className={
        `customButton fontWhiteColor bodyRegular pressable ` + props.className
      }
      onClick={() => {
        action();
      }}
      value={title}
    />
  );
}

export default CustomButton;
