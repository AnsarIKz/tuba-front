function getRateArray(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(1);
  }
  for (let j = 0; j < 5 - num; j++) {
    arr.push(0);
  }
  return arr;
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export { getRateArray, validateEmail };
