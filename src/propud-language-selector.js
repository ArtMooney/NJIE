if (window.location.href.split("?")[1] !== undefined) {
  // if (window.location.href.split("?")[1].split("=")[0] === "edit") {}
} else {
  const chosenlanguage = sessionStorage.getItem("chosenlanguage");

  (async function pullGeo() {
    const res = await fetch(
      "https://api.ipdata.co/?api-key=a9301d2e756fd26a8a81a0f3041a5863feaa213787072c5366a25140"
    );

    if (res.status !== 200) console.log("error");
    const data = await res.json();
    const url = window.location.hostname.split(".").pop().toLowerCase();

    // test domain url's first and then country code
    if (url === "it") {
      window.location.href = "/it/startpage";
    } else if (data.country_code === "SE") {
      // coming from SE?
      if (chosenlanguage !== "SE") {
        sessionStorage.setItem("chosenlanguage", data.country_code);
        // window.location.href = "/sv/hem";
      }
    } else if (data.country_code === "IT") {
      // coming from IT?
      if (chosenlanguage !== "IT") {
        sessionStorage.setItem("chosenlanguage", data.country_code);
        // window.location.href = "/it/startpage";
      }
    }
  })();
}
