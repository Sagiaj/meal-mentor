import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'
// import { themeColors } from '../assets/styles/lush-palette';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify, {
  iconfont: 'md',
  // theme: {
  //   ...themeColors
  // },
  theme: {
    primary: colors.orange.accent3,
    secondary:  colors.grey.darken2,
    background: colors.shades.white,
    // accent: '',
    // info: '',
    // warning: '',
    // error: '',
  },
  options: {
    customProperties: true
  }
})
