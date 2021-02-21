<template>
    <div class="container rounded-border white mt-1 ">
        <div class="row">
            <div class="col s12">
                <p class="title cyan-text text-darken-4">
                    <i class="material-icons left">fence</i>Criar Cerca Digital
                </p>
            </div>

            <div id="map" class="input-field col s12 map rounded-border"></div>

            <div class="input-field col s12">
                <input id="nome" type="text" class="validate" />
                <label for="nome">Nome</label>
            </div>

            <div class="input-field col s12">
                <a class="waves-effect waves-light btn-flat pl-0 red-text"
                    ><i class="material-icons left">delete_outline</i>Apagar</a
                >
                <a class="waves-effect waves-light btn float-right"
                    ><i class="material-icons left">add</i>Salvar</a
                >
            </div>
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

            fetch(url, options)
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        app.token = response.token;
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
