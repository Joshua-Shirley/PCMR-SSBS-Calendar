function inputRadioRow(Label, Name, Id, Value) {

    var div0 = document.createElement("div");
    div0.classList.add("col-6");

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
    div2.appendChild(input);

    return div0;
}

// Create the input fields for the local programs
var targetElement = document.getElementById("localPrograms");
var defaultInput = inputRadioRow("None", "localPrograms", "LPDefault", "None")
defaultInput.value = true;
targetElement.appendChild(defaultInput);
Object.keys(specialDates["Local Programs"]).forEach(key => {
        targetElement.appendChild(inputRadioRow(key, "localPrograms", "LP" + key.replaceAll(' ', ''), key));
    })
    // Add event listeners to the radio buttons
var cb = document.getElementsByName("localPrograms");
cb.forEach(item => { item.addEventListener('change', event => { addLessonDays(item.value); }) });