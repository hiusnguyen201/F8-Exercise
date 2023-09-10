const pages = ["startPage", "tutorialPage", "todoPage", "errorPage"];
let currentPage = "startPage";

/**
 * Initializes the page by importing the corresponding JavaScript file
 */
window.addEventListener("DOMContentLoaded", () => {
  for (let page of pages) {
    if ($(`#${page}`) !== null) {
      currentPage = page;
      break;
    }
  }
});
window.onload = async () => {
  import(`./js/${currentPage}.js`);
};
