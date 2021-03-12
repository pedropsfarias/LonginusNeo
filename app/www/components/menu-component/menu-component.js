define(['vue', 'materialize', 'text!menu-component/menu-component.html', 'app'], function (Vue, M, template, app) { // jshint ignore:line

    return Vue.component('menu-component', {
        data: function () {
            return {
                isNormalUser: app.loggedUser.id != 1,
            }
        },
        template: template
    })

});