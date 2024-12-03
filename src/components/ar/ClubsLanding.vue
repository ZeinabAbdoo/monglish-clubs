<template>
  <div>
    <TermsModal />
    <HeroSection @scroll-to-clubs="scrollToClubs" />
    <AccreditationsSection />
    <ClubsSection ref="clubsSection" />
    <SessionSection @scroll-to-clubs="scrollToClubs" />
  </div>
</template>

<script>
import TermsModal from "./TermsModal.vue";
import HeroSection from "./HeroSection.vue";
import AccreditationsSection from "./AccreditationsSection.vue";
import ClubsSection from "./ClubsSection.vue";
import SessionSection from "./SessionSection.vue";

export default {
  name: "MonglishClubs",
  components: {
    TermsModal,
    HeroSection,
    AccreditationsSection,
    ClubsSection,
    SessionSection
  },
  methods: {
    scrollToClubs() {
      const clubsSection = this.$refs.clubsSection.$el;
      if (clubsSection) {
        clubsSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  }
};
</script>
