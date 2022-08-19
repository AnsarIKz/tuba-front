import "./style.css";
function PhoneButton({ theme }) {
  function handleClick() {
    window.location.replace(
      "whatsapp://send?phone=77770106014&text=Здраствуйте%20я%20хочу%20получить%20консультацию%20по%20поводу%20ASPM%21"
    );
  }
  return (
    <div className={`sButton pressable bg${theme}`} onClick={handleClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.8432 18.1568C14.5559 19.0188 16.5723 19.6404 18.9375 19.9063C19.5115 19.9709 20 19.511 20 18.9334V16.7808C20 16.3219 19.6877 15.9219 19.2425 15.8106L16.5493 15.1373C16.2085 15.0521 15.848 15.152 15.5996 15.4004L12.8432 18.1568ZM12.8432 18.1568C9.72749 16.5888 7.61705 14.225 6.24117 11.7588M6.24117 11.7588C4.93032 9.40926 4.28622 6.96674 4.07481 5.03084C4.01343 4.46884 4.46855 4 5.03389 4H7.1802C7.65688 4 8.06729 4.33646 8.16078 4.80388L8.89504 8.47521C8.96061 8.80307 8.85799 9.14201 8.62157 9.37843L6.24117 11.7588Z"
          stroke="white"
          stroke-width="2"
        />
      </svg>
    </div>
  );
}

export default PhoneButton;
