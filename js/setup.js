let setup = {

    init: function() {
        this.bind();
    },

    bind: function() {
        document.getElementById("timeStatusSave").addEventListener("click", function(evt) {
            evt.preventDefault();
            setup.save();
            window.location.href = "index.html";
        });
        document.getElementById("continueToPrograms").addEventListener("click", function(evt) {
            evt.preventDefault();
            setup.save();
            window.location.href = "local-programs.html";
        });
        document.getElementById("payScale").addEventListener("click", function(evt) {
            evt.preventDefault();
            setup.save();
            window.location.href = "pay.html";
        });
    },

    save: function() {
        var status = document.querySelector("input[name='status']:checked").value;
        localStorage.setItem('status', status);
        startup.isComplete();
        return true;
    }
}

setup.init();