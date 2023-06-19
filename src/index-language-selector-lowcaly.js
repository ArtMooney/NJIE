(async function pullGeo() {
  const domainUrl = "https://lowcaly.se";
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
      // stays on page
    } else if (chosenlanguage === "EN") {
      window.location.href = domainUrl + "/en";
    } else if (data.country_code !== "SE") {
      window.location.href = domainUrl + "/en";
    }
  }

  // wait until code has chosen path until showing DOM
  window.addEventListener("load", () => {
    document.getElementsByClassName("wait-for-load")[0].style.display = "block";
  });
})();

{
  /* <script src="https://cdn.jsdelivr.net/gh/ArtMooney/NJIE@v1.0.7/src/index-language-selector-lowcaly.min.js"></script> */
}
