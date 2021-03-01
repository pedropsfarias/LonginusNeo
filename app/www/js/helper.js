define([], function () { // jshint ignore:line

    return {

        validateEmail: function (email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },

        validatePassword: function (password) {
            return password.length >= 3;
        },

        setWindowTitle: function (title) {
            document.title = title || 'Longinus'
        }

    }

});