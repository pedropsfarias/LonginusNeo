define(['vue', 'require', 'page', 'routes', 'store'], function (Vue, require, page, routes, store) { // jshint ignore:line

    class App {

        token = null;
        vue = null;

        constructor() { }


        initialize() {

            this._getStoredParams();
            this._createVueInstance();
            this._registerRoutes();
            this._checkPermissions();
            this._handleURL();

        };

        _createVueInstance() {

            this._vue = new Vue({
                el: '#app',
                data: {
                    ViewComponent: { render: h => h('div', 'loading...') }
                },
                render(h) { return h(this.ViewComponent); }
            });

        };

        _registerRoutes() {

            for (let i = 0; i < routes.length; i++) {
                const route = routes[i];
                page(route.path, () => {
                    require([route.component], (page) => {
                        this._vue.ViewComponent = page;
                    });
                });
            }

            page({
                hashbang: true
            });

        };

        _getStoredParams() {

            this.token = localStorage.getItem('token');

        };

        setStoredParams() {

            localStorage.setItem('token', this.token);

        };

        _handleURL() {

            if (this.token) {

                if (location.hash != '') {

                    page(location.hash);

                } else {

                    page.redirect('/devices');

                }

            } else {

                page('/login');

            }

        };

        _checkPermissions() {

            if (typeof cordova != undefined && cordova.platformId != 'browser') {

                const permissionsList = [
                    'android.permission.ACCESS_COARSE_LOCATION',
                    'android.permission.ACCESS_FINE_LOCATION',
                    'android.permission.ACCESS_LOCATION_EXTRA_COMMANDS'
                ];

                let permissions = cordova.plugins.permissions;
                permissions.hasPermission(permissionsList, status => {

                    if (!status.hasPermission) {

                        permissions.requestPermissions(permissionsList, () => { }, () => {

                            this._checkPermissions();

                        });

                    }

                });

            }

        };



    }

    return new App();



});