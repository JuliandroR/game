<template>
  <section class="container">
    <div class="center-text">
      <h3 class="title">Autenticar-se</h3>
      <p class="subtitle">Para começar, efetue autenticação ou crie uma nova conta na opção "Criar nova conta".</p>
    </div>
    <form @submit.prevent="signin">
      <signin-inputs v-model="user" />
      <signin-actions />
    </form>
    <alert id="signin-alert" title="Erro" :message="error" confirmMessage="Confirmar" />
  </section>
</template>

<script>
import SigninInputs from "./components/SigninInputs";
import SigninActions from "./components/SigninActions";
import Alert from "@/commons/components/Alert";

import getMessageError from "@/globals/utils/getMessageError.js";
import actionTypes from "@/commons/constants/action-types";

export default {
  name: "signin",
  components: { Alert, SigninInputs, SigninActions },
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      error: ""
    };
  },
  methods: {
    async signin() {
      try {
        const credentials = { email: this.user.email, password: this.user.password };
        let user = await this.$store.dispatch(actionTypes.SIGNIN, credentials);
        user = await this.$store.dispatch(actionTypes.FIND_USER, user.user.uid);
        this.goToClassPage(user);
      } catch (error) {
        this.showError(error);
      }
    },
    goToClassPage(user) {
      if (this.isUserATeacher(user.role)) {
        this.$router.push({ name: "teacherClass", params: {teacherId: user.uid } });
      } else {
        this.$router.push({ name: "studentClass", params: {studentId: user.uid} });
      }
    },
    isUserATeacher(role) {
      return role === "teacher";
    },
    showError(error) {
      console.log(error)
      const errorMessage = getMessageError(error);
      this.error = errorMessage;
      this.$modal.show("signin-alert");
    }
  }
};
</script>
