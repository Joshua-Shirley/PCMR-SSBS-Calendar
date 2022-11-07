let schedule = {

    data: {
        assigned: [],
        type: "Full Time",
        saturday: "None",
        sunday: "None"
    },

    init: function() {        
        this.bind();        
    },

    bind: function() {
        var days = document.querySelectorAll("div.day:not(.inactive):not(.weekday):not(.closed):not(.full)");
        if (days.length > 0) {
            days.forEach(day => {
                day.addEventListener('click', event => {
                    schedule.eventClick(new Date(day.getAttribute("datetime")));    
                    viewer.display();                
                });
            });
        }
    },

    eventClick: function(date) {
        var d = new Date(date);    
        this.pushEvent(d);   
        viewer.display();     
    },

    pushEvent: function(date) {
        var dateStart = new Date(date);
        dateStart.setHours(8,30,0,0);
        var dateFinish = new Date(date);
        dateFinish.setHours(4,0,0,0);
        var event = new Event( dateStart, dateFinish, 'Scheduled work day', 'general assignment', 'Work' );        
        //console.log(event);
        eventer.add( event );
        viewer.display();
    }    
}

schedule.init();