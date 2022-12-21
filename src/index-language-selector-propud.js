const chosenlanguage = sessionStorage.getItem("chosenlanguage");

(async function pullGeo() {
  const res = await fetch(
    "https://api.ipdata.co/?api-key=a9301d2e756fd26a8a81a0f3041a5863feaa213787072c5366a25140"
  );

  if (res.status !== 200) {
    console.log("error");
    window.location.href = "/en/startpage";
  }
  const data = await res.json();

  const url = window.location.hostname.split(".").pop().toLowerCase();
  const inviteUrl = window.location.href.split("?")[1];
  let inviteExists = false;

  if (inviteUrl) {
    if (inviteUrl.split("&")) {
      for (const item of inviteUrl.split("&")) {
        if (!item.search("edit")) {
          if (item.split("=")[1]) {
            inviteExists = true;
          }
        }
      }
    }
  }

  if (inviteExists === false) {
    // test domain url's first and then country code
    if (url === "it") {
      window.location.href = "/it/startpage";
    } else if (url === "se") {
      window.location.href = "/sv/startpage";
    } else if (url === "no") {
      window.location.href = "/en/startpage";
    } else if (url === "dk") {
      window.location.href = "/en/startpage";
    } else if (url === "fi") {
      window.location.href = "/en/startpage";
    } else if (url === "es") {
      window.location.href = "/en/startpage";
    } else if (url === "is") {
      window.location.href = "/en/startpage";
    } // no domains matched, check for country codes
    else if (data.country_code === "SE") {
      sessionStorage.setItem("chosenlanguage", data.country_code);
      window.location.href = "/sv/startpage";
    } else if (data.country_code === "IT") {
      sessionStorage.setItem("chosenlanguage", data.country_code);
      window.location.href = "/it/startpage";
    } else if (data.country_code === "FI") {
      sessionStorage.setItem("chosenlanguage", data.country_code);
      window.location.href = "/en/startpage";
    } else if (data.country_code === "NO") {
      sessionStorage.setItem("chosenlanguage", data.country_code);
      window.location.href = "/en/startpage";
    } else if (data.country_code === "DK") {
      sessionStorage.setItem("chosenlanguage", data.country_code);
      window.location.href = "/en/startpage";
    } else if (data.country_code === "ES") {
      sessionStorage.setItem("chosenlanguage", data.country_code);
      window.location.href = "/en/startpage";
    } else if (data.country_code === "IS") {
      sessionStorage.setItem("chosenlanguage", data.country_code);
      window.location.href = "/en/startpage";
    } else {
      // go to fallback url if nothing matches
      window.location.href = "/en/startpage";
    }
  }
})();
