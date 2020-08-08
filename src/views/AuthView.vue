<template>
  <v-container fluid>
    <v-row justify="end" align="end" align-self="end">
      <v-col justify="end" align="end" align-self="end">
        lol
      </v-col>
    </v-row>
    <v-row justify="space-between" align="center">
      <v-col xs="6" align="center">
        <v-row justify="center">
          <v-col>
            <v-btn
              outlined
              large
              style="border-radius: 50% 7% 50% 1%;"
              @click.stop="loginDialog = true"
            >
              Login
              <v-icon class="ml-2">fingerprint</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col xs="6" align="center" align-self="end">
        <v-row justify="center">
          <v-col>
            <v-btn
              outlined
              large
              style="border-radius: 7% 50% 1% 50%;"
              @click.stop="registerDialog = true"
            >
              <v-icon class="mr-2">group_add</v-icon>
              Register
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
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
    </v-row>
  </v-container>
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
