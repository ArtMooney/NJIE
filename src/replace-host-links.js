document.addEventListener("DOMContentLoaded", () => {
  for (const url of document.querySelectorAll("[replace-host]")) {
    const oldUrl = new URL(url.href);
    if (oldUrl.href.indexOf("#") === -1) {
      url.href = "https://" + window.location.hostname + oldUrl.pathname;
    } else {
      url.href = "#";
    }
  }
});
