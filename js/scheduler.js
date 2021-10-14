// Maintain an object of schedule dates and events
// 
var schedule = {
    assigned: [],
    "Saturday Program": "none",
    "Sunday Program": "none",
}

var days = document.querySelectorAll("div.day:not(.inactive):not(.weekday):not(.closed)");
days.forEach(day => {
    day.addEventListener("click", event => {
        var d = new Date(day.getAttribute("datetime"));
        scheduleAdd(d);
    })
});

function JSONDateFormat(date) {
    var D = new Date(date);
    var y = D.getFullYear().toString();
    var m = ('0' + (D.getMonth() + 1).toString()).slice(-2);
    var d = ('0' + D.getDate().toString()).slice(-2);
    return y + '-' + m + '-' + d;
}

function scheduleAdd(date) {
    var d = new Date(date);
    // check if already included
    if (schedule.assigned.includes(d.toDateString())) {
        // if exists then delete    
        scheduleDelete(d.toDateString());
    } else {
        // if not exists then push
        schedulePush(d.toDateString());
    }
}

function schedulePush(date) {
    var date = new Date(date);
    if (!schedule.assigned.includes(date.toDateString())) {
        schedule.assigned.push(date.toDateString());
    }

    // update the stats

    // add css class
    var d = new Date(date);
    document.getElementById(d.toDateString().replaceAll(' ', '')).classList.add("scheduled");
    return;
}

function scheduleDelete(date) {
    // update the data
    schedule.assigned = schedule.assigned.filter(
            function(ele) {
                return ele != date;
            })
        // remove the css class
    var d = new Date(date);

    // remove css class
    document.getElementById(d.toDateString().replaceAll(' ', '')).classList.remove("scheduled");
}

function arrayRemove(arr, value) {
    return arr.filter(function(ele) {
        return ele != value;
    });
}

const Scheduler = {
    // Add a push to object method

    // Add a delete from object method

    // Create a statistics view

    // Update the stats view
}

function updateStats() {
    document.getElementById("daysScheduled").value = workDays.length;
}

var addScheduleDay = function() {
    var id = this.id;
    // Confirm id exists
    if (workDays.includes(id)) {
        // does exist = erase
        workDays = arrayRemove(workDays, id);
        this.classList.remove("scheduled");
    } else {
        // does not exist = push
        workDays.push(id);
        this.classList.add("scheduled");
    }
    updateStats();
};


function addLessonDays(programName) {
    console.log(programName);
    var arr = specialDates["Local Programs"][programName];

    for (i = 0; i < arr.length; i++) {
        var s = new Date(arr[i]);
        s.setDate(s.getDate() + 1);
        var sd = s.toDateString().replaceAll(' ', '');
        // Add dates to the work days array
        workDays.push(sd);
        schedulePush(s);
        // Should a mast schedule push event be created?

        // Add span element for visual
        var el = document.getElementById(sd);
        el.classList.add("scheduled");
        el.appendChild(addLessonSpan(programName));
    }
}

function addLessonSpan(name) {
    var span = document.createElement("span");
    span.classList.add("lesson");
    span.innerHTML = name;
    return span;
}