define(['text!login-page/login-page.html', 'vue', 'axios', 'loader-component/loader-component', 'helper', 'config', 'sha256'], function (template, Vue, axios, loaderComponent, helper, config, sha256) { // jshint ignore:line

    return Vue.component('login-page', {
        components: {
            'loader-component': loaderComponent
        },
        data: function () {
            return {
                errors: false,
                errorMessage: '',
                email: '',
                password: '',
                isInvalid: true,
                showLoader: false,
                loaderMessage: '',
            };
        },
        mounted: function () {
            M.AutoInit();
            this.validate();
            helper.setWindowTitle('Login - Longinus')
        },
        methods: {
            validate: function () {
                this.isInvalid = !(
                    helper.validateEmail(this.email) &&
                    helper.validatePassword(this.password)
                );
            },
            login: function () {
                this.showLoader = true;
                const options = {
                    url: config.serverUrl + '/auth',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                        email: this.email,
                        hash: sha256(this.password),
                    },
                };
                axios(options)
                    .then(response => {
                        if (response.data) {
                            app.token = response.data.token;
                            page.redirect('/devices');
                        } else {
                            this.errors = true;
                            this.errorMessage = response.message;
                        }
                    })
                    .catch(e => {
                        this.errors = true;
                        if (e.response.data) {
                            this.errorMessage = e.response.data.message;
                        } else {
                            this.errorMessage =
                                'Não foi possível estabelecer conexão com o servidor. Contacte o administrador.';
                        }
                    })
                    .finally(() => {
                        this.showLoader = false;
                    });
            },
        },
        template: template
    })

});