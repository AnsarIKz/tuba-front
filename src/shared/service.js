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

function toDataUrl(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

function formatStrToNum(tel) {
  try {
    let formatted = `+${tel.substr(0, 1)}(${tel.substr(1, 3)}) ${tel.substr(
      4,
      3
    )}-${tel.substr(7, 2)}-${tel.substr(9, 2)}`;

    return formatted;
  } catch {
    return "ERROR404";
  }
}

function getSQL(category_param) {
  let dishes = document.querySelectorAll(".dish");
  let sql = "";
  dishes.forEach((currentValue, index, array) => {
    let name = currentValue
      .querySelector(".dish-title")
      .querySelector("span").innerHTML;
    let price = currentValue
      .querySelector(".dish-price__current")
      .querySelector("b")
      .innerText.replace(/\s+/g, "")
      .trim();

    let photo = "dishes/2022/10/08/chrome_ompxuX12c1.png";
    let description = currentValue
      .querySelector(".dish-description")
      ?.querySelector("p").innerHTML;
    if (!description) {
      description = "";
    }
    let category_id = category_param;
    let menu_cafe_id = 3;

    let insert_template = "";

    // TABLE SETTINGS
    let table_name = "api_dish";
    let fields_values = {
      name,
      price,
      description,
      photo,
      category_id,
      menu_cafe_id,
    };
    let fields_keys = Object.keys(fields_values).join();

    if (index === 0) {
      sql += `INSERT INTO ${table_name}(${fields_keys}) values ('${name}', ${price}, '${description}', '${photo}', ${category_id}, ${menu_cafe_id}),`;
    } else if (array.length - 1 === index) {
      insert_template = ` ('${name}', ${price}, '${description}', '${photo}', ${category_id}, ${menu_cafe_id});`;
    } else {
      insert_template = ` ('${name}', ${price}, '${description}', '${photo}', ${category_id}, ${menu_cafe_id}),`;
    }

    sql += insert_template;
  });
  console.log(sql);
}

export { getRateArray, validateEmail, toDataUrl, getSQL, formatStrToNum };
