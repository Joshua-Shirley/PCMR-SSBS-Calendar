function updateWorkingStats() {
    get("workingDays").innerHTML = calculateWorkingDays();
    get("totalDays").innerHTML = dateDifference(specialDates["open date"], specialDates["close date"]);
    get("workingDaysPeak").innerHTML = calculatePeakDays();
    get("requiredPeak").innerHTML = specialDates.Type[schedule.type].Requirements["Peak Days"];
    get("totalPeak").innerHTML = schedule.peak.length;
    get("peakNovember").innerHTML = calculatePeakDaysNovember();
    get("peakNovemberMax").innerHTML = calculateMaxPeakDaysNovember();
    get("requiredPeakNovember").innerHTML = specialDates.Type[schedule.type].Requirements["Peak Days November"];

    get("fivedaytotal").innerHTML = calculateFiveDayAverage();
    get("fivedaymax").innerHTML = calculateFiveDayTotal();
    get("fivedayaverage").innerHTML = calculateFiveDayWorking();
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