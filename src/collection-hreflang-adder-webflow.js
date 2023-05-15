const inputValue =
  "sv: coffee-shakes-sv/coffee-shake-frappe-latte, en: coffee-shake-frappe-latte, it: coffee-shake-frappe-latte";

if (inputValue) {
  let langVersions = [];
  const urlParts = window.location.href.split("/").slice(2);
  let removePart = urlParts.pop();
  let collectionSlug = urlParts.pop().split("-");
  removePart = collectionSlug.pop().split("-").pop();
  collectionSlug = collectionSlug.join("-") + "-";
  const dynamicHref = "https://" + urlParts[0] + "/" + collectionSlug;
  const canonicalHref = "https://" + urlParts[0] + "/";

  for (const language of inputValue.split(",")) {
    const langPair = language.split(":");
    langVersions.push({
      [langPair[0].replace(/\s/g, "")]: langPair[1].replace(/\s/g, ""),
    });
  }

  for (const [index, item] of Object.entries(langVersions)) {
    const lang = Object.keys(item);
    const langUrl = Object.values(item);

    let link = document.createElement("link");

    if (index === "0") {
      link.setAttribute("rel", "”canonical”");
      link.setAttribute("href", canonicalHref + langUrl);
    } else {
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", lang);
      link.setAttribute(
        "href",
        dynamicHref +
          (lang[0] === "en" ? "eng" : Object.keys(item)) +
          "/" +
          langUrl
      );
    }

    document.head.appendChild(link);
  }
}
