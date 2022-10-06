// predefined variables
const selector = document.getElementById("choose-form");
const info = document.getElementById("info-form");
const ambassador = document.getElementById("ambassador-form");
const sponsor = document.getElementById("sponsor-form");
const reklamationer = document.getElementById("reklamationer-form");

// functions
isInputsEmpty = (form) => {
  let formComplete = true;

  for (const item of form.querySelectorAll("input")) {
    if (item.required === true && item.value === "") {
      // if input is required it must not be empty
      formComplete = false;
    }
  }

  for (const item of form.querySelectorAll("textarea")) {
    if (item.required === true && item.value === "") {
      // if input is required it must not be empty
      formComplete = false;
    }
  }

  return formComplete;
};

// event listeners
document.getElementById("choose-form").addEventListener("change", (event) => {
  selector.value === "info"
    ? (info.style.display = "grid")
    : (info.style.display = "none");
  selector.value === "ambassadör"
    ? (ambassador.style.display = "grid")
    : (ambassador.style.display = "none");
  selector.value === "sponsring"
    ? (sponsor.style.display = "grid")
    : (sponsor.style.display = "none");
  selector.value === "reklamationer"
    ? (reklamationer.style.display = "grid")
    : (reklamationer.style.display = "none");
});

document
  .getElementById("send-reklamationer-button")
  .addEventListener("click", (event) => {
    let formdata = new FormData();
    let formComplete = true;

    Webflow.push(function () {
      // disable webflow form submit
      $("form").submit(function () {
        return false;
      });
    });

    // append all inputs except button
    for (const item of reklamationer.querySelectorAll("input")) {
      if (item.required === true && item.value === "") {
        // if input is required it must not be empty
        formComplete = false;
      }

      if (item.type !== "submit") {
        if (item.type === "file") {
          if (item.files[0]) {
            formdata.append("file", item.files[0], item.files[0].name);
          }
        } else {
          formdata.append(item.name, item.value);
        }
      }
    }

    // append all textareas
    for (const item of reklamationer.querySelectorAll("textarea")) {
      if (item.required === true && item.value === "") {
        // if input is required it must not be empty
        formComplete = false;
      }

      formdata.append(item.name, item.value);
    }

    if (formComplete) {
      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch("https://api.ngine.se/webhook/propud-reklamationer", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          selector.disabled = true;
          document.getElementById("send-reklamationer-button").value =
            "Vänta...";

          setTimeout(() => {
            // document.getElementById("thank-you").click(); // redirect
            document.getElementById("success-message").style.display = "block";
            document.getElementById("reklamationer-form").style.display =
              "none";
          }, 1000);

          setTimeout(() => {
            location.reload();
          }, 4000);
        })
        .catch((error) => {
          console.log("error", error);
          document.getElementById("error-message").style.display = "block";
          reklamationer.addEventListener(
            "click",
            (event) => {
              document.getElementById("error-message").style.display = "none";
            },
            { once: true }
          );
        });
    }
  });

document.getElementById("info-send").addEventListener("click", (event) => {
  if (isInputsEmpty(info)) {
    selector.disabled = true;
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
});

document
  .getElementById("ambassador-send")
  .addEventListener("click", (event) => {
    if (isInputsEmpty(ambassador)) {
      selector.disabled = true;
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  });

document.getElementById("sponsor-send").addEventListener("click", (event) => {
  if (isInputsEmpty(sponsor)) {
    selector.disabled = true;
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
});
