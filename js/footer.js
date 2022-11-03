function updateCopyRight() {
    var d = new Date();
    document.querySelector("#copyrightYear").innerHTML = d.getFullYear();
}

updateCopyRight();


const footerPlacement = {

    // Set Original Window InnerHeight
    triggerSensitivity: 30,
    windowInnerHeight: 0,
    newInnerHeight: 0,
    headerHeight: 100,
    mainHeight: 0,
    footerHeight: 135,
    mainMinHeight: 48,
    mainElement: "",

    init: function() {
        this.mainElement = document.querySelector("main");
        // Set the original height variable
        this.windowInnerHeight = window.innerHeight;
        this.newInnerHeight = window.innerHeight;
        // Set the header height variable
        this.headerHeight = document.querySelector("header").offsetHeight;
        // Set the main height variable
        this.mainHeight = this.mainElement.offsetHeight;
        // Set the footer height variable
        this.footerHeight = document.querySelector("footer").offsetHeight;

        // Set the initial placement of the footer
        document.onload = this.resetPlacement();

        // Set up Event Listener
        this.trigger();
    },

    trigger: function() {
        window.onresize = function() { footerPlacement.checkDiff() };
    },

    // function to trigger resize event
    checkDiff() {
        if (Math.abs(window.innerHeight - this.windowInnerHeight) > this.triggerSensitivity) {
            this.updateInnerHeight();
            this.resetPlacement();
            //console.log("Resized by ", this.triggerSensitivity);
        }
    },

    // Use this to increment changes by 20px (triggerSensitivity)
    updateInnerHeight: function() {
        this.newInnerHeight = window.innerHeight;

    },

    // Function to set the min height of the main element
    resetPlacement: function() {
        this.mainMinHeight = (this.newInnerHeight - this.mainHeight * 2 - this.headerHeight - this.footerHeight);
        this.mainElement.style.setProperty("min-height", this.mainMinHeight + "px");
    }
}

footerPlacement.init();