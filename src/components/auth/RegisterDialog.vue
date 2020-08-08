<template>
  <v-dialog
    v-if="registerDialog"
    v-model="registerDialog"
    scrollable
    absolute
    persistent
    :overlay="false"
    max-width="60%"
    justify="center"
    align="center"
    centered
    center
    transition="dialog-transition"
  >
    <v-card height="100%">
      <v-card-title>
        <span class="headline">User Registration</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" lazy-validation v-model="valid">
            <v-row wrap>
              <v-col xs="12">
                <v-text-field
                  v-model="username"
                  :rules="usernameRules"
                  label="*Your name"
                  required
                ></v-text-field>
              </v-col>
              <v-col xs="12">
                <v-text-field
                  name="email"
                  type="email"
                  v-model="email"
                  :rules="emailRules"
                  label="*Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col xs="12">
                <v-text-field
                  name="password"
                  v-model="password"
                  :rules="passwordRules"
                  label="*Password"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions v-if="!isSubmitting">
        <v-btn
          @click.native="attemptRegister()"
          color="primary"
          :disabled="!valid"
          >Register</v-btn
        >
        <v-btn @click.native="cancelDialog()" text>Cancel</v-btn>
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
  name: "RegisterDialog",
  props: ["registerDialog", "isSubmitting"],
  components: {},
  watch: {
    finishedProcessing(v) {
      this.resetValues();
    }
  },
  methods: {
    cancelDialog() {
      this.$emit("cancelDialog", []);
      this.resetValues();
    },
    attemptRegister() {
      if (this.validate()) {
        this.$emit("attemptRegister", this.username, this.email, this.password);
      }
    },
    resetValues() {
      this.username = "";
      this.email = "";
      this.password = "";
    },
    validate() {
      return !!this.$refs.form.validate();
    }
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      valid: true,
      finishedProcessing: false,
      usernameRules: [v => !!v || "User name is required"],
      passwordRules: [
        v => !!v || "Password is required",
        v =>
          String(v).length >= 6 || "Password must contain 6 or more characters"
      ],
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Email must be valid"
      ]
    };
  }
};
</script>
