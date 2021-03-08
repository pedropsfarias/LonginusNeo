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
                    isAndroid: cordova.platformId != 'browser',
                    intervalCount: 0,
                    interval: 0


                };
            },
            mounted: function () {

                M.AutoInit();
                helper.setWindowTitle('Obter posição - Longinus')
                this.getDevices();

            },

            methods: {

                getDevices() {

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
                },

                persistDevice(device) {

                    app.device = device;
                    page.redirect('/device')

                },

                start(device) {

                    if (!this.interval) {
                        this.interval = setInterval(() => {

                            this.intervalCount++;
                            if (this.intervalCount > 4) {

                                this.$refs.messageBox.show({
                                    title: 'Excluir dispostivo?',
                                    message: `Deseja excluir o dispositivo "${device.description}"?`,
                                    confirmText: 'Sim',
                                    cancelText: 'Não'
                                }).then(() => {
                                    this.deleteDevice(device);
                                });

                                this.stop();

                            }
                        }, 100)
                    }
                },

                stop() {

                    clearInterval(this.interval);
                    this.intervalCount = 0;
                    this.interval = false;

                },

                startLocation(device) {

                    app.deviceId = device.id;
                    page.redirect('/position');

                },

                deleteDevice(device) {

                    const options = {
                        url: config.serverUrl + '/device',
                        method: 'DELETE',
                        withCredentials: false,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8',
                            token: app.token,
                        },
                        data: device
                    };

                    axios(options)
                        .then(response => {
                            if (response.status < 400) {

                                if (response.data.success) {
                                    this.getDevices();
                                } else {
                                    this.$refs.messageBox.alert({
                                        title: 'Não foi possível excluir o dispositivo.',
                                        message: 'Existem dados de rastreamento atrelados ao dispositivo.'
                                    })
                                }
                            } else {
                                app.registerError({
                                    level: 0,
                                    message: 'Não foi possível apagar o dispositivo.',
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