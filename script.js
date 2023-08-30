document.addEventListener("DOMContentLoaded", function () {
  // Retrieve saved preferences from cookies
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  // Apply saved preferences if available
  if (savedFontSize) {
    document.documentElement.style.setProperty("--fontsize", savedFontSize);
    document.getElementById("fontsize").value = parseInt(savedFontSize);
  }

  if (savedFontColor) {
    document.documentElement.style.setProperty("--fontcolor", savedFontColor);
    document.getElementById("fontcolor").value = savedFontColor;
  }

  // Handle form submission
  const form = document.getElementById("preferences-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fontSize = document.getElementById("fontsize").value + "px";
    const fontColor = document.getElementById("fontcolor").value;

    // Apply preferences
    document.documentElement.style.setProperty("--fontsize", fontSize);
    document.documentElement.style.setProperty("--fontcolor", fontColor);

    // Save preferences in cookies
    setCookie("fontsize", fontSize, 365);
    setCookie("fontcolor", fontColor, 365);
  });
});

// Cookie functions
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + value + ";expires=" + expires.toUTCString();
}

function getCookie(name) {
  const keyValue = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return keyValue ? keyValue[2] : null;
}