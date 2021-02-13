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

          <div v-if="errors" class="input-field col s12 text-center red-text">
            Usuário e/ou senha incorreto(s).
          </div>

          <div class="input-field col s12">
            <a class="waves-effect waves-light btn-flat float-left pl-0">
              Esqueci minha senha
            </a>
            <a
              :disabled="isInvalid"
              class="waves-effect waves-light btn float-right"
              >Entrar</a
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import helper from "../js/helpers";

export default {
  data: function() {
    return {
      errors: false,
      email: "",
      password: "",
      isInvalid: true,
    };
  },
  mounted() {
    M.AutoInit();
  },
  methods: {
    validate: function() {
      this.isInvalid = !(
        helper.validateEmail(this.email) &&
        helper.validatePassword(this.password)
      );
    },
    login: function() {},
  },
};
</script>

<style></style>
