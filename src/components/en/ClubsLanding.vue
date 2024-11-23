<template>
  <div>
    <HeroSection @scroll-to-clubs="scrollToClubs" />
    <AccreditationsSection />
    <ClubsSection ref="clubsSection" />
    <SessionSection @scroll-to-clubs="scrollToClubs" />
  </div>
</template>

<script>
import HeroSection from './HeroSection.vue';
import AccreditationsSection from './AccreditationsSection.vue';
import ClubsSection from './ClubsSection.vue';
import SessionSection from './SessionSection.vue';

export default {
  name: 'MonglishClubs',
  components: {
    HeroSection,
    AccreditationsSection,
    ClubsSection,
    SessionSection,
  },
  methods: {
    scrollToClubs() {
      const clubsSection = this.$refs.clubsSection.$el;  
      if (clubsSection) {
        clubsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
}
</script>