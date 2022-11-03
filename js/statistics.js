let stats = {

    data: {
        committed: 0,
        peak: 0,
        required: 0,
        pay: 0
    },

    init: function() {
        this.view();
    },

    summary: function() {
        function isAfter12(date) {
            if (new Date(date) > new Date('12-12-2022')) {
                return true;
            } else {
                return false;
            }
        }

        function isInPeak(date) {
            if (school.peak.fullTime.includes(new Date(date).toISOString())) {
                return true;
            } else {
                return false;
            }
        }
        this.data.committed = schedule.data.assigned.length;
        this.data.peak = schedule.data.assigned.filter(isInPeak).length;
        this.data.required = schedule.data.assigned.filter(isAfter12).length;

        this.updateView();
    },

    updateView: function() {
        // total days
        document.getElementById("totalDaysCal").innerText = this.data.committed;

        // peak days
        document.getElementById("totalPeakDays").innerText = this.data.peak + ' / ' + school.peak.requirement.fullTime;

        // required days
        document.getElementById("totalFT").innerText = this.data.required + ' / 85';

        // estimated pay
        var pay = JSON.parse(localStorage.getItem("pay"));

        this.data.pay = this.data.committed * 7 * pay.pay;
        document.getElementById("totalPay").innerText = (this.data.pay).toLocaleString("en-US", { style: 'currency', currency: 'USD', });
    },

    view: function() {
        var d = document.getElementById("statistics");

        // add total days
        var totalDays = this.div("", "totalDays", "statLine");
        totalDays.append(this.span("Total Days", null, "bold"));
        totalDays.append(this.span("0", "totalDaysCal", "stat"));
        d.append(totalDays);

        // add peak days
        var totalPeak = this.div("", "peakDays", "statLine");
        totalPeak.append(this.span("Total Peak", null, "bold"));
        totalPeak.append(this.span("0", "totalPeakDays", "stat"));
        d.append(totalPeak);

        var totalFT = this.div("", "ftDays", "statLine");
        totalFT.append(this.span("Minimum Required", null, "bold"));
        totalFT.append(this.span("0", "totalFT", "stat"));
        d.append(totalFT);

        var pay = this.div("", "pay", "statLine");
        pay.append(this.span("Estimated Pay", null, "bold"));
        pay.append(this.span("0", "totalPay", "stat"));
        d.append(pay);

    },

    div: function(innerElement, id = null, c = null) {
        var div = document.createElement("div");
        if (id != null) {
            div.id = id;
        }
        if (c != null) {
            div.classList.add(c);
        }
        if (typeof innerElement === 'object') {
            div.append(innerElement);
        } else if (typeof innerElement === 'string') {
            div.innerText = innerElement;
        }

        return div;
    },

    span: function(text, id = null, cls = null) {
        var span = document.createElement("span");
        if (id != null) {
            span.id = id;
        }
        if (cls != null) {
            span.classList.add(cls);
        }
        span.innerText = text;
        return span;
    }

}

stats.init();