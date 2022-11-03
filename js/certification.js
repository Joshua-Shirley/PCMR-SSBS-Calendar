let certification = {

    status: {},

    init: function() {
        this.bind();
    },

    bind: function() {
        document.getElementById("formSave").addEventListener("click", function(evt) {
            evt.preventDefault();
            certification.save();
        });
    },

    save: function() {
        console.log('save');
    }
}

certification.init();