define([
    'text!list-user-page/list-user-page.html',
    'vue',
    'axios',
    'loader-component/loader-component',
    'menu-component/menu-component',
    'message-component/message-component',
    'helper',
    'config',
    'page',
    'app'
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
        page,
        app) { // jshint ignore:line

        return Vue.component('list-user-page', {
            components: {
                'loader-component': loaderComponent,
                'menu-component': menuComponent,
                'message-component': messageComponent,
            },
            data: function () {
                return {
                    showLoader: true,
                    loaderMessage: '',
                    users: null,
                    isAndroid: cordova.platformId != 'browser',
                    intervalCount: 0,
                    interval: 0

                };
            },
            mounted: function () {

                M.AutoInit();
                helper.setWindowTitle('Listagem de Usuários - Longinus')
                this.getUsers();

            },

            methods: {

                getUsers() {

                    const options = {
                        url: config.serverUrl + '/user',
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
                                this.users = response.data;
                            } else {
                                app.registerError({
                                    level: 0,
                                    message: 'Não foi possível resgatar os usuários.',
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

                persistUser(user) {

                    app.user = user;
                    page.redirect('/user')

                },

                start(user) {

                    if (!this.interval) {
                        this.interval = setInterval(() => {

                            this.intervalCount++;
                            if (this.intervalCount > 4) {

                                if (user.id == 1) {

                                    this.$refs.messageBox.alert({
                                        title: 'Não é possível excluir o usuário administrador!'
                                    });

                                } else {

                                    this.$refs.messageBox.show({
                                        title: 'Excluir usuário?',
                                        message: `Deseja excluir o usuário "${user.name}"?`,
                                        confirmText: 'Sim',
                                        cancelText: 'Não'
                                    }).then(() => {
                                        this.deleteUser(user);
                                    });

                                }

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

                startLocation(user) {

                    app.deviceId = user.id;
                    page.redirect('/position');

                },

                deleteUser(user) {

                    const options = {
                        url: config.serverUrl + '/user',
                        method: 'DELETE',
                        withCredentials: false,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8',
                            token: app.token,
                        },
                        data: user
                    };

                    axios(options)
                        .then(response => {
                            if (response.status < 400) {

                                if (response.data.success) {
                                    this.getUsers();
                                } else {
                                    this.$refs.messageBox.alert({
                                        title: 'Não foi possível excluir o usuário.',
                                        message: 'Existem dispositivos atrelados ao usuário.'
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