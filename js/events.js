class Event {
    type = ['work','training','personal','clinic'];
    constructor ( dateTimeStart, dateTimeFinish, name, description, type ) {
        this.id = Math.floor( Math.random() * (100000 - 10000) + 10000 );
        var dTS = new Date(dateTimeStart);
        this.dateTimeStart = dTS.toISOString();
        var dTF = new Date(dateTimeFinish)
        this.dateTimeFinish = dTF.toISOString();        
        this.name = name;
        this.description = description;
        this.type = type;
    }
}

class Events {
    constructor() {
        this.events = [];
    }

    add(eventObj, callback) {           
        // check for conflicts             
        if ( !this.checkConflicts(eventObj) ) {            
            this.events.push(eventObj);     
            this.save();        
        } else {
            console.log("conflict check");
            this.conflictViewer(eventObj);
        }  
        if (callback instanceof Function) {
            return callback();                        
        }       
    }
    
    conflictViewer(eventObj) {
        var filtered = this.events.filter( ev => this.conflict( eventObj , ev ));                  
        
        function div(cls, inner) {
            var divElement = document.createElement("div");             
            divElement.classList.add(cls);
            if( typeof inner == 'object') {
                divElement.append(inner);
            } else if ( inner != undefined) {                
                divElement.innerText = inner;    
            }
            return divElement;
        }

        function button(id) {
            var b = document.createElement("button");
            b.type = 'button';
            b.name = 'remove';
            b.id = 'e' + id;
            b.innerText = "Delete";
            b.addEventListener("click",function() { 
                eventer.delete(id, modal.close() ); 
            });
            return b; 
        }

        var d = div("conflict");

        for( var i = 0; i < filtered.length; i++){
            console.log(filtered[i]);
            // row
            var row = div("row");
            
            // col 1
            var dS = new Date(filtered[i].dateTimeStart);
            var d1 = div("col-3", dS.toLocaleDateString("en-US"));                                    
            row.append(d1);

            // col 2
            var d2 = div("col-2", filtered[i].type);            
            row.append(d2);

            // col 3            
            var d3 = div("col-5", filtered[i].name);            
            row.append(d3);

            // col 4
            var d4 = div("col-2", button(filtered[i].id) );            
            row.append(d4);

            d.append(row);            
        }
        
        document.body.append( modal.modal( "Schedule Conflict" , d ) );
    }

    checkConflicts(newEvent){
        var filtered = this.events.filter( ev => this.conflict( newEvent , ev ));
        if( filtered.length > 0) {
            return true;
        }
        return false;
    }

    conflict(event1,event2){
        var aStart = new Date(event1.dateTimeStart);
        var aFinish = new Date(event1.dateTimeFinish);
        var bStart = new Date(event2.dateTimeStart);
        var bFinish = new Date(event2.dateTimeFinish);

        if ( bStart < aStart && bFinish < aStart ){
            //console.log("Case 1", false);
            return false;
        } else if ( bStart > aFinish && bFinish > aFinish) {
            //console.log("Case 2", false);
            return false;
        } else if ( bStart < aStart && bFinish > aFinish){
            // case 6
            console.log("Case 3", false);
            return false;
        } else if ( bStart == aStart && bFinish == aFinish) {            
            // case 7 
            return false;
        }
        return true;        
    }

    delete(eventId,callback) {
        var index = this.events.findIndex( ev => ev.id == eventId);        
        this.events.splice(index,1);    
        this.save();   
        if (callback instanceof Function) {
            return callback();                                
        }  
        return true;
    }

    remove(event,callback){
        var index = this.events.findIndex( ev => ev.dateTimeStart == event.dateTimeStart);
        this.events.splice(index,1);        
        this.save();
        if (callback instanceof Function) {
            return callback();                        
        }  
        console.log(index, event, 'removed');
    }
  
    save() {
        localStorage.setItem("events", JSON.stringify(this.events));        
    }

    load() {
        if( localStorage.getItem("events") == ''){
            localStorage.setItem("events",'[]');
        }
        var arr = JSON.parse(localStorage.getItem("events"));        
        if ( arr != null ) {
            arr.forEach( ev => {
                var newEvent = new Event(ev.dateTimeStart, ev.dateTimeFinish, ev.name, ev.description, ev.type);
                this.add(newEvent);
            });
        }
    }    
}

let eventer = new Events();
eventer.load();