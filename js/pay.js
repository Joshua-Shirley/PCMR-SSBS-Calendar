let payScale = {
    rate: {
        output: 20.00,
        base: {
            nonCertified: 20.00,
            level1: 21.25,
            level2: 24.25,
            level3: 30.25
        },
        extra: {
            allow: ['Child-Specialist', 'Freestyle', 'Adaptive', 'USSA', 'Secondary Alpine', 'Secondary Snowboard', 'Nordic'],
            extra: 0.50
        },
        decl: {
            extra: 1.00
        }
    },

    certifications: {
        pay: 0,
        base: 0,
        extra: 0,
        main: "",
        discipline: "none",
        extras: []
    },

    init: function() {
        this.loadSaved();
        //this.certifications.extras.pop();
        this.calculatePay();
        this.displayRate();
        this.binding();
    },

    loadSaved: function() {
        var str = localStorage.getItem("pay");
        if( str == null) {
            localStorage.setItem("pay",'{"main":"none","discipline":"none","extra":0,"pay":0,"base":0,"extras":[]}');
        }
        this.certifications = JSON.parse(localStorage.getItem("pay"));

        // base pay
        if ( this.certifications.main == 'none') {
            var val = 'none';
        } else {
            var val = this.certifications.main + ' ' + this.certifications.discipline;
        }
        document.querySelector("input[value='" + val + "']").setAttribute("checked", "checked");
        // extras
        if( this.certifications.extras.length > 0 ){
            this.certifications.extras.forEach(cert => {
                document.querySelector("input[value='" + cert + "']").setAttribute("checked", "checked");
            });
        }
    },

    displayRate: function() {
        var t = document.getElementById("hourly");
        t.innerText = this.certifications.pay.toLocaleString("en-US", {
            style: 'currency',
            currency: 'USD',
        });;
    },

    binding: function() {

        // base certification
        var d = document.querySelectorAll("input[name='certification']");
        d.forEach(el => {
            el.addEventListener("change", function(e) {
                payScale.updateBase(this);
            });
        });

        // cert extras
        var s = document.querySelectorAll("input[name='secondary']");
        s.forEach(el => {
            el.addEventListener("change", function(e) {
                payScale.updateExtra();
            });
        });

        // bind the save button
        document.getElementById("Save").addEventListener("click", function() {
            window.location.href = "index.html";
        });

        // bind the local programs
        document.getElementById("continueToPrograms").addEventListener("click", function() {
            window.location.href = "local-programs.html";
        });
    },

    calculatePay: function() {
        // Base
        if (this.certifications.base == 0) {
            this.certifications.base = this.rate.base.nonCertified;
        }
        // Extras
        this.certifications.extra = 0;
        this.certifications.extras.forEach(cert => {
            if (this.rate.extra.allow.includes(cert.split(' ')[0])) {
                this.certifications.extra += this.rate.extra.extra;
            }
        });

        this.certifications.pay = this.certifications.base + this.certifications.extra;
        this.displayRate();

        var obj = JSON.stringify(payScale.certifications);
        localStorage.setItem("pay", obj);
    },

    updateExtra: function() {
        this.certifications.extras = [];
        var s = document.querySelectorAll("input[name='secondary']:checked");
        s.forEach(x => {
            this.certifications.extras.push(x.value);
        });
        this.calculatePay();
    },

    updateBase: function(input) {
        var value = input.value.split(' ');
        this.certifications.main = value[0];
        this.certifications.discipline = value[1];
        this.certifications.base = this.rate.base[value[0]];
        this.calculatePay();
        this.showSecondCert(this.certifications.discipline);
    },

    showSecondCert: function(sport) {
        if (sport == 'alpine') {
            document.getElementById("secondCertSB").classList.remove("hide");
            document.getElementById("secondCertAlpine").classList.add("hide");
        }
        if (sport == 'snowboard') {
            document.getElementById("secondCertAlpine").classList.remove("hide");
            document.getElementById("secondCertSB").classList.add("hide");
        }
    }

}

payScale.init();