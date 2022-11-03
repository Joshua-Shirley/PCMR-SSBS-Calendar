let programForm = {

    init: function() {
        Object.keys(programs).forEach(day => {
            this.block(day);
        });
        this.radioButtons();
    },

    block: function(day) {
        var pro = document.getElementById(day.toLowerCase());
        pro.innerHTML = "";
        pro.append(this.groupHeader(day));

        Object.keys(programs[day]).forEach(program => {
            var div = this.formCheck();
            var id = this.toCamelCase(program);
            div.append(this.inputElement(day, id, program));
            div.append(this.labelElement(id, program));
            pro.append(div);
        });

    },

    radioButtons: function() {
        document.querySelectorAll("input[type='checkbox']").forEach(
            input => {
                input.addEventListener('click', function() {
                    programForm.radioBehavior(input.id, input.name);
                });
            });
    },

    radioBehavior: function(id, name) {
        document.querySelectorAll("input[name='" + name + "']:not(#" + id + ")").forEach(
            input => {
                input.checked = false;
            });
    },

    groupHeader: function(text) {
        var h = document.createElement("h4");
        h.innerText = this.toProperCase(text);
        return h;
    },

    formCheck: function() {
        var d = document.createElement("div");
        d.classList.add("form-check");
        return d;
    },

    inputElement: function(name, id, value) {
        var i = document.createElement("input");
        i.type = "checkbox";
        i.classList.add("form-check-input");
        i.name = name.toLowerCase();
        i.id = id;
        i.value = this.toProperCase(value);
        return i;
    },

    labelElement: function(id, label) {
        var l = document.createElement("label");
        l.setAttribute("for", this.toCamelCase(id));
        l.innerText = this.toProperCase(label);
        return l;
    },

    toProperCase: function(str) {

        function proper(word) {
            return word[0].toUpperCase() + word.slice(1);
        }

        var arr = str.split(' ');

        for (var i = 0; i < arr.length; i++) {
            arr[i] = proper(arr[i]);
        }

        return arr.join(' ');
    },

    toCamelCase: function(str) {
        var arr = str.split(' ');
        var v = arr.join('');
        v = v[0].toLowerCase() + v.slice(1);
        return v;
    },
}

programForm.init();