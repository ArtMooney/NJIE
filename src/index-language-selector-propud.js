const chosenlanguage = sessionStorage.getItem("chosenlanguage");

(async function pullGeo() {
  const domainUrl = "https://www.propud.com";

  const res = await fetch(
    "https://api.ipdata.co/?api-key=a9301d2e756fd26a8a81a0f3041a5863feaa213787072c5366a25140"
  );

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
      window.location.href = domainUrl + "/it";
    } else if (url === "se") {
      window.location.href = domainUrl + "/sv";
    } // no domains matched, check for country codes
    else if (data.country_code === "SE") {
      sessionStorage.setItem("chosenlanguage", data.country_code);
      window.location.href = domainUrl + "/sv";
    } else if (data.country_code === "IT") {
      sessionStorage.setItem("chosenlanguage", data.country_code);
      window.location.href = domainUrl + "/it";
    }
  }

  // wait until code has chosen path until showing DOM
  window.addEventListener("load", () => {
    document.getElementsByClassName("wait-for-load")[0].style.display = "block";
  });
})();
