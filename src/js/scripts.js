// add scripts and js here
console.log('Hello World');





/* nav */
const toggleItems = document.getElementsByClassName('nav-toggle');

for (let toggleItem = 0; toggleItem < toggleItems.length; toggleItem++) {
    toggleItems[toggleItem].addEventListener('click', function () {
        document.getElementById('nav-menu').classList.toggle('active');
        toggleItems[toggleItem].classList.toggle('open');
    });
}

(function () {
    let currentYear = (new Date).getFullYear();
    let copyYear = document.querySelectorAll('.year');

    for (let i = 0; i < copyYear.length; i++) {
        copyYear[i].textContent = currentYear;
    }
}());

// smooth scrolling
var scroll = new SmoothScroll('a[href*="#"]', {

    // Selectors
    ignore: '[data-scroll-ignore]', // Selector for links to ignore (must be a valid CSS selector)

    topOnEmptyHash: true, // Scroll to the top of the page for links with href="#"

    // Speed & Duration
    speed: 1500, // Integer. Amount of time in milliseconds it should take to scroll 1000px

    // History
    updateURL: false, // Update the URL on scroll
    popstate: false, // Animate scrolling with the forward/backward browser buttons (requires updateURL to be true)
});



/* update current link color */

