function selectLanguage(language) {
  let url = window.location.href;
  let newUrl = url.split("/");

  if (language === "sv") {
    sessionStorage.setItem("chosenlanguage", "SE");
    window.location.href = "https://" + newUrl[2] + "/" + language;
  } else if (language === "it") {
    sessionStorage.setItem("chosenlanguage", "IT");
    window.location.href = "https://" + newUrl[2] + "/" + language;
  } else if (language === "en") {
    sessionStorage.setItem("chosenlanguage", "EN");
    window.location.href = "https://" + newUrl[2];
  }
}
