class Guest {
    constructor(first = null, last = null, id = null) {
        this.id = id != null ? id : Math.floor(Math.random() * (10000 - 1000) + 1000);
        this.last = last != null ? last : null;
        this.first = first != null ? first : null;
    }  

    id(last,first){
        // use the last name to create a presorted id number
    }
}

class Lesson {    
    constructor(guestId, date, time = 'full') {        
        this.guestId = guestId;
        this.date = new Date(date);        
        if ( ['full', 'am', 'pm'].indexOf(time.toLowerCase()) != -1) {
            this.time = time.toLowerCase();
        } else {
            this.time = 'full';
        }     
    }          
}

let private = {

    data: {
        guests: [],
        lessons: []
    },

    dayRow: null,
    
    reset: function() {
        localStorage.removeItem("guests");
        this.data.guests = [];
        localStorage.removeItem("private_request");
        this.data.lessons = [];
        return true;
    },

    init: function() {
        this.binding();

        this.dayRow = document.getElementById("day1").cloneNode(true);

        var g = localStorage.getItem("guests");
        if ( g != '' && g != null) {
            g = JSON.parse(g);
            g.forEach(obj => { this.addGuest(obj.first, obj.last, obj.id) });
        }
    },

    addGuest: function(first, last, id = null) {
        var guest = new Guest(first, last, id);
        
        if ( this.isGuest(guest)) {
            this.data.guests.push(guest);
        }

        var id = this.idGuest(guest);

        localStorage.setItem("guests", JSON.stringify(this.data.guests));

        return id;
    },

    idGuest: function(guest){
        var index = this.data.guests.findIndex( g => g.last == guest.last && g.first == guest.first);
        return this.data.guests[index].id;
    },

    isGuest: function(guest) {
        var obj = this.data.guests.find( obj => obj.last == guest.last && obj.first == guest.first );  
        if( obj == undefined ) {
            return true;
        } else {
            return false;
        }
    
    },

    newLesson: function(guestId, date, time) {                
        var lesson = new Lesson(guestId, new Date(date).toISOString(), time);        
        this.data.lessons.push(lesson);
        localStorage.setItem("private_request",JSON.stringify(this.data.lessons));
    },

    formSave: function() {
        var form = document.forms['private'];
                       
        // Guest
        var guestId = this.addGuest(form.elements.guestFirst.value, form.elements.guestLast.value, null);

        console.log(guestId);

        localStorage.setItem("guests", JSON.stringify(this.data.guests));

        // Start Date
        var startDate = form.elements.startDate.value.split('-');
        var inputDate = new Date( startDate[0], startDate[1] - 1, startDate[2] )
        
        // How many days - Default is One
        var days = parseInt( form.elements.days.value );               
        if ( isNaN(days) ) {
            days = 1;
        }

        console.log("Iterate ", days, "times");
        // Iterate Days        
        for( var d = 1; d <= days; d++) {
            
            // fetch the day time option value
            var time = form.querySelectorAll("[name='day"+ d +"']:checked")[0].value.toLowerCase();
            
            // create new lesson object
            this.newLesson( guestId, inputDate, time);
            
            // increment date by one day
            inputDate.setDate( inputDate.getDate() + 1);
        }

        // Lesson
        console.log( this.data.lessons);              
    },

    binding: function() {

        document.getElementById("privateDays").addEventListener("keyup", function() {
            private.showDays();
        });

        document.getElementById("privateDays").addEventListener("change", function() {
            private.showDays();
        });

        document.getElementById("save").addEventListener("click", function(evt) {
            evt.preventDefault();
            private.formSave();
            return false;
        });

    },

    showDays: function() {
        var days = document.getElementById("privateDays").value;
        var t = document.getElementById("days");
        // the cheap way
        t.innerHTML = "";

        var d = document.getElementById("startDate");
        if (d.value == '') {
            var sd = new Date();
            d.value = sd.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
        }
        for (var i = 0; i < days; i++) {
            t.append(this.cloneDayRow(i + 1));
        }
    },

    cloneDayRow: function(number) {

        var copy = this.dayRow.cloneNode(true);
        var d = new Date(document.getElementById("startDate").value);
        d.setDate(d.getDate() + number);

        copy.id = 'day' + number;
        copy.querySelector("h4").innerText = 'Day ' + number + ' - ' + d.toDateString();
        // change input
        copy.querySelectorAll("input").forEach(el => {
            // change name
            el.name = el.name.replace("1", number);
            // change ids
            el.id = el.id.replace("1", number);
            // change values
            el.value = el.value.replace("1", number);
        });
        // change fors
        copy.querySelectorAll("label").forEach(el => { el.setAttribute("for", el.getAttribute("for").replace("1", number)) });

        return copy;
    },

    inputNumber: function(change = 0) {
        var pd = document.getElementById("privateDays");
        if (change == 0) {
            var n = 0;
        } else {
            var n = eval(pd.value) + change;
        }
        pd.value = n;

        private.showDays();
    }

}

private.init();