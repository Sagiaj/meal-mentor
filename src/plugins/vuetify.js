import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";
Vue.use(Vuetify);
export default new Vuetify({
    icons: {
        iconfont: "md"
    },
    theme: {
        themes: {
            light: {
                primary: colors.orange.darken2,
                secondary: colors.teal.darken1
            }
        }
    }
});
//# sourceMappingURL=vuetify.js.map