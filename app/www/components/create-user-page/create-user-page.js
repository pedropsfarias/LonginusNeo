define([
    'text!create-user-page/create-user-page.html',
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

        return Vue.component('create-user-page', {

            components: {
                'loader-component': loaderComponent,
                'menu-component': menuComponent,
                'message-component': messageComponent,
            },

            data: function () {
                return {
                    showLoader: true,
                    loaderMessage: '',
                    isInvalid: true,
                    action: 'Criar',
                    name: '',
                    email: '',
                    pass1: '',
                    pass2: '',
                    disableErrorPass: true,
                    disableErrorPass1: true,
                    disableErrorEmail: true,
                    disableErrorName: true,
                };
            },

            mounted: function () {

                new Promise((r) => {
                    helper.setWindowTitle('Criar usuário - Longinus')
                    this.getUser();
                    r();
                }).then(() => {
                    M.AutoInit();
                    M.updateTextFields();
                })

            },

            methods: {

                validate() {

                    this.disableErrorPass = this.pass1 == this.pass2;
                    this.disableErrorPass1 = helper.validatePassword(this.pass1);
                    this.disableErrorEmail = helper.validateEmail(this.email);
                    this.disableErrorName = this.name != '';

                    return (this.disableErrorPass && this.disableErrorPass1 && this.disableErrorEmail && this.disableErrorName)

                },

                getUser() {

                    if (app.user) {

                        this.action = 'Editar';
                        this.name = app.user.name;
                        this.email = app.user.email;
                        this.pass1 = 'the fake password';
                        this.pass2 = 'the fake password';


                    } else {

                        this.action = 'Criar';
                        this.name = '';
                        this.email = '';
                        this.pass1 = '';
                        this.pass2 = '';

                    }

                },

                save() {

                    if (this.validate()) {

                        let user = {
                            email: this.email,
                            name: this.name,
                            hash: sha256(this.pass1)
                        };
                        let method = 'POST';

                        if (app.user) {
                            user.id = app.user.id;
                            method = 'PUT';

                            if (this.pass1 == 'the fake password') {
                                delete user.hash;
                            }
                        }

                        this.persistUser(user, method);


                    }



                },

                persistUser(data, method) {

                    const options = {
                        url: config.serverUrl + '/user',
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

                                if (response.data.success) {
                                    page.redirect('/users');
                                } else {
                                    this.$refs.messageBox.alert({
                                        title: response.data.message
                                    });
                                }

                            } else {
                                app.registerError({
                                    level: 0,
                                    message: 'Não foi possível criar o usuário.',
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