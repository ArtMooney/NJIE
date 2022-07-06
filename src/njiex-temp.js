function addDynamicWorkout() {
  const dynamicList = document.querySelector("[dynamic-list-workouts]");
  const dynamicItem = document
    .querySelectorAll("[dynamicworkout]")[0]
    .cloneNode(true);

  dynamicItem.querySelector("input").value = "";
  dynamicItem.querySelector("input").id = `${
    dynamicItem.querySelector("[id]").id
  }-${document.querySelectorAll("[dynamicbrand]").length}`;
  dynamicList.appendChild(dynamicItem);

  // Start delete-eventlistener
  const newWorkout = document.querySelectorAll("[deleteworkout]");
  newWorkout[newWorkout.length - 1].addEventListener("click", function (event) {
    event.target.parentElement.remove();
  });
}

function addDynamicAllergie() {
  const dynamicList = document.querySelector("[dynamic-list-allergies]");
  const dynamicItem = document
    .querySelectorAll("[dynamicallergie]")[0]
    .cloneNode(true);

  dynamicItem.querySelector("input").value = "";
  dynamicItem.querySelector("input").id = `${
    dynamicItem.querySelector("[id]").id
  }-${document.querySelectorAll("[dynamicbrand]").length}`;
  dynamicList.appendChild(dynamicItem);

  // Start delete-eventlistener
  const newWorkout = document.querySelectorAll("[deleteallergie]");
  newWorkout[newWorkout.length - 1].addEventListener("click", function (event) {
    event.target.parentElement.remove();
  });
}

function addDynamicBrand() {
  const dynamicList = document.querySelector("[dynamic-list-brands]");
  const dynamicItem = document
    .querySelectorAll("[dynamicbrand]")[0]
    .cloneNode(true);

  dynamicItem.querySelector("input").value = "";
  dynamicItem.querySelector("input").id = `${
    dynamicItem.querySelector("[id]").id
  }-${document.querySelectorAll("[dynamicbrand]").length}`;
  dynamicList.appendChild(dynamicItem);

  // Start delete-eventlistener
  const newWorkout = document.querySelectorAll("[deletebrand]");
  newWorkout[newWorkout.length - 1].addEventListener("click", function (event) {
    event.target.parentElement.remove();
  });
}

// Remove text if no input values
document
  .querySelector("[dynamic-list-allergies]")
  .addEventListener("input", function (event) {
    const inputList = event.target.parentElement.parentElement.querySelectorAll(
      "input"
    );
    const paraList = event.target.parentElement.parentElement.parentElement.querySelectorAll(
      "p"
    );

    let isInput = false;
    for (const dyninput of inputList) {
      if (dyninput.value !== "") {
        if (paraList.length > 1) {
          isInput = true;
        }
      }
    }
    if (isInput) {
      paraList[1].style.display = "none";
    } else {
      paraList[1].style.display = "block";
    }
  });

document
  .querySelector("[dynamic-list-brands]")
  .addEventListener("input", function (event) {
    const inputList = event.target.parentElement.parentElement.querySelectorAll(
      "input"
    );
    const paraList = event.target.parentElement.parentElement.parentElement.querySelectorAll(
      "p"
    );

    let isInput = false;
    for (const dyninput of inputList) {
      if (dyninput.value !== "") {
        if (paraList.length > 1) {
          isInput = true;
        }
      }
    }
    if (isInput) {
      paraList[1].style.display = "none";
    } else {
      paraList[1].style.display = "block";
    }
  });

dragula([document.getElementById("dragndrop")]);

document
  .getElementById("dragndrop")
  .addEventListener("mousedown", preventScroll);

function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();

  return false;
}

//

function disableScroll() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

function enableScroll() {
  window.onscroll = function () {};
}

const summeringList = document.querySelector("[dynamic-list-summering]");

function summering() {
  const allInputs = document.querySelectorAll("input");
  let name;
  let age;
  let nrWorkouts;
  let workouts = [];
  let priorities = [];
  let products;
  let available;
  let allergies = [];
  let brands = [];

  // clear all input fields
  for (const input of summeringList.querySelectorAll("input")) {
    input.value = "";
  }

  for (const input of allInputs) {
    // collect text inputs
    if (input.type === "text") {
      if (input.name === "name" && input.value !== "") {
        name = input.value;
      }
      if (input.name === "type-of-workout" && input.value !== "") {
        workouts.push(input.value);
      }
      if (
        input.placeholder === "Prestation" ||
        input.placeholder === "Välmående" ||
        input.placeholder === "Nöje" ||
        input.placeholder === "Utseende"
      ) {
        priorities.push(input.placeholder);
      }
      if (input.name === "allergies" && input.value !== "") {
        allergies.push(input.value);
      }
      if (input.name === "brands" && input.value !== "") {
        brands.push(input.value);
      }
    }

    // collect radio inputs
    if (input.type === "radio") {
      if (input.name === "age" && input.checked === true) {
        age = input.value;
      }
      if (input.name === "workouts-per-week" && input.checked === true) {
        nrWorkouts = input.value;
      }
      if (input.name === "consumes-propud-njie" && input.checked === true) {
        products = input.value;
      }
      if (input.name === "available-1-hour" && input.checked === true) {
        available = input.value;
      }
    }
  }

  // write values to summary form
  for (const input of summeringList.querySelectorAll("input")) {
    if (input.name === "summering-name") input.value = name;
    if (input.name === "summering-age") input.value = age;
    if (input.name === "summering-nr-workouts") input.value = nrWorkouts;
    if (input.name === "summering-workouts") {
      for (const [index, item] of Object.entries(workouts)) {
        if (parseInt(index, 10) === workouts.length - 1) {
          input.value = input.value + item;
        } else {
          input.value = input.value + item + ", ";
        }
      }
    }
    if (input.name === "summering-priorities") {
      for (const [index, item] of Object.entries(priorities)) {
        if (parseInt(index, 10) === priorities.length - 1) {
          input.value = input.value + item;
        } else {
          input.value = input.value + item + ", ";
        }
      }
    }
    if (input.name === "summering-products") input.value = products;
    if (input.name === "summering-drive") input.value = available;
    if (input.name === "summering-allergies") {
      for (const [index, item] of Object.entries(allergies)) {
        if (parseInt(index, 10) === allergies.length - 1) {
          input.value = input.value + item;
        } else {
          input.value = input.value + item + ", ";
        }
      }
    }
    if (input.name === "summering-brands") {
      for (const [index, item] of Object.entries(brands)) {
        if (parseInt(index, 10) === brands.length - 1) {
          input.value = input.value + item;
        } else {
          input.value = input.value + item + ", ";
        }
      }
    }
  }

  document.getElementById("toAppContent11").click();
}

function toAppContent3() {
  const allInputs = document.querySelectorAll("input");
  const errorMessages = document.querySelectorAll(".missing-input-error");

  for (const input of allInputs) {
    if (input.type === "text") {
      if (input.name === "name") {
        if (input.value !== "") {
          document.getElementById("toAppContent3").click();
        } else {
          for (const error of errorMessages) {
            error.style.display = "block";
          }

          // wait for user input
          input.addEventListener(
            "input",
            function () {
              for (const error of errorMessages) {
                error.style.display = "none";
              }
            },
            { once: true }
          );
        }
      }
    }
  }
}

function toAppContent4() {
  const allInputs = document.querySelectorAll("input");
  const errorMessages = document.querySelectorAll(".missing-input-error");
  let statusFlag = false;

  for (const input of allInputs) {
    if (input.type === "radio") {
      if (input.name === "age") {
        if (input.checked === true) {
          statusFlag = true;
        }
      }
    }
  }

  if (statusFlag === true) {
    document.getElementById("toAppContent4").click();
  } else {
    for (const error of errorMessages) {
      error.style.display = "block";
    }
    // wait for user input
    document.querySelector("[dynamic-list-age]").addEventListener(
      "click",
      function () {
        for (const error of errorMessages) {
          error.style.display = "none";
        }
      },
      { once: true }
    );
  }
}

function toAppContent5() {
  const allInputs = document.querySelectorAll("input");
  const errorMessages = document.querySelectorAll(".missing-input-error");
  let statusFlag = false;

  for (const input of allInputs) {
    if (input.type === "radio") {
      if (input.name === "workouts-per-week") {
        if (input.checked === true) {
          statusFlag = true;
        }
      }
    }
  }

  if (statusFlag === true) {
    document.getElementById("toAppContent5").click();
  } else {
    for (const error of errorMessages) {
      error.style.display = "block";
    }
    // wait for user input
    document.querySelector("[dynamic-list-nrworkouts]").addEventListener(
      "click",
      function () {
        for (const error of errorMessages) {
          error.style.display = "none";
        }
      },
      { once: true }
    );
  }
}

function toAppContent6() {
  const allInputs = document.querySelectorAll("input");
  const errorMessages = document.querySelectorAll(".missing-input-error");

  for (const input of allInputs) {
    if (input.type === "text") {
      if (input.name === "type-of-workout") {
        if (input.value !== "") {
          document.getElementById("toAppContent6").click();
        } else {
          for (const error of errorMessages) {
            error.style.display = "block";
          }

          // wait for user input
          input.addEventListener(
            "input",
            function () {
              for (const error of errorMessages) {
                error.style.display = "none";
              }
            },
            { once: true }
          );
        }
      }
    }
  }
}

function toAppContent8() {
  const allInputs = document.querySelectorAll("input");
  const errorMessages = document.querySelectorAll(".missing-input-error");
  let statusFlag = false;

  for (const input of allInputs) {
    if (input.type === "radio") {
      if (input.name === "consumes-propud-njie") {
        if (input.checked === true) {
          statusFlag = true;
        }
      }
    }
  }

  if (statusFlag === true) {
    document.getElementById("toAppContent8").click();
  } else {
    for (const error of errorMessages) {
      error.style.display = "block";
    }
    // wait for user input
    document.querySelector("[dynamic-list-products]").addEventListener(
      "click",
      function () {
        for (const error of errorMessages) {
          error.style.display = "none";
        }
      },
      { once: true }
    );
  }
}

function toAppContent9() {
  const allInputs = document.querySelectorAll("input");
  const errorMessages = document.querySelectorAll(".missing-input-error");
  let statusFlag = false;

  for (const input of allInputs) {
    if (input.type === "radio") {
      if (input.name === "available-1-hour") {
        if (input.checked === true) {
          statusFlag = true;
        }
      }
    }
  }

  if (statusFlag === true) {
    document.getElementById("toAppContent9").click();
  } else {
    for (const error of errorMessages) {
      error.style.display = "block";
    }
    // wait for user input
    document.querySelector("[dynamic-list-available]").addEventListener(
      "click",
      function () {
        for (const error of errorMessages) {
          error.style.display = "none";
        }
      },
      { once: true }
    );
  }
}
