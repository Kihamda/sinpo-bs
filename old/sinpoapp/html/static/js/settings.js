const showActiveTheme = (theme, focus = false) => {
  const btnToActive = document.querySelector(
    `[data-bs-theme-value="${theme}"]`
  );

  document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
    element.removeAttribute("checked");
  });

  btnToActive.setAttribute("checked", "");
};
window.addEventListener("DOMContentLoaded", () => {
  showActiveTheme(getPreferredTheme());
  document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const theme = toggle.getAttribute("data-bs-theme-value");
      setStoredTheme(theme);
      setTheme(theme);
      showActiveTheme(theme, true);
    });
  });
});
