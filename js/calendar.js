/*
Creates a visual calendar
*/

let calendar = {

    month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    week_day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    bindingElement: document.getElementById("skiSeason"),
    firstDate: null,
    lastDate: null,

    init: function() {
        //this.print('11-19-2022', '04-09-2023');
    },

    print: function(start_date, end_date) {
        var loopDate = new Date(start_date);
        var endDate = new Date(end_date);

        while (loopDate < endDate) {
            loopDate = new Date(loopDate.getFullYear(), loopDate.getMonth(), 1);
            if (this.firstDate == null) { this.firstDate = new Date(loopDate); }
            this.bindingElement.appendChild(this.printMonth(loopDate));
            loopDate = new Date(loopDate.getFullYear(), loopDate.getMonth() + 1, 1);
        }
        this.lastDate = new Date(loopDate);

        this.today();
    },

    printMonth: function(date) {
        var month = document.createElement('div');
        month.classList.add("month");

        var header = document.createElement("h3");
        header.innerHTML = this.month_names[date.getMonth()] + ' ' + date.getFullYear();

        // Month Name Header
        month.appendChild(header);

        // Add the day labels
        month.appendChild(this.weekLabel());

        // Add the days 1 to 30(1)
        this.days(date, month);

        return month;
    },

    weekLabel: function() {
        var week = document.createElement("div");
        week.classList.add("week");
        week.classList.add("labels");
        for (var i = 0; i < 7; i++) {
            week.appendChild(this.dayLabel(i));
        }
        return week;
    },

    dayLabel: function(dayNumber) {
        var label = document.createElement("div");
        label.classList.add("day");
        label.classList.add("weekday");
        label.appendChild(this.weekDayName(dayNumber));
        return label;
    },

    weekDayName: function(dayNumber) {
        /*
        <span>F<span class="abbreviations">riday</span></span>
        */
        // create the span element
        var span = document.createElement("span");
        span.innerHTML = this.week_day[dayNumber][0];

        // add in abbreviations
        var abbreviations = document.createElement("span");
        abbreviations.classList.add("abbreviation");
        abbreviations.innerHTML = this.week_day[dayNumber].substring(1);
        span.appendChild(abbreviations);

        // return the element
        return span;
    },

    weeksInMonth: function(date) {
        firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        daysPrior = firstDayOfMonth.getDay();
        daysInMonth = lastDayOfMonth.getDate();
        daysAfter = 6 - lastDayOfMonth.getDay();

        return Math.floor((daysPrior + daysInMonth + daysAfter) / 7);
    },

    days: function(date, element) {
        var month = date.getMonth();
        var weeks = this.weeksInMonth(date);
        // create a new date object to work with
        var workingDate = new Date(date);
        // move the start date back to the prior sunday
        workingDate.setDate(1 - workingDate.getDay());

        for (var week = 0; week < weeks; week++) {

            var weekElement = document.createElement("div");
            weekElement.classList.add("week");
            weekElement.id = 'week-' + week;

            for (var day = 0; day < 7; day++) {
                weekElement.appendChild(this.dayElement(month, workingDate));
                workingDate.setDate(workingDate.getDate() + 1);
            }

            // attach the week the element reference
            element.appendChild(weekElement);
        }

    },

    dayElement: function(month, date) {

        var day = document.createElement("div");
        day.classList.add("day");

        if (date.getMonth() != month) {
            day.classList.add("inactive");
        } else {
            var id = date.toDateString().toLowerCase().split(' ');
            day.id = id.join('');
            day.appendChild(this.dateLabel(date));
            day.setAttribute("datetime", date.toDateString());
        }

        return day;
    },
    
    dateLabel: function(date) {
        var div = document.createElement("div");
        div.classList.add("date-row");
        var span = document.createElement("span");
        span.classList.add("date-day");
        span.innerHTML = date.getDate();
        div.appendChild(span);
        return div;
    },

    today: function() {
        var t = new Date();
        var id = t.toDateString().toLowerCase().split(' ').join('');
        var el = document.getElementById(id);
        el.classList.add("today");
        var span = document.createElement("span");
        span.classList.add("fixme");
        span.innerText = "Today";
        el.querySelector("div.date-row").append(span);
    }

}