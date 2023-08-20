// Banner List
document.addEventListener("DOMContentLoaded", () => {
    const bannerList = document.querySelectorAll(".banner-item");
    let activeIndex = 0;
    let autoCycleInterval;
    let buttonDisabled = false;

    function updateActiveItem() {
        bannerList.forEach((item, index) => {
            if (index === activeIndex) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    updateActiveItem();

    const prevButton = document.querySelector(".control-prev");
    const nextButton = document.querySelector(".control-next");

    function disableButtons() {
        buttonDisabled = true;
        setTimeout(() => {
            buttonDisabled = false;
        }, 800);
    }

    prevButton.addEventListener("click", () => {
        if (buttonDisabled) return;
        clearInterval(autoCycleInterval);
        activeIndex = (activeIndex - 1 + bannerList.length) % bannerList.length;
        updateActiveItem();
        startAutoCycle(); 
        disableButtons();
    });

    nextButton.addEventListener("click", () => {
        if (buttonDisabled) return;
        clearInterval(autoCycleInterval); 
        activeIndex = (activeIndex + 1) % bannerList.length;
        updateActiveItem();
        startAutoCycle();
        disableButtons(); 
    });

    function startAutoCycle() {
        autoCycleInterval = setInterval(() => {
            activeIndex = (activeIndex + 1) % bannerList.length;
            updateActiveItem();
        }, 3000);
    }

    startAutoCycle();
});

// Client List
document.addEventListener("DOMContentLoaded", () => {
    const clientList = document.querySelectorAll(".client-item");
    const indicators = document.querySelectorAll(".indicator-item");
    let activeIndex = 0;
    let autoCycleInterval;
    let buttonDisabled = false;

    function updateActiveItem() {
        clientList.forEach((item, index) => {
            if (index === activeIndex) {
                item.classList.add("active");
                indicators[index].classList.add("active");
            } else {
                item.classList.remove("active");
                indicators[index].classList.remove("active");
            }
        });
    }

    function handleIndicatorClick(newIndex) {
        if (buttonDisabled || newIndex === activeIndex) return;
        clearInterval(autoCycleInterval);
        activeIndex = newIndex;
        updateActiveItem();
        startAutoCycle(); 
        disableButtons();
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            handleIndicatorClick(index);
        });
    });

    function disableButtons() {
        buttonDisabled = true;
        setTimeout(() => {
            buttonDisabled = false;
        }, 800);
    }

    function startAutoCycle() {
        autoCycleInterval = setInterval(() => {
            activeIndex = (activeIndex + 1) % clientList.length;
            updateActiveItem();
        }, 3000);
    }

    updateActiveItem();
    startAutoCycle();
});
