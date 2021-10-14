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