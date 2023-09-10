const h1 = $("h1");
animate($("body"), "load");

h1.addEventListener("click", function (e) {
  e.target.classList.toggle("link");
});

const anchorHome = $("a[href='/']>button");

anchorHome.addEventListener("click", function (e) {
  e.preventDefault();
  animate($("body"));
});
