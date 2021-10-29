let stats = {
    totals: {
        days: 0,
        peak: 0,
        peakNovember: 0,
        fullTimeDays: 0
    },
    committed: {
        working: 0,
        peak: 0,
        peakNovember: 0,
        fulltime: 0,
        private: 0
    },
    static: function() {
        this.totals.days = dateDifference(specialDates["open date"], specialDates["close date"]);
        this.totals.peak = schedule.peak.length;
        this.totals.peakNovember = schedule.peak.filter(day => JSONtoDate(day).getMonth() == 10).length;
        this.totals.fullTimeDays = dateDifference(specialDates.Type[schedule.type].Requirements["Start Date"], specialDates["close date"]);
    },
    update: function() {
        this.committed.working = schedule.assigned.length;
        this.committed.peak = schedule.assigned.filter(day => schedule.peak.includes(day)).length;
        this.committed.peakNovember = schedule.assigned.filter(day => (schedule.peak.filter(day => (new Date(day).getMonth() == 10)).includes(day))).length;
        // Add Algorithm to get full time days
        this.committed.fulltime = schedule.assigned.filter(day => (dateDifference(specialDates.Type[schedule.type].Requirements["Start Date"], day) > 0)).length;
    },
    daysInMonth: function(yyyymmdd) {
        var d = JSONtoDate(yyyymmdd);
        d.setMonth(d.getMonth() + 1);
        d.setDate(0);
        return d.getDate();
    }

}

function validateStats() {
    // peak days
    var e = get("workingDaysPeak").parentElement.parentElement;
    if (stats.committed.peak >= specialDates.Type[schedule.type].Requirements["Peak Days"]) {
        e.classList.remove("invalid");
        e.classList.add("valid");
    } else {
        e.classList.remove("valid");
        e.classList.add("invalid");
    }
    // peak days november
    var f = get("requiredPeakNovember").parentElement.parentElement;
    if (stats.committed.peakNovember >= specialDates.Type[schedule.type].Requirements["Peak Days November"]) {
        f.classList.remove("invalid");
        f.classList.add("valid");
    } else {
        f.classList.remove("valid");
        f.classList.add("invalid");
    }
    // minimum days full time days
    var g = get("fulltimeMinimum").parentElement.parentElement;
    if (stats.committed.fulltime >= specialDates.Type[schedule.type].Requirements["Minimum Working Days"]) {
        g.classList.remove("invalid");
        g.classList.add("valid");
    } else {
        g.classList.remove("valid");
        g.classList.add("invalid");
    }
}

document.getElementById("showMoreStats").onclick = function() { toggleMoreStats(); return false };

function toggleMoreStats() {
    var lS = document.getElementById("showMoreStats");
    var mS = document.getElementById("moreStats");

    if (mS.style.display == "none") {
        mS.style.display = "block";
        lS.innerText = "Hide extra stats";
    } else {
        mS.style.display = "none";
        lS.innerText = "Show extra stats";
    }
}


function updateWorkingStats() {

    // static data
    get("totalDays").innerHTML = stats.totals.days;
    get("totalPeak").innerHTML = stats.totals.peak;
    get("peakNovemberMax").innerHTML = stats.totals.peakNovember;
    get("fivedaymax").innerHTML = stats.totals.fullTimeDays;
    get("requiredPeakNovember").innerHTML = specialDates.Type[schedule.type].Requirements["Peak Days November"];
    get("requiredPeak").innerHTML = specialDates.Type[schedule.type].Requirements["Peak Days"];

    // Dynamic Data
    get("workingDays").innerHTML = calculateWorkingDays();
    get("workingDaysPeak").innerHTML = calculatePeakDays();
    get("peakNovember").innerHTML = calculatePeakDaysNovember();
    get("fivedaytotal").innerHTML = calculateFiveDayAverage();
    get("fulltimeMinimum").innerHTML = calculateFiveDayWorking();

    stats.update();
    validateStats();
}

function get(id) {
    return document.getElementById(id);
}

function calculateWorkingDays() {
    var n = 0;
    n = schedule.assigned.length;
    return n;
}

function calculatePeakDays() {
    var n = 0;
    n = schedule.assigned.filter(day => schedule.peak.includes(day));
    return n.length;
}

function calculatePeakDaysNovember() {
    var n = 0;
    var p = schedule.peak.filter(day => dateDifference("2021-12-01", day) < 0);
    n = schedule.assigned.filter(day => p.includes(day));;
    return n.length;
}

function calculateMaxPeakDaysNovember() {
    var p = schedule.peak.filter(day => dateDifference("2021-12-01", day) < 0);
    return p.length;
}

function calculateFiveDayTotal() {
    var p = dateDifference(specialDates.Type[schedule.type].Requirements["Start Date"], specialDates["close date"]);
    return p;
}

function calculateFiveDayAverage() {
    var p = calculateFiveDayTotal();
    p /= 7;
    p *= 5;
    return p;
}

function calculateFiveDayWorking() {
    var p = schedule.assigned.filter(day => dateDifference(specialDates.Type[schedule.type].Requirements["Start Date"], day) > 0);
    return p.length;
}