<template>
    <div class="full cyan darken-4">
        <img class="full-logo" src="../img/longinus.svg" alt="" srcset="" />
        <div class="container rounded-border white mt-3 p-1">
            <form>
                <div class="row">
                    <div class="input-field col s12 m6">
                        <input
                            v-model="email"
                            id="email"
                            type="email"
                            class="validate"
                            v-on:input="validate"
                        />
                        <label for="email">Email</label>
                    </div>

                    <div class="input-field col s12 m6">
                        <input
                            v-model="password"
                            id="password"
                            type="password"
                            class="validate"
                            autocomplete="on"
                            v-on:input="validate"
                        />
                        <label for="password">Senha</label>
                    </div>

                    <div
                        v-if="errors"
                        class="input-field col s12 text-center red-text"
                    >
                        {{ errorMessage }}
                    </div>

                    <div class="input-field col s12">
                        <a
                            class="waves-effect waves-light btn-flat float-left pl-0"
                        >
                            Esqueci minha senha
                        </a>
                        <a
                            v-on:click="login"
                            :disabled="isInvalid"
                            class="waves-effect waves-light btn float-right"
                            >Entrar</a
                        >
                    </div>
                </div>
            </form>
        </div>
        <loaderComponent
            v-bind:isActive="showLoader"
            v-bind:message="loaderMessage"
        />
    </div>
</template>

<script>
import sha256 from 'sha256';
import M from 'materialize-css';
import helper from '../js/helpers';
import config from '../js/config';
import loaderComponent from '../components/loader-component.vue';
import page from 'page';

export default {
    components: { loaderComponent },
    data: function() {
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
    mounted() {
        M.AutoInit();
        this.validate();
    },
    methods: {
        validate: function() {
            this.isInvalid = !(
                helper.validateEmail(this.email) &&
                helper.validatePassword(this.password)
            );
        },
        login: function() {
            this.showLoader = true;
            const url = config.serverUrl + '/auth';
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    email: this.email,
                    hash: sha256(this.password),
                },
            };

            console.log('a');

            fetch(url, options)
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        app.token = response.token;
                        page.redirect('/devices');
                    } else {
                        this.errors = true;
                        this.errorMessage = response.message;
                    }
                })
                .catch(e => {
                    this.errors = true;
                    this.errorMessage =
                        'Não foi possível estabelecer conexão com o servidor. Contacte o administrador.';
                })
                .finally(() => {
                    this.showLoader = false;
                });
        },
    },
};
</script>

<style></style>
