function peakDaysInitialize() {
    var req = document.querySelectorAll("[name='Requirements']");
    req.forEach(
        requirement => {
            requirement.addEventListener('click', event => {
                schedule.type = requirement.value;
                removePeakDays();
                addPeakDays();
            })
        });
}

function addPeakDays() {
    var peakDays = specialDates.Type[employmentStatus()].Peak;
    // update schedule JSON object;
    schedule.peak = [];
    schedule.peak = specialDates.Type[employmentStatus()].Peak;

    // Add icon to the the peak days.
    for (var i = 0; i < peakDays.length; i++) {
        var d = JSONtoDate(peakDays[i]);
        var id = document.getElementById(DateToID(d));
        id.appendChild(spanPeak());
    }
}

function removePeakDays() {
    var p = document.querySelectorAll("span.peak");
    for (var i = 0; i < p.length; i++) {
        var parent = p[i].parentElement;
        parent.removeChild(parent.querySelector(".peak"));
    }
}

function spanPeak() {
    var span = document.createElement("span");
    span.classList.add("peak");
    span.appendChild(svgElement());
    return span;
}

function svgElement() {
    var xmlns = "http://www.w3.org/2000/svg";
    var boxWidth = 512;
    var boxHeight = 512;
    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("aria-hidden", true);
    svg.setAttribute("focusable", false);
    svg.setAttribute("data-icon", "asterisk");
    svg.setAttribute("role", "img");
    svg.classList.add("asterisk");
    svg.style.width = "20px";
    svg.setAttributeNS(null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);

    var path = document.createElementNS(xmlns, "path");
    path.setAttributeNS(null, "fill", "#ced4da");
    path.setAttributeNS(null, "d", "M 478.21 334.093 L 336 256 l 142.21 -78.093 c 11.795 -6.477 15.961 -21.384 9.232 -33.037 l -19.48 -33.741 c -6.728 -11.653 -21.72 -15.499 -33.227 -8.523 L 296 186.718 l 3.475 -162.204 C 299.763 11.061 288.937 0 275.48 0 h -38.96 c -13.456 0 -24.283 11.061 -23.994 24.514 L 216 186.718 L 77.265 102.607 c -11.506 -6.976 -26.499 -3.13 -33.227 8.523 l -19.48 33.741 c -6.728 11.653 -2.562 26.56 9.233 33.037 L 176 256 L 33.79 334.093 c -11.795 6.477 -15.961 21.384 -9.232 33.037 l 19.48 33.741 c 6.728 11.653 21.721 15.499 33.227 8.523 L 216 325.282 l -3.475 162.204 C 212.237 500.939 223.064 512 236.52 512 h 38.961 c 13.456 0 24.283 -11.061 23.995 -24.514 L 296 325.282 l 138.735 84.111 c 11.506 6.976 26.499 3.13 33.227 -8.523 l 19.48 -33.741 c 6.728 -11.653 2.563 -26.559 -9.232 -33.036 Z");
    svg.appendChild(path);
    return svg;
}

function employmentStatus() {
    var req = document.querySelectorAll("[name='Requirements']");
    var index = 0;
    for (index = 0; index < req.length; index++) {
        if (req[index].checked == true) {
            break;
        }
    }
    return req[index].value;
}



function alphaNumericText(str) {
    var pattern = /([^\w])+/g;
    var s = str.replace(pattern, '');
    s.toLowerCase();
    return s;
}

function inputRadioRow(Label, Name, Id, Value) {

    var div0 = document.createElement("div");
    div0.classList.add("col-4");

    var div1 = document.createElement("div");
    div1.classList.add("row");
    div1.classList.add("micro");

    div0.appendChild(div1);

    var label = document.createElement("label");
    label.classList.add("col-8");
    label.classList.add("right");
    label.setAttribute("for", Id);
    label.innerHTML = Label;
    div1.appendChild(label);

    var div2 = document.createElement("div");
    div2.classList.add("col-4");
    div2.classList.add("left");
    div1.appendChild(div2);

    var input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = Name;
    input.id = Id;
    input.value = Value;
    div2.appendChild(input);

    return div0;
}

var employmentTypeElement = document.getElementById("employmentType");
Object.keys(specialDates["Type"]).forEach(key => {
    employmentTypeElement.appendChild(inputRadioRow(key, "Requirements", "REQ" + alphaNumericText(key), key));
});
document.getElementsByName("Requirements")[0].checked = true;

// Add event listeners to the radio buttons

// Dislay requirements