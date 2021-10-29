let local = {
    save: function() {
        var copy = JSON.parse(JSON.stringify(schedule));
        delete copy["peak"];
        localStorage.setItem("schedule", JSON.stringify(copy));
    },
    load: function() {
        var obj = JSON.parse(localStorage["schedule"]);
        // push the assigned days into the calendar.
        obj.assigned.forEach(day => scheduleAdd(JSONtoDate(day)));
        // employment type
        schedule.type = obj.type;
        // saturday program
        schedule["Saturday Program"] = obj["Saturday Program"];
        // sunday program
        schedule["Sunday Program"] = obj["Sunday Program"];
    }
}

local.load();