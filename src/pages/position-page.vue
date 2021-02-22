<template>
    <div class="full cyan darken-4">
        Position
        <loader-component
            v-bind:isActive="showLoader"
            v-bind:message="loaderMessage"
        />
    </div>
</template>

<script>
import axios from 'axios';
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
            showLoader: false,
            loaderMessage: '',
        };
    },
    mounted: function() {
        M.AutoInit();
        this.init();
    },
    methods: {
        init: function() {
            if (typeof cordova != 'undefined') {
                alert('cordova');
            }
        },
    },
};
</script>

<style></style>
