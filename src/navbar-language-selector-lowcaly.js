function selectLanguage(language) {
  let url = window.location.href;
  let newUrl = url.split("/");

  if (language === "sv") {
    sessionStorage.setItem("chosenlanguage", "SE");
    window.location.href = "https://" + newUrl[2];
  } else if (language === "en") {
    sessionStorage.setItem("chosenlanguage", "EN");
    window.location.href = "https://" + newUrl[2] + "/" + language;
  }
}
