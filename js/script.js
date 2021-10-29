function toggleMenu() {
    var m = document.getElementById("mainMenu");
    if (m.classList.contains("open")) {
        m.classList.remove("open");
    } else {
        m.classList.add("open");
    }
}

document.querySelectorAll('nav.menu a').forEach(item => {
    item.addEventListener('click', event => {
        anchorPages(item.getAttribute("href").replace("#", ""));
    })
})

function anchorPages(section) {
    document.querySelectorAll("section").forEach(element => {
        element.style.display = "none";
    })
    var a = document.getElementById(section);
    document.getElementById(section).style.display = "block";
}

function updateCopyRight() {
    var d = new Date();
    document.querySelector("#copyrightYear").innerHTML = d.getFullYear();
}

// Print out the calender
document.getElementById("startDate").value = specialDates["open date"];
document.getElementById("endDate").value = specialDates["close date"];

var calendar = document.getElementById("calendar");
printCalendar(specialDates["open date"], specialDates["close date"]);

updateCopyRight();

scheduleInit();

initializePrograms();

// Add in the peak days 
addPeakDays();
peakDaysInitialize();

// update the 
stats.static();
updateWorkingStats();

anchorPages("calendar");