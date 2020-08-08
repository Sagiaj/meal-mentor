<template>
  <v-container grid-list-xl :style="generalFontSize">
    <v-dialog v-model="loading" fullscreen transition="dialog-transition">
      <v-container
        fluid
        fill-height
        style="background-color: rgba(0, 0, 0, 0.7);"
      >
        <v-row justify="center">
          <v-progress-circular
            :size="100"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-row>
      </v-container>
    </v-dialog>
    <v-btn text icon color="primary" @click.native="resetFoods()">
      <v-icon>refresh</v-icon>
    </v-btn>
    <v-row wrap justify="center" align="center">
      <v-col cols="4" v-for="(foodType, idx) in ingredients" :key="idx">
        <v-autocomplete
          :label="`Choose ${foodType.name}`"
          :items="foodType.values"
          v-model="chosenIngredients[foodType.name]"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-container grid-list-xl>
      <v-row wrap justify="center" align="center" v-if="mealComplete">
        <v-col
          cols="4"
          align="center"
          v-for="(ingredient, foodType) in ingredients"
          :key="foodType"
        >
          <v-progress-circular
            :size="factoralCircleSize"
            v-if="mealComplete"
            :value="mealScore[ingredient.name]"
            :color="
              [
                'red darken-3',
                'red',
                'warning',
                'yellow darken-2',
                'blue darken-3',
                'teal',
                'success'
              ][Math.floor(mealScore[ingredient.name] / 15)]
            "
            :width="factoralCircleWidth"
          >
            <h3>
              {{
                [
                  "Terrible",
                  "Bad",
                  "Average",
                  "Good",
                  "Great",
                  "Excellent",
                  "Perfect"
                ][Math.floor(mealScore[ingredient.name] / 15)]
              }}
            </h3>
          </v-progress-circular>
        </v-col>
        <v-col cols="12" align="center">
          <h1><strong>Overall:</strong></h1>
          <v-spacer></v-spacer>
          <v-progress-circular
            :size="overallCircleSize"
            v-if="mealComplete"
            :value="mealScore.total"
            :color="
              [
                'red darken-3',
                'red',
                'warning',
                'yellow darken-2',
                'blue darken-3',
                'teal',
                'success'
              ][Math.floor(mealScore.total / 15)]
            "
            :width="overallCircleWidth"
          >
            <h2>
              {{
                [
                  "Terrible",
                  "Bad",
                  "Average",
                  "Good",
                  "Great",
                  "Excellent",
                  "Perfect"
                ][Math.floor(mealScore.total / 15)]
              }}
            </h2>
          </v-progress-circular>
        </v-col>
        <v-col cols="12" align="center">
          <v-alert outlined color="primary" :value="true">
            Your meal:
            <v-spacer></v-spacer>
            Protein - {{ calculatedIngredients.proteins }}
            <v-spacer></v-spacer>
            Carbs - {{ calculatedIngredients.carbs }}
            <v-spacer></v-spacer>
            Healthy fats - {{ calculatedIngredients.fats }}
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
    <v-row wrap justify="center" v-if="allIngredientsChosen">
      <v-col cols="12" align="center">
        <v-btn color="primary" @click.native="calculateByOptimization">
          Make my meal!
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { nutritionValues } from "@/models/foodTypes";

export default {
  name: "NutritionPlan",
  components: {},
  props: ["allowedCalories"],
  computed: {
    generalFontSize() {
      return `font-size: ${
        this.$vuetify.breakpoint.mdAndUp ? "1em" : "0.8em"
      };`;
    },
    factoralCircleSize() {
      return this.$vuetify.breakpoint.mdAndUp ? 150 : 100;
    },
    overallCircleSize() {
      return this.$vuetify.breakpoint.mdAndUp ? 170 : 120;
    },
    factoralCircleWidth() {
      return this.$vuetify.breakpoint.mdAndUp ? 24 : 16;
    },
    overallCircleWidth() {
      return this.$vuetify.breakpoint.mdAndUp ? 30 : 20;
    },
    allIngredientsChosen() {
      return (
        this.chosenIngredients.carbs !== null &&
        this.chosenIngredients.proteins !== null &&
        this.chosenIngredients.fats !== null
      );
    },
    mealScore() {
      if (!this.mealComplete)
        return { proteins: 0, carbs: 0, fats: 0, total: 0 };
      // const fatScore = Math.min(this.scores.fats, this.allowedCalories.fats) / Math.max(this.scores.fats, this.allowedCalories.fats) * 115;
      // const protScore = Math.min(this.scores.proteins, this.allowedCalories.proteins) / Math.max(this.scores.proteins, this.allowedCalories.proteins) * 115;
      // const carbScore = Math.min(this.scores.carbs, this.allowedCalories.carbs) / Math.max(this.scores.carbs, this.allowedCalories.carbs) * 115;
      // return {
      //   proteins: Math.min(100, protScore),
      //   carbs: Math.min(100, carbScore),
      //   fats: Math.min(100, fatScore),
      //   total: Math.min(100, Math.floor((protScore + carbScore + fatScore) / 3))
      // };
      let fatScore,
        protScore,
        carbScore,
        fatDev = 0.1 * this.allowedCalories.fats,
        carbDev = 0.1 * this.allowedCalories.carbs,
        protDev = 0.1 * this.allowedCalories.proteins;

      if (Math.abs(this.scores.fats - this.allowedCalories.fats) >= fatDev) {
        fatScore =
          (115 * Math.min(this.allowedCalories.fats, this.scores.fats)) /
          Math.max(this.allowedCalories.fats, this.scores.fats);
      } else {
        fatScore = 100;
      }

      if (Math.abs(this.scores.carbs - this.allowedCalories.carbs) >= carbDev) {
        carbScore =
          (115 * Math.min(this.allowedCalories.carbs, this.scores.carbs)) /
          Math.max(this.allowedCalories.carbs, this.scores.carbs);
      } else {
        carbScore = 100;
      }

      if (
        Math.abs(this.scores.proteins, this.allowedCalories.proteins) >= protDev
      ) {
        protScore =
          (115 * Math.min(this.allowedCalories.proteins)) /
          Math.max(this.allowedCalories.proteins, this.scores.proteins);
      } else {
        protScore = 100;
      }

      const caloricScores = {
        proteins: Math.min(100, protScore),
        carbs: Math.min(100, carbScore),
        fats: Math.min(100, fatScore)
      };

      return {
        ...caloricScores,
        total: Math.min(
          100,
          Math.floor(
            (caloricScores.proteins +
              caloricScores.carbs +
              caloricScores.fats) /
              3
          )
        )
      };
    }
    // color() {
    //   return ["error", "warning", "success"][Math.floor(this.mealScore / 40)];
    // }
  },
  methods: {
    async optimizeByConstraints() {
      this.constraints.forEach((c, i) => {
        let caloriesFromDedicatedFoodType = c.val[c.foodType] * c.grams;
        let relativeFactor = 0;
        if (caloriesFromDedicatedFoodType < c.biggerThan) {
          relativeFactor = 1;
        } else if (caloriesFromDedicatedFoodType > c.lessThan) {
          relativeFactor = -1;
        }
        c.grams += c.increments * relativeFactor;
        c.increments /= 1.07;
      });
      this.calculateGlobalConstraintSums();
      this.normalizeConstraintsByGlobalBoundaries();

      if (
        this.checkConstraints() ||
        +new Date() - this.calculationStartTime > 500
      ) {
        this.calculationStartTime = null;
      }
    },
    normalizeConstraintsByGlobalBoundaries() {
      for (let foodType of this.ingredients.map(i => i.name)) {
        let curConstraint = this.constraints.find(c => c.foodType == foodType);
        let curGlobalConstraint = this.globalConstraint[foodType];
        if (curGlobalConstraint.isSatisfied) {
          return;
        }
        if (curGlobalConstraint.sum < curGlobalConstraint.biggerThan) {
          let calsToAdd =
            curGlobalConstraint.biggerThan - curGlobalConstraint.sum;
          let gramsToAdd =
            calsToAdd /
            (this.foodTypeFactors[foodType] * curConstraint.val[foodType]);
          curConstraint.grams += gramsToAdd;
        } else if (curGlobalConstraint.sum > curGlobalConstraint.lessThan) {
          let calsToSub =
            curGlobalConstraint.sum - curGlobalConstraint.lessThan;
          let gramsToSub =
            calsToSub /
            (this.foodTypeFactors[foodType] * curConstraint.val[foodType]);
          curConstraint.grams -= gramsToSub;
        } else {
          curGlobalConstraint.isSatisfied = true;
        }
      }
      this.calculateGlobalConstraintSums();
    },
    updateGlobalConstraintByRecentAction(amount, values) {
      this.globalConstraint.proteins.sum += amount * values.proteins;
      this.globalConstraint.carbs.sum += amount * values.carbs;
      this.globalConstraint.fats.sum += amount * values.fats;
    },
    async calculateByOptimization() {
      if (this.calculationStartTime === null) {
        this.loading = true;
        this.calculationStartTime = +new Date();
        this.resetConstraintValues();
        let chosenProtein = {
          ...this.proteins[this.chosenIngredients.proteins]
        };
        let chosenCarb = { ...this.carbs[this.chosenIngredients.carbs] };
        let chosenFat = { ...this.fats[this.chosenIngredients.fats] };

        chosenProtein.carbs *= 4;
        chosenProtein.proteins *= 4;
        chosenProtein.fats *= 9;

        chosenCarb.carbs *= 4;
        chosenCarb.proteins *= 4;
        chosenCarb.fats *= 9;

        chosenFat.carbs *= 4;
        chosenFat.proteins *= 4;
        chosenFat.fats *= 9;

        this.constraints = [
          {
            increments: 0.1,
            foodType: "proteins",
            grams: 0.01,
            val: { ...chosenProtein },
            biggerThan: 0.8 * this.allowedCalories.proteins,
            lessThan: this.allowedCalories.proteins
          },
          {
            increments: 0.1,
            foodType: "carbs",
            grams: 0.01,
            val: { ...chosenCarb },
            biggerThan: 0.8 * this.allowedCalories.carbs,
            lessThan: this.allowedCalories.carbs
          },
          {
            increments: 0.1,
            foodType: "fats",
            grams: 0.01,
            val: { ...chosenFat },
            biggerThan: 0.8 * this.allowedCalories.fats,
            lessThan: this.allowedCalories.fats
          }
        ];
      }
      this.optimizeByConstraints();
      if (this.calculationStartTime === null) {
        this.calculatedIngredients.proteins = `${
          this.chosenIngredients.proteins
        } - ${Math.round(this.constraints[0].grams * 100)} גרם`;
        this.calculatedIngredients.carbs = `${
          this.chosenIngredients.carbs
        } - ${Math.round(this.constraints[1].grams * 100)} גרם`;
        this.calculatedIngredients.fats = `${
          this.chosenIngredients.fats
        } - ${Math.round(this.constraints[2].grams * 100)} גרם`;
        this.mealComplete = true;
        let proteins = 0,
          carbs = 0,
          fats = 0;
        this.constraints.forEach(constraint => {
          proteins += constraint.grams * constraint.val["proteins"];
          carbs += constraint.grams * constraint.val["carbs"];
          fats += constraint.grams * constraint.val["fats"];
        });
        this.scores = { proteins, carbs, fats };
        console.log(
          `proteins: ${proteins / 4}, carbs: ${carbs / 4}, fats: ${fats / 9}`
        );
        this.constraints = [];
        this.loading = false;
      } else {
        setTimeout(this.calculateByOptimization, 0);
      }
    },
    checkConstraints() {
      return this.constraints.reduce((bool, constraint) => {
        if (!bool && !constraint.isSatisfied) {
          return false;
        }
        let calories = constraint.val[constraint.foodType] * constraint.grams;
        let isBiggerThan = calories > constraint.biggerThan;
        let isLessThan = calories < constraint.lessThan;
        if (isBiggerThan && isLessThan) {
          constraint.isSatisfied = true;
        }
        return (constraint.isSatisfied || bool) && isBiggerThan && isLessThan;
      }, true);
    },
    calculateGlobalConstraintSums() {
      this.globalConstraint.proteins.sum = 0;
      this.globalConstraint.carbs.sum = 0;
      this.globalConstraint.fats.sum = 0;
      for (let constraint of this.constraints) {
        this.globalConstraint.proteins.sum +=
          constraint.grams * constraint.val["proteins"];
        this.globalConstraint.carbs.sum +=
          constraint.grams * constraint.val["carbs"];
        this.globalConstraint.fats.sum +=
          constraint.grams * constraint.val["fats"];
      }
      this.checkGlobalConstraints();
    },
    checkGlobalConstraints() {
      this.ingredients
        .map(i => i.name)
        .forEach(foodType => {
          let curGlobalConstraint = this.globalConstraint[foodType];
          if (
            curGlobalConstraint.sum > curGlobalConstraint.isBiggerThan &&
            curGlobalConstraint.sum < curGlobalConstraint.lessThan
          ) {
            console.log("satified");
            curGlobalConstraint.isSatisfied = true;
          } else {
            curGlobalConstraint.isSatisfied = false;
          }
        });
    },
    resetConstraintValues() {
      this.globalConstraint.proteins.sum = 0;
      this.globalConstraint.proteins.isSatisfied = false;
      this.globalConstraint.carbs.sum = 0;
      this.globalConstraint.carbs.isSatisfied = false;
      this.globalConstraint.fats.sum = 0;
      this.globalConstraint.fats.isSatisfied = false;

      this.globalConstraint.proteins.isLessThan *= this.allowedCalories.proteins;
      this.globalConstraint.proteins.isBiggerThan *= this.allowedCalories.proteins;

      this.globalConstraint.carbs.isLessThan *= this.allowedCalories.carbs;
      this.globalConstraint.carbs.isBiggerThan *= this.allowedCalories.carbs;

      this.globalConstraint.fats.isLessThan *= this.allowedCalories.fats;
      this.globalConstraint.fats.isBiggerThan *= this.allowedCalories.fats;
    },
    resetIngredients() {
      this.chosenIngredients = {
        carbs: null,
        proteins: null,
        fats: null
      };
    },
    resetFoods() {
      this.mealComplete = false;
      this.resetIngredients();
    }
  },
  beforeMount() {
    for (let idx in this.ingredients) {
      let name = this.ingredients[idx].name;
      this.ingredients[idx].values = [...Object.keys(this[name])];
    }
    this.resetConstraintValues();
  },
  data() {
    return {
      ...nutritionValues,
      ingredients: [
        {
          name: "carbs",
          hebrewName: "פחמימה",
          values: []
        },
        {
          name: "proteins",
          hebrewName: "חלבון",
          values: []
        },
        {
          name: "fats",
          hebrewName: "שומן בריא",
          values: []
        }
      ],
      chosenIngredients: {
        carbs: null,
        proteins: null,
        fats: null
      },
      constraints: [],
      globalConstraint: {
        proteins: {
          sum: 0,
          isLessThan: 1.05,
          isBiggerThan: 0.9
        },
        carbs: {
          sum: 0,
          isLessThan: 1.05,
          isBiggerThan: 0.9
        },
        fats: {
          sum: 0,
          isLessThan: 1.05,
          isBiggerThan: 0.9
        }
      },
      foodTypeFactors: {
        carbs: 4,
        proteins: 4,
        fats: 9
      },
      scores: {
        carbs: 0,
        proteins: 0,
        fats: 0
      },
      calculationStartTime: null,
      mealComplete: false,
      calculatedIngredients: {
        proteins: "",
        carbs: "",
        fats: ""
      },
      loading: false
    };
  }
};
</script>

<style>
/* .v-input.v-select label {
        right: 0px !important;
        left: auto !important;
    } */
</style>
