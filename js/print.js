let print = {

    data: [],
    peak: [],

    init: function() {
        this.load();

        document.getElementById("printTable").append(this.display());
    },

    load: function() {
        var arr = JSON.parse(localStorage.getItem("committed"));
        arr.forEach(date => {
            this.data.push(new Date(date));
        });
        this.data = this.sort(this.data);

        var peak = school.peak.fullTime;
        peak.forEach(date => {
            this.peak.push(new Date(date));
        });
        this.peak = this.sort(this.peak);
    },

    sort: function(array) {

        // sort the list by the day
        var buckets = Array.from({ length: 31 });
        for (var i = 0; i < buckets.length; i++) {
            buckets[i] = new Array;
        }
        //var array = [];
        for (var i = 0; i < array.length; i++) {
            var index = array[i].getDate() - 1;
            buckets[index].push(array[i]);
        }
        array = [];
        for (var i = 0; i < buckets.length; i++) {
            array.push(...buckets[i]);
        }

        // sort the list again by the month
        var months = Array.from({ length: 12 });
        for (var i = 0; i < months.length; i++) {
            months[i] = new Array;
        }
        for (var i = 0; i < array.length; i++) {
            var index = array[i].getMonth();
            months[index].push(array[i]);
        }
        array = [];
        for (var i = 0; i < months.length; i++) {
            array.push(...months[i]);
        }

        // sort the list again by the year
        var years = Array.from({ length: 10 });
        for (var i = 0; i < years.length; i++) {
            years[i] = new Array;
        }
        for (var i = 0; i < array.length; i++) {
            var index = array[i].getFullYear() % 10;
            years[index].push(array[i]);
        }
        array = [];
        for (var i = 0; i < years.length; i++) {
            array.push(...years[i]);
        }

        return array;
    },

    display: function() {
        var t = this.table("schedule", "table");
        var thead = t.querySelector("thead");

        var head = this.tr();
        head.append(this.th("Date"));
        head.append(this.th("Peak"));
        head.append(this.th("Notes"));
        thead.append(head);

        var tb = t.querySelector("tbody");
        this.data.forEach(date => {
            var row = this.tr();
            // date
            var cell1 = this.td(date.toDateString());
            row.append(cell1);
            // peak
            var cell2 = this.td(this.isPeak(date));
            row.append(cell2);
            // notes
            var cell3 = this.td(this.note(date));
            row.append(cell3);

            tb.append(row);
        });

        return t;
    },

    isPeak: function(date) {
        function includes(obj, date) {
            if (obj.valueOf() == date.valueOf()) {
                return true;
            } else {
                return false;
            }
        }
        if (this.peak.filter(obj => includes(obj, date)).length) {
            return "Peak";
        } else {
            return false;
        }
    },

    note: function(date) {
        return '';
    },

    table: function(id, cls = null) {
        var table = document.createElement("table");
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");
        table.id = id;
        if (cls != null) {
            table.classList.add(cls);
        }
        table.append(thead);
        table.append(tbody);
        return table;
    },

    tr: function(cls = null) {
        var tr = document.createElement("tr");
        if (cls != null) {
            tr.classList.add(cls);
        }
        return tr;
    },

    th: function(inner) {
        var th = document.createElement("th");
        if (typeof inner === 'object') {
            th.append(inner);
        } else if (typeof inner === 'string') {
            th.append(inner);
        }
        return th;
    },

    td: function(inner = null) {
        var td = document.createElement("td");
        if (typeof inner === 'object' && inner != null) {
            td.append(inner);
        } else if (typeof inner === 'string') {
            td.innerText = inner;
        }
        return td;
    }

}

var work = eventer.events.filter( ev => ev.type == 'Work' );
confirmed.filter( d => d.slice(0,10) == work[0].dateTimeStart.slice(0,10) );
var overflow = work.filter( ev => !confirmed.filter( d => d.slice(0,10) == ev.dateTimeStart.slice(0,10) ).length > 0);
