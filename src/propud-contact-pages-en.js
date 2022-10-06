// predefined variables
const selectorCountry = document.getElementById("country");
const selectorInquiry = document.getElementById("inquiry");
const consumercontact = document.getElementById("consumercontact-form");
const reclaims = document.getElementById("reclaims-form");
const contactCountry = document.getElementById("contact-country");
const contactInquiry = document.getElementById("contact-inquiry");
const reclaimCountry = document.getElementById("reclaim-country");
const reclaimInquiry = document.getElementById("reclaim-inquiry");

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

selectForm = () => {
  if (selectorCountry.value === "" || selectorInquiry.value === "") {
    reclaims.style.display = "none";
    consumercontact.style.display = "none";
  } else if (selectorInquiry.value === "Reclaims") {
    reclaims.style.display = "grid";
    consumercontact.style.display = "none";
  } else {
    consumercontact.style.display = "grid";
    reclaims.style.display = "none";
  }
};

// event listeners
selectorCountry.addEventListener("change", (event) => {
  contactCountry.value = selectorCountry.value;
  reclaimCountry.value = selectorCountry.value;
  selectForm();
});

selectorInquiry.addEventListener("change", (event) => {
  contactInquiry.value = selectorInquiry.value;
  reclaimInquiry.value = selectorInquiry.value;
  selectForm();
});

document
  .getElementById("send-reclaims-button")
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
    for (const item of reclaims.querySelectorAll("input")) {
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
    for (const item of reclaims.querySelectorAll("textarea")) {
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

      fetch("https://api.ngine.se/webhook/propud-reclaims", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          selectorCountry.disabled = true;
          selectorInquiry.disabled = true;
          document.getElementById("send-reclaims-button").value = "Vänta...";

          setTimeout(() => {
            // document.getElementById("thank-you").click(); // redirect
            document.getElementById("success-message").style.display = "block";
            document.getElementById("reclaims-form-normal").style.display =
              "none";
          }, 1000);

          setTimeout(() => {
            location.reload();
          }, 4000);
        })
        .catch((error) => {
          console.log("error", error);
          document.getElementById("error-message").style.display = "block";
          reclaims.addEventListener(
            "click",
            (event) => {
              document.getElementById("error-message").style.display = "none";
            },
            { once: true }
          );
        });
    }
  });

document
  .getElementById("consumercontact-send")
  .addEventListener("click", (event) => {
    if (isInputsEmpty(consumercontact)) {
      selectorCountry.disabled = true;
      selectorInquiry.disabled = true;
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  });
