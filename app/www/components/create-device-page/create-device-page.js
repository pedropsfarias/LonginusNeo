define([
    'text!create-device-page/create-device-page.html',
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
                    deviceTypeList: config.deviceTypes,
                    deviceType: 'local_shipping',
                    description: '',
                    isInvalid: true
                };
            },

            mounted: function () {

                new Promise((r) => {
                    helper.setWindowTitle('Criar dispositivo - Longinus')
                    this.getDevice();
                    this.validate();
                    r();
                }).then(() => {
                    M.AutoInit();
                    M.updateTextFields();
                })

            },

            methods: {

                validate() {

                    this.isInvalid = this.description == '';

                },

                getDevice() {

                    if (app.device) {

                        this.description = app.device.description;
                        this.deviceType = app.device.deviceType;

                    } else {

                        this.description = '';
                        this.deviceType = 'shield';

                    }

                },

                save() {

                    let device = {
                        description: this.description,
                        deviceType: this.deviceType,
                        userId: app.user.id
                    };
                    let method = 'POST';

                    if (app.device) {
                        device.id = app.device.id;
                        method = 'PUT';
                    }

                    this.persistDevice(device, method);

                },

                persistDevice(data, method) {

                    const options = {
                        url: config.serverUrl + '/device',
                        withCredentials: false,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8',
                            token: app.token,
                        },
                        method,
                        data
                    };

                    axios(options)
                        .then(response => {
                            if (response.status < 400) {
                                page.redirect('/devices');
                            } else {
                                app.registerError({
                                    level: 0,
                                    message: 'Não foi possível criar o dispositivo.',
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