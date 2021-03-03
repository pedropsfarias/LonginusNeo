define(['vue', 'require', 'page', 'routes', 'store'], function (Vue, require, page, routes, store) { // jshint ignore:line

    return {

        token: null,
        _vue: null,

        initialize: function () {

            this._getStoredParams();
            this._createVueInstance();
            this._registerRoutes();
            // this._checkPermissions();
            this._handleURL();

        },

        _createVueInstance: function () {

            this._vue = new Vue({
                el: '#app',
                data: {
                    ViewComponent: { render: h => h('div', 'loading...') }
                },
                render(h) { return h(this.ViewComponent) }
            });

        },

        _registerRoutes: function () {

            for (let i = 0; i < routes.length; i++) {
                const route = routes[i];
                page(route.path, () => {
                    require([route.component], (page) => {
                        this._vue.ViewComponent = page;
                    })
                });
            }

            page({
                hashbang: true
            });

        },

        _getStoredParams: function () {

            this.token = localStorage.getItem('token');

        },

        setStoredParams: function () {

            localStorage.setItem('token', this.token);

        },

        _handleURL: function () {

            if (this.token) {

                if (location.hash != '') {

                    page(location.hash);

                } else {

                    page('/devices');

                }

            } else {

                page('/login');

            }

        },

        _checkPermissions: function () {

            if (device.platform != 'browser') {

                const permissionsList = [
                    'android.permission.ACCESS_COARSE_LOCATION',
                    'android.permission.ACCESS_FINE_LOCATION',
                    'android.permission.ACCESS_LOCATION_EXTRA_COMMANDS'
                ];

                let permissions = cordova.plugins.permissions;
                permissions.hasPermission(permissionsList, function (status) {

                    if (status.hasPermission) {

                        //page.redirect('/position');

                    } else {

                        permissions.requestPermissions(permissionsList, function () {

                            //page.redirect('/login');

                        }, function () {

                            // page.redirect('/devices');

                        });

                    }

                });

            } else {

                //page.redirect('/login');

            }

        }

    }



});