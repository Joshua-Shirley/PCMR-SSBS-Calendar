class clinic {
    constructor(date, ) {
        this.date = new Date(date);

    }
}

let psiaClinic = {    
    data: [],    
    sports: [],
    activeFilter: [],
    filteredClinics: [],

    init: function() {

        this.activeFilter.push('Alpine');
        this.displayClinics();

        this.filterOptions();
        this.highlightActiveButtons();
    },

    highlightActiveButtons: function() {
        // update the active filter buttons
        var buttons = document.querySelectorAll(".filters button.btn");
        buttons.forEach( b => {
            b.classList.remove("active");
            if ( this.activeFilter.includes(b.value) ) {
                b.classList.add("active");
            }
        });
    },

    clearClinics: function() {
        var el = document.querySelectorAll("div.clinic");
        el.forEach( div => {
            var parent = div.parentElement;
            parent.removeChild(div);
        });
    },

    displayClinics: function() {

        this.filteredClinics = [];
        
        // filter the clinics based on the selected sports
        this.filteredClinics = psia.filter( clinic => this.activeFilter.includes(clinic.sport) );

        // filter the list by dates
        /*
        var today = new Date("11-01-2022");
        this.filteredClinics = psia.filter( clinic => clinic.date > today.toISOString() );
        */

        this.clearClinics();

        // match the clinics with dates
        this.filteredClinics.forEach( clinic => {            
            var date = new Date(clinic.date);
            var id = date.toDateString().toLowerCase().split(' ').join('');
            var el = document.getElementById(id);
            if( el != null ){
                el.append( this.clinicBlock(clinic));            
            }
        });
    },

    clinicBlock: function(clinic) {
        var div = document.createElement("div");
        div.classList.add("clinic");
        var sportClass = clinic.sport.toLowerCase().replace('\'','');        
        div.classList.add(sportClass);
        var span = document.createElement("span");
        span.classList.add("clinic-name");
        span.innerText = clinic.name;
        div.appendChild(span);        
        return div;
    },


    filterOptions: function() {
        psia.forEach( clinic => {            
            if( this.sports.indexOf(clinic.sport) == -1 ){
                this.sports.push(clinic.sport);
            }
        });
        var f = document.getElementById('clinicFilters');
        this.sports.forEach( sport => {
            b = this.button(sport);
            f.appendChild(b);
            b.addEventListener("click", function(){ psiaClinic.activateFilter(this.value)});
        });
    },

    button: function(sport) {
        var b = document.createElement("button");
        b.type = 'button';
        b.classList.add("btn");
        //b.classList.add("active");
        b.id = sport;
        b.value = sport;
        b.innerText = sport;
        return b;
    },

    activateFilter: function(value) {
        if( !this.activeFilter.includes(value) ){
            this.activeFilter.push(value);
        } else {
            this.activeFilter.splice( this.activeFilter.indexOf(value) , 1);
        }        
        this.displayClinics();
        this.highlightActiveButtons();
    }
    
}

psiaClinic.init();