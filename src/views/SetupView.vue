<template>
  <v-container grid-list-xs>
    <v-stepper :value="currentStep" vertical>
      <v-stepper-step step="1" :complete="currentStep > 1">
        Current status
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-content step="1">
        <v-card>
          <v-card-title primary-title
            ><h2>Let's get to know each other</h2></v-card-title
          >
          <v-card-text>
            <v-row wrap>
              <v-col>
                <v-text-field
                  label="Age"
                  v-model="userStats.age"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  :items="['Male', 'Female']"
                  v-model="userStats.gender"
                  label="Your gender"
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  label="Weight(KG)"
                  v-model="userStats.weight"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Height(cm)"
                  v-model="userStats.height"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="secondary"
              :disabled="!detailsComplete"
              @click.native="currentStep++"
              >Next</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-stepper-content>
      <v-stepper-step step="2" :complete="currentStep > 2">
        Goal
        <small>*</small>
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-content step="2">
        <v-card>
          <v-card-title primary-title><h2>What is your goal?</h2></v-card-title>
          <v-card-text>
            <v-select
              clearable
              :items="goals"
              v-model="chosenGoal"
              label="Choose your goal"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click.native="currentStep--">Back</v-btn>
            <v-btn
              color="secondary"
              @click.native="currentStep++"
              :disabled="!goalComplete"
              >Next</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-stepper-content>
      <v-stepper-step step="3" :complete="currentStep > 3">
        Activity level
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-card>
          <v-card-title primary-title><h2>Almost done!</h2></v-card-title>
          <v-card-text>
            <strong>What is your activity level? Don't lie</strong
            ><v-icon color="primary">tag_faces</v-icon>
            <v-select
              clearable
              :items="activityLevels"
              v-model="activityLevel"
              label="Activity level"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click.native="currentStep--">Back</v-btn>
            <v-btn
              color="secondary"
              @click.native="finishSetup()"
              :disabled="!activityLevel"
              >Finish</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { UserActivityLevel } from "../models/enums";
export default {
  name: "SetupView",
  components: {},
  watch: {
    userSetupContent: {
      handler(content) {
        this.extractGivenUserContent(content);
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(["user", "userSetupContent"]),
    detailsComplete() {
      return Object.keys(this.userStats).reduce(
        (t, p) => t && !!this.userStats[p],
        true
      );
    },
    goalComplete() {
      return !!this.chosenGoal;
    }
  },
  methods: {
    ...mapActions(["saveUserDetails", "propagateError", "getUserDetails"]),
    startAction() {
      this.processing = true;
    },
    finishAction() {
      this.processing = false;
    },
    goToMainView() {
      this.$router.push({
        path: "/"
      });
    },
    extractGivenUserContent(content) {
      if (content) {
        for (let stat in content.userStats) {
          this.userStats[stat] = content.userStats[stat];
        }
        this.activityLevel = content.userActivityLevel;
        this.chosenGoal = content.userGoal;
      }
    },
    async finishSetup() {
      this.startAction();
      try {
        await this.saveUserDetails(
          {
            stats: this.userStats,
            goal: this.chosenGoal,
            activityLevel: this.activityLevel
          },
          this.user.email
        );
        this.goToMainView();
      } catch (err) {
        this.propagateError(err);
      }
      this.finishAction();
    }
  },
  beforeMount() {
    if (this.user && !this.userSetupContent) {
      this.getUserDetails(this.user.email);
    } else {
      this.extractGivenUserContent(this.userSetupContent);
    }
  },
  data() {
    return {
      currentStep: 1,
      gender: null,
      chosenGoal: null,
      activityLevel: null,
      userStats: {
        age: null,
        weight: null,
        height: null,
        gender: null
      },
      goals: ["Weight loss", "Muscle gain"],
      activityLevels: Object.keys(UserActivityLevel).reduce((acc, k) => {
        acc.push(UserActivityLevel[k]);
        return acc;
      }, [])
    };
  }
};
</script>

<style></style>
