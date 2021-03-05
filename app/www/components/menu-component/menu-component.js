define(['vue', 'materialize', 'text!menu-component/menu-component.html'], function (Vue, M, template) { // jshint ignore:line

    return Vue.component('menu-component', {
        data: function () {
            return {
                isActive: false,
                message: null
            }
        },
        template: template
    })

});