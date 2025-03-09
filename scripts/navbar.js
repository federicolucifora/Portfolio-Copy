let itemsContainer;
let navbarItems = [];
let myName;
let closeButton;
let titleColor;
let navbar;
let m;

function preload() { }

function setup() {
    noCanvas();
    let url = window.location.href;
    vw = windowWidth / 100;
    vh = windowHeight / 100;
    navbar = select("#navbar");
    closeButton = select("#closeButton");
    closeButton.mouseClicked(hideMenu);
    itemsContainer = select("#navbarItemsContainer");
    itemsContainer.mouseClicked(showMenu);
    navbarItems = selectAll(".navbarItem");
    myName = select("#myName");
    m = match(url, "work/");
    print(m);
    if (m == null) {
        titleColor = select("#pageTitle").style("color");
    } else {
        navbar.style("border-color", "#FFC5B3")
    }



}

function draw() {
    if (document.documentElement.scrollTop > 0) {
        if (m == null) {
            navbar.style("border-color", titleColor);
        } else {navbar.style("border-color", "#FFC5B3") }
        
    } else {navbar.style("border-color", "#FFFCEE") };
}

function hideMenu() {
    for (let i = 0; i < navbarItems.length; i++) {
        navbarItems[i].addClass("collapsedNavbarItem");
    }
    myName.removeClass("collapsedNavbarItem");
    itemsContainer.style("margin-right", "2vw");
    closeButton.removeClass("visibleCloseButton");
}

function showMenu() {
    for (let i = 0; i < navbarItems.length; i++) {
        navbarItems[i].removeClass("collapsedNavbarItem");
    }
    myName.addClass("collapsedNavbarItem");
    itemsContainer.style("margin-right", "0vw");
    setTimeout(function () { closeButton.addClass("visibleCloseButton") }, 200);
}
