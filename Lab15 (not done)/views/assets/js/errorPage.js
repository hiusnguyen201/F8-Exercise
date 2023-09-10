const anchorHome = $("#back");
anchorHome.focus();
animate($("body"), "load");

anchorHome.addEventListener("click", function (e) {
  e.preventDefault();
  animate($("body"));
});
