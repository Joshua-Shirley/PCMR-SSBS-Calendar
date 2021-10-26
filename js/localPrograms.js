function localProgramInput(Label, Name, Id, Value, Checked) {

    var div0 = document.createElement("div");
    div0.classList.add("col-8");
    div0.classList.add("offset-3-left");

    var div1 = document.createElement("div");
    div1.classList.add("row");

    div0.appendChild(div1);

    var label = document.createElement("label");
    label.classList.add("col-10");
    label.setAttribute("for", Id);
    label.innerHTML = Label;
    div1.appendChild(label);

    var div2 = document.createElement("div");
    div2.classList.add("col-2");
    div1.appendChild(div2);

    var input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = Name;
    input.id = Id;
    input.value = Value;
    if (Checked != undefined) {
        input.setAttribute("checked", "checked");
    }
    div2.appendChild(input);

    return div0;
}

function spanLocalProgram(program) {
    var span = document.createElement("span");
    span.classList.add("localProgram");
    span.innerHTML = program;
    return span;
}

function addProgramLessons(day, programName) {

    // Remove the other program dates.
    if (day == "Saturday") {
        var lastProgram = schedule["Saturday Program"];
    }
    if (day == "Sunday") {
        var lastProgram = schedule["Sunday Program"];
    }

    if (lastProgram != "none") {
        var removeArr = specialDates["Local Programs"][day][lastProgram];
        //console.log(removeArr);

        removeArr.forEach(day => {
            var d = new Date(day);
            d.setDate(d.getDate() + 1);
            // Delete from the scheduler
            scheduleDelete(d.toDateString());

            // SPAN Element - Program Name Remove
            var tempDay = DateToID(d);
            var tempElement = document.getElementById(tempDay);
            tempElement.removeChild(tempElement.querySelector("span.localProgram"));

        });
    }

    // Add the new program dates
    if (programName != "none") {
        // Set the new local program
        if (day == "Saturday") {
            schedule["Saturday Program"] = programName;
        }
        if (day == "Sunday") {
            schedule["Sunday Program"] = programName;
        }
        // Add the dates to the scheduler
        var arr = specialDates["Local Programs"][day][programName];
        arr.forEach(day => {
            var d = new Date(day);
            d.setDate(d.getDate() + 1);
            // Add to the scheduler
            schedulePush(d.toDateString());
            // Add span to the calendar day

            // SPAN Element - Program Name Add                
            var tempDay = DateToID(d);
            document.getElementById(tempDay).appendChild(spanLocalProgram(programName));

        });
    }
}

function initializePrograms() {

    // Create the input fields for the local programs
    var targetElement = document.getElementById("LocalPrograms");

    Object.keys(specialDates["Local Programs"]).forEach(key => {

        var h = document.createElement("div");
        h.classList.add("col-6");
        var h4 = document.createElement("h4");
        h4.innerHTML = key;
        h4.setAttribute("style", "text-align:center;");
        h.appendChild(h4);

        Object.keys(specialDates["Local Programs"][key]).forEach(key2 => {
            h.appendChild(localProgramInput(key2, key + "LocalPrograms", alphaNumericText(key2), key2));
        })

        var d = localProgramInput("None", key + "LocalPrograms", key + "default", false, true);
        h.appendChild(d);

        targetElement.appendChild(h);

    })

    var Sat = document.getElementsByName("SaturdayLocalPrograms");
    Sat.forEach(item => {
        item.addEventListener("change", event => {
            addProgramLessons("Saturday", item.value);
        })
    });
    var Sun = document.getElementsByName("SundayLocalPrograms");
    Sun.forEach(item => {
        item.addEventListener("change", event => {
            addProgramLessons("Sunday", item.value);
        })
    });
}