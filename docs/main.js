if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}

const SHIELDS_ENDPOINT = "https://img.shields.io/endpoint?";

function main(ev) {
  if (
    document.location.protocol !== "https:" &&
    document.location.hostname.indexOf("heroku") !== -1
  ) {
    document.location.protocol = "https:";
  }
  if (!document.getElementById("appId").value) {
    document.getElementById("appId").value = document
      .getElementById("appId")
      .placeholder.split(" ")[0];
  }
  document.getElementById("baseUrl").addEventListener("change", updateUrls);
  document.getElementById("appId").addEventListener("change", updateUrls);
  document.getElementById("label").addEventListener("change", updateUrls);
  document.getElementById("message").addEventListener("change", updateUrls);
  document.getElementById("baseUrl").addEventListener("keyup", updateUrls);
  document.getElementById("appId").addEventListener("keyup", updateUrls);
  document.getElementById("label").addEventListener("keyup", updateUrls);
  document.getElementById("message").addEventListener("keyup", updateUrls);
  document.getElementById("badgeUrl").addEventListener("change", updateImages);
  document
    .getElementById("customizedBadgeUrl")
    .addEventListener("change", updateImages);

  updateUrls();
}

function composeJsonUrl() {
  const baseUrl = document.getElementById("baseUrl").value;
  let appId = document.getElementById("appId").value;
  const label = document.getElementById("label").value;
  const message = document.getElementById("message").value;

  if (appId.indexOf("?") !== -1) {
    appId = appId.split("id=")[1].split("&")[0];
  }

  const jsonUrl =
    baseUrl +
    "i=" +
    encodeURIComponent(appId) +
    "&l=" +
    encodeURIComponent(label).replace("%24", "$") +
    "&m=" +
    encodeURIComponent(message).replace("%24", "$");

  return jsonUrl;
}

var lastTimeout;
function updateUrls() {
  window.clearTimeout(lastTimeout);
  const jsonUrl = composeJsonUrl();

  const badgeUrl = SHIELDS_ENDPOINT + "url=" + encodeURIComponent(jsonUrl);

  const customizedBadgeUrl =
    SHIELDS_ENDPOINT +
    "color=green&logo=google-play&logoColor=green&url=" +
    encodeURIComponent(jsonUrl);

  document.getElementById("jsonUrl").value = jsonUrl;
  document.getElementById("badgeUrl").value = badgeUrl;
  document.getElementById("customizedBadgeUrl").value = customizedBadgeUrl;

  const updateDelayed = function () {
    updateImages();
    fetch(jsonUrl)
      .then((response) => response.text())
      .then(function (text) {
        document.getElementById("json").innerHTML = text;
      })
      .catch(function (e) {
        document.getElementById("json").innerHTML =
          "Could not load JSON:\n" + e;
      });
  };
  lastTimeout = window.setTimeout(updateDelayed, 1000);
}

function updateImages() {
  document.getElementById("badge").src =
    document.getElementById("badgeUrl").value;
  document.getElementById("customizedBadge").src =
    document.getElementById("customizedBadgeUrl").value;
}

const copyMap = {
  "Copy Badge URL": "$url",
  "Copy Markdown": "![Custom badge]($url)",
  "Copy reStructuredText": ".. image:: $url   :alt: Custom badge",
  "Copy AsciiDoc": "image:$url[Custom badge]",
  "Copy HTML": '<img alt="Custom badge" src="$url">',
};

function copyMenu(ev) {
  ev.stopPropagation();
  const div = document.getElementById("copymenu");
  const ul = div.querySelector("ul");
  const copy = function () {
    const self = this;
    const textarea = document.getElementById(div.dataset.textareaid);
    const url = textarea.value;
    const text = copyMap[self.textContent].replace(/\$url/g, url);
    textarea.value = text;
    textarea.focus();
    textarea.select();
    const r = document.execCommand("copy");
    if (r) {
      textarea.value = url;
      div.parentNode.parentNode.querySelector(".status").innerHTML =
        " - Copied!";
    } else {
      div.parentNode.parentNode.querySelector(".status").innerHTML =
        " - Clipboard not supported on this browser!";
    }
    window.setTimeout(
      () => (div.parentNode.parentNode.querySelector(".status").innerHTML = ""),
      2000
    );
  };
  if (!("textareaid" in div.dataset)) {
    // Init
    for (let key in copyMap) {
      const li = ul.appendChild(document.createElement("li"));
      li.appendChild(document.createTextNode(key));
      li.addEventListener("click", copy);
    }
  }
  div.dataset.textareaid = this.parentNode.querySelector("textarea").id;
  div.style.display = "block";
  this.parentNode.appendChild(div);
}
