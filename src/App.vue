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
  },
  methods: {
  printReceipt() {
    document.body.classList.add('hide-footer');
    window.print();
    document.body.classList.remove('hide-footer');  
  }
}

}
</script>

<style>
@font-face {
  font-family: 'DIN Next LT Arabic';
  src: url('https://monglish.b-cdn.net/fonts/DINNextLTArabic-Regular-3.ttf') format('truetype');
}
@font-face {
  font-family: 'DIN Next LT Arabic-n';
  src: url('https://monglish.b-cdn.net/fonts/DINNextLTArabic-Heavy.ttf') format('truetype');
  font-weight: 800;
}
@font-face {
  font-family: 'DIN Next LT Arabic-n';
  src: url('https://monglish.b-cdn.net/fonts/DINNextLTArabic-Regular-3.ttf') format('truetype');
  font-weight: normal;
}
@font-face {
  font-family: 'DIN Next LT Arabic-n';
  src: url('https://monglish.b-cdn.net/fonts/DINNextLTArabic-Light.ttf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family: 'DIN Next LT Arabic-n';
  src: url('https://monglish.b-cdn.net/fonts/DINNextLTArabic-UltraLight.ttf') format('truetype');
  font-weight: 100;
}

#app2 {
  width: 100%;
  height: 110vh; 
  background-image: url('@/assets/images/hero.webp');
  background-size: cover; 
  background-repeat: no-repeat; 
}

@media print {
  .footer, .footer-box, 
  #app2 > .payment-success ~ .footer {
    display: none !important;
  }

  #app2 {
    height: auto !important;
  }
}
</style>
