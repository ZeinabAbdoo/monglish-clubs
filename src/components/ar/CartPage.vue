<template>
  <div class="shopping-cart">
    <main class="cart-main">
      <div class="cart-info">
        <h1>سلة المشتريات</h1>
        <div class="cart-whatsapp">
          <h3>تواجه أي مشكلة في الدفع؟</h3>
          <button class="cs" @click="sendMessage">
            خدمة العملاء
            <i class="fa-brands fa-whatsapp"></i>
          </button>
        </div>
      </div>
    </main>
    <div class="cart-page">
      <!--div v-if="cartItems.length === 0" class="empty-cart">
        <img src="@/assets/images/cart.png" alt="Empty Cart Image" />
        <h2>لا يوجد لديك شىء في السلة</h2>
        <p>ابدأ رحلتك التعليمية الآن اشترك في دوراتنا واستفد من تجربة تعلم فريدة!</p>
        <button class="back-to-courses" @click="goToCourses">العودة للدورات</button>
      </div-->
      <div class="cart-content">
        <div class="cart-container cart-container-1">
          <div class="order-section">
            <table class="order-table">
              <thead>
                <tr>
                  <th>الدورة</th>
                  <th>الكمية</th>
                  <th>السعر</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="order-item"
                  v-for="(item, index) in cartItems"
                  :key="index"
                >
                  <td class="course">
                    {{
                      item.course_package.stage +
                      " - " +
                      item.course_package.name +
                      " - " +
                      item.course_package.period +
                      " Months"
                    }}
                  </td>
                  <td class="quantity">
                    <button @click="decreaseQuantity(item.id)">-</button>
                    <label class="p-4">{{ item.quantity }}</label>
                    <input type="hidden" v-model="item.quantity" readonly />
                    <button @click="increaseQuantity(item.id)">+</button>
                  </td>
                  <td class="price">
                    {{ item.single_price }} {{ cartSummary.currency }}
                  </td>
                  <td>
                    <button class="remove-button" @click="removeItem(item.id)">
                      <svg
                        aria-hidden="true"
                        class="svg-inline--fa fa-xmark"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="xmark"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="order-table-mobile"
              v-for="(item, index) in cartItems"
              :key="index"
            >
              <tr>
                <td>الدورة</td>
                <td class="course">
                  {{
                    item.course_package.stage +
                    " - " +
                    item.course_package.name +
                    " - " +
                    item.course_package.period +
                    " Months"
                  }}
                </td>
              </tr>
              <tr class="order-item">
                <td>الكمية</td>
                <td class="quantity">
                  <button @click="decreaseQuantity(item.id)">-</button>
                  <label class="p-4">{{ item.quantity }}</label>
                  <input type="hidden" v-model="item.quantity" readonly />
                  <button @click="increaseQuantity(item.id)">+</button>
                </td>
              </tr>
              <tr class="price-row">
                <td>السعر</td>
                <td class="price">
                  {{ item.single_price }} {{ cartSummary.currency }}
                </td>
              </tr>
              <tr class="remove-row">
                <td></td>
                <td colspan="2">
                  <button class="remove-button" @click="removeItem(item.id)">
                    <svg
                      aria-hidden="true"
                      class="svg-inline--fa fa-xmark"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="xmark"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
            </table>
            <button class="buy-another-course" @click="goToCourses">
              → شراء دورة اخرى
            </button>
            <div v-if="orderUpdated" class="order-update-message">
              تم تحديث سلة المشتريات.
            </div>
          </div>
        </div>
        <div class="cart-container cart-container-2">
          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <div class="coupon-section">
            <label for="coupon-code">لديك كود خصم ؟</label>
            <div class="coupon-input">
              <input
                type="text"
                id="coupon-code"
                placeholder="Coupon code"
                v-model="couponCode"
              />
              <button
                v-if="!cartSummary.coupon_code"
                @click="applyCoupon"
                class="apply-button"
              >
                تطبيق
              </button>
              <button
                v-if="cartSummary.coupon_code"
                @click="removeCoupon"
                class="remove-coupon-button"
              >
                إزالة الكوبون
              </button>
            </div>
          </div>
          <table class="price-table">
            <tr>
              <td v-if="cartSummary.total_price_discount == 0">
                اجمالي المبلغ
              </td>
              <td v-else>قيمة السلة</td>
              <td>{{ cartSummary.total_price }} {{ cartSummary.currency }}</td>
            </tr>
            <tr v-if="cartSummary.family_or_friend_discount > 0">
              <td>خصومات الأصدقاء/العائلة</td>
              <td>
                <div class="remove-coupon-section">
                  - {{ cartSummary.family_or_friend_discount }}
                  {{ cartSummary.currency }}
                </div>
              </td>
            </tr>
            <tr v-if="cartSummary.coupon_code">
              <td>الخصم</td>
              <td>
                <div class="remove-coupon-section">
                  - {{ cartSummary.discount }} {{ cartSummary.currency }}
                </div>
              </td>
            </tr>
            <tr v-if="cartSummary.total_price_discount != 0">
              <td>اجمالي المبلغ</td>
              <td>
                {{ cartSummary.total_price_discount }}
                {{ cartSummary.currency }}
              </td>
            </tr>
          </table>
          <button class="confirm-button" @click="showAuthModal">
            تأكيد الشراء
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--Modal for Data-->
  <form v-show="showModal" class="modal" @submit.prevent="goToCheckout">
    <div class="modal-content">
      <!--Modal Header-->
      <div class="modal-header">
        <div class="header-right">
          <h1>
            إقرار قبول دراسي لأكاديمية مونجلش الدولية
            <br />
            "MIA-TC 01"
          </h1>
        </div>
        <div class="header-left">
          <p>التاريخ: <span id="currentDate"></span></p>
        </div>
        <!--Close Btn-->
        <span class="close" @click="closeModal">
          <svg
            width="34px"
            height="34px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
                fill="#fff"
              ></path>
            </g>
          </svg>
        </span>
      </div>

      <!--Modal Form-->
      <div class="checkout-div">
        <div class="checkout-formm">
          <div v-if="validationErrorMessage" class="validation-container">
            <p
              id="validationError"
              class="error"
              v-html="validationErrorMessage"
            ></p>
            <span class="error">,</span>
            <a
              v-if="link"
              href="https://front.monglish.academy/login"
              class="text-link"
              >Login</a
            >
            <span class="error">or enter another email</span>
          </div>

          <!-- First row of inputs -->
          <div class="input-row">
            <div class="form-group">
              <label for="firstname">الاسم الأول</label>
              <input type="text" id="firstname" v-model="firstname" />
              <p v-if="errors.firstname" class="error">
                {{ errors.firstname }}
              </p>
            </div>

            <div class="form-group">
              <label for="lastname">الاسم الأخير</label>
              <input type="text" id="lastname" v-model="lastname" />
              <p v-if="errors.lastname" class="error">{{ errors.lastname }}</p>
            </div>
          </div>

          <!-- Second row of inputs -->
          <div class="input-row">
            <div class="form-group">
              <label for="country">البلد / المنطقة</label>
              <select
                id="country"
                v-model="country"
                @change="updatePhoneNumber"
              >
                <option
                  v-for="country in sortedCountries"
                  :key="country.code"
                  :value="country.code"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="phone">رقم الهاتف (مع كود الدولة)</label>
              <input
                type="text"
                id="phone"
                v-model="phone"
                style="direction: ltr"
              />
              <p v-if="errors.phone" class="error">{{ errors.phone }}</p>
            </div>
          </div>

          <!-- Third row (full width input) -->
          <div class="form-group full-width">
            <label for="email">البريد الإلكتروني</label>
            <input type="email" id="email" v-model="email" />
            <p v-if="errors.email" class="error">{{ errors.email }}</p>
          </div>
        </div>
      </div>

      <!--Modal Header-->
      <div class="modal-terms">
        <h2>
          لضمان حقوقك الكاملة في التعاقد مع الأكاديمية، برجاء قراءة البنود
          التالية بعناية والموافقة عليها:
        </h2>
        <div class="terms-container">
          <div class="terms-content">
            <ol>
              <li>
                <strong>سياسات الأكاديمية:</strong><br />
                أتعهد بالالتزام بكافة السياسات والإجراءات المتبعة داخل
                الأكاديمية، وأقر بأنني قد اطلعت عليها وفهمتها بالكامل ووافقت
                عليها.
              </li>
              <li>
                <strong>الرسوم الدراسية:</strong><br />
                أقر بأنني قد اطلعت على الرسوم الدراسية المقررة وأتعهد بسدادها في
                المواعيد المحددة. أعلم أنه في حالة التأخر في السداد، يحق
                للأكاديمية اتخاذ الإجراءات المناسبة بما في ذلك تعليق الحساب أو
                وقف الخدمات التعليمية حتى سداد المستحقات.
              </li>
              <li>
                <strong>الحضور الإلكتروني والانضباط:</strong><br />
                أتعهد بضمان حضور ابني/ابنتي للحصص الدراسية الإلكترونية بانتظام
                وفي المواعيد المحددة، وأفهم أن التغيب المتكرر دون عذر مقبول قد
                يؤدي إلى إجراءات إدارية مثل إلغاء الحجز أو إعادة الجدولة
                بالإضافة إلى الالتزام بما ورد في نموذج
                <a href="/ar/terms-and-conditions/terms">الشروط والأحكام</a> بما
                يخص بند الحضور.
              </li>
              <li>
                <strong>السلوك الإلكتروني:</strong><br />
                أتعهد بمتابعة سلوك ابني/ابنتي خلال الحصص الدراسية الإلكترونية،
                وأدرك أن الأكاديمية لها الحق في اتخاذ إجراءات تأديبية في حال
                حدوث مخالفات سلوكية عبر المنصة الإلكترونية.
              </li>
              <li>
                <strong>التقنية والمسؤوليات:</strong><br />
                أقر بأنني مسؤول عن توفير جهاز إلكتروني واتصال إنترنت مستقر لضمان
                مشاركة ابني/ابنتي في الحصص الدراسية عبر الإنترنت، وأدرك أن
                الأكاديمية غير مسؤولة عن أي مشكلات تقنية تتعلق بالاتصال من
                جانبي.
              </li>
              <li>
                <strong>الانسحاب أو الإلغاء:</strong><br />
                أعلم أنه في حالة الرغبة في سحب ابني/ابنتي من الأكاديمية أو إلغاء
                الاشتراك في البرنامج، يجب إبلاغ الإدارة كتابةً قبل فترة زمنية
                محددة، وأوافق على الالتزام
                <a href="/ar/terms-and-conditions/refund">بسياسة الإلغاء</a>
                والاسترداد كما هو موضح في
                <a href="/ar/terms-and-conditions/terms">الشروط والأحكام</a>
                الخاصة بسياسات الأكاديمية.
              </li>
              <li>
                <strong>استخدام الوسائل التعليمية الإلكترونية:</strong><br />
                أوافق على استخدام الأكاديمية لمنصات التعليم الإلكتروني والتقنيات
                الحديثة لتقديم الدروس،وأقر بأنني قد قرأت وفهمت
                <a href="/ar/terms-and-conditions/privacy">بسياسة الخصوصية</a>
                المتعلقة باستخدام هذه الوسائل.
              </li>
              <li>
                <strong>الصور والمقاطع المصورة:</strong><br />
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
                <strong>الموافقة على الشروط:</strong><br />
                بمجرد الضغط على زر شراء، يعتبر هذا موافقة منك على الشروط
                والأحكام المذكورة أعلاه والمرفقة بنموذج رقم MIA-TC-01.
              </li>
            </ol>
          </div>
        </div>

        <label class="checkbox">
          <input type="checkbox" v-model="isChecked" />
          أوافق على جميع الشروط والأحكام
        </label>

        <button type="submit" class="checkout-button" :disabled="!isChecked">
          أوافق وأرغب بالاستمرار لإتمام الطلب
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { countries } from "countries-list";
export default {
  data() {
    return {
      preferredCountries: [
        "SA",
        "KW",
        "AE",
        "QA",
        "EG",
        "JO",
        "OM",
        "YE",
        "BH",
        "IQ",
      ],
      countryCodes: {
        SA: "+966",
        KW: "+965",
        AE: "+971",
        QA: "+974",
        EG: "+20",
        JO: "+962",
        OM: "+968",
        YE: "+967",
        BH: "+973",
        IQ: "+964",
      },
      isChecked: false,
      orderUpdated: false,
      showModal: false,
      cartItems: [],
      cartSummary: {
        total_price: 0,
        total_price_discount: 0,
        family_or_friend_discount: 0,
        currency: "",
        total_items_count: 0,
        coupon_code: null,
        discount: 0,
      },
      firstname: "",
      lastname: "",
      country: "",
      phone: "",
      email: "",
      couponCode: "",
      successMessage: "",
      errors: {},
      errorMessage: "",
      validationErrorMessage: "",
      link: false,
    };
  },
  methods: {
    async sendMessage() {
      try {
        const response = await fetch(
          `https://service.monglish.co.uk/api/get-phone-number`
        );
        if (!response.ok) {
          console.log("Network response was not ok");
        }
        const data = await response.json();
        this.getNumber = data.phone_number;

        if (this.chatInput !== "" && this.getNumber) {
          const baseUrl =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            )
              ? "whatsapp://send"
              : "https://web.whatsapp.com/send";
          const url = `${baseUrl}?phone=${this.getNumber}&text=${this.chatInput}`;
          window.open(url, "_blank");
        }
      } catch (error) {
        console.error("Error fetching phone number:", error);
      }
    },
    async fetchCartItems() {
      let url = sessionStorage.getItem("userInfo")
        ? "/api/user/cart"
        : "/api/session/cart";

      const userInfo = sessionStorage.getItem("userInfo");
      let headers = {};
      if (userInfo) {
        try {
          const parsedUserInfo = JSON.parse(userInfo);
          const token = parsedUserInfo.token;

          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error parsing userInfo from sessionStorage:", error);
        }
      }

      axios
        .get(url, { headers })
        .then((response) => {
          // Store cart items in data
          this.cartItems = response.data.data.items || [];
          this.orderUpdated = false; // Reset update status
          this.cartSummary = response.data.data;
          if (this.cartSummary.coupon_code) {
            this.couponCode = this.cartSummary.coupon_code["code"];
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            //   // If the cart is not found, treat it as empty
            this.cartItems = [];
            this.cartSummary = {};
            console.warn("Cart is empty or was deleted:", error.response.data);
          } else {
            console.error(
              "Error fetching cart items:",
              error.response ? error.response.data : error.message
            );
          }
        });
    },
    async increaseQuantity(itemId) {
      let url = sessionStorage.getItem("userInfo")
        ? `/api/user/cart/increase/${itemId}`
        : `/api/session/cart/increase/${itemId}`;

      const userInfo = sessionStorage.getItem("userInfo");
      let headers = {};
      if (userInfo) {
        try {
          const parsedUserInfo = JSON.parse(userInfo);
          const token = parsedUserInfo.token;

          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error parsing userInfo from sessionStorage:", error);
        }
      }

      axios
        .get(url, { headers })
        .then(() => {
          this.fetchCartItems();
          window.location.reload();
        }) // Refresh cart items
        .catch((error) => {
          console.error("Error increasing item quantity:", error);
        });
    },
    async decreaseQuantity(itemId) {
      let url = sessionStorage.getItem("userInfo")
        ? `/api/user/cart/decrease/${itemId}`
        : `/api/session/cart/decrease/${itemId}`;

      const userInfo = sessionStorage.getItem("userInfo");
      let headers = {};
      if (userInfo) {
        try {
          const parsedUserInfo = JSON.parse(userInfo);
          const token = parsedUserInfo.token;

          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error parsing userInfo from sessionStorage:", error);
        }
      }

      axios
        .get(url, { headers })
        .then(() => {
          this.fetchCartItems();
          window.location.reload();
        }) // Refresh cart items
        .catch((error) => {
          console.error("Error decreasing item quantity:", error);
        });
    },
    async removeItem(itemId) {
      let url = sessionStorage.getItem("userInfo")
        ? `/api/user/cart/remove/${itemId}`
        : `/api/session/cart/remove/${itemId}`;

      const userInfo = sessionStorage.getItem("userInfo");
      let headers = {};
      if (userInfo) {
        try {
          const parsedUserInfo = JSON.parse(userInfo);
          const token = parsedUserInfo.token;

          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error parsing userInfo from sessionStorage:", error);
        }
      }

      axios
        .get(url, { headers })
        .then(() => {
          this.fetchCartItems();
          window.location.reload();
        })
        .catch((error) => {
          this.errorMessage = "Error removing item.";
          console.error("Error removing item:", error);
        });
    },
    async applyCoupon() {
      // Reset messages
      this.successMessage = "";
      this.errorMessage = "";

      if (!this.couponCode.trim()) {
        this.errorMessage = "Please enter a valid coupon code.";
        return;
      }
      try {
        let url = sessionStorage.getItem("userInfo")
          ? "/api/user/cart/apply-coupon"
          : "/api/session/cart/apply-coupon";

        const userInfo = sessionStorage.getItem("userInfo");
        let headers = {};
        if (userInfo) {
          try {
            const parsedUserInfo = JSON.parse(userInfo);
            const token = parsedUserInfo.token;

            if (token) {
              headers["Authorization"] = `Bearer ${token}`;
            }
          } catch (error) {
            console.error("Error parsing userInfo from sessionStorage:", error);
          }
        }

        const response = await axios.post(
          url,
          { coupon_code: this.couponCode },
          { headers }
        );

        if (response.data.success) {
          this.cartSummary = response.data.data.cartSummary;
          this.successMessage = response.data.message;
          this.couponCode = this.cartSummary.coupon_code;
        } else {
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        this.errorMessage = "Failed to apply coupon. Please try again.";
      }
    },
    async removeCoupon() {
      // Reset messages
      this.successMessage = "";
      this.errorMessage = "";

      try {
        let url = sessionStorage.getItem("userInfo")
          ? "/api/user/cart/remove-coupon"
          : "/api/session/cart/remove-coupon";

        const userInfo = sessionStorage.getItem("userInfo");
        let headers = {};
        if (userInfo) {
          try {
            const parsedUserInfo = JSON.parse(userInfo);
            const token = parsedUserInfo.token;

            if (token) {
              headers["Authorization"] = `Bearer ${token}`;
            }
          } catch (error) {
            console.error("Error parsing userInfo from sessionStorage:", error);
          }
        }

        const response = await axios.post(url, {}, { headers });
        console.log(response.data);
        if (response.data.success) {
          this.cartSummary = response.data.data.cartSummary || {};
          this.successMessage = response.data.message;
          this.couponCode = "";
        } else {
          this.errorMessage = response.data.message;
        }
      } catch (error) {
        this.errorMessage = "Failed to remove coupon. Please try again.";
      }
    },
    goToCourses() {
      this.$router.push("/");
    },
    validateForm() {
      this.errors = {};

      if (!this.firstname) {
        this.errors.firstname = "الاسم الأول مطلوب";
      }

      if (!this.lastname) {
        this.errors.lastname = "الاسم الأخير مطلوب";
      }

      if (!this.country) {
        this.errors.country = "البلد / المنطقة مطلوب";
      }

      if (!this.phone) {
        this.errors.phone = "رقم الجوال مطلوب";
      }

      if (!this.email) {
        this.errors.email = "البريد الإلكتروني مطلوب";
      } else if (!this.isValidEmail(this.email)) {
        this.errors.email = "البريد الإلكتروني غير صالح";
      }
    },
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    goToCheckout() {
      let url = sessionStorage.getItem("userInfo")
        ? "/api/user/checkout"
        : "/api/session/checkout";

      const userInfo = sessionStorage.getItem("userInfo");
      let headers = {};
      let formData = {};
      if (userInfo) {
        try {
          const parsedUserInfo = JSON.parse(userInfo);
          const token = parsedUserInfo.token;

          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Error parsing userInfo from sessionStorage:", error);
        }
      } else {
        formData = {
          firstname: this.firstname,
          lastname: this.lastname,
          country: this.country,
          phone: this.phone,
          email: this.email,
        };
        this.validateForm();
      }

      // If there are no errors, submit the form
      if (Object.keys(this.errors).length === 0) {
        axios
          .post(url, formData, { headers })
          .then((response) => {
            // Handle successful form submission
            console.log("Order checkout successfully:", response.data);
            if (response.data.success) {
              // Redirect to the URL in the response data
              window.location.href = response.data.data;
            } else {
              console.error("Error:", response.data.message);
              // Optionally, display an error message to the user
            }
          })
          .catch((error) => {
            // Handle errors
            console.error("Error submitting form:", error.response.data);
            this.validationErrorMessage =
              error.response.data.data.error ||
              "حدث خطأ أثناء إرسال النموذج. حاول مرة أخرى.";
            if (error.response.data.message.includes("User Exists")) {
              this.link = true;
            }
          });
      }
    },
    showAuthModal() {
      if (sessionStorage.getItem("userInfo")) {
        this.goToCheckout();
      } else {
        this.showModal = true;
      }
    },
    closeModal() {
      this.showModal = false;
    },
    updatePhoneNumber() {
      // Get the selected country code and set it to the phone input
      const countryCode = this.country;

      // Set phone to the country code only if it exists
      if (this.countryCodes[countryCode]) {
        this.phone = this.countryCodes[countryCode]; // Set phone to country code
      } else {
        this.phone = ""; // Clear if no valid country is selected
      }
    },
  },
  computed: {
    sortedCountries() {
      // Create an array of countries from the countries-list package
      const countryArray = Object.keys(countries).map((code) => ({
        code: code,
        name: countries[code].name,
      }));

      const preferred = this.preferredCountries
        .map((code) => countryArray.find((c) => c.code === code))
        .filter(Boolean);
      const others = countryArray.filter(
        (country) => !this.preferredCountries.includes(country.code)
      );
      return [...preferred, ...others]; // Combine preferred and other countries
    },
  },
  mounted() {
    this.fetchCartItems();
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    document.getElementById("currentDate").textContent =
      today.toLocaleDateString("ar-EG", options);
  },
};
</script>

<style scoped>
.shopping-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("@/assets/images/cart_bg.png");
  background-size: cover;
  background-position: center;
  direction: rtl;
  margin-top: -85px;
}

.cart-main {
  display: flex;
  width: 100%;
}

.cart-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.9;
  margin-bottom: 5%;
  margin-right: 5%;
  margin-top: 200px;
  width: 100%;
}

.cart-info h1 {
  font-size: 3rem;
  color: #fff;
  font-family: "DIN Next LT Arabic";
  font-weight: 500;
  text-align: right;
  margin-right: 0;
}

.cart-info .cart-whatsapp {
  text-align: left;
}

.cart-info h3 {
  font-size: 1.6rem;
  color: #fff;
  font-family: "DIN Next LT Arabic";
  font-weight: 500;
  display: inline-block;
  margin-left: 30px;
}

.cs {
  font-family: "DIN Next LT Arabic";
  font-weight: 500;
  color: #000;
  background-color: #fff;
  font-size: 1rem;
  padding: 0 25px 6px 25px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  margin-left: 30px;
}

/* Mobile view adjustments */
@media (max-width: 768px) {
  .cart-info {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 120px;
  }

  .cart-info h1 {
    font-size: 2.3rem;
    text-align: center;
    margin: 0px;
  }

  .cart-info .cart-whatsapp {
    text-align: center;
  }

  .cart-info h3 {
    font-size: 1.4rem;
    margin: 0px;
  }

  .cs {
    font-size: 1rem;
    margin-top: 10px;
  }

  .order-section {
    margin-top: 20px;
  }

  .buy-another-course {
    font-size: 1.2rem;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}

.cart-page {
  display: flex;
  font-family: "DIN Next LT Arabic";
  font-weight: 500;
  justify-content: center;
  width: 100%;
  background-color: white;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  gap: 20px;
}

.empty-cart img {
  width: 20vw;
}

.empty-cart h2 {
  font-size: 2rem;
  color: #333;
  line-height: 80%;
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
  line-height: 100%;
}

.back-to-courses {
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

/* cart items */
.cart-content {
  display: flex;
  width: 100%;
}

.cart-container {
  padding: 30px;
  border-radius: 15px;
  width: 100%;
  margin-bottom: 20px;
}

.cart-container-1 {
  max-width: 70%;
  position: relative;
  right: 0;
  top: -90px;
}

.cart-container-2 {
  max-width: 30%;
  position: relative;
  right: 0;
  top: -50px;
  background: white;
}

.coupon-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.coupon-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

#coupon-code {
  padding: 15px;
  border-radius: 15px;
  margin-left: 10px;
  border: 1px solid #ccc;
  width: 60%;
}

.remove-coupon-section {
  color: #ff1919;
}

.apply-button,
.remove-coupon-button {
  background: linear-gradient(45deg, #ff9442, #ff6f00);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  font-family: "DIN Next LT Arabic";
  font-weight: 500;
  width: 40%;
}

.remove-coupon-button {
  background: linear-gradient(45deg, #fd7878, #fa5353);
}

.price-table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
  font-weight: bold;
  font-family: "DIN Next LT Arabic";
  font-size: 20px;
}

.price-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
  font-size: 18px;
  direction: ltr;
}

.confirm-button {
  background: linear-gradient(45deg, #ff9442, #ff6f00);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  font-weight: 500;
  font-family: "DIN Next LT Arabic";
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 20px;
}

.order-section {
  padding: 15px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-family: "DIN Next LT Arabic";
  font-weight: 500;
}

.order-table-mobile {
  display: none;
}

.order-table th,
.order-table td {
  border: 1px solid #ddd;
  text-align: center;
  padding: 10px;
  border-left: 0;
  border-right: 0;
}

.order-table th {
  border-top: 0;
  padding-bottom: 20px;
  color: white;
}

.order-item {
  background-color: white;
}

.price {
  color: #f47920;
  font-size: 26px;
  font-weight: 600;
}

.quantity {
  align-items: center;
  justify-content: center;
}

.quantity input {
  width: 40px;
  text-align: center;
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}

.quantity button {
  background-color: #fff;
  border: 1px solid #ccc;
  color: #808b94;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;
}

.course {
  font-size: 26px;
  font-weight: bold;
  transition: color 0.3s;
}

.course:hover {
  color: #f47920;
}

.remove-button {
  background-color: transparent;
  border: 1px solid #f47d21;
  border-radius: 50%;
  color: #f47920;
  cursor: pointer;
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, color 0.3s;
}

.remove-button:hover {
  background-color: #f47920;
  color: white;
}

.buy-another-course {
  background-color: #165e84;
  color: #fff;
  padding: 16px 20px 16px 20px;
  margin: 0px 0px 0px 0px;
  font-family: "DIN Next LT Arabic-n", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  justify-content: center;
}
/* end cart item */

.order-update-message {
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
}

.success-message {
  color: green;
  margin-top: 1em;
}

.error-message {
  color: red;
  margin-top: 1em;
}

.validation-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.error {
  color: red;
}

.text-linkkk {
  color: #0f73a8 !important;
  text-decoration: underline !important;
}

.text-linkkk:hover {
  color: #034b72 !important;
  text-decoration: none !important;
}

.checkout-form-group {
  margin-bottom: 18px;
  text-align: right;
}
.checkout-form-group label {
  margin-bottom: 100px;
  margin-left: 10px;
  font-size: 18px;
  color: #333;
}
.checkout-form-group input,
.checkout-form-group select {
  padding: 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 50%;
  text-align: right;
}

.checkout-button {
  background: linear-gradient(45deg, #ff9442, #ff6f00);
  color: #fff;
  padding: 10px;
  font-weight: 500;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  width: 100%;
}

.checkout-button:hover {
  background-color: #ff9442;
}

.checkout-button:disabled {
  background: linear-gradient(45deg, #686868, #cacaca);
  color: #666; /* Darker grey text */
  cursor: not-allowed; /* Change cursor to indicate it's not clickable */
}

.checkout-form {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 900px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
.personal-section {
  width: 100%;
}

.modal {
  display: block;
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: transparent;
  margin: 0 auto;
  width: 65%;
}

.modal-header {
  width: 100%;
  border-radius: 20px;
  background: linear-gradient(45deg, #ff9442, #ff6f00);
  padding: 1% 4%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  margin-top: 2%;
}

.modal-header h1 {
  font-size: 1.8rem;
  color: #fff;
  font-family: "DIN Next LT Arabic";
  font-weight: 500;
}

.modal-header p {
  font-size: 1.1rem;
  color: #fff;
  font-family: "DIN Next LT Arabic";
  font-weight: 500;
  justify-content: center;
}

.header-right {
  width: 60%;
  text-align: right;
  padding-right: 10px;
}

.header-left {
  width: 40%;
  text-align: left;
}

.modal-content form {
  margin-top: 50px;
}

.close {
  color: #fff;
  position: absolute; /* Position the SVG absolutely */
  top: 3%; /* Adjust as needed */
  right: 3%;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.checkout-div {
  margin-top: 2%;
  width: 100%;
  border-radius: 20px;
  background: #fff;
  padding: 1% 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-terms {
  margin-top: 2%;
  width: 100%;
  border-radius: 20px;
  background: #fff;
  padding: 1% 4%;
  display: flex;
  flex-direction: column;
  direction: rtl;
}

.modal-terms h2 {
  color: #000;
  font-size: 1.4rem;
  font-family: "DIN Next LT Arabic";
  font-weight: 500;
  margin-bottom: 1rem;
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
  overflow-x: auto;
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

.checkout-formm {
  width: 100%;
  margin: 0 auto;
}

.validation-container {
  color: #721c24;
  padding: 10px;
  margin-bottom: 15px;
}

.checkout-formm .error {
  color: red;
}

.checkout-formm .text-link {
  color: #007bff;
  text-decoration: none;
}

.checkout-formm .input-row {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  direction: rtl;
}

.checkout-formm .form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.checkout-formm .full-width {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  direction: rtl;
}

.checkout-formm label {
  margin-bottom: 5px;
  color: #8d93a1;
}

.checkout-formm input,
.checkout-formm select {
  padding: 10px;
  border-radius: 5px;
  border-color: transparent;
  width: 100%;
  box-sizing: border-box;
  background-color: #f7f9fc;
}

.checkout-formm input:focus,
.checkout-formm select:focus {
  border-color: #f47920;
  outline: none;
}

@media (min-width: 320px) and (max-width: 479px) {
  .cart-content {
    flex-direction: column;
  }
  .cart-container-1 {
    max-width: 100%;
    position: relative;
    right: 0;
    top: -40px;
    padding: 10px;
  }

  .order-table {
    display: none;
  }

  .order-table-mobile {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-family: "DIN Next LT Arabic";
    font-weight: 500;
  }

  .order-table-mobile tr {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    margin: 10px;
  }

  .remove-row {
    border-bottom: 0 !important;
    flex-direction: row-reverse;
  }

  .price-row td {
    color: #f47920;
    font-size: 26px;
    font-weight: 600;
  }

  .order-table-mobile td {
    text-align: center;
    padding: 10px;
    border-left: 0;
    border-right: 0;
  }

  .order-item {
    background-color: white;
  }

  .price {
    color: #f47920;
    font-size: 26px;
    font-weight: 600;
  }

  .quantity {
    align-items: center;
    justify-content: center;
  }

  .quantity input {
    width: 40px;
    text-align: center;
    margin: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
  }

  .quantity button {
    background-color: #fff;
    border: 1px solid #ccc;
    color: #808b94;
    padding: 5px;
    font-size: 18px;
    cursor: pointer;
  }

  .course {
    font-size: 26px;
    font-weight: bold;
    transition: color 0.3s;
  }

  .course:hover {
    color: #f47920;
  }

  .remove-button {
    background-color: transparent;
    border: 1px solid #f47d21;
    border-radius: 50%;
    color: #f47920;
    cursor: pointer;
    width: 25px;
    height: 25px;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, color 0.3s;
  }

  .remove-button:hover {
    background-color: #f47920;
    color: white;
  }

  .cart-container-2 {
    max-width: 100%;
  }

  .price-table td {
    direction: rtl;
  }

  .modal-content {
    width: 90%;
  }
}

.checkbox {
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 1.1rem;
}

.checkbox input {
  margin-left: 10px;
}
</style>
