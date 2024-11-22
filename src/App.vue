<template>
  <div id="app2">
    <component :is="currentNavbar" />
    <router-view />
    <component :is="currentFooter" />
  </div>
</template>

<script>
import MonglishNavbarAr from './components/ar/MonglishNavbar.vue';
import MonglishNavbarEn from './components/en/MonglishNavbar.vue';
import ClubsLanding from './components/ar/ClubsLanding.vue'
import MonglishFooterAr from './components/ar/MonglishFooter.vue';
import MonglishFooterEn from './components/en/MonglishFooter.vue';
export default {
  name: 'App',
    data() {
    return {
      currentNavbar: 'MonglishNavbarAr',
      currentFooter: 'MonglishFooterAr',
      WhatsappButton: 'WhatsappButtonAr',
    };
  },
  watch: {
    '$route'(to) {
      if (to.path.startsWith('/en')) {
        this.currentNavbar = 'MonglishNavbarEn';
        this.currentFooter = 'MonglishFooterEn';
      } else {
        this.currentNavbar = 'MonglishNavbarAr';
        this.currentFooter = 'MonglishFooterAr';
      }
    }
  },
  components: {
    MonglishNavbarAr,
    ClubsLanding,
    MonglishFooterAr,
    MonglishFooterEn,
    MonglishNavbarEn
  }
}
</script>

<style>
  @font-face {
    font-family: 'DIN Next LT Arabic';
    src: url('@/assets/fonts/DINNextLTArabic-Regular-3.ttf') format('truetype');
  }
  @font-face {
    font-family: 'DIN Next LT Arabic-n';
    src: url('@/assets/fonts/DINNextLTArabic-Heavy.ttf') format('truetype');
    font-weight: 800;
  }
  @font-face {
    font-family: 'DIN Next LT Arabic-n';
    src: url('@/assets/fonts/DINNextLTArabic-Regular-3.ttf') format('truetype');
    font-weight: normal;
  }
  @font-face {
    font-family: 'DIN Next LT Arabic-n';
    src: url('@/assets/fonts/DINNextLTArabic-Light.ttf') format('truetype');
    font-weight: 300;
  }
  @font-face {
    font-family: 'DIN Next LT Arabic-n';
    src: url('@/assets/fonts/DINNextLTArabic-UltraLight.ttf') format('truetype');
    font-weight: 100;
  }
  #app2{
    width : 100%;
  }
</style>
