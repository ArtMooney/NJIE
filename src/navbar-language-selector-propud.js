function selectLanguage(language) {
  let url = window.location.href;
  let newUrl = url.split("/");

  if (language === "en") {
    window.location.href = "https://" + newUrl[2];
  } else {
    window.location.href = "https://" + newUrl[2] + "/" + language;
  }
}

// function selectLanguage(language) {
//   let url = window.location.href;
//   let newUrl = url.split("/");
//   newUrl[3] = language;
//   url = newUrl[0];
//   newUrl.shift();

//   for (const part of newUrl) {
//     url = url + "/" + part;
//   }

//   window.location.href = url;
// }
