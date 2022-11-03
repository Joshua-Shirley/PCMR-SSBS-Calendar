let schedule = {

    data: {
        assigned: [],
        type: "Full Time",
        saturday: "None",
        sunday: "None"
    },

    init: function() {
        this.load();
        this.bind();
        this.highlight();
    },

    bind: function() {
        var days = document.querySelectorAll("div.day:not(.inactive):not(.weekday):not(.closed):not(.full)");
        if (days.length > 0) {
            days.forEach(day => {
                day.addEventListener('click', event => {
                    schedule.eventClick(new Date(day.getAttribute("datetime")));
                    schedule.highlight();
                });
            });
        }
    },

    eventClick: function(date) {
        var d = new Date(date);
        console.log(d);
        if (this.data.assigned.includes(d.toISOString()) === false) {
            this.push(d);
        } else {
            this.remove(d);
        }
    },

    push: function(date) {
        var d = new Date(date);
        if (this.data.assigned.indexOf(d.toISOString()) == -1) {
            this.data.assigned.push(d.toISOString());
        } else {
            console.log('duplicate value: ', d.toDateString());
        }
        this.change();
    },

    highlight: function() {
        var days = document.querySelectorAll("div.day:not(.inactive):not(.weekday):not(.closed):not(.full)");
        days.forEach(day => { day.classList.remove('scheduled') });
        var view = [];
        schedule.data.assigned.forEach(day => { view.push(new Date(day).toDateString().toLowerCase().split(' ').join('')) });
        view.forEach(id => { document.getElementById(id).classList.add("scheduled"); });
    },

    highlight2: function() {
        // Add CSS class to element
        var id = d.toDateString().toLowerCase().split(' ').join('');
        document.getElementById(id).classList.add("scheduled");

        // Remove CSS class from element
        var id = d.toDateString().toLowerCase().split(' ').join('');
        document.getElementById(id).classList.remove("scheduled");
    },

    remove: function(date) {
        var d = new Date(date);
        //console.log('delete: ', d.toDateString());
        var index = this.data.assigned.indexOf(d.toISOString());
        console.log(index, d.toISOString());
        this.data.assigned.splice(index, 1);

        this.change();
    },

    change: function() {
        // sort the array
        this.sort();
        // save the array to local storage
        this.save();
        // update the stats
        stats.summary();
    },

    sort: function() {
        this.data.assigned.sort();
    },

    save: function() {
        localStorage.removeItem('committed');
        localStorage.setItem('committed', JSON.stringify(schedule.data.assigned));
    },

    load: function() {
        var committed = JSON.parse(localStorage.getItem("committed"));
        if (committed != null) {
            for (var i = 0; i < committed.length; i++) {
                var d = new Date(committed[i]);
                if (Object.prototype.toString.call(d) === "[object Date]") {
                    this.push(d);
                }
            }
        }
    }
}

schedule.init();