const anchorHome = $("a[href='/']");
const anchorTutorial = $("a[href='/tutorial']");
anchorHome.focus();
animate($("body"), "load");

anchorHome.addEventListener("click", function (e) {
  e.preventDefault();
  animate($("body"));
});
anchorTutorial.addEventListener("click", function (e) {
  e.preventDefault();
  animate($("body"), "", "/tutorial");
});
