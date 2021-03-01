define(['vue', 'materialize', 'text!loader-component/loader-component.html'], function (Vue, M, template) { // jshint ignore:line

    return Vue.component('loader-component', {
        data: function () {
            return {
                isActive: false,
                message: null
            }
        },
        template: template
    })

});