define(['vue', 'materialize', 'text!message-component/message-component.html'], function (Vue, M, template) { // jshint ignore:line

    return Vue.component('message-component', {
        data: function () {
            return {
                isActive: false,
                title: '',
                message: ''
            }
        },
        template: template
    })

});