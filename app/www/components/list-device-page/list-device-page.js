define([
    'text!list-device-page/list-device-page.html',
    'vue',
    'axios',
    'loader-component/loader-component',
    'menu-component/menu-component',
    'message-component/message-component',
    'helper',
    'config',
    'sha256',
    'page',
    'app',
    'mapbox'
],
    function (
        template,
        Vue,
        axios,
        loaderComponent,
        menuComponent,
        messageComponent,
        helper,
        config,
        sha256,
        page,
        app,
        mapboxgl) { // jshint ignore:line

        return Vue.component('list-device-page', {
            components: {
                'loader-component': loaderComponent,
                'menu-component': menuComponent,
                'message-component': messageComponent,
            },
            data: function () {
                return {
                    showLoader: true,
                    loaderMessage: '',
                    devices: null,
                    isAndroid: cordova.platformId != 'browser'



                };
            },
            mounted: function () {

                console.log(messageComponent)

                M.AutoInit();
                helper.setWindowTitle('Obter posição - Longinus')

                this.getDevices();
            },

            methods: {

                getDevices: function () {

                    const options = {
                        url: config.serverUrl + '/device',
                        method: 'GET',
                        withCredentials: false,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8',
                            token: app.token,
                        }
                    };

                    axios(options)
                        .then(response => {
                            if (response.status < 400) {
                                this.devices = response.data;
                            } else {
                                app.registerError({
                                    level: 0,
                                    message: 'Não foi possível resgatar os dispositivos.',
                                    raw: response
                                });
                            }
                        })
                        .catch(e => {
                            app.registerError({
                                level: 0,
                                message: 'Não foi possível conectar ao servidor. Sem conexão de internet.',
                                raw: e
                            });
                        });
                }

            },
            template: template
        })

    });