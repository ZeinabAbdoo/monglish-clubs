<template>
  <div class="shopping-cart-en">
    <main class="cart-main-en">
      <div class="cart-info-en">
        <h1>Shopping Cart</h1>
      </div>
    </main>
    <div class="cart-page-en">
      <div v-if="cartItems.length === 0" class="empty-cart-en">
        <img src="@/assets/images/cart.webp" alt="Empty Cart Image" />
        <h2>Your cart is empty</h2>
        <p>
          Start your educational journey now by enrolling in our clubs and enjoy
          a unique learning experience!
        </p>
        <button class="back-to-courses-en" @click="goToCourses">
          Back to Clubs
        </button>
      </div>
      <div v-else class="cart-content-en">
        <div class="cart-container-en cart-container-1-en">
          <div class="order-section-en">
            <table class="order-table-en">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Club</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="order-item"
                  v-for="(item, index) in cartItems"
                  :key="index"
                >
                  <td class="code">{{ item.student_code }}</td>
                  <td class="course">
                    <strong>{{ item.club_name }}</strong>
                    <br />
                    <span>Lectures : {{ item.session_group.number }}</span>
                  </td>
                  <td class="quantity">
                    <button
                      class="quantity-button decrease-btn"
                      @click="decreaseQuantity(item.student_id, item.id)"
                    >
                      -
                    </button>
                    <label class="quantity-label">{{ item.quantity }}</label>
                    <input type="hidden" v-model="item.quantity" readonly />
                    <button
                      class="quantity-button increase-btn"
                      @click="increaseQuantity(item.student_id, item.id)"
                    >
                      +
                    </button>
                  </td>
                  <td class="price">
                    {{ item.price }} {{ cartSummary.currency_en }}
                  </td>
                  <td>
                    <button
                      class="remove-button"
                      type="button"
                      @click="removeItem(item.id)"
                    >
                      <i class="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="order-table-mobile-en"
              v-for="(item, index) in cartItems"
              :key="index"
            >
              <tbody>
                <tr
                  class="order-item"
                  v-for="(item, index) in cartItems"
                  :key="index"
                >
                  <td class="code">{{ item.student_code }}</td>
                  <td class="course">
                    <strong>{{ item.club_name }}</strong>
                    <br />
                    <span>Lectures : {{ item.session_group.number }}</span>
                  </td>
                  <td class="quantity">
                    <button
                      class="quantity-button decrease-btn"
                      @click="decreaseQuantity(item.student_id, item.id)"
                    >
                      -
                    </button>
                    <label class="quantity-label">{{ item.quantity }}</label>
                    <input type="hidden" v-model="item.quantity" readonly />
                    <button
                      class="quantity-button increase-btn"
                      @click="increaseQuantity(item.student_id, item.id)"
                    >
                      +
                    </button>
                  </td>
                  <td class="price">
                    {{ item.price }} {{ cartSummary.currency_en }}
                  </td>
                  <td>
                    <button
                      class="remove-button"
                      type="button"
                      @click="removeItem(item.id)"
                    >
                      <i class="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button class="add-new-stud" @click="openModal">
              Add New Student
              <i class="fa-solid fa-circle-plus"></i>
            </button>

            <!-- Modal for adding a new student -->
            <div v-if="showModal" class="student-popup">
              <div class="student-popup-content">
                <button class="student-close-btn" @click="closeModal">
                  &times;
                </button>
                <h2>Add New Student</h2>
                <form @submit.prevent="addStudent">
                  <div class="student-form-group">
                    <div class="student-form-item">
                      <label for="student-name">Student Name</label>
                      <input
                        id="student-name"
                        v-model="newStudent.name"
                        type="text"
                        required
                      />
                    </div>
                    <div class="student-form-item">
                      <label for="student-code">Student Code</label>
                      <input
                        id="student-code"
                        v-model="newStudent.code"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" class="submit-stud">Add</button>
                </form>
              </div>
            </div>

            <button class="buy-another-course-en" @click="goToCourses">
              ← Add Club
            </button>
            <div v-if="orderUpdated" class="order-update-message-en">
              Cart updated.
            </div>
          </div>
        </div>
        <div class="cart-container-en cart-container-2-en">
          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <div class="coupon-section-en">
            <label for="coupon-code-en">Have a discount code?</label>
            <div class="coupon-input-en">
              <input
                type="text"
                id="coupon-code-en"
                placeholder="Coupon code"
                v-model="couponCode"
              />
              <button
                v-if="!cartSummary.coupon_code"
                @click="applyCoupon"
                class="apply-button-en"
              >
                Apply
              </button>
              <button
                v-if="cartSummary.coupon_code"
                @click="removeCoupon"
                class="remove-coupon-button"
              >
                Remove Coupon
              </button>
            </div>
          </div>
          <table class="price-table-en">
            <tbody>
              <tr>
                <td v-if="cartSummary.total_price_discount == 0">
                  Final Price
                </td>
                <td v-else>Initial Price</td>
                <td>
                  {{ cartSummary.total_price }} {{ cartSummary.currency_en }}
                </td>
              </tr>
              <tr v-if="cartSummary.coupon_code">
                <td>Discount</td>
                <td>
                  <div class="remove-coupon-section">
                    - {{ cartSummary.discount }} {{ cartSummary.currency_en }}
                  </div>
                </td>
              </tr>
              <tr v-if="cartSummary.total_price_discount != 0">
                <td>Total Price</td>
                <td>
                  {{ cartSummary.total_price_discount }}
                  {{ cartSummary.currency_en }}
                </td>
              </tr>
            </tbody>
          </table>
          <button class="confirm-button-en" @click="showAuthModal">
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  </div>

  <TermsModal v-if="isTermsModalVisible" @close="handleModalClose" />
</template>

<script>
import axios from "axios";
import TermsModal from "./TermsModal.vue";

export default {
  components: {
    TermsModal,
  },
  data() {
    return {
      isChecked: false,
      orderUpdated: false,
      isTermsModalVisible: false,
      cartItems: [],
      showModal: false,
      userInfo: [],
      newStudent: {
        name: "",
        code: "",
      },
      cartSummary: {
        total_price: 0,
        total_price_discount: 0,
        currency_ar: "",
        total_items_count: 0,
        coupon_code: null,
        discount: 0,
      },
      couponCode: "",
      successMessage: "",
      errors: {},
      errorMessage: "",
      validationErrorMessage: "",
      link: false,
    };
  },
  methods: {
    async fetchCartItems() {
      let url = "/api/session/club-session-cart";
      let totalCartItems = 0;
      const userInfo = sessionStorage.getItem("userInfo");
      console.log("userInfo", userInfo);
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
      const textElement1 = document.getElementById("totalCount1");
      axios
        .get(url, { headers })
        .then((response) => {
          console.log("Fetched cart items:", response.data);
          totalCartItems = response.data.data.total_items_count;
          textElement1.textContent = totalCartItems > 0 ? totalCartItems : 0;
          this.cartItems = response.data.data.items || [];
          this.orderUpdated = false;
          this.cartSummary = response.data.data;
          console.log("Cart Summary:", this.cartSummary);
          if (this.cartSummary.coupon_code) {
            this.couponCode = this.cartSummary.coupon_code["code"];
            console.log("Coupon code:", this.couponCode);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
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
    openModal() {
      const storedUserInfo = sessionStorage.getItem("userInfo");
      this.userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : [];
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    addStudent() {
      this.userInfo.push({ ...this.newStudent });
      sessionStorage.setItem("userInfo", JSON.stringify(this.userInfo));
      this.closeModal();
      this.$router.push({ path: "/en/", name: "HomeEn" });
    },
    resetForm() {
      this.newStudent = { name: "", code: "" };
    },
    isSameStudentCode(studentCode) {
      return (
        this.cartItems.filter((item) => item.student_code === studentCode)
          .length > 1
      );
    },
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
    async increaseQuantity(studentId, itemId) {
      let url = `/api/session/club-session-cart/increase/student-items/${studentId}/${itemId}`;
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
          console.error("Error increasing item quantity:", error);
        });
    },
    async decreaseQuantity(studentId, itemId) {
      let url = `/api/session/club-session-cart/decrease/student-items/${studentId}/${itemId}`;
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
          console.error("Error decreasing item quantity:", error);
        });
    },
    async removeItem(itemId) {
      let url = `/api/session/club-session-cart/remove/student-items/${itemId}`;
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
          return;
        }
      }

      try {
        await axios.get(url, { headers });

        await this.fetchCartItems();

        const updatedCartItems = this.cartItems;
        
        if (updatedCartItems.length === 1) {
          sessionStorage.removeItem("userInfo");
          window.location.reload();
        } else if(userInfo){
          let updatedUserInfo = [];
          const parsedUserInfo = JSON.parse(userInfo);

          updatedUserInfo = parsedUserInfo.map((student) => {
            const studentCode = student.code;

            const studentCartItems = updatedCartItems.filter(
              (item) => item.student_code === studentCode
            );

            return {
              ...student,
              session_group_data: studentCartItems.map((cartItem) => ({
                session_group_id: cartItem.session_group_id,
                quantity: cartItem.quantity,
              })),
            };
          });

          console.log("Updated userInfo:", updatedUserInfo);
          sessionStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        }
      } catch (error) {
        this.errorMessage = "Error removing item.";
        console.error("Error removing item:", error);
      }
    },
    async applyCoupon() {
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
      this.$router.push("/en/");
    },
    async goToCheckout() {
      let url = "/api/session/club-session-checkout";
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
      }

      // If there are items in the cart, remove them
      try {

        // Proceed to checkout after removing all items
        const response = await axios.post(url, formData, { headers });

        console.log("Order checkout successfully:", response.data);

        if (response.data.success) {
          // Clear session storage and cookies
          sessionStorage.clear();
          document.cookie.split(";").forEach((cookie) => {
            const [name] = cookie.split("=");
            document.cookie = `${name}=; expires=Thu, 01 Jan 2001 00:00:00 UTC; path=/;`;
          });

          // Redirect to Stripe URL
          window.location.href = response.data.data.stripeUrl;
        }
      } catch (error) {
        console.error("Error during checkout process:", error);
        this.validationErrorMessage =
          error.response?.data?.data?.error ||
          "حدث خطأ أثناء إرسال النموذج. حاول مرة أخرى.";

        if (error.response?.data?.message?.includes("User Exists")) {
          this.link = true;
        }
      }
    },
    showAuthModal() {
      this.isTermsModalVisible = true;
    },
    handleModalClose(action) {
      this.isTermsModalVisible = false;
      if(action === "submit"){
        this.goToCheckout();
      }
    },
  },
  mounted() {
    // window.location.reload();
  },
  beforeMount() {
    this.fetchCartItems();
  },
};
</script>

<style scoped>
.shopping-cart-en {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("@/assets/images/cart_bg.webp");
  background-size: cover;
  background-position: center;
  direction: ltr;
  margin-top: -85px;
}

.cart-main-en {
  display: flex;
  width: 100%;
}

.cart-info-en {
  text-align: left;
  opacity: 0.9;
  margin-bottom: 5%;
  margin-left: 5%;
}

.cart-info-en h1 {
  font-size: 3rem;
  color: #fff;
  font-family: "DIN Next LT Arabic";
  font-weight: 500;
  margin-top: 200px;
}

.cart-page-en {
  display: flex;
  font-family: "DIN Next LT Arabic";
  font-weight: 500;
  justify-content: center;
  width: 100%;
  background-color: white;
}

.empty-cart-en {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  gap: 20px;
}

.empty-cart-en img {
  width: 20vw;
}

.empty-cart-en h2 {
  font-size: 2rem;
  color: #333;
  line-height: 80%;
}

.empty-cart-en p {
  font-size: 1.2rem;
  color: #666;
  line-height: 100%;
}

.back-to-courses-en {
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
.cart-content-en {
  display: flex;
  width: 100%;
}

.cart-container-en {
  padding: 30px;
  border-radius: 15px;
  width: 100%;
  margin-bottom: 20px;
}

.cart-container-1-en {
  max-width: 70%;
  position: relative;
  right: 0;
  top: -90px;
}

.cart-container-2-en {
  max-width: 30%;
  position: relative;
  right: 0;
  top: -50px;
  background: white;
}

.coupon-section-en {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.coupon-input-en {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

#coupon-code-en {
  padding: 15px;
  border-radius: 15px;
  margin-right: 10px;
  border: 1px solid #ccc;
  width: 60%;
}

.remove-coupon-section-en {
  color: #ff1919;
}

.apply-button-en,
.remove-coupon-button-en {
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

.remove-coupon-button-en {
  background: linear-gradient(45deg, #fd7878, #fa5353);
}

.price-table-en {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
  font-weight: bold;
  font-family: "DIN Next LT Arabic";
  font-size: 20px;
}

.price-table-en td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
  font-size: 18px;
  direction: rtl;
}

.confirm-button-en {
  background: linear-gradient(45deg, #ff9442, #ff6f00);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  font-size: 18px;
  cursor: pointer;
  font-weight: 500;
  font-family: "DIN Next LT Arabic";
  margin-bottom: 20px;
}

.order-section-en {
  padding: 15px;
}

.order-table-en {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-family: "DIN Next LT Arabic", sans-serif;
  font-weight: 500;
}

.order-table-en thead {
  background: linear-gradient(
    135deg,
    #ff9442,
    #ff6f00
  ); /* Adjusted angle for a cleaner look */
  color: #ffffff; /* Text color for contrast */
  font-size: 20px; /* Slightly adjusted size for better readability */
  font-weight: bold; /* Emphasize the header text */
  text-align: center; /* Center the text */
  border-radius: 12px !; /* Add subtle rounding */
  padding: 15px; /* Add padding for spacing */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a soft shadow for depth */
}

.order-table-en thead th {
  padding: 10px 15px; /* Ensure padding for each column header */
}

.order-table-mobile-en {
  display: none;
}

.order-table-en tbody {
  background-color: #fff;
  color: #3d3d3d;
}

.order-table-en tr {
  transition: background-color 0.3s;
}

.order-table-en th,
.order-table-en td {
  padding: 15px;
  text-align: center;
  border-bottom: none;
}

.order-table-en th {
  border-top: none;
}

.order-item {
  border-radius: 15px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.price {
  color: #f47920;
  font-size: 26px;
  font-weight: 600;
}

.course {
  font-size: 20px;
  font-weight: bold;
  transition: color 0.3s;
}

.course:hover {
  color: #f47920;
}

.remove-button {
  background-color: transparent;
  border: none;
  color: #f47920;
  cursor: pointer;
  font-size: 20px;
  transition: color 0.3s;
}

.remove-button:hover {
  color: #d45d00;
}

.buy-another-course-en {
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

.order-update-message-en {
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
}

.success-message-en {
  color: green;
  margin-top: 1em;
}

.error-message-en {
  color: red;
  margin-top: 1em;
}

.validation-container-en {
  display: flex;
  align-items: center;
  gap: 10px;
}

.error-en {
  color: red;
}

.text-linkkk-en {
  color: #0f73a8 !important;
  text-decoration: underline !important;
}

.text-linkkk-en:hover {
  color: #034b72 !important;
  text-decoration: none !important;
}

.checkout-form-group-en {
  margin-bottom: 18px;
  text-align: left;
}
.checkout-form-group-en label {
  margin-bottom: 100px;
  margin-right: 10px;
  font-size: 18px;
  color: #333;
}
.checkout-form-group-en input,
.checkout-form-group-en select {
  padding: 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 50%;
  text-align: left;
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
  direction: ltr;
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
  width: 40%;
  text-align: right;
  padding-right: 10px;
}

.header-left {
  width: 60%;
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

.quantity {
  display: flex; /* Ensures the buttons and label are aligned in a row */
  align-items: center; /* Vertically aligns the items */
  justify-content: center; /* Centers the entire group */
  gap: 10px; /* Adds space between the buttons and label */
}

.quantity-button {
  padding: 5px 10px; /* Space inside the button */
  font-size: 18px; /* Text size */
  cursor: pointer; /* Pointer on hover */
  border-radius: 8px; /* Rounded corners for buttons */
  border: none; /* Removes default border */
  transition: background-color 0.3s, color 0.3s; /* Smooth hover effects */
}

.increase-btn {
  background-color: #f47d21; /* Button background color */
  color: #fff; /* Text color */
}

.increase-btn:hover {
  background-color: #d8691c; /* Darker shade on hover */
}

.decrease-btn {
  background-color: #f0f0f0; /* Button background color */
  color: #bfbfbf; /* Text color */
}

.decrease-btn:hover {
  background-color: #dcdcdc; /* Slightly darker shade on hover */
}

.quantity-label {
  font-size: 18px; /* Text size */
  font-weight: bold; /* Makes the label stand out */
  text-align: center; /* Centers the text */
  width: 50px; /* Consistent width for alignment */
  color: #000; /* Label text color */
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
  margin-right: 10px;
}

.student-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  z-index: 999;
}

.student-popup-content {
  background: #ffffff;
  width: 60%;
  border-radius: 25px;
  text-align: left;
  padding: 20px;
  position: relative;
}

.student-popup-content h2 {
  text-align: center;
  margin-bottom: 20px;
  font-family: "DIN Next LT Arabic", sans-serif;
  font-weight: 600;
  color: #333;
}

.student-form-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.student-form-item {
  width: 45%;
}

.student-popup label {
  display: block;
  font-size: 15px;
  margin-bottom: 5px;
  color: #4a4a4a;
  font-family: "DIN Next LT Arabic", sans-serif;
  font-weight: 500;
}

.student-popup input {
  width: 95%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: "DIN Next LT Arabic", sans-serif;
  color: #333;
  transition: border-color 0.3s;
}

.student-popup input:focus {
  border-color: #ff9442;
  outline: none;
}

.student-close-btn {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 30px;
  color: #333;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 1%;
}

.student-close-btn:hover {
  color: #ff9442;
}

.submit-stud {
  width: 100%;
  padding: 12px;
  background: linear-gradient(45deg, #ff9442, #ff6f00);
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 18px;
  font-family: "DIN Next LT Arabic", sans-serif;
  font-weight: 500;
  transition: background 0.3s;
}

.submit-stud {
  background: linear-gradient(45deg, #ff6f00, #ff9442);
}

/* Media Query for Mobile Devices */
@media (max-width: 768px) {
  .student-popup-content {
    width: 100%;
    border-radius: 0;
  }

  .student-form-group {
    flex-direction: column;
    align-items: stretch;
  }

  .student-form-item {
    width: 100%;
    margin-bottom: 10px;
  }

  .student-close-btn {
    font-size: 25px;
    top: 5px;
    right: 5px;
  }

  .course {
    font-size: 16px;
    font-weight: bold;
    transition: color 0.3s;
  }

  .order-table th,
  .order-table td {
    padding: 0px;
  }

  .price {
    font-size: 20px;
  }

  .quantity {
    gap: 0px;
  }

  .quantity-button {
    padding: 3px 6px;
    font-size: 16px;
  }

  .quantity-label {
    font-size: 18px;
    width: 15px;
  }
}

.add-new-stud {
  background-color: transparent;
  color: #165e84;
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

.add-new-stud i {
  margin-right: 10px;
}
</style>
