(async function pullGeo() {
  const domainUrl = "https://www.propud.com";
  const chosenlanguage = sessionStorage.getItem("chosenlanguage");

  const res = await fetch(
    "https://api.ipdata.co/?api-key=a9301d2e756fd26a8a81a0f3041a5863feaa213787072c5366a25140"
  );

  const data = await res.json();
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
    if (chosenlanguage === "SE") {
      window.location.href = domainUrl + "/sv";
    } else if (chosenlanguage === "IT") {
      window.location.href = domainUrl + "/it";
    } else if (chosenlanguage === "EN") {
      // stays on page
    } else if (data.country_code === "SE") {
      window.location.href = domainUrl + "/sv";
    } else if (data.country_code === "IT") {
      window.location.href = domainUrl + "/it";
    }
  }

  // wait until code has chosen path until showing DOM
  window.addEventListener("load", () => {
    document.getElementsByClassName("wait-for-load")[0].style.display = "block";
  });
})();
