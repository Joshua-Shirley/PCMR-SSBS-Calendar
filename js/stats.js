let stats = {
    totals: {
        days: 0,
        peak: 0,
        peakNovember: 0,
        fullTimeDays: 0,
        november: 0,
        december: 0,
        january: 0,
        febuary: 0,
        march: 0,
        april: 0
    },
    committed: {
        working: 0,
        peak: 0,
        peakNovember: 0,
        private: 0,
        november: 0,
        december: 0,
        january: 0,
        february: 0,
        march: 0,
        april: 0
    },
    static: function() {
        this.totals.days = dateDifference(specialDates["open date"], specialDates["close date"]);
        this.totals.peak = schedule.peak.length;
        this.totals.peakNovember = schedule.peak.filter(day => JSONtoDate(day).getMonth() == 10).length;
        this.totals.fullTimeDays = dateDifference(specialDates.Type[schedule.type].Requirements["Start Date"], specialDates["close date"]);
        this.totals.november = this.daysInMonth("2021-11-07");
        this.totals.december = this.daysInMonth("2021-12-01");
        this.totals.january = this.daysInMonth("2022-01-01");
        this.totals.febuary = this.daysInMonth("2022-02-01");
        this.totals.march = this.daysInMonth("2022-03-01");
        this.totals.april = this.daysInMonth("2022-04-01");
    },
    update: function() {
        this.committed.working = schedule.assigned.length;
        this.committed.peak = schedule.assigned.filter(day => schedule.peak.includes(day)).length;
        this.committed.peakNovember = schedule.peak.filter(day => (new Date(day).getMonth() == 10));
        this.committed.november = schedule.assigned.filter(day => (new Date(day).getMonth() == 10));
        this.committed.december = schedule.assigned.filter(day => (new Date(day).getMonth() == 11));
        this.committed.january = schedule.assigned.filter(day => (new Date(day).getMonth() == 0));
        this.committed.february = schedule.assigned.filter(day => (new Date(day).getMonth() == 1));
        this.committed.march = schedule.assigned.filter(day => (new Date(day).getMonth() == 2));
        this.committed.april = schedule.assigned.filter(day => (new Date(day).getMonth() == 3));
    },
    daysInMonth: function(yyyymmdd) {
        var d = JSONtoDate(yyyymmdd);
        d.setMonth(d.getMonth() + 1);
        d.setDate(0);
        return d.getDate();
    }
}


function updateWorkingStats() {

    // static data
    get("totalDays").innerHTML = stats.totals.days;
    get("totalPeak").innerHTML = stats.totals.peak;
    get("peakNovemberMax").innerHTML = stats.totals.peakNovember;
    get("fivedaymax").innerHTML = stats.totals.fullTimeDays;


    // Dynamic Data
    get("workingDays").innerHTML = calculateWorkingDays();
    get("workingDaysPeak").innerHTML = calculatePeakDays();


    get("requiredPeak").innerHTML = specialDates.Type[schedule.type].Requirements["Peak Days"];

    get("peakNovember").innerHTML = calculatePeakDaysNovember();

    get("requiredPeakNovember").innerHTML = specialDates.Type[schedule.type].Requirements["Peak Days November"];

    get("fivedaytotal").innerHTML = calculateFiveDayAverage();

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