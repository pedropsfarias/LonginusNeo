define([
    'text!not-found-page/not-found-page.html',
    'vue',
], function (template, Vue) {

    return Vue.component('not-found-page', {
        data: function () {
            return {
            };
        },
        mounted: function () {
            M.AutoInit();
        },
        template: template
    })

});