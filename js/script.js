document.querySelectorAll('nav.menu a').forEach(item => {
    item.addEventListener('click', event => {
        //console.log(item.getAttribute("href"));
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

initializePrograms();


/*
// Add in Peak days
function addPeakDays() {
    for (i = 0; i < specialDates.peak.length; i++) {
        var s = new Date(specialDates.peak[i]);
        var sd = s.toDateString().replaceAll(' ', '');
        var el = document.getElementById(sd);
        el.appendChild(addPeakSpan());
    }
}

function addPeakSpan() {
    var span = document.createElement("span");
    span.classList.add("peak");
    span.innerHTML = "Peak";
    return span;
}

addPeakDays();
*/