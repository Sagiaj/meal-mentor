<template>
  <v-layout row wrap text-xs-center align-center>
    <v-flex class="xs6">
      <v-layout row wrap justify-center>
        <v-flex>
          <v-btn
            outline
            large
            style="border-radius: 50% 7% 50% 1%;"
            @click.stop="loginDialog = true"
          >
            Login
            <v-icon class="ml-2">fingerprint</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex class="xs6">
      <v-layout row wrap justify-center>
        <v-flex>
          <v-btn
            outline
            large
            style="border-radius: 7% 50% 1% 50%;"
            @click.stop="registerDialog = true"
          >
            <v-icon class="mr-2">group_add</v-icon>
            Register
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <LoginDialog
      ref="loginForm"
      :loginDialog="loginDialog"
      :isSubmitting="isSubmitting"
      @cancelDialog="cancelDialog"
      @attemptLogin="login"
    />
    <RegisterDialog
      ref="registerForm"
      :registerDialog="registerDialog"
      :isSubmitting="isSubmitting"
      @cancelDialog="cancelDialog"
      @attemptRegister="register"
    />
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoginDialog from "@/components/auth/LoginDialog";
import RegisterDialog from "@/components/auth/RegisterDialog";

export default {
  name: "AuthView",
  components: {
    LoginDialog,
    RegisterDialog
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions([
      "authUserLogin",
      "authUserRegister",
      "verifyUser",
      "propagateError"
    ]),
    async login({ email, password }) {
      try {
        this.isSubmitting = true;
        await this.authUserLogin({ email, password });
        this.$refs.loginForm.finishedProcessing = true;
        this.goToAuthenticatedHome();
      } catch (err) {
        this.propagateError(err);
      }
      this.cancelDialog();
      this.isSubmitting = false;
    },
    cancelDialog() {
      this.loginDialog = false;
      this.registerDialog = false;
      this.isSubmitting = false;
    },
    goToAuthenticatedHome() {
      this.$router.push({
        path: "/",
        name: ""
      });
    },
    async register(username, email, password) {
      try {
        this.isSubmitting = true;
        await this.authUserRegister({ username, email, password });
        this.$refs.registerForm.finishedProcessing = true;
        this.goToAuthenticatedHome();
      } catch (err) {
        this.propagateError(`Failed registering. Error: ${err}`);
      }
      this.cancelDialog();
      this.isSubmitting = false;
    }
  },
  created() {
    try {
      if (this.user) {
        this.goToAuthenticatedHome();
        this.verifyUser().then(resUsr => {
          if (!resUsr) {
            this.authUserLogout();
          }
        });
      }
    } catch (err) {
      this.propagateError(`Failed getting verified user.`);
    }
  },
  data() {
    return {
      loginDialog: false,
      registerDialog: false,
      isSubmitting: false
    };
  }
};
</script>
