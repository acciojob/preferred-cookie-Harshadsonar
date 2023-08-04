document.addEventListener('DOMContentLoaded', function () {
  // Get the form element
  const preferencesForm = document.getElementById('preferencesForm');

  // Get the font size and font color input elements
  const fontSizeInput = document.getElementById('fontsize');
  const fontColorInput = document.getElementById('fontcolor');

  // Get the user preferences from cookies (if available) and set them as default values
  const fontSizeCookie = getCookie('fontsize');
  const fontColorCookie = getCookie('fontcolor');
  if (fontSizeCookie) {
    fontSizeInput.value = fontSizeCookie;
    document.documentElement.style.setProperty('--fontsize', `${fontSizeCookie}px`);
  }
  if (fontColorCookie) {
    fontColorInput.value = fontColorCookie;
    document.documentElement.style.setProperty('--fontcolor', fontColorCookie);
  }

  // Add a submit event listener to the form
  preferencesForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the selected font size and font color from the input elements
    const selectedFontSize = fontSizeInput.value;
    const selectedFontColor = fontColorInput.value;

    // Set the user preferences as CSS variables and store them as cookies
    document.documentElement.style.setProperty('--fontsize', `${selectedFontSize}px`);
    document.documentElement.style.setProperty('--fontcolor', selectedFontColor);
    setCookie('fontsize', selectedFontSize, 365); // Store for 1 year
    setCookie('fontcolor', selectedFontColor, 365);
  });

  // Function to set a cookie
  function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = encodeURIComponent(value) + (days ? '; expires=' + expirationDate.toUTCString() : '');
    document.cookie = name + '=' + cookieValue + '; path=/';
  }

  // Function to get the value of a cookie
  function getCookie(name) {
    const cookieArray = document.cookie.split(';');
    for (const cookie of cookieArray) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
});
