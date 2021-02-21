import Vue from "vue";
import '../css/app.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import page from 'page';

export default class App {

    _token = null;

    constructor() {

        this._vue = new Vue({
            el: '#app',
            data: {
                ViewComponent: { render: h => h('div', 'loading...') }
            },
            render(h) { return h(this.ViewComponent) }
        });

        this._registerRoutes();

    }

    get token() {
        return this._token;
    }

    set token(v) {
        this._token = v;
    }

    _registerRoutes() {

        page('/login', () => this._vue.ViewComponent = require('../pages/login-page.vue').default);
        page('/devices', () => this._vue.ViewComponent = require('../pages/devices-page.vue').default);

        page('*', () => this._vue.ViewComponent = require('../pages/404.vue').default);


        page({
            hashbang: true
        });


    }

}