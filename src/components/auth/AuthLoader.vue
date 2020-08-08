<template>
    <v-dialog
        v-model="dialog"
        scrollable fullscreen 
        persistent :overlay="false"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-container grid-list-xl text-xs-center>
            <v-progress-circular indeterminate size="150" width="10" color="primary">Loading your preferencess...</v-progress-circular>
        </v-container>
    </v-dialog>
</template>

<script>
export default {
    name: "AuthLoader",
    components: {},
     mounted() {
        
    },
    data () {
        return {
            dialog: true
        }
    }
}
</script>
