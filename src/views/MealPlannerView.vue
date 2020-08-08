<template>
  <v-container grid-list-lg>
    <MakeMeal
      :allowedCalories="allowedCalories"
      :percentages.sync="percentages"
    />
  </v-container>
</template>

<script>
import MakeMeal from "@/components/meal/MakeMeal.vue";
import { mapGetters, mapActions } from "vuex";
import { UserActivityLevel, UserGoal } from "../models/enums";

export default {
  name: "MealPlannerView",
  components: {
    MakeMeal
  },
  computed: {
    ...mapGetters(["userSetupContent"]),
    allowedCalories() {
      let { carbs, proteins, fats } = this.percentages;
      return {
        carbs: (carbs * this.modifiedBMRByGoal) / this.dailyMeals,
        proteins: (proteins * this.modifiedBMRByGoal) / this.dailyMeals,
        fats: (fats * this.modifiedBMRByGoal) / this.dailyMeals
      };
    }
  },
  methods: {
    ...mapActions(["propagateError"]),
    calculateAllowedCalories() {
      let { weight, height, gender, age } = this.userSetupContent.userStats;
      switch (gender) {
        case "Male":
          this.BMR = 10 * weight + 6.25 * height - 5 * age + 5;
          break;
        case "Female":
          this.BMR = 10 * weight + 6.25 * height - 5 * age - 161;
          break;
        default:
          this.propagateError(
            "Please define your gender in your user setup page"
          );
          return;
      }

      switch (this.userSetupContent.userActivityLevel) {
        case UserActivityLevel.ACTIVE_SEDENTARY:
          this.BMR *= 1.2;
          break;
        case UserActivityLevel.ACTIVE_LIGHT:
          this.BMR *= 1.375;
          break;
        case UserActivityLevel.ACTIVE_MODERATE:
          this.BMR *= 1.155;
          break;
        case UserActivityLevel.ACTIVE_INTENSE:
          this.BMR *= 1.1725;
          break;
        case UserActivityLevel.ACTIVE_EXTREME:
          this.BMR *= 1.9;
          break;
        default:
          this.propagateError(
            "Please define your activity level in your user setup page"
          );
          return;
      }

      switch (this.userSetupContent.userGoal) {
        case UserGoal.WEIGHT_LOSS:
          this.modifiedBMRByGoal =
            this.BMR *
            (1 - this.defaultCaloricFactors.weightLossCalorieReduction);
          break;
        case UserGoal.MUSCLE_GAIN:
          this.modifiedBMRByGoal =
            this.BMR *
            (1 + this.defaultCaloricFactors.muscleGainCaloricSurplus);
          break;
        default:
          this.propagateError(
            "Please define your goal in your user setup page"
          );
          return;
      }
      const gProt = weight * 2.2;
      const protPer =
        parseInt(((gProt * 4) / this.modifiedBMRByGoal) * 100) / 100;
      let fatPer = 0.2;
      let carbPer = 1 - (protPer + fatPer);

      this.percentages.carbs = carbPer;
      this.percentages.proteins = protPer;
      this.percentages.fats = fatPer;
    }
  },
  beforeMount() {
    this.calculateAllowedCalories();
  },
  data() {
    return {
      defaultCaloricFactors: {
        weightLossCalorieReduction: 0.17,
        muscleGainCaloricSurplus: 0.1
      },
      percentages: {
        carbs: 0,
        proteins: 0,
        fats: 0
      },
      modifiedBMRByGoal: 0,
      BMR: 0,
      dailyMeals: 4
    };
  }
};
</script>
