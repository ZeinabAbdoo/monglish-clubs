<template>
  <section class="hero">
    <div class="hero-content">
      <h3>أندية مونجلش الجديدة</h3>
      <h1>
        طريقك لتحقيق أهدافك
        <br />اللغوية بسهولة!
      </h1>
      <p>
        سواء كنت تبحث عن تحسين مهارات القراءة، طلاقة التحدث، أو حتى دعم شخصي لتحقيق أفضل النتائج،
        نحن هنا لنقدم لك تجربة تعليمية مميزة ومليئة بالإبداع والمرح.
      </p>
      <div class="one-line from-row-to-column">
        <Button class="cta-btn" @click="scrollToClubs">أشترك معنا الآن</Button>
        <div class="info-btn one-line">نحن هنا لنساعدك</div>
      </div>
    </div>

    <div class="social-links">
      <a href="https://www.linkedin.com/company/monglish-academy/">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href="https://t.me/monglishacademychannel">
        <i class="fab fa-telegram"></i>
      </a>
      <a href="https://www.snapchat.com/add/mongliskids">
        <i class="fab fa-snapchat"></i>
      </a>
      <a href="https://www.youtube.com/channel/UCdzXmu8FEDyHAQ5rpB8F2ag">
        <i class="fab fa-youtube"></i>
      </a>
      <a href="https://x.com/monglish_uk?t=06bmBVLpWeZ8jrdJpzK_Eg&s=09">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://www.tiktok.com/@monglishacademy">
        <i class="fab fa-tiktok"></i>
      </a>
      <a href="https://www.instagram.com/monglishacademy?igsh=MTByNm42empsdzF4aw==">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://www.facebook.com/Monglishkids/">
        <i class="fab fa-facebook"></i>
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  methods: {
    scrollToClubs() {
      this.$emit("scroll-to-clubs");
    }
  }
};
</script>

<style scoped>
.hero {
  background-image: url("@/assets/images/b.webp");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: "DIN Next LT Arabic", sans-serif;
  direction: rtl;
  overflow-x: hidden;
}

.hero-content {
  text-align: right;
  padding-right: 30%;
  max-width: 500px;
}

h3 {
  font-size: 1.5rem;
  font-weight: 500;
}

h1 {
  margin: -20px 0 -5px 0;
  font-size: 3rem;
  font-weight: 500;
}

p {
  font-size: 1.1rem;
  font-weight: 500;
}

.cta-btn {
  background: linear-gradient(45deg, #ff9442, #ff6f00);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 22px;
  margin-bottom: 20px;
  font-family: "DIN Next LT Arabic";
  font-weight: 500;
}

.one-line {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.info-btn {
  background-color: transparent;
  color: white;
  border: none;
  margin-top: -20px;
}

.social-links {
  margin-right: 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.social-links a {
  margin: 10px;
  width: 30px;
  height: 30px;
  font-size: 15px;
  border-radius: 50%;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  text-decoration: none;
}

.social-links a:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* media query for 1280px and below */
@media (max-width: 1280px) {
  .hero-content {
    padding-right: 27%;
    max-width: 400px;
  }

  h3 {
    font-size: 1.3rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1rem;
  }

  .cta-btn {
    font-size: 20px;
    padding: 8px 18px;
  }
  .social-links a {
    margin: 5px;
  }
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .hero {
    background-image: linear-gradient(
        to bottom,
        transparent,
        rgba(255, 255, 255, 0.5)
      ),
       url("@/assets/images/b2.webp");
    background-size: cover;
    background-position: center;
    overflow-x: hidden;
    margin-top: -70px;
  }

  .hero-content {
    text-align: center;
    padding: 90% 5% 0 5%;
    max-width: 100%;
    color: #3d3d3d;
  }

  h3 {
    font-size: 1.4rem;
  }

  h1 {
    font-size: 2.2rem;
    margin: 0;
    color: #165e84;
  }

  p {
    font-size: 1.1rem;
  }

  .cta-btn {
    font-size: 18px;
    padding: 8px 16px;
  }

  .social-links {
    margin: 0;
    display: none;
  }

  .one-line {
    flex-direction: column;
    align-items: center;
  }

  .info-btn {
    display: none;
  }
}
</style>
