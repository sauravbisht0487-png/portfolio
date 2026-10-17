(function () {
  var root = document.documentElement;
  var themeButton = document.getElementById("theme");
  var year = document.getElementById("yr");
  var tabs = Array.prototype.slice.call(
    document.querySelectorAll('[role="tab"]'),
  );

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeButton.textContent = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {}
  }

  var savedTheme = null;
  try {
    savedTheme = localStorage.getItem("theme");
  } catch (error) {}

  setTheme(
    savedTheme ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark"),
  );
  themeButton.addEventListener("click", function () {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
  year.textContent = new Date().getFullYear();

  function showTab(index) {
    tabs.forEach(function (tab, tabIndex) {
      var selected = index === tabIndex;
      tab.setAttribute("aria-selected", selected);
      tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden =
        !selected;
    });
    tabs[index].focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      showTab(index);
    });
    tab.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") showTab((index + 1) % tabs.length);
      if (event.key === "ArrowLeft")
        showTab((index - 1 + tabs.length) % tabs.length);
    });
  });
})();
