<template>
  <div :style="{ direction: currentDirection }" class="payment-success">
    <button @click="toggleLanguage" class="lang-switch">
      {{ languageToggleText }}
    </button>

    <div class="header">
      <h1>{{ headerTitle }}</h1>
      <p>{{ headerMessage }}</p>
      <p>{{ orderIdText }} {{ orderId }}</p>
    </div>

    <div class="order-details">
      <div
        class="order-item"
        v-for="(items, studentCode) in groupedOrderItems"
        :key="studentCode"
      >
        <div class="row">
          <div class="column">
            <strong>{{ studentNameText }}</strong>
            {{ items[0].studentName }}
          </div>
          <div class="column">
            <strong>{{ studentCodeText }}</strong>
            {{ studentCode }}
          </div>
          <div class="column">
            <strong>{{ studentTotalText }}</strong>
            <span class="price2">{{ getStudentTotalPrice(items) }}</span>
            {{ currency }}
          </div>
        </div>

        <div class="student-info">
          <div v-for="(item, index) in items" :key="index" class="row">
            <div class="column">
              <span class="price"> X {{ item.quantity }}</span>
            </div>
            <div class="column">
              {{ item.teacherType }}
            </div>
            <div class="column clubname">
              {{ item.clubName }}
            </div>
            <div class="column">
              <strong>
                {{ item.sessionAmount }}
                {{ session_groupText }}</strong
              >
            </div>
            <div class="column">
              <span class="price">{{ item.price }}</span> {{ currency }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="total-price">
      <h3>
        {{ totalPriceText }}: <span class="price2">{{ totalPrice }}</span>
        {{ currency }}
      </h3>
    </div>

    <div class="footer">
      <p><i class="fa-solid fa-print"></i>{{ footerNote }}</p>
      <button @click="printReceipt">{{ printReceiptText }}</button>
      <button class="footer-btn-transparent" @click="goToHomePage">
        {{ backToHomePageText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
  .payment-success {
    font-family: "DIN Next LT Arabic";
    font-weight: 500;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url("@/assets/images/cart_bg.webp");
    background-size: cover;
    background-position: center;
    margin-top: -100px;
  }

  .lang-switch {
    margin-top: 100px;
    margin-bottom: 20px;
  }

  .header {
    text-align: center;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 20px;
    padding: 25px 40px;
    width: 80%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .header h1 {
    font-size: 50px;
    color: #f47e23;
    font-weight: 500;
  }

  .header p {
    font-weight: 500;
    color: #686868;
    font-size: 21px;
  }

  .order-details {
    width: 100%;
    background-color: #fff;
    border-radius: 20px;
    padding: 25px 40px;
    width: 80%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 21px;
    color: #2b2b2b;
  }

  .order-item {
    padding: 10px;
    background-color: #fff;
    border-radius: 20px;
  }

  .student-info {
    background-color: #f2f2f2;
    border-radius: 20px;
    padding: 15px;
    margin-bottom: 10px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .column {
    width: 32%;
    text-align: center;
  }

  footer {
    text-align: center;
    padding: 10px 0;
  }

  .footer p {
    color: #165484;
    font-family: "DIN Next LT Arabic";
    font-weight: 500;
    font-size: 21px;
    text-align: center;
    margin-bottom: 30px;
  }

  button {
    width: 350px;
    padding: 0.5rem 1rem;
    background: linear-gradient(45deg, #fe9b4f, #f77919);
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1.3rem;
    margin: 0 0.25rem;
    font-family: "DIN Next LT Arabic";
    font-weight: 500;
    transition: background 0.3s ease, transform 0.3s ease;
  }

  button:hover {
    background: linear-gradient(45deg, #f47e23, #fe9b4f);
    transform: scale(1.05);
  }

  .footer-btn-transparent {
    background: transparent;
    color: #f77919;
    border: 2px solid #f77919;
  }

  .footer-btn-transparent:hover {
    background: #f77919;
    color: white;
  }

  .price {
    color: #f47920;
    font-size: 32px;
    font-weight: 600;
  }

  .price2 {
    color: #f47920;
    font-size: 50px;
    font-weight: 600;
  }

  .clubname {
    font-weight: 600;
    font-size: 23px;
  }

  @media print {
    .payment-success button:first-of-type,
    .footer {
      display: none;
    }

    .header h1 {
      font-size: 32px;
    }

    .header p {
      font-size: 16px;
    }

    .order-details,
    .clubname {
      font-size: 18px;
    }

    .order-item {
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 10px;
      background-color: #f9f9f9;
    }

    .student-info {
      margin-top: 10px;
      padding: 15px;
      background-color: #fafafa;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    .header,
    .order-details {
      border: #686868 1px solid;
      width: 97%;
      padding: 10px 20px;
      border-radius: 10px;
    }

    .header {
      margin-top: 100px;
    }

    .price {
      font-size: 28px;
    }

    .price2 {
      font-size: 40px;
      margin-bottom: 0px;
    }
  }

  @media (max-width: 768px) {
    .payment-success {
      padding: 15px;
    }

    .header {
      width: 100%;
      padding: 5px;
    }

    .header h1 {
      font-size: 32px;
    }

    .header p {
      font-size: 18px;
    }

    .order-details {
      width: 100%;
      padding: 5px;
    }

    button {
      width: auto;
      padding: 0.5rem 2rem;
    }
  }

  @media (max-width: 480px) {
    .header h1 {
      font-size: 28px;
    }

    .header p {
      font-size: 16px;
    }

    .order-details {
      font-size: 17px;
    }

    .clubname,
    .footer p {
      font-size: 16px;
    }

    .order-item {
      padding: 10px 0;
    }

    .student-info {
      padding: 10px 0;
    }

    .footer {
      padding: 8px;
    }

    .price {
      font-size: 22px;
    }

    .price2 {
      font-size: 24px;
    }

    button {
      font-size: 1.1rem;
    }
  }
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currentLanguage: "ar",
      orderId: "",
      orderItems: [
        // {
        //   studentName: "Ahmed Ismail",
        //   studentCode: "14784D33",
        //   clubName: "Reading Club",
        //   quantity: 2,
        //   teacherType: "مدرسين أجانب",
        //   session_group: { number: 8 },
        //   price: 280,
        // },
        // {
        //   studentName: "Zeinab Abdo",
        //   studentCode: "20191170733",
        //   club: "Speaking Club",
        //   session_group: { number: 4 },
        //   quantity: 1,
        //   teacher: "مدرسين أجانب",
        //   price: 180,
        // },
        // {
        //   studentName: "Zeinab Abdo",
        //   studentCode: "20191170733",
        //   session_group: { number: 2 },
        //   club: "Reading Club",
        //   teacher: "خبراء اللغة",
        //   quantity: 3,
        //   price: 420,
        // },
      ],
    };
  },
  computed: {
    groupedOrderItems() {
      return this.orderItems.reduce((acc, item) => {
        if (!acc[item.studentCode]) {
          acc[item.studentCode] = [];
        }
        acc[item.studentCode].push(item);
        return acc;
      }, {});
    },

    totalPrice() {
      return this.orderItems.reduce((total, item) => total + item.price, 0);
    },

    totalPriceText() {
      return this.currentLanguage === "en" ? "Total Price" : "الإجمالي";
    },

    currency() {
      return this.currentLanguage === "ar" ? "ريال" : "SAR";
    },

    currentDirection() {
      return this.currentLanguage === "ar" ? "rtl" : "ltr";
    },

    languageToggleText() {
      return this.currentLanguage === "en"
        ? "Switch to Arabic"
        : "Switch to English";
    },

    headerTitle() {
      return this.currentLanguage === "en"
        ? "Purchase Successful!"
        : "تمت عملية الشراء بنجاح!";
    },

    headerMessage() {
      return this.currentLanguage === "en"
        ? "Thank you for your order from Monglish International Academy! We are pleased to inform you that your purchase was successful."
        : "شكرًا لك على طلبك من أكاديمية مونجلش الدولية! نحن سعيدون بإبلاغك أن عملية الشراء تمت بنجاح.";
    },

    orderIdText() {
      return this.currentLanguage === "en"
        ? "Your order ID is:"
        : "رقم الطلب الخاص بك هو:";
    },

    session_groupText() {
      return this.currentLanguage === "en" ? " Lectures" : " محاضرات";
    },

    studentNameText() {
      return this.currentLanguage === "en" ? "Student Name" : "اسم الطالب";
    },

    studentCodeText() {
      return this.currentLanguage === "en" ? "Student Code" : "كود الطالب";
    },

    studentTotalText() {
      return this.currentLanguage === "en" ? "Total price" : "الإجمالي";
    },

    footerNote() {
      return this.currentLanguage === "en"
        ? " Note: (Please print the receipt and keep it.)"
        : " ملحوظة: (يرجى طباعة الإيصال والاحتفاظ به.)";
    },

    printReceiptText() {
      return this.currentLanguage === "en" ? "Print Receipt" : "طباعة";
    },

    backToHomePageText() {
      return this.currentLanguage === "en"
        ? "Back to Homepage"
        : "العودة للصفحة الرئيسية";
    },
  },
  methods: {
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === "en" ? "ar" : "en";
    },

    printReceipt() {
      window.print();
    },

    goToHomePage() {
      const routeName = this.currentLanguage === "ar" ? "HomeAr" : "HomeEn";
      this.$router.push({ name: routeName });
    },

    getStudentTotalPrice(items) {
      return items.reduce((total, item) => {
        return (total += item.price);
      }, 0);
    },
    async getOrderDetails() {
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('order_id');

      let url = `api/session/club-session/order/${orderId}`;
      let totalOrderItem = 0;
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
        this.orderId = '#'+response.data.data.id;
        totalOrderItem = response.data.data.total_items_count;
        this.orderItems = response.data.data.items || [];
        console.log(totalOrderItem);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          this.orderItems = [];
        } else {
          console.error("Error fetching order items:",error.response ? error.response.data : error.message);
        }
      });
    },
  },
  mounted(){
    this.getOrderDetails();
  }
};
</script>