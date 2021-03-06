define(['vue', 'materialize', 'text!message-component/message-component.html'], function (Vue, M, template) { // jshint ignore:line

    return Vue.component('message-component', {
        data: function () {
            return {
                isActive: false,
                title: '',
                message: '',
                confirmText: '',
                cancelText: '',
                events: {
                    onConfirm: null,
                    onCancel: null
                }
            }
        },
        methods: {
            show: function (c) {

                this.isActive = true;
                this.title = c.title;
                this.message = c.message;
                this.confirmText = c.confirmText || 'OK';
                this.cancelText = c.cancelText || 'Cancelar';

                return new Promise((confirmResponse, cancelResponse) => {

                    this.events.onConfirm = () => {

                        this.isActive = false;
                        confirmResponse();

                    }

                    this.events.onCancel = () => {

                        this.isActive = false;
                        cancelResponse();

                    }

                })

            },

            confirm: function () {

                this.events.onConfirm();

            },

            cancel: function () {

                this.events.onCancel();

            }
        },
        template: template
    })

});