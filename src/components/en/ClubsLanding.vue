<template>
  <div>
    <HeroSection />
    <AccreditationsSection />
    <ClubsSection />
    <SessionSection />
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
    SessionSection
  },
  data() {
    return {

    }
  }
}
</script>
