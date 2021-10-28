var isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

/* Functions to normalize DATES 'YYYY-MM-DD' */
/* START */

function JSONDateFormat(date) {
    var D = new Date(date);
    var y = D.getFullYear().toString();
    var m = ('0' + (D.getMonth() + 1).toString()).slice(-2);
    var d = ('0' + D.getDate().toString()).slice(-2);
    //console.log(y + '-' + m + '-' + d);
    return y + '-' + m + '-' + d;
}

function JSONtoDate(dateStr) {
    var a = dateStr.split('-');
    var d = new Date(a[0], a[1] - 1, a[2]);
    return d;
}

function toDate(dateStr) {
    var a = dateStr.split('-');
    var d = new Date(a[0], a[1], a[2]);
    return d;
}

function DateToID(date) {
    var d = new Date(date);
    var r = d.toDateString().replaceAll(' ', '');
    return r;
}

/* END */

function dateDifference(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = (d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function monthName(date) {
    var d = new Date(date);
    var m = d.getMonth();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[m];
}

function weekdayName(day) {
    var weekday = new Array();
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    // Create span
    var span = document.createElement("span");
    span.innerHTML = weekday[day][0];

    // abbreviations
    var abbr = document.createElement("span");
    abbr.classList.add("abbreviation");
    abbr.innerHTML = weekday[day].substring(1);

    span.appendChild(abbr);
    return span;
}

function printCalendar(startDate, endDate) {
    var eDate = new Date(endDate);
    var mDate = new Date(startDate);
    while (mDate < eDate) {
        var s = new Date(mDate.getFullYear(), mDate.getMonth(), 1);
        calendar.appendChild(newMonth(s));
        mDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
    }
}

function newMonth(date) {
    var month = document.createElement("div");
    month.classList.add("month");
    // month name header
    var header = document.createElement("h3");
    header.innerHTML = monthName(date);
    month.appendChild(header);
    // weekday labels
    month.appendChild(labelWeek());
    // Add in the calendar days    
    calendarDays(date, month);
    return month;
}

function labelWeek() {
    var week = document.createElement("div");
    week.classList.add("week");
    week.classList.add("labels");
    for (var i = 0; i < 7; i++) {
        week.appendChild(dayLabels(i));
    }
    return week;
}

function dayLabels(day) {
    var label = document.createElement("div");
    label.classList.add("day");
    label.classList.add("weekday");
    label.appendChild(weekdayName(day));
    return label;
}

function calendarDays(date, obj) {
    var date = new Date(date);
    var weekNumber = 0;
    var currentMonth = date.getMonth();

    while (weekNumber < 6) {

        var week = document.createElement("div");
        week.classList.add("week");

        for (var i = 0; i < 7; i++) {
            if (weekNumber == 0) {
                // Add some blank days to the calendar   
                if (date.getDay() != i) {
                    week.appendChild(newDay());
                } else {
                    week.appendChild(newDay(date));
                    // increment the date.    
                    date.setDate(date.getDate() + 1);
                }
            } else {
                if (date.getMonth() != currentMonth) {
                    week.appendChild(newDay());
                } else {
                    week.appendChild(newDay(date));
                }
                // increment the date.    
                date.setDate(date.getDate() + 1);
            }
        }
        obj.appendChild(week);
        if (date.getMonth() != currentMonth) {
            weekNumber = 10;
        }
        weekNumber++;
    }
}

function newDay(date) {
    var day = document.createElement("div");
    day.classList.add("day");
    if (date === undefined) {
        day.classList.add("inactive");
    } else {
        var d = new Date(date);
        day.id = d.toDateString().replaceAll(' ', '');
        day.appendChild(dateLabel(date));
        day.setAttribute("datetime", date.toDateString());
        // add in the resort closed class
        if (dateDifference(d, specialDates["open date"]) > 0) {
            day.classList.add("closed");
        }
        if (dateDifference(d, specialDates["close date"]) < 0) {
            day.classList.add("closed");
        }
    }
    return day;
}

function dateLabel(date) {
    var d = new Date(date);
    var span = document.createElement("span");
    span.classList.add("date-day");
    span.innerHTML = d.getDate();
    return span;
}