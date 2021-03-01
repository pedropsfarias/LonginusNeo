requirejs.config({
    baseUrl: 'components',
    paths: {
        helper: '../js/helper',
        config: '../js/config',
        vue: '../lib/vue/vue',
        materialize: '../lib/materialize/materialize',
        text: '../lib/require/text',
        axios: '../lib/axios/axios.min',
        sha256: '../lib/sha256/sha256',
    }
});

let app;

// Start loading the main app file. Put all of
// your application logic in there.
define(['vue', 'require'], function (Vue, require) { // jshint ignore:line

    app = new Vue({
        el: '#app',
        data: {
            ViewComponent: { render: h => h('div', 'loading...') }
        },
        render(h) { return h(this.ViewComponent) }
    });


    require(['login-page/login-page'], function (foo) {

        app.ViewComponent = foo;

    });


});



