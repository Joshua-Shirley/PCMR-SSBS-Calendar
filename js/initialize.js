let startup = {

    startUpPage: 'settings.html',

    init: function() {
        // First Visit Webpage - do not forward
        if (this.pageName() == this.startUpPage) {
            return;
        } else {
            // Is this their first visit?
            // localStorage should be undefined, null or false
            if (localStorage.getItem('setupComplete') == null || localStorage.getItem('setupComplete') == 'false') {
                this.isNotComplete();
                this.redirect(this.startUpPage);
                return;
            } else {
                return;
            }
        }
    },

    pageName: function() {
        var url = window.location.pathname.split('/');
        var filename = url[url.length - 1];
        return filename;
    },

    isNotComplete: function() {
        localStorage.setItem('setupComplete', 'false');
    },

    isComplete: function() {
        localStorage.setItem('setupComplete', 'true');
    },

    redirect: function(page) {
        window.location.replace(this.startUpPage);
    },

}

startup.init();