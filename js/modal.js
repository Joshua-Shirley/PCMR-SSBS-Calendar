
let modal = {

    init: function() {

    },

    button: function(inner, id = null, classList = null) {
        var button = document.createElement("button");
        button.innerText = inner;
        button.type = "button";
        if (id != null) {
            button.id = id;
        }
        button.classList.add("btn");        
        for (var i = 0; i < classList.length; i++){
            button.classList.add(classList[i]);
        }        
        return button;
    },

    close: function() {
        var m = document.getElementById("modal1");
        m.remove();
    },    

    modal: function(title, messageObject) {

        var modal = document.createElement("div");
        modal.id = "modal1";
        modal.classList.add("modal");
        modal.setAttribute("tabindex","-1");
    
        var box = document.createElement("div");
        box.classList.add("modal-dialog");
        modal.appendChild(box);
    
        var content = document.createElement("div");
        content.classList.add("modal-content");
        box.appendChild(content);
    
        var header = document.createElement("div");
        header.classList.add("modal-header");
        content.appendChild(header);
    
        var header5 = document.createElement("h5");
        header5.classList.add("modal-title");
        header5.innerText = title;
        header.appendChild(header5);
        
        var buttonX = this.button("x","modalX",["close"]);   
        buttonX.setAttribute("onclick","modal.close()");
        header.appendChild(buttonX);
    
        var body = document.createElement("div");
        body.classList.add("modal-body");
        content.appendChild(body);
            
        if( typeof messageObject == 'object'){
            body.appendChild(messageObject);
        } else if ( typeof messageObject == 'string') {
            var p = document.createElement("p");
            p.innerText = messageObject;
            body.appendChild(p);
        }     
    
        var footer = document.createElement("div");
        footer.classList.add("modal-footer");
        content.appendChild(footer);
                
        var buttonClose = this.button("Close","modalClose",["close"]);
        buttonClose.setAttribute("onclick","modal.close()");
        footer.appendChild(buttonClose);
                    
        return modal;
    }
}
