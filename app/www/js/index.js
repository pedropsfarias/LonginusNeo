requirejs.config({
    baseUrl: 'components',
    paths: {
        app: '../js/app',
        helper: '../js/helper',
        config: '../js/config',
        routes: '../js/routes',
        vue: '../lib/vue/vue',
        materialize: '../lib/materialize/materialize',
        text: '../lib/require/text',
        axios: '../lib/axios/axios.min',
        sha256: '../lib/sha256/sha256',
        page: '../lib/page/page',
        store: '../lib/store/store.min',

    }
});

let app;

require(['app'], function (app) { // jshint ignore:line

    app.initialize();

});



