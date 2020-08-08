<template>
    <v-snackbar
        v-model="propagatedError"
        :multi-line="true"
        :timeout="10000"
        >
        {{ currentError.error }}
        <br />
        <v-btn
            text
            outline
            color="error"
            @click="propagatedError = null;"
        >
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "ErrorPopup",
    watch: {
        'currentError': {
            handler (v) {
                this.propagatedError = v.error;
            },
            deep: true
        }
    },
    computed: {
        ...mapGetters([
            'currentError'
        ])
    },
    data () {
        return {
            propagatedError: null
        }
    }
}
</script>
