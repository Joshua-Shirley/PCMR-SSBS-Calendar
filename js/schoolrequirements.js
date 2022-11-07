let overlay = {

    init: function() {
        if (calendar.firstDate != null) {
            this.closedDays();
            this.peakDays();
            this.fullDays();
        }

    },

    closedDays: function() {

        var days = document.querySelectorAll('.day:not(.inactive):not(.weekday)');

        // find the days before and after the resort closes
        // before        
        startDate = new Date(calendar.firstDate);
        openDate = new Date(school.dates.open);
        while (startDate < openDate) {
            var id = startDate.toDateString().toLowerCase().split(' ').join('');
            var el = document.getElementById(id);
            el.classList.add("closed");
            startDate.setDate(startDate.getDate() + 1);
            el.querySelector("div.date-content").append(this.message("closed"));            
        }

        // after
        closeDate = new Date(school.dates.close);
        endDate = new Date(calendar.lastDate);
        while (closeDate < endDate) {
            var id = closeDate.toDateString().toLowerCase().split(' ').join('');
            var el = document.getElementById(id);
            el.classList.add("closed");
            closeDate.setDate(closeDate.getDate() + 1);
            el.querySelector("div.date-content").append(this.message("closed"));          
        }

    },

    peakDays: function() {
        school.peak.fullTime.sort();
        var pkDates = school.peak["fullTime"];
        for (var i = 0; i < pkDates.length; i++) {
            pkDates[i] = new Date(pkDates[i]);
            var id = pkDates[i].toDateString().toLowerCase().split(' ').join('');
            document.getElementById(id).classList.add("peak");

            
            document.getElementById(id).querySelector("div.date-row").append(this.icon("peak"));
            pkDates[i] = pkDates[i].toISOString();
        }

    },

    fullDays: function() {
        for (var i = 0; i < school.dates.full.length; i++) {
            var d = new Date(school.dates.full[i]);
            var id = d.toDateString().toLowerCase().split(' ').join('');
            var el = document.getElementById(id);
            el.classList.add("full");
            var con = el.querySelector("div.date-content");
            con.append(this.message("full"));
        }
    },

    icon: function(str) {
        var div = document.createElement("div");
        div.classList.add("date-icon");
        div.innerText = str;
        return div;
    },

    message: function(str) {
        var span = document.createElement("span");
        span.classList.add("date-message");
        span.innerText = str;
        return span;
    }


}

overlay.init();