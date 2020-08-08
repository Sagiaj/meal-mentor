<template>
  <v-overlay
    v-model="dialog"
    fullscreen
    persistent
    absolute
    transition="dialog-transition"
  >
    <v-row justify="center" align="center">
      <v-col align="center">
        <v-progress-circular indeterminate size="150" width="10" color="primary"
          >Loading your preferencess...</v-progress-circular
        >
      </v-col>
    </v-row>
  </v-overlay>
</template>

<script>
export default {
  name: "AuthLoader",
  components: {},
  mounted() {},
  data() {
    return {
      dialog: true
    };
  }
};
</script>
