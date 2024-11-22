<template>
  <div class="shopping-cart-en">
    <main class="cart-main-en">
      <div class="cart-info-en">
        <h1>Shopping Cart</h1>
      </div>
    </main>
    <div class="cart-page-en">
      <div v-if="cartItems.length === 0" class="empty-cart-en">
        <img src="@/assets/images/cart.png" alt="Empty Cart Image" />
        <h2>Your cart is empty</h2>
        <p>Start your educational journey now by enrolling in our courses and enjoy a unique learning experience!</p>
        <button class="back-to-courses-en" @click="goToCourses">Back to Courses</button>
      </div>
      <div v-else class="cart-content-en">
        <div class="cart-container-en cart-container-1-en">
          <div class="order-section-en">
            <table class="order-table-en">
              <tr>
                <th>Course</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
              </tr>
              <tr class="order-item-en" v-for="(item, index) in cartItems" :key="index">
                <td class="course-en">{{ item.course_package.stage +' - '+ item.course_package.name + ' - ' + item.course_package.period + ' Months' }}</td>
                <td class="quantity-en">
                  <button @click="decreaseQuantity(item.id)">-</button>
                  <label class="p-4">{{ item.quantity }}</label>
                  <input type="hidden" v-model="item.quantity" readonly/>
                  <button @click="increaseQuantity(item.id)">+</button>
                </td>
                <td class="price-en">{{ item.single_price }} {{ cartSummary.currency }}</td>
                <td>
                  <button class="remove-button-en" @click="removeItem(item.id)">
                    <svg aria-hidden="true" class="svg-inline--fa fa-xmark" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg="">
                      <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            </table>
            <table class="order-table-mobile-en" v-for="(item, index) in cartItems" :key="index">
              <tr>
                <td>Course</td>
                <td class="course-en">{{ item.course_package.stage +' - '+ item.course_package.name + ' - ' + item.course_package.period + ' Months' }}</td>
              </tr>
              <tr class="order-item-en">
                <td>Quantity</td>
                <td class="quantity-en">
                  <button @click="decreaseQuantity(item.id)">-</button>
                  <label class="p-4">{{ item.quantity }}</label>
                  <input type="hidden" v-model="item.quantity" readonly/>
                  <button @click="increaseQuantity(item.id)">+</button>
                </td>
              </tr>
              <tr class="price-row-en">
                <td>Price</td>
                <td class="price-en">{{ item.single_price }} {{ cartSummary.currency }}</td>
              </tr>
              <tr class="remove-row-en">
                <td></td>
                <td colspan="2">
                  <button class="remove-button-en" @click="removeItem(item.id)">
                    <svg aria-hidden="true" class="svg-inline--fa fa-xmark" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg="">
                      <path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            </table>
            <button class="buy-another-course-en" @click="goToCourses">
              ←
              Buy Another Course 
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
              <input type="text" id="coupon-code-en" placeholder="Coupon code" v-model="couponCode"/>
              <button v-if="!cartSummary.coupon_code" @click="applyCoupon" class="apply-button-en">Apply</button>
              <button v-if="cartSummary.coupon_code" @click="removeCoupon" class="remove-coupon-button">Remove Coupon</button>
            </div>
          </div>
          <table class="price-table-en">
            <tr>
              <td v-if="cartSummary.total_price_discount == 0">Final Price</td>
              <td v-else>Initial Price</td>
              <td>{{ cartSummary.total_price }} {{ cartSummary.currency }}</td>
             </tr>
              <tr v-if="cartSummary.total_price_discount > 0">
              <td>Family/Friends Discount</td>
              <td>
                <div class="remove-coupon-section">
                    - {{ cartSummary.family_or_friend_discount }} {{ cartSummary.currency }}
                </div>
              </td>
            </tr>
            <tr v-if="cartSummary.coupon_code">
              <td>Discount</td>
              <td>
                <div class="remove-coupon-section">
                  - {{ cartSummary.discount }} {{ cartSummary.currency }}
                </div>
              </td>
            </tr>
            <tr v-if="cartSummary.total_price_discount != 0">
              <td>Total Price</td>
              <td>{{ cartSummary.total_price_discount }} {{ cartSummary.currency }}</td>
            </tr>
          </table>
          <button class="confirm-button-en" @click="showAuthModal">Confirm Order</button>
          <a
            href="https://edulixa360.com/shop/"
            target="_blank"
            style="text-decoration: none"
          >
            <img
              src="https://monglish.b-cdn.net/home/tamara.webp"
              alt="tamara and tabi link"
              style="cursor: pointer;  width: 100%;"
            />
          </a>
        </div>
      </div>
    </div>
  </div>

<!--Modal for Data-->
  <form v-show="showModal" class="modal" @submit.prevent="goToCheckout">
    <div class="modal-content">
      <!--Modal Header-->
      <div class="modal-header">
         <div class="header-left">
          <h1>Academic Acceptance Declaration for Monglish International Academy
              <br>
              "MIA-TC 01"
          </h1>
        </div>
        <div class="header-right">
          <p>Date: <span id="currentDate"></span></p>
        </div>
        <!--Close Btn-->
        <span class="close" @click="closeModal">
          <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z" fill="#fff"></path> </g></svg>      
        </span>
      </div>

      <!--Modal Form-->
      <div class="checkout-div">
            <div class="checkout-formm">
                <div v-if="validationErrorMessage" class="validation-container">
                    <p id="validationError" class="error" v-html="validationErrorMessage"></p>
                    <span class="error">,</span>
                    <a v-if="link" href="https://front.monglish.academy/login" class="text-link">Login</a> 
                    <span class="error">or enter another email</span>
                </div>
                
                <!-- First row of inputs -->
                <div class="input-row">
                    <div class="form-group">
                        <label for="firstname">First Name</label>
                        <input type="text" id="firstname" v-model="firstname"/>
                        <p v-if="errors.firstname" class="error">{{ errors.firstname }}</p>
                    </div>

                    <div class="form-group">
                        <label for="lastname">Last Name</label>
                        <input type="text" id="lastname" v-model="lastname" />
                        <p v-if="errors.lastname" class="error">{{ errors.lastname }}</p>
                    </div>
                </div>

                <!-- Second row of inputs -->
                <div class="input-row">
                    <div class="form-group">
                        <label for="country">Country / Region</label>
                        <select id="country" v-model="country" @change="updatePhoneNumber">
                            <option v-for="country in sortedCountries" :key="country.code" :value="country.code">
                                {{ country.name }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="phone">Phone Number (with country code)</label>
                        <input type="text" id="phone" v-model="phone" style="direction:ltr;"/>
                        <p v-if="errors.phone" class="error">{{ errors.phone }}</p>
                    </div>
                </div>

                <!-- Third row (full width input) -->
                <div class="form-group full-width">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email"/>
                    <p v-if="errors.email" class="error">{{ errors.email }}</p>
                </div>
            </div>
        </div>

        <!--Modal Terms-->
        <div class="modal-terms">
            <h2>To ensure your full rights in contracting with the academy, please read the following terms carefully and agree to them:</h2>
            <div class="terms-container">
                <div class="terms-content">
                    <ol>
                        <li><strong>Academy Policies:</strong><br> I pledge to adhere to all policies and procedures followed within the academy, and I acknowledge that I have reviewed and fully understood them and agreed to them.</li>
                        <li><strong>Tuition Fees:</strong><br> I acknowledge that I have reviewed the established tuition fees and I pledge to pay them on time. I understand that in case of delayed payment, the academy has the right to take appropriate actions including suspending the account or halting educational services until the dues are paid.</li>
                        <li><strong>Online Attendance and Discipline:</strong><br> I pledge to ensure that my son/daughter attends the online classes regularly and at the specified times, and I understand that repeated absences without a valid excuse may lead to administrative actions such as cancellation of reservation or rescheduling in addition to adhering to what is stated in the <a href="/en/terms-and-conditions/terms">terms and conditions</a> regarding attendance.</li>
                        <li><strong>Online Behavior:</strong><br> I pledge to monitor my son/daughter's behavior during online classes, and I realize that the academy has the right to take disciplinary actions in case of behavioral violations through the online platform.</li>
                        <li><strong>Technology and Responsibilities:</strong><br> I acknowledge that I am responsible for providing an electronic device and stable internet connection to ensure my son/daughter's participation in online classes, and I understand that the academy is not responsible for any technical issues related to the connection on my part.</li>
                        <li><strong>Withdrawal or Cancellation:</strong><br> I understand that if I wish to withdraw my son/daughter from the academy or cancel enrollment in the program, I must inform the administration in writing within a specified time frame, and I agree to adhere to the <a href="/en/terms-and-conditions/refund">cancellation</a> and refund policy as outlined in the <a href="/en/terms-and-conditions/terms">terms and conditions</a> specific to the academy's policies.</li>
                        <li><strong>Use of Educational Electronic Resources:</strong><br> I agree to the academy's use of e-learning platforms and modern technologies to deliver lessons, and I acknowledge that I have read and understood the <a href="/en/terms-and-conditions/privacy">privacy policy</a> related to the use of these resources.</li>
                        <li><strong>Photos and Videos:</strong><br>
                            <ul>
                                <li>Keeping the camera on throughout the lecture period to ensure the quality of the educational process and facilitate communication between teachers and trainees.</li>
                                <li>Ensuring to be in a quiet place away from noise with one of the backgrounds specified by customer service.</li>
                                <li>Using a computer screen at minimum or a laptop.</li>
                                <li>Dressing appropriately (White - Blue - Black) to foster discipline among the trainees.</li>
                                <li>All lectures are recorded and sent to all trainees for general benefit. The recorded sessions are the exclusive property of the academy, and it has the right to use them for purposes such as "analyzing student levels or promotional campaigns for the academy."</li>
                            </ul>
                        </li>
                        <li><strong>Agreement to Terms:</strong><br> By clicking the purchase button, this constitutes your agreement to the terms and conditions stated above attached to Form No. MIA-TC-01.</li>
                    </ol>
                </div>
            </div>

            <label class="checkbox">
                <input type="checkbox" v-model="isChecked"/>
                I agree to all terms and conditions
            </label>

            <button type="submit" class="checkout-button" :disabled="!isChecked">I agree and wish to continue to complete the order</button>
        </div>
    </div>
</form>
</template>

<script>
  import axios from 'axios';
  import { countries } from 'countries-list';  
  export default {
    data() {
      return {
        preferredCountries: ['SA', 'KW', 'AE', 'QA', 'EG', 'JO', 'OM', 'YE', 'BH', 'IQ'],
        countryCodes: {
          SA: '+966 ',
          KW: '+965 ',
          AE: '+971 ',
          QA: '+974 ',
          EG: '+20 ',
          JO: '+962 ',
          OM: '+968 ',
          YE: '+967 ',
          BH: '+973 ',
          IQ: '+964 ',
        },
        isChecked: false ,        
        orderUpdated: false,
        showModal:false,
        cartItems: [], // Initialize cartItems as an empty array
        cartSummary: {
          total_price: 0,
          total_price_discount: 0,
          family_or_friend_discount: 0,
          currency: '',
          total_items_count: 0,
          coupon_code: null, // Ensure coupon_code is defined
          discount: 0, // Add discount to cartSummary
        },
        firstname: '',
        lastname: '',
        country: '',
        phone: '',
        email: '',
        couponCode: '',      // Holds the coupon code input
        successMessage: '',  // Holds success message
        errors: {}, // To store form errors
        errorMessage: '',    // Holds error message
        validationErrorMessage: '',
        link: false,
      };
    },
    methods: {
      async fetchCartItems() {
        let url = sessionStorage.getItem('userInfo') ? '/api/user/cart' : '/api/session/cart';

        const userInfo = sessionStorage.getItem('userInfo');
        let headers = {};
        if (userInfo) {
          try {
            const parsedUserInfo = JSON.parse(userInfo);
            const token = parsedUserInfo.token;

            if (token) {
              headers['Authorization'] = `Bearer ${token}`;
            }
          } catch (error) {
            console.error('Error parsing userInfo from sessionStorage:', error);
          }
        }

        axios.get(url, { headers })
          .then(response => {
            // Store cart items in data
            this.cartItems = response.data.data.items || [];
            this.orderUpdated = false; // Reset update status
            this.cartSummary = response.data.data;
            if(this.cartSummary.coupon_code){
              this.couponCode = this.cartSummary.coupon_code['code'];
            }
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
            //   // If the cart is not found, treat it as empty
              this.cartItems = [];
              this.cartSummary = {};
              console.warn('Cart is empty or was deleted:', error.response.data);
            } else {
              console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
            }
          });
      },
      async increaseQuantity(itemId) {
        let url = sessionStorage.getItem('userInfo') ? `/api/user/cart/increase/${itemId}` : `/api/session/cart/increase/${itemId}`;

        const userInfo = sessionStorage.getItem('userInfo');
        let headers = {};
        if (userInfo) {
          try {
            const parsedUserInfo = JSON.parse(userInfo);
            const token = parsedUserInfo.token;

            if (token) {
              headers['Authorization'] = `Bearer ${token}`;
            }
          } catch (error) {
            console.error('Error parsing userInfo from sessionStorage:', error);
          }
        }

        axios.get(url, { headers })
          .then(() => {
            this.fetchCartItems();
            window.location.reload();
          }
        ) // Refresh cart items
          .catch(error => {
            console.error('Error increasing item quantity:', error);
          });
      },
      async decreaseQuantity(itemId) {
        let url = sessionStorage.getItem('userInfo') ? `/api/user/cart/decrease/${itemId}` : `/api/session/cart/decrease/${itemId}`;

        const userInfo = sessionStorage.getItem('userInfo');
        let headers = {};
        if (userInfo) {
          try {
            const parsedUserInfo = JSON.parse(userInfo);
            const token = parsedUserInfo.token;

            if (token) {
              headers['Authorization'] = `Bearer ${token}`;
            }
          } catch (error) {
            console.error('Error parsing userInfo from sessionStorage:', error);
          }
        }

        axios.get(url, { headers })
        .then(() => {
            this.fetchCartItems();
            window.location.reload();
          }
        ) // Refresh cart items
          .catch(error => {
            console.error('Error decreasing item quantity:', error);
          });
      },
      async removeItem(itemId) {
        let url = sessionStorage.getItem('userInfo') ? `/api/user/cart/remove/${itemId}` : `/api/session/cart/remove/${itemId}`;

        const userInfo = sessionStorage.getItem('userInfo');
        let headers = {};
        if (userInfo) {
          try {
            const parsedUserInfo = JSON.parse(userInfo);
            const token = parsedUserInfo.token;

            if (token) {
              headers['Authorization'] = `Bearer ${token}`;
            }
          } catch (error) {
            console.error('Error parsing userInfo from sessionStorage:', error);
          }
        }

        axios.get(url, { headers })
        .then(() => {
            this.fetchCartItems();
            window.location.reload();
          }
        ) // Refresh cart items
        .catch(error => {
          this.errorMessage = 'Error removing item.';
          console.error('Error removing item:', error);
        });
      },
      async applyCoupon() {
        // Reset messages
        this.successMessage = '';
        this.errorMessage = '';

        if (!this.couponCode.trim()) {
          this.errorMessage = 'Please enter a valid coupon code.';
          return;
        }
        try {
          let url = sessionStorage.getItem('userInfo') ? '/api/user/cart/apply-coupon' : '/api/session/cart/apply-coupon';

          const userInfo = sessionStorage.getItem('userInfo');
          let headers = {};
          if (userInfo) {
            try {
              const parsedUserInfo = JSON.parse(userInfo);
              const token = parsedUserInfo.token;

              if (token) {
                headers['Authorization'] = `Bearer ${token}`;
              }
            } catch (error) {
              console.error('Error parsing userInfo from sessionStorage:', error);
            }
          }

          const response = await axios.post(url, { coupon_code: this.couponCode }, { headers });

          if (response.data.success) {
              this.cartSummary = response.data.data.cartSummary;
              this.successMessage = response.data.message;
              this.couponCode = this.cartSummary.coupon_code; // Clear the input field on success
            } else {
              this.errorMessage = response.data.message;
            }
        } catch (error) {
          this.errorMessage = 'Failed to apply coupon. Please try again.';
        }
      },
      async removeCoupon() {
        // Reset messages
        this.successMessage = '';
        this.errorMessage = '';

        try {
          let url = sessionStorage.getItem('userInfo') ? '/api/user/cart/remove-coupon' : '/api/session/cart/remove-coupon';

          const userInfo = sessionStorage.getItem('userInfo');
          let headers = {};
          if (userInfo) {
            try {
              const parsedUserInfo = JSON.parse(userInfo);
              const token = parsedUserInfo.token;

              if (token) {
                headers['Authorization'] = `Bearer ${token}`;
              }
            } catch (error) {
              console.error('Error parsing userInfo from sessionStorage:', error);
            }
          }

          const response = await axios.post(url, {}, { headers });
          console.log(response.data);
          if (response.data.success) {
            this.cartSummary = response.data.data.cartSummary || {};
            this.successMessage = response.data.message;
            this.couponCode = ''; // Clear the input field when coupon is removed
          } else {
            this.errorMessage = response.data.message;
          }
        } catch (error) {
          this.errorMessage = 'Failed to remove coupon. Please try again.';
        }
      },
      goToCourses() {
        this.$router.push('/en/');
      },
      validateForm() {
        this.errors = {};

        if (!this.firstname) {
          this.errors.firstname = 'Firstname is required';
        }

        if (!this.lastname) {
          this.errors.lastname = 'Lastname is required';
        }

        if (!this.country) {
          this.errors.country = 'Country / Region is required';
        }

        if (!this.phone) {
          this.errors.phone = 'Phone is required';
        }

        if (!this.email) {
          this.errors.email = 'Email address is required';
        } else if (!this.isValidEmail(this.email)) {
          this.errors.email = 'Email address is invalid';
        }
      },
      isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      },
      goToCheckout() {
        
        let url = sessionStorage.getItem('userInfo')
          ? '/api/user/checkout'
          : '/api/session/checkout';

        const userInfo = sessionStorage.getItem('userInfo');
        let headers = {};
        let formData = {};
        if (userInfo) {
          try {
            const parsedUserInfo = JSON.parse(userInfo);
            const token = parsedUserInfo.token;

            if (token) {
              headers['Authorization'] = `Bearer ${token}`;
            }
          } catch (error) {
            console.error('Error parsing userInfo from sessionStorage:', error);
          }
        } else{
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

          axios.post(url, formData, { headers })
          .then((response) => {
            // Handle successful form submission
            console.log('Order checkout successfully:', response.data);
            if (response.data.success) {
              // Redirect to the URL in the response data
              window.location.href = response.data.data;
            } else {
              console.error('Error:', response.data.message);
              // Optionally, display an error message to the user
            }
          })
          .catch((error) => {
            // Handle errors
            console.error('Error submitting form:', error.response.data);
            this.validationErrorMessage = error.response.data.data.error || 'حدث خطأ أثناء إرسال النموذج. حاول مرة أخرى.';
            if((error.response.data.message).includes('User Exists')){
              this.link = true;
            }
          });
        }
      },
      showAuthModal() {
        if (sessionStorage.getItem('userInfo')) {
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
        this.phone = ''; // Clear if no valid country is selected
      }
    },
    },
    computed: {
      sortedCountries() {
          // Create an array of countries from the countries-list package
          const countryArray = Object.keys(countries).map(code => ({
            code: code,
            name: countries[code].name,
          }));

          const preferred = this.preferredCountries
            .map(code => countryArray.find(c => c.code === code))
            .filter(Boolean);
          const others = countryArray.filter(country => !this.preferredCountries.includes(country.code));
          return [...preferred, ...others]; // Combine preferred and other countries
        },
    },
    mounted() {
      this.fetchCartItems(); 
      const today = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      document.getElementById('currentDate').textContent = today.toLocaleDateString('en-US', options);
    }
  };
</script>

<style scoped>
  .shopping-cart-en {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('@/assets/images/cart_bg.png');
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
    font-family: 'DIN Next LT Arabic';
    font-weight: 500;
    margin-top: 200px;
  }

  .cart-page-en {
    display: flex;
    font-family: 'DIN Next LT Arabic';
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
    font-family: 'DIN Next LT Arabic';
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

  .remove-coupon-section-en{
    color:#ff1919;
  }

  .apply-button-en, .remove-coupon-button-en {
    background: linear-gradient(45deg, #ff9442, #ff6f00);
    color: white;
    border: none;
    border-radius: 15px;
    padding: 10px;
    cursor: pointer;
    font-size: 18px;
    font-family: 'DIN Next LT Arabic';
    font-weight: 500;
    width: 40%;
  }

  .remove-coupon-button-en{
    background: linear-gradient(45deg, #fd7878, #fa5353);
  }

  .price-table-en {
    width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;
    font-weight: bold;
    font-family: 'DIN Next LT Arabic';
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
    margin-bottom: 20px;
  }

  .order-section-en {
    padding: 15px;
  }

  .order-table-en {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-family: 'DIN Next LT Arabic';
    font-weight: 500;
  }

  .order-table-mobile-en {
    display: none;
  }

  .order-table-en th,
  .order-table-en td {
    border: 1px solid #ddd;
    text-align: center;
    padding: 10px;
    direction: rtl;
    border-left: 0;
    border-right: 0;
  }

  .order-table-en th{
    border-top: 0;
    padding-bottom: 20px;
    color: white;
  }

  .order-item-en {
    background-color: white;
  }

  .price-en {
    color: #f47920;
    font-size: 26px;
    font-weight: 600;
  }

  .quantity-en {
    align-items: center;
    justify-content: center;
    direction: ltr !important;
  }

  .quantity-en input {
    width: 40px;
    text-align: center;
    margin: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
  }

  .quantity-en button {
    background-color: #fff;
    border: 1px solid #ccc;
    color: #808b94;
    padding: 5px;
    font-size: 18px;
    cursor: pointer;
  }

  .course-en {
    font-size: 26px;
    font-weight: bold;
    transition: color 0.3s;
  }

  .course-en:hover {
    color: #f47920;
  }

  .remove-button-en {
    background-color: transparent;
    border: 1px solid #F47D21;
    border-radius: 50%;
    color: #f47920;
    cursor: pointer;
    width: 25px;
    height: 25px;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, color 0.3s;
  }

  .remove-button-en:hover {
    background-color: #f47920;
    color: white;
  }

  .buy-another-course-en {
    background-color: #165e84;
    color: #fff;
    padding: 16px 20px 16px 20px;
    margin: 0px 0px 0px 0px;
    font-family: 'DIN Next LT Arabic-n', sans-serif;
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

  .validation-container-en{
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .error-en {
    color: red;
  }

  .text-linkkk-en{
    color:#0f73a8 !important;
    text-decoration: underline !important;
  }

  .text-linkkk-en:hover{
    color:#034b72 !important;
    text-decoration: none !important;
  }

  .checkout-form-group-en {
    margin-bottom: 18px;
    text-align: left;
  }
  .checkout-form-group-en label {
    margin-bottom: 100px;
    margin-right:10px;
    font-size: 18px;
    color: #333;
  }
  .checkout-form-group-en input, .checkout-form-group-en select {
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
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
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

  .modal-header h1{
    font-size: 1.8rem;
    color: #fff;
    font-family: 'DIN Next LT Arabic';
    font-weight: 500;
  }

  .modal-header p{
    font-size: 1.1rem;
    color: #fff;
    font-family: 'DIN Next LT Arabic';
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

  .modal-content form{
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
  font-family: 'DIN Next LT Arabic';
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
  font-family: 'DIN Next LT Arabic';
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
  color: #8D93A1;
}

.checkout-formm input, .checkout-formm select {
  padding: 10px;
  border-radius: 5px;
  border-color: transparent;
  width: 100%;
  box-sizing: border-box;
  background-color: #F7F9FC;
}

.checkout-formm input:focus, .checkout-formm select:focus {
  border-color: #f47920;
  outline: none;
}

  @media (min-width: 320px) and (max-width: 479px) {
    .cart-content{
      flex-direction: column;
    }
    .cart-container-1 {
      max-width: 100%;
      position: relative;
      right: 0;
      top: -40px;
      padding: 10px;
    }

    .order-table{
      display: none;
    }

    .order-table-mobile {
      display: flex;
      flex-direction: column;
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-family: 'DIN Next LT Arabic';
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

    .price-row td{
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
      border: 1px solid #F47D21;
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
    
    .modal-content{
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
</style>
