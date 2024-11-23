<template>
  <section class="sessions">
    <div class="right-half">
      <h3>أنديتنا الجديدة<br>مصممة خصيصًا لمساعدتك على التميز أسرع وأفضل!</h3>
      <p>
        خبراء في تعليم اللغة بأساليب مبتكرة وسهلة.
        <br />
        بيئة تعليمية محفزة ومليئة بالتطبيقات العملية.
        <br />
        خطط أسعار مرنة تناسب احتياجاتك.
      </p>
      <h4>لا تفوت فرصتك! انضم الآن وابدأ رحلتك اللغوية الممتعة:</h4>
      <button class="cta-btn">سجل الآن</button>
    </div>
    <div class="left-half">
      <img src="@/assets/images/last.png" alt="Educational Image">
    </div>
  </section>
</template>

<script>
export default {
  name: 'SessionSection',
};
</script>

<style scoped>
.sessions {
  display: flex;
  background-image: url('@/assets/images/hero.jpg');
  background-position: center;
  background-repeat: repeat;
  direction: rtl;
  padding: 0 2em;
  align-items: center;
}

.right-half {
  width: 40%;
  padding: 2em;
  text-align: right;
  color: #3d3d3d;
  font-family: 'DIN Next LT Arabic', sans-serif;
}

.right-half h3 {
  font-size: 42px;
  font-weight: 500;
}

.right-half h4 {
  font-size: 24px;
  font-weight: 500;
}

.right-half p {
  font-size: 22px;
  font-weight: 500;
}

.left-half {
  width: 60%;
}

.left-half img {
  width: 100%;
  height: auto;
}

.cta-btn {
  background: linear-gradient(45deg, #ff9442, #ff6f00);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 22px;
  margin-top: 20px;
  font-family: 'DIN Next LT Arabic';
  font-weight: 500;
}

@media (max-width: 768px) {
  .sessions {
    flex-direction: column;
    padding: 1em;
  }

  .right-half,
  .left-half {
    width: 100%;
    padding: 0;
    text-align: center;
  }

  .right-half h3 {
    font-size: 28px;
  }

  .right-half h4 {
    font-size: 20px;
  }

  .right-half p {
    font-size: 18px;
  }

  .cta-btn {
    font-size: 18px;
    width: 100%;
    padding: 12px;
  }

  .left-half img {
    margin: 0 auto;
  }
}
</style>
