// Maintain an object of schedule dates and events
// 
const schedule = {
    assigned: [],
    type: "Full Time",
    "Saturday Program": "none",
    "Sunday Program": "none",
}

function scheduleInit() {
    var days = document.querySelectorAll("div.day:not(.inactive):not(.weekday):not(.closed)");
    days.forEach(day => {
        day.addEventListener("click", event => {
            var d = new Date(day.getAttribute("datetime"));
            scheduleAdd(d);
        })
    });
}

function scheduleAdd(date) {
    var d = new Date(date);
    // check if already included
    if (schedule.assigned.includes(JSONDateFormat(d))) {
        // if exists then delete    
        scheduleDelete(d);
    } else {
        // if not exists then push
        schedulePush(d);
    }
    // update the stats
    updateWorkingStats();
    local.save();
}

function toDate(dateStr) {
    var a = dateStr.split('-');
    var d = new Date(a[0], a[1], a[2]);
    return d;
}

function schedulePush(date) {
    var d = new Date(date);
    var jdate = JSONDateFormat(d);
    if (!schedule.assigned.includes(jdate)) {
        schedule.assigned.push(jdate);
    }

    // add css class
    document.getElementById(DateToID(d)).classList.add("scheduled");
    return;
}

function scheduleDelete(date) {
    var d = new Date(date);
    var f = JSONDateFormat(d);
    // update the data
    schedule.assigned = schedule.assigned.filter(
            function(ele) {
                return ele != f;
            })
        // remove the css class
    document.getElementById(DateToID(d)).classList.remove("scheduled");
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
    //console.log(programName);
    var arr = specialDates["Local Programs"][programName];

    for (i = 0; i < arr.length; i++) {
        var s = new Date(arr[i]);
        s.setDate(s.getDate() + 1);
        //var sd = s.toDateString().replaceAll(' ', '');
        var sd = DateToID(s);
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