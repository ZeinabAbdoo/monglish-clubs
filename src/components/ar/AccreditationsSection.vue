<template>
<div class="kids-sec4">
     <div class="immerse-row">
      <h3>معتمدون دولياً ونلتزم بالجودة العالمية في كل خطوة!</h3>
      <p>أكاديمية مونجلش الدولية معتمدة من هيئة المعرفة والتدريب بدبي، كما أنها معتمدة دولياً من مؤسسات بارزة مثل المنظمة الدولية لجودة التدريب (IOTQ) وحاصلة على شهادة ISO 9001:2015 من الاتحاد الأمريكي للاعتماد (UAF) مما يعكس التزامنا بالمعايير العالمية للتعليم العالي التابعة لمنظمة طلال أبو غزالة المرموقة (TAG-ORG).نحن أيضاً أعضاء في منظمة الجودة العربية (AROQA)، الجمعية الأمريكية للاعتماد (AAA)، الجمعية المصرية للجودة (ESQ)، وشهادات ISO 29993 وISO 29994.</p>
    </div>
    <div class="kids-sec4-imgs">
      <img src="@/assets/images/accreditations/1.webp" />
      <img src="@/assets/images/accreditations/2.webp" />
      <img src="@/assets/images/accreditations/3.webp" />
      <img src="@/assets/images/accreditations/4.webp" />
      <img src="@/assets/images/accreditations/5.webp" />
      <img src="@/assets/images/accreditations/6.webp" />
      <img src="@/assets/images/accreditations/7.webp" />
      <img src="@/assets/images/accreditations/8.webp" />
      <img src="@/assets/images/accreditations/9.webp" />
      <img src="@/assets/images/accreditations/10.webp" />
      <img src="@/assets/images/accreditations/11.webp" />
      <img src="@/assets/images/accreditations/12.webp" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccreditationsSection',
};
</script>

<style scoped>
.kids-sec4 {
  background-image: url('@/assets/images/b3.webp');
  background-size: cover;
  background-position: center;
  direction: rtl;
  text-align: center;
  color: #808080;
  padding: 2em 2em 8em 2em;
  font-family: "DIN Next LT Arabic";
  font-weight: 500;
}

.immerse-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2em;
  margin: 2em 0 4em 0;
  font-family: 'DIN Next LT Arabic', sans-serif;
}

.immerse-row h3 {
  color: #3d3d3d;
  font-size: 2.5rem;
  font-family: 'DIN Next LT Arabic';
  font-weight: 500;
}

.immerse-row p {
  font-size: 1.275rem;
  color: #3d3d3d;
  font-weight: 500;
  max-width: 70%;
  margin: 0 auto;
}

@media (min-width: 769px) {
  .immerse-row {
    flex-direction: row;
    justify-content: center;
    text-align: right;
  }
  .immerse-row h3 {
    width: 40%;
    margin: 0;
    padding-right: 30px;
  }
  .immerse-row p {
    width: 60%;
    margin: 0;
    padding-left: 25px;
  }
}

@media (max-width: 1200px) {
  .kids-sec4 h3 {
    font-size: 2.2rem;
  }
  .kids-sec4 h1 {
    font-size: 2.5rem;
  }
  .kids-sec4 p {
    font-size: 1.1rem;
    padding: 1% 15% 5% 15%;
  }
}

@media (max-width: 768px) {
  .kids-sec4 {
    padding: 2em 0 2em 0;
  }
  
  .immerse-row {
    margin: 0;
  }
  
  .kids-sec4 h3 {
    font-size: 1.8rem;
    padding: 0;
    margin: 0;
  }
  
  .kids-sec4 h1 {
    font-size: 2rem;
    padding: 0;
    margin: 0;
  }
  
  .kids-sec4 p {
    font-size: 1.25rem;
    width: 100%;
    padding: 0;
    margin: 0;
  }
}

.kids-sec4-imgs {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 3em;
  padding: 0 6%;
}
.kids-sec4-imgs img {
  width: 10%;
}
@media (max-width: 1200px) {
  .kids-sec4-imgs img {
    width: 12%;
  }
}
@media (max-width: 992px) {
  .kids-sec4-imgs img {
    width: 15%;
  }
}
@media (max-width: 768px) {
  .kids-sec4-imgs img {
    width: 20%;
  }
}
@media (max-width: 576px) {
  .kids-sec4-imgs img {
    width: 25%;
  }
}
@media (max-width: 400px) {
  .kids-sec4-imgs img {
    width: 30%;
  }
}

</style>
