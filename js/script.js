document.querySelectorAll('nav.menu a').forEach(item => {
    item.addEventListener('click', event => {
        //console.log(item.getAttribute("href"));
        anchorPages(item.getAttribute("href").replace("#", ""));
    })
})

function anchorPages(section) {
    document.querySelectorAll("section").forEach(element => {
        //console.log(element);
        element.style.display = "none";
    })
    var a = document.getElementById(section);
    document.getElementById(section).style.display = "block";
}

// Print out the calender
document.getElementById("startDate").value = specialDates["open date"];
document.getElementById("endDate").value = specialDates["close date"];


var calendar = document.getElementById("calendar");
printCalendar(specialDates["open date"], specialDates["close date"]);

scheduleInit();

initializePrograms();

// Add in the peak days 
addPeakDays();
peakDaysInitialize();

// update the 
updateWorkingStats();