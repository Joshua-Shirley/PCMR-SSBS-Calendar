let viewer = {

    init: function() {

        if( typeof calendar != 'object') {
            console.log('calendar object was not instantiated')
            return false;
        }

        if( typeof eventer != 'object') {            
            console.log('eventer object was not instantiated.');
            return false;
        }

    },

    display: function() {

        eventer.events.forEach( ev => {
            var el = document.getElementById(this.id(ev.dateTimeStart));
            el.classList.add(this.style(ev.type));
            var content = el.querySelector("div.date-content");
            content.innerHTML = '';
            switch(ev.type){
                case "Work":
                    var description = ev.description;
                    break;
                case "Clinic":
                    var description = ev.name;
                    break;
                default:
                    //'work','training','personal','clinic'
                    var description = 'TBA';
            }
            
            content.append(this.text( description ));
        });

    },

    id: function(date) {
        var n = new Date(date);
        return n.toDateString().toLowerCase().split(' ').join('');
    },

    text: function(message){
        var span = document.createElement("span");
        span.classList.add("date-message");
        span.innerText = message;
        return span;
    },

    style: function(type) {
        var c = null;
        switch(type){
            case 'Work':
                c = 'scheduled';
                break;
            case 'Clinic':
                c = 'clinic';
                break;
            case 'Private':
                c = 'scheduled'
                break;
            default:
                
        }
        return c;
    }

}

viewer.init();