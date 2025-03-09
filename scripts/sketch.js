let pImageDiv;
let me1;
let me2;
let scrollPoint = 0;
let scrollBound1;
let scrollBound2;
let scrollBound3;
let pImagePositions;
let xBounces = [];
let yBounces = [];
let transitionDuration = [];
let noRepeat = false;
let counter = 0;
let hasScrolled = false;

let profileMargin;
let currentPos = [];
let dirIncrease = [];

let navbar;
let itemsContainer;
let navbarItems = [];
let myName;
let closeButton;

let vw;
let vh;

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

function preload() { }

function setup() {
    noCanvas();
    vw = windowWidth / 100;
    vh = windowHeight / 100;

    me1 = select("#me1");
    me2 = select("#me2");
    navbar = select("#navbar");
    closeButton = select("#closeButton");
    closeButton.mouseClicked(hideMenu);
    itemsContainer = select("#navbarItemsContainer");
    itemsContainer.mouseClicked(showMenu);
    navbarItems = selectAll(".navbarItem");
    myName = select("#myName");

    setProfileImage();
    calculateBallBounces();

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (windowHeight < windowWidth) {
            pImageDiv.addClass("imageSize1");
        } else {
            pImageDiv.removeClass("imageSize1");
        }

    } else {
        // false for not mobile device
        pImageDiv.position(xBounces[0], yBounces[0]);
    }

    scrollBound1 = document.getElementById("presentation").getBoundingClientRect().top + window.pageYOffset - windowHeight;
    scrollBound2 = document.getElementById("skills").getBoundingClientRect().top + window.pageYOffset - windowHeight / 3 * 2;
    scrollBound3 = document.getElementById("workContainer").getBoundingClientRect().top + window.pageYOffset - windowHeight / 2;
}

function draw() {

    if (document.documentElement.scrollTop > 0) {
        navbar.style("border-color", "#FED9B7");
    } else { navbar.style("border-color", "#FFFCEE") };

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
    } else {
        // false for not mobile device
        moveProfileImage();
    }

    scrollPoint = window.scrollY;
}

//------------------------------------------------------------------------------------------------------------------------------------

function setProfileImage() {
    calculatePImagePositions();
    profileMargin = [-0.2 * vw, windowWidth - 14.8 * vw, 3.8 * vw, windowHeight - 14.8 * vw];

    pImageDiv = select("#pImageDiv");
}

function calculatePImagePositions() {
    pImagePositions = [10 * vw, 92 * vh, 72 * vw, 191 * vh];
}

function calculateBallBounces() {
    let randomV = p5.Vector.random2D();
    randomV.mult(2);
    let randomDir = randomV.array();
    currentPos = [random(5 * vw, windowWidth - 22 * vw), random(5 * vw, windowHeight - 22 * vw)];
    dirIncrease = [randomDir[0], randomDir[1]];

    let counter = 0;
    for (let i = 0; i < 1000000; i++) {
        currentPos[0] += dirIncrease[0];
        currentPos[1] += dirIncrease[1];

        if ((dirIncrease[0] > 0 && currentPos[0] + dirIncrease[0] >= profileMargin[1]) || (dirIncrease[0] < 0 && currentPos[0] - dirIncrease[0] <= profileMargin[0])) {
            dirIncrease[0] *= -1;
            xBounces[counter] = currentPos[0];
            yBounces[counter] = currentPos[1];
            counter++;
        }

        if ((dirIncrease[1] > 0 && currentPos[1] + dirIncrease[1] >= profileMargin[3]) || (dirIncrease[1] < 0 && currentPos[1] - dirIncrease[1] <= profileMargin[2])) {
            dirIncrease[1] *= -1;
            yBounces[counter] = currentPos[1];
            xBounces[counter] = currentPos[0];
            counter++;
        }
    }


    for (let i = 0; i < xBounces.length - 1; i++) {
        let distance = dist(xBounces[i], yBounces[i], xBounces[i + 1], yBounces[i + 1]);
        transitionDuration[i] = map(distance, 0, dist(profileMargin[0], profileMargin[2], profileMargin[1], profileMargin[3]), 0, 5);
    }


}



function imageBounce() {

    pImageDiv.style("transition-duration", transitionDuration[counter] + "s");
    pImageDiv.position(xBounces[counter + 1], yBounces[counter + 1]);

    setTimeout(function () {
        if (scrollPoint == 0) {
            counter++;
            imageBounce()
        }

    }, transitionDuration[counter] * 1000)
}

function moveProfileImage() {
    if (windowHeight > windowWidth) {
        pImageDiv.position(5 * vw, 28.5 * vh);
    } else if (scrollPoint == 0) {
        if (noRepeat == false) {
            me2.addClass("imageTransparent");
            me1.removeClass("imageTransparent");
            pImageDiv.removeClass("imageSize1");
            if (hasScrolled == false) {
                imageBounce();
            } else {
                pImageDiv.position(50 * vw, 50 * vh);
                setTimeout(imageBounce, 500);
            }
            noRepeat = true;
        }

    } else if (scrollPoint > scrollBound1 && scrollPoint < scrollBound2) {
        me1.addClass("imageTransparent");
        me2.removeClass("imageTransparent");
        noRepeat = false;
        hasScrolled = true;
        pImageDiv.style("transition", "0.5s linear");
        pImageDiv.position(pImagePositions[0], pImagePositions[1]);
        pImageDiv.addClass("imageSize1");
        pImageDiv.removeClass("imageSize2");

    } else if (scrollPoint >= scrollBound2 && scrollPoint < scrollBound3) {
        pImageDiv.position(pImagePositions[2], pImagePositions[3]);
        pImageDiv.addClass("imageSize2");

    }

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

function windowResized() {
    vw = windowWidth / 100;
    vh = windowHeight / 100;
    counter = 1;
    xBounces = [];
    yBounces = [];
    transitionDuration = [];
    calculatePImagePositions();
    calculateBallBounces();

}