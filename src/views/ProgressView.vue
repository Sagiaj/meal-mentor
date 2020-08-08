<template>
  <v-container grid-list-xl>
    <v-card class="mx-auto text-center" color="green" dark max-width="600">
      <v-card-text v-if="progressList">
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :value="weightsOverTime"
            color="secondary"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item">{{ item.value }}KG </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>

      <v-card-text>
        <div class="display-1 font-weight-thin">
          Progress for: {{ userSetupContent.userGoal }}
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <v-btn block text>Go to Report</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ProgressView",
  components: {},
  computed: {
    ...mapGetters(["user", "userSetupContent", "progressList"])
  },
  methods: {
    ...mapActions(["getUserProgressList"])
  },
  mounted() {
    this.getUserProgressList({
      userEmail: this.user.email,
      userGoal: this.userSetupContent.userGoal
    }).then(progressList => {
      for (let item of progressList) {
        this.weightsOverTime.push(parseInt(item.userStats.weight))
      }
    });
  },
  data() {
    return {
      sortedProgressList: [],
      weightsOverTime: []
    };
  }
};
</script>
