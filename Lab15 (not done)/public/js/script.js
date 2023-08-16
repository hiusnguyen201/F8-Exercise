var isFirstTime = localStorage.getItem('firstTime');

if (isFirstTime === null) {
    localStorage.setItem('firstTime', 'true');
    window.location.href = '/welcome';
}

document.getElementById('move-to-home').addEventListener("click", () => {
    console.log(`hello`);
    localStorage.setItem('firstTime', 'false');
    window.location.href = '/';
});