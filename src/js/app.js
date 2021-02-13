import Vue from "vue";
import '../css/app.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';

export default class App {

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

    _registerRoutes() {

        this._vue.ViewComponent = require('../pages/Login.vue').default
        this._vue.ViewComponent.props = { a: 'a' }

    }


}