import "./style.css";

function Rating({ rate = [1, 1, 1, 0, 0], global, size = 1 }) {
  const rating = rate.map((elem, i) => (
    <svg
      key={i}
      width={size * 10}
      height={size * 10}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.5"
        d="M4.436 1.01809C4.63284 0.619323 5.20147 0.619324 5.3983 1.01809L6.40438 3.05629C6.48247 3.2145 6.63335 3.32421 6.80792 3.34972L9.05865 3.6787C9.49859 3.743 9.67393 4.28378 9.35543 4.59401L7.72766 6.17945C7.6011 6.30272 7.54333 6.4804 7.57319 6.65453L7.95724 8.8937C8.03242 9.33206 7.57228 9.66633 7.17864 9.45931L5.1669 8.40136C5.01055 8.31914 4.82375 8.31914 4.6674 8.40136L2.65566 9.45931C2.26202 9.66633 1.80188 9.33206 1.87707 8.8937L2.26111 6.65453C2.29098 6.4804 2.23321 6.30272 2.10664 6.17945L0.478877 4.59401C0.160372 4.28378 0.335715 3.743 0.775658 3.6787L3.02638 3.34972C3.20096 3.32421 3.35183 3.2145 3.42993 3.05629L4.436 1.01809Z"
        fill={elem ? "#FFD600" : "#C7C8D2"}
      />
    </svg>
  ));

  return (
    <div className="rating-feature">
      {rating}
      {/* {global && (
        <span className="captionBold fontCaptionColor leftMargin8">
          6 отзывов
        </span>
      )} */}
    </div>
  );
}

export default Rating;
