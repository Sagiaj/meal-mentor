<template>
  <v-dialog
    v-if="loginDialog"
    v-model="loginDialog"
    scrollable
    absolute
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title>
        <span class="headline">User Login</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" lazy-validation v-model="valid">
            <v-row wrap>
              <v-col xs="12">
                <v-text-field
                  name="email"
                  type="email"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col xs="12">
                <v-text-field
                  name="password"
                  v-model="password"
                  type="password"
                  :rules="passwordRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions v-if="!isSubmitting">
        <v-spacer></v-spacer>
        <v-btn light outlined text @click.native="cancelDialog()"
          ><v-icon>cancel</v-icon></v-btn
        >
        <v-btn
          light
          outlined
          text
          :disabled="!valid"
          @click.native="attemptLogin()"
          ><v-icon>check</v-icon></v-btn
        >
      </v-card-actions>
      <v-row wrap v-else justify="center">
        <v-col xs="12" align="center">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LoginDialog",
  props: ["loginDialog", "isSubmitting"],
  components: {},
  methods: {
    cancelDialog() {
      this.$emit("cancelDialog", []);
      this.email = "";
      this.password = "";
    },
    async attemptLogin() {
      if (this.$refs.form.validate()) {
        this.$emit("attemptLogin", {
          email: this.email,
          password: this.password
        });
      }
    }
  },
  data() {
    return {
      email: "",
      password: "",
      finishedProcessing: false,
      valid: true,
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Email must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          String(v).length >= 6 || "Password must contain 6 or more characters"
      ]
    };
  }
};
</script>
