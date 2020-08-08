<template>
    <v-container fluid grid-list-xl v-if="user">
        <v-layout row wrap text-xs-center>
            <v-flex>
                <h1>Hi <span class="primary--text">{{ user.username }}</span>, We missed you!</h1>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs6 md4 offset-md1 lg3 offset-lg2 text-xs-center>
                <a @click="goToMealPlanner()">
                    <v-card>
                        <v-img
                            responsive
                            class="white--text align-end"
                            src="https://image.freepik.com/free-vector/healthy-food_23-2147505260.jpg">
                        </v-img>
                        <v-card-title primary-title class="pb-0">
                            Plan a meal!
                        </v-card-title>
                        <v-card-text>
                            Build a meal on your terms
                        </v-card-text>
                    </v-card>
                </a>
            </v-flex>
            <v-flex xs6 md4 offset-md1 lg3 offset-lg2 text-xs-center>
                <a @click="goToSetup()">
                    <v-card>
                        <v-img
                            responsive
                            class="white--text align-end"
                            src="https://image.freepik.com/free-vector/healthy-food_23-2147505260.jpg">
                        </v-img>
                        <v-card-title primary-title class="pb-0">
                            Update your stats
                        </v-card-title>
                        <v-card-text>
                            Build more accurate meals by keeping your stats up to date
                        </v-card-text>
                    </v-card>
                </a>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'MainView',
    components: {},
    computed: {
        ...mapGetters(['user', 'userSetupContent'])
    },
    methods: {
        goToMealPlanner() {
            this.$router.push({
                path: '/meal'
            });
        },
        goToSetup() {
            this.$router.push({
                path: '/setup'
            });
        }
    },
    beforeMount() {
        if (!this.userSetupContent) {
            this.$router.push({
                path: '/setup'
            })
        }
    },
    data () {
        return {
            
        }
    } 
}
</script>

<style>

</style>

