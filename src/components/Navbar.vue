<template>
    <v-container grid-list-lg>
        <v-navigation-drawer absolute v-model="drawer">
        <v-toolbar flat class="transparent">
            <v-btn flat icon @click="drawer = false">
            <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-list class="pa-0">
            <v-list-tile avatar>
                <v-list-tile-avatar>
                <img src="src">
                </v-list-tile-avatar>
                <v-list-tile-content>
                <v-list-tile-title>Text</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-list dense class="pt-0">
            <v-list-tile v-if="!!user">
                <v-list-tile-content>
                <v-btn flat icon @click="logout()">
                    <v-icon>logout</v-icon>
                </v-btn>
                </v-list-tile-content>
                <v-list-tile-title>Log out</v-list-tile-title>
            </v-list-tile>
            <v-list-tile avatar>
                <v-list-tile-content>
                    <v-btn flat outline @click="goToSetupView()">
                        <v-icon>setup</v-icon>
                    </v-btn>
                </v-list-tile-content>
                <v-list-tile-title>Physical stats</v-list-tile-title>
            </v-list-tile>
        </v-list>
        </v-navigation-drawer>
        
        <v-toolbar app color="primary darken-2">
            <v-toolbar-title class="headline text-uppercase">
                <v-btn flat icon @click="drawer = true">
                    <v-icon>menu</v-icon>
                </v-btn>
                <v-btn flat to="/"><span>Meal Mentor</span></v-btn>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if="!!user">
                <v-btn flat icon @click="logout()">
                    <v-icon>logout</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Navbar',
    components: {

    },
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    methods: {
        ...mapActions([
            'authUserLogout'
        ]),
        goToAuthView() {
            this.$router.push({
                path: '/auth'
            });
        },
        goToSetupView() {
            this.$router.push({
                path: '/setup'
            })
        },
        logout() {
            this.authUserLogout().then(res => {
                this.goToAuthView();
            })
        }
    },
    data () {
        return {
            drawer: false
        }
    }
}
</script>
