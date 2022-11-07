class Clinic {
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
        var f = JSON.parse(localStorage.getItem("clinicFilters"));
        if ( f != null) {
            this.activeFilter = f;
        } else {
            var pay = JSON.parse(localStorage.pay);
            var d = pay.discipline;            
            this.activeFilter.push( d[0].toUpperCase() + d.slice(1) )
        }
        this.filterOptions();
        this.displayClinics();
        
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
       
        this.clearClinics();

        // match the clinics with dates
        this.filteredClinics.forEach( clinic => {               
            if( clinic.status == null){
                var date = new Date(clinic.date);
                for( var i = 0; i < clinic.days; i++ ) {
                    date.setDate( date.getDate() + i);
                    var id = date.toDateString().toLowerCase().split(' ').join('');
                    var el = document.getElementById(id);                    
                    if( el != null ){
                        el.append( this.clinicBlock(clinic));            
                    }
                }                                                                
            }
        });
    },

    clinicBlock: function(clinic) {
        var div = document.createElement("div");
        div.id = clinic.sport + '-' + clinic.id;
        div.classList.add("clinic");
        var sportClass = clinic.sport.toLowerCase().replace('\'','');        
        div.classList.add(sportClass);
        var span = document.createElement("span");
        span.classList.add("clinic-name");
        
        if( clinic.days > 1){
            // Fix me - add text to span to 
            // indicate 1/2 or 2/2, 1/3, 2/3, 3/3
        }
        span.innerText = clinic.name;
        div.appendChild(span);


        var link = document.createElement("a");
        link.classList.add('psiaLink');
        var d = new Date(clinic.date);
        var path = [];
        path.push('https://psia-i.org/events-exams/calendar/?');
        path.push('cal-month=');
        path.push(d.getMonth());
        path.push('&cal-year=');
        path.push(d.getFullYear());
        path.push('&event=');
        path.push(clinic.id);
        link.href = path.join('');
        link.innerText = 'link';        
        link.setAttribute("target","_blank");
        div.appendChild(link);
          
        span.addEventListener("click",function(){psiaClinic.scheduleEvent(clinic.id)});
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
        localStorage.setItem("clinicFilters", JSON.stringify(this.activeFilter));
        this.displayClinics();
        this.highlightActiveButtons();
    },

    scheduleEvent: function(eventId) {
        var clinic = psia.filter( clinic => clinic.id == eventId )[0];
        var startDate = new Date(clinic.date);
        var finishDate = new Date(clinic.date);

        // while loop
        for( var i = 0; i < clinic.days ; i++){                        
            startDate.setDate( startDate.getDate() + i);
            finishDate.setDate( finishDate.getDate() + i);
            startDate.setHours(8,45,0,0);
            finishDate.setHours(16,0,0,0);
            var event = new Event( startDate, finishDate, clinic.name, clinic.sport + ', ' + clinic.id, 'Clinic' );            
            eventer.add(event);     
            this.listClinics();
            document.getElementById("registered").scrollIntoView({behavior: "smooth", block: "end"});
        }
    },

    listClinics: function() {        
        var arr = eventer.events.filter( ev => ev.type == 'Clinic');        
        var el = document.getElementById("registered");
        el.innerText = "";

        function button(id){
            var b = document.createElement("button");
            b.name = 'button';
            b.type = 'type';
            b.classList.add("btn");
            b.innerText = "X";
            b.value = id;
            b.addEventListener("click", function(){ psiaClinic.delete(id) });
            return b;
        }

        function line(obj) {
            var row = document.createElement("div");
            row.classList.add("row");
            row.classList.add("items");
            
            // col1
            var col1 = document.createElement("div");
            col1.classList.add("col-2");
            var d = new Date(obj.dateTimeStart);
            col1.innerText = d.toLocaleDateString();
            row.append(col1);

            // col2
            var col2 = document.createElement("div");
            col2.classList.add("col-2");
            var event = psia.filter( clinic => clinic.id == parseInt(obj.description.replace(/[a-z, ]/gmi ,'')) )[0];
            col2.innerText = event.sport;
            row.append(col2);

            // col3
            var col3 = document.createElement("div");
            col3.classList.add("col-7");
            col3.innerText = obj.name;
            row.append(col3);
          
            // col4
            var col5 = document.createElement("div");
            col5.classList.add("col-1");            
            col5.append(button(obj.id));
            row.append(col5);

            return row;
        }
        arr.forEach( ev => {
            el.appendChild(line( ev ));
        });
    },

    delete: function(id) {        
        eventer.delete(id);
        psiaClinic.listClinics();
    }
        
}

psiaClinic.init();

psiaClinic.listClinics();