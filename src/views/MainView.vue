<template>
  <v-container fluid grid-list-xl v-if="user">
    <v-row wrap justify="center">
      <v-col>
        <h1 :style="titleFontSize">
          Hi <span class="primary--text">{{ user.username }}</span
          >, We missed you!
        </h1>
      </v-col>
    </v-row>
    <v-row wrap>
      <v-col cols="6" md="4" offset-md="1" lg="3" offset-lg="2" justify="center">
        <a @click="goToMealPlanner()">
          <v-card>
            <v-img
              responsive
              class="white--text align-end"
              src="https://image.freepik.com/free-vector/healthy-food_23-2147505260.jpg"
            >
            </v-img>
            <v-card-title primary-title class="pb-0">
              Plan a meal!
            </v-card-title>
            <v-card-text>
              Build a meal on your terms
            </v-card-text>
          </v-card>
        </a>
      </v-col>
      <v-col cols="6" md="4" offset-md="1" lg="3" offset-lg="2" justify="center">
        <a @click="goToSetup()">
          <v-card>
            <v-img
              responsive
              class="white--text align-end"
              src="https://image.freepik.com/free-vector/healthy-food_23-2147505260.jpg"
            >
            </v-img>
            <v-card-title primary-title class="pb-0">
              עדכון נתונים
            </v-card-title>
            <v-card-text>
              <!-- Build more accurate meals by keeping your stats up to date -->
              דייקו בארוחות ע"י נתונים עדכניים!
            </v-card-text>
          </v-card>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MainView",
  components: {},
  computed: {
    ...mapGetters(["user", "userSetupContent"]),
    titleFontSize() {
      return  `font-size: ${this.$vuetify.breakpoint.mdAndUp ? "2em" : "1.4em"};`;
    }
  },
  methods: {
    goToMealPlanner() {
      this.$router.push({
        path: "/meal"
      });
    },
    goToSetup() {
      this.$router.push({
        path: "/setup"
      });
    }
  },
  beforeMount() {
    if (!this.userSetupContent) {
      this.$router.push({
        path: "/setup"
      });
    }
  },
  data() {
    return {};
  }
};
</script>

<style></style>
