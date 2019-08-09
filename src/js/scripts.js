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


/* -------------------- tabbed content info

-- only fires if tabsWrapper is found in page/view.
-- clears any accidental .active classes from the code block
-- starts with tab of choice (initialTab).
-- checks for correct number of tabs and content blocks
---- gives user feedback/code suggestion if tabs/content blocks don't match.
-- allows for unlimited tabs and/or content blocks (as desired)

*/

function contentTabs() {
	// set initial tab of choice
	const initialTab = 0;

	// -------------------------------------------------

	// declare vars
	let i;
	// check if container/wrapper exist
	const containerActive = document.getElementsByClassName('tabs-wrapper');
	// put all tab-items into a variable
	const tabButton = document.querySelectorAll('.tab-item');
	// put all item-contents into a variable
	const tabContent = document.querySelectorAll('.item-content');

	if (containerActive.length >= 1) {
		runTabs();
	}

	function runTabs() {
		/* maintenance mode, check amount of tab-items is same as item-content.
-- if isn't, suggest "warn" ways to ommit error messages. */
		function initChecks() {
			// clear all active classes
			clearActive();
			// check element numbers are correct
			if (tabButton.length < tabContent.length) {
				// if there are less buttons than content tabs
				console.warn(
					'You need to have the same amount of tab-item\'s as you have content-tab\'s'
				);
				console.group(
					'Paste this emmet shorthand inside the \'tabs-wrapper\' div and press enter/tab'
				);
				console.log('div.tab-item{tab-title}');
				console.groupEnd();
			} else if (tabContent.length < tabButton.length) {
				// if there are less content tabs than buttons
				console.warn(
					'You need to have the same amount of content-tab\'s as you have tab-items\'s'
				);
				console.group(
					'Paste this emmet shorthand inside the \'tabbed-content\' div and press enter/tab'
				);
				console.log(
					'div.item-content>div.hightlights*4>h4{some title}+p{some copy}'
				);
				console.groupEnd();
			} else {
				tabContent[initialTab].classList.add('active');
			}
		}
		initChecks();

		/* self calling function to clear all active classed from group of tabs
    -- if user has added active class for some wierd reason */
		function clearActive() {
			// cycle through all elements with class="tab-item" and remove "active".
			for (i = 0; i < tabContent.length; i++) {
				tabContent[i].classList.remove('active');
			}
		}

		// add event listeners to all elements with tab-item class and wait for click
		for (let tabIndex = 0; tabIndex < tabButton.length; tabIndex++) {
			tabButton[tabIndex].addEventListener('click', function() {
				// clear all active class's from the group of tabs.
				clearActive();
				// select item-content with the same index as the clicked tab-item and add an active class.
				tabContent[tabIndex].classList.toggle('active');
			});
		}
	}
}
contentTabs();



/* update current link color */

