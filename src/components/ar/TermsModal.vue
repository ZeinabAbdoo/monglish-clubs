<template>
  <!-- Modal Wrapper -->
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-terms">
      <h2>
        لضمان حقوقك الكاملة في التعاقد مع الأكاديمية، برجاء قراءة البنود
        التالية بعناية والموافقة عليها:
      </h2>
      <div class="terms-container">
        <div class="terms-content">
          <ol>
            <li>
              <strong>سياسات الأكاديمية:</strong>
              <br />أتعهد بالالتزام بكافة السياسات والإجراءات المتبعة داخل
              الأكاديمية، وأقر بأنني قد اطلعت عليها وفهمتها بالكامل ووافقت
              عليها.
            </li>
            <li>
              <strong>الرسوم الدراسية:</strong>
              <br />أقر بأنني قد اطلعت على الرسوم الدراسية المقررة وأتعهد بسدادها في
              المواعيد المحددة. أعلم أنه في حالة التأخر في السداد، يحق
              للأكاديمية اتخاذ الإجراءات المناسبة بما في ذلك تعليق الحساب أو
              وقف الخدمات التعليمية حتى سداد المستحقات.
            </li>
            <li>
              <strong>الحضور الإلكتروني والانضباط:</strong>
              <br />أتعهد بضمان حضور ابني/ابنتي للحصص الدراسية الإلكترونية بانتظام
              وفي المواعيد المحددة، وأفهم أن التغيب المتكرر دون عذر مقبول قد
              يؤدي إلى إجراءات إدارية مثل إلغاء الحجز أو إعادة الجدولة
              بالإضافة إلى الالتزام بما ورد في نموذج
              <a
                href="/ar/terms-and-conditions/terms"
              >الشروط والأحكام</a> بما
              يخص بند الحضور.
            </li>
            <li>
              <strong>السلوك الإلكتروني:</strong>
              <br />أتعهد بمتابعة سلوك ابني/ابنتي خلال الحصص الدراسية الإلكترونية،
              وأدرك أن الأكاديمية لها الحق في اتخاذ إجراءات تأديبية في حال
              حدوث مخالفات سلوكية عبر المنصة الإلكترونية.
            </li>
            <li>
              <strong>التقنية والمسؤوليات:</strong>
              <br />أقر بأنني مسؤول عن توفير جهاز إلكتروني واتصال إنترنت مستقر لضمان
              مشاركة ابني/ابنتي في الحصص الدراسية عبر الإنترنت، وأدرك أن
              الأكاديمية غير مسؤولة عن أي مشكلات تقنية تتعلق بالاتصال من
              جانبي.
            </li>
            <li>
              <strong>الانسحاب أو الإلغاء:</strong>
              <br />أعلم أنه في حالة الرغبة في سحب ابني/ابنتي من الأكاديمية أو إلغاء
              الاشتراك في البرنامج، يجب إبلاغ الإدارة كتابةً قبل فترة زمنية
              محددة، وأوافق على الالتزام
              <a
                href="/ar/terms-and-conditions/refund"
              >بسياسة الإلغاء</a>
              والاسترداد كما هو موضح في
              <a
                href="/ar/terms-and-conditions/terms"
              >الشروط والأحكام</a>
              الخاصة بسياسات الأكاديمية.
            </li>
            <li>
              <strong>استخدام الوسائل التعليمية الإلكترونية:</strong>
              <br />أوافق على استخدام الأكاديمية لمنصات التعليم الإلكتروني والتقنيات
              الحديثة لتقديم الدروس،وأقر بأنني قد قرأت وفهمت
              <a
                href="/ar/terms-and-conditions/privacy"
              >بسياسة الخصوصية</a>
              المتعلقة باستخدام هذه الوسائل.
            </li>
            <li>
              <strong>الصور والمقاطع المصورة:</strong>
              <br />
              <ul>
                <li>
                  فتح الكاميرا طوال فترة المحاضرة لضمان جودة العملية التعليمية
                  وتسهيل التواصل بين المعلمين والمتدربين كافة.
                </li>
                <li>
                  يراعى التواجد في مكان هادئ بعيداً عن الضوضاء مع إحدى
                  الخلفيات المحددة من قِبل خدمة العملاء.
                </li>
                <li>استخدام شاشة كمبيوتر كحد أدنى أو لابتوب.</li>
                <li>
                  الالتزام بالزي المناسب (أبيض – أزرق – أسود) وذلك حرصاً منا
                  على تنمية الانضباط لدى المتدرب.
                </li>
                <li>
                  جميع المحاضرات مسجلة ويتم إرسالها لجميع المتدربين للاستفادة
                  العامة. تعتبر الحصص المسجلة ملك خالص للأكاديمية ويحق لها
                  استخدامها على سبيل المثال "تحليل لمستويات الطلاب أو حملات
                  ترويجية للأكاديمية."
                </li>
              </ul>
            </li>
            <li>
              <strong>الموافقة على الشروط:</strong>
              <br />بمجرد الضغط على زر شراء، يعتبر هذا موافقة منك على الشروط
              والأحكام المذكورة أعلاه والمرفقة بنموذج رقم MIA-TC-01.
            </li>
          </ol>
        </div>
      </div>

      <label class="checkbox">
        <input type="checkbox" v-model="isChecked" />
        أوافق على جميع الشروط والأحكام
      </label>

      <button
        type="submit"
        class="checkout-button"
        :disabled="!isChecked"
        @click="closeModal"
      >أوافق وأرغب بالاستمرار لإتمام الطلب</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChecked: false,
      isVisible: true
    };
  },
  mounted() {
    document.body.style.overflow = "hidden";
  },
  beforeUnmount() {
    document.body.style.overflow = "auto";
  },
  methods: {
    closeModal() {
      this.isVisible = false;
      document.body.style.overflow = "auto";
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  direction: rtl;
}

.modal-terms {
  margin-top: 0;
  width: 100%;
  max-width: 800px;
  border-radius: 20px;
  background: #fff;
  padding: 1% 4%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-terms h2 {
  color: #000;
  font-size: 1.4rem;
  font-family: "DIN Next LT Arabic";
  font-weight: 500;
  margin-bottom: 1rem;
}

.checkbox {
  margin-top: 1rem;
}

.checkout-button {
  margin-top: 1rem;
  padding: 0.5rem 2rem;
  border: none;
  border-radius: 25px;
  background-color: #ff6f00;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
}

.checkout-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.terms-container {
  border-radius: 25px;
  height: 250px;
  overflow: hidden;
}

.terms-content {
  background-color: #eeeeee;
  border-radius: 25px;
  padding: 1.5rem;
  font-family: "DIN Next LT Arabic";
  color: #000;
  font-size: 1.1rem;
  margin-bottom: 3%;
  height: 250px;
  overflow-y: auto;
}

.terms-content::-webkit-scrollbar {
  width: 4px;
}

.terms-content::-webkit-scrollbar-thumb {
  background-color: #ff6f00;
  border-radius: 10px;
}

.terms-content::-webkit-scrollbar-track {
  background: #eeeeee;
}

.terms-content ol {
  margin: 0;
  padding-left: 1.5rem;
  list-style-type: decimal;
}

.terms-content a {
  font-weight: bold;
  color: #034b72;
}

.terms-content li {
  margin-bottom: 1rem;
  line-height: 1.7;
  margin-right: 1%;
}

.terms-content li ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.terms-content li strong {
  font-weight: bold;
}
</style>
