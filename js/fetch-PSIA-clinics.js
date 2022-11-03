class List {
    constructor() {
        this.list = [];
        this.load();
    }
    push(clinic){
        if( this.index(clinic) == -1) {
            this.list.push(clinic);
        }
    }
    index(searchClinic) {
        return this.list.findIndex( clinic => clinic.id == searchClinic.id );
    }
    save(){
        var string = JSON.stringify(this.list);
        localStorage.setItem("clinics",string);
    }
    load(){
        var arr = JSON.parse(localStorage.getItem("clinics"));
        if( arr != null && arr.length > -1){
            arr.forEach( obj => {
                var clinic = new Clinic( obj.id, obj.sport, obj.date, obj.time, obj.name, obj.location, obj.link, obj.status, obj.days );
                this.push(clinic);
            });
        }
    }
}

class Clinic {
    constructor(id, sport, date, time, name, location, link, status = null, days = 1) {        
        this.id = id;        
        this.sport = sport;
        this.date = new Date(date).toISOString();
        this.days = days;
        this.time = time;
        this.name = name;
        this.location = location;
        this.URL = link;
        this.status = status;
    }
}

class sport {
    constructor(rgb,sport){
        this.rgb = rgb;
        this.sport = sport;
    }
}

let psiaList = {

    clinics: null,
    
    sport: [
        {"color":"rgba(0, 84, 103, 0.59)","sport":"Telemark"},
        {"color":"rgba(83, 151, 210, 0.784)","sport":"Snowboard"},
        {"color":"rgba(138, 136, 40, 0.59)","sport":"Cross Country"},
        {"color":"rgba(178, 227, 228, 0.784)","sport":"Freestyle"},
        {"color":"rgba(188, 185, 153, 0.784)","sport":"Adaptive"},
        {"color":"rgba(227, 24, 55, 0.59)","sport":"Alpine"},
        {"color":"rgba(235, 122, 42, 0.784)","sport":"Multi-Discipline"},        
        {"color":"rgba(254, 216, 77, 0.784)","sport":"Children's"}                                
        ],

    locations: ["Alta","Beaver Mountain","Brian Head","Brighton","Deer Valley","Eagle Point","Grand Targhee","Jackson Hole","Ogden Nordic","Online","Park City Mountain","Pebble","Snow King","Snowbasin","Snowbird","Soldier Hollow","Solitude","Solitude Nordic Center","Sun Valley","Sun Valley Nordic","Sundance","White Pine Ski Resort"],

    init: function() {
        this.clinics = new List();
        this.fetch();
    },

    locationMatch: function(name) {
        var v = -1;
        for ( var i = 0 ; i < this.locations.length; i++){
            if( name.search(this.locations[i]) > -1 ){
                return this.locations[i];
            }
        }
        return 'TBD';
    },

    colorToSport: function(c) {        
        var index = this.sport.findIndex( obj => obj.color == c);    
        if( index > -1) {
            return this.sport[index].sport;
        } else {
            return null;
        }
    },

    fetch: function() {
    
        //var page = window.location.search.split("&");
        var iframe = document.getElementById("psia");
        var iframeSrc = iframe.src.split("/");
        var page = iframeSrc[iframeSrc.length - 1].split('&');
        var pageMonth = eval(page[0].split('=')[1]) * -1;
        var pageYear = eval(page[1].split('=')[1]);
    
        var arr = document.querySelectorAll("table.psia-calendar-list-table td");
        arr.forEach( block => {
            // clinic name
            var name = block.querySelector("span.psia-calendar-list-event-name").innerHTML;
            // clink link
            var link = block.querySelector("a").getAttribute("href");
            // clink id
            var path = link.split('&');
            var id = eval(path[path.length - 1].split('=')[1]);
    
            // date time information
            var datetime = block.querySelector("div.psia-calendar-list-table-event-name-mobile");
            var r = datetime.querySelector("span.psia-calendar-list-event-name");
            datetime.removeChild( r );
            if( datetime.innerHTML.slice(0,4) == '<br>' ) {
                var dtString = datetime.innerHTML.replace('<br>','');
            } else {
                var dtString = datetime.innerHTML;
            }
    
            var dtArray = dtString.split('<br>');
            var days = 1;
            // check if the clinic is multiple days        
            if( name.toLowerCase().search("2-day") > -1 || name.toLowerCase().search("2 day") > -1  ) {            
                var days = 2;
                var dayArray = dtArray[0].split('-');
                var date = new Date( dayArray[0].trim() + ' ' + pageYear );
            } else if ( name.toLowerCase().search("3-day")>-1){
                var days = 3;
                var dayArray = dtArray[0].split('-');
                var date = new Date( dayArray[0].trim() + ' ' + pageYear );
            } else if ( dtArray[0].search("-") > -1 ){
                var dayArray = dtArray[0].split('-');
                var date = new Date(dayArray[0].trim() + ' ' + pageYear );
                var endDay = new Date(dayArray[1].trim() + ' ' + pageYear);
                var days = Math.floor((endDay - date) / ( 24 * 3600 * 1000));
            } else {            
                var date = new Date( dtArray[0] + ' ' + pageYear);
            }
                        
            // final check for invalid dates
            if ( date.toString() == 'Invalid Date'){
                var date = new Date( pageYear, pageMonth - 1 , 1);
                console.log( "Invalid Date ", name , date , dtString);
                console.log( block );
                return;
            }
            
            // time
            var time = dtArray[1];
            if( time == null) {
                time = 'full day - TBA';
            }
    
            // sport 
            var rgba = block.parentElement.style.backgroundColor;           
            var sport = this.colorToSport(rgba);
            if( sport == null) {
                console.log(rgba, block);
            }
    
            // figure out location        
            var location = this.locationMatch(name);
            
            // event status
            var event = block.querySelector("span.psia-calendar-event-modifier");
            if ( event != null) {
                var status = event.innerHTML;
            } else {
                var status = null;
            }
    
            this.clinics.push( new Clinic(id, sport, date.toISOString() , time, name, location, link, status, days) );
        });
        console.log("Fetch finished", arr.length, "items");
    }  
}

window.addEventListener("load", () => {
    psiaList.init();
});
