<template>
  <!-- Modal Wrapper -->
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-terms">
      <h2>
        To ensure your full rights in contracting with the academy, please carefully read the following terms and conditions and agree to them:
      </h2>
      <div class="terms-container">
        <div class="terms-content">
          <ol>
            <li>
              <strong>Academy Policies:</strong>
              <br />I pledge to abide by all the policies and procedures followed within the academy, and I acknowledge that I have read, understood, and agreed to them.
            </li>
            <li>
              <strong>Tuition Fees:</strong>
              <br />I acknowledge that I have reviewed the set tuition fees and commit to paying them on time. I am aware that if payment is delayed, the academy reserves the right to take appropriate actions, including suspending the account or halting educational services until payment is made.
            </li>
            <li>
              <strong>Online Attendance and Discipline:</strong>
              <br />I pledge to ensure my child attends online classes regularly and on time, and I understand that repeated absences without valid reasons may lead to administrative actions such as cancellation of the reservation or rescheduling. Additionally, I agree to adhere to the attendance terms in the 
              <a href="/en/terms-and-conditions/terms">terms and conditions</a> related to attendance.
            </li>
            <li>
              <strong>Online Behavior:</strong>
              <br />I commit to monitoring my child's behavior during online classes, and I understand that the academy has the right to take disciplinary actions in case of any behavioral violations on the online platform.
            </li>
            <li>
              <strong>Technology and Responsibilities:</strong>
              <br />I acknowledge that I am responsible for providing an electronic device and a stable internet connection to ensure my child can participate in the online classes. I understand that the academy is not responsible for any technical issues related to the connection on my side.
            </li>
            <li>
              <strong>Withdrawal or Cancellation:</strong>
              <br />I understand that if I wish to withdraw my child from the academy or cancel the program subscription, I must notify the administration in writing within a specified period, and I agree to comply with the 
              <a href="/en/terms-and-conditions/refund">cancellation and refund policy</a> as outlined in the academy’s 
              <a href="/en/terms-and-conditions/terms">terms and conditions</a>.
            </li>
            <li>
              <strong>Use of Educational Tools:</strong>
              <br />I agree to the academy's use of e-learning platforms and modern technologies to deliver lessons, and I confirm that I have read and understood the 
              <a href="/en/terms-and-conditions/privacy">privacy policy</a> related to the use of these tools.
            </li>
            <li>
              <strong>Photos and Video Recordings:</strong>
              <br />
              <ul>
                <li>Keep the camera on during the entire lecture to ensure the quality of the educational process and facilitate communication between the instructors and all participants.</li>
                <li>Ensure being in a quiet location away from noise, with one of the backgrounds provided by customer service.</li>
                <li>Use a computer or laptop screen at a minimum.</li>
                <li>Dress appropriately (white – blue – black) to encourage discipline among the trainees.</li>
                <li>All lectures are recorded and sent to all trainees for general use. Recorded classes are the exclusive property of the academy, and the academy has the right to use them for purposes like "student performance analysis" or "promotional campaigns for the academy."</li>
              </ul>
            </li>
            <li>
              <strong>Agreement to Terms:</strong>
              <br />By clicking the purchase button, you agree to the terms and conditions mentioned above, attached to form number MIA-TC-01.
            </li>
          </ol>
        </div>
      </div>

      <label class="checkbox">
        <input type="checkbox" v-model="isChecked" />
        I agree to all terms and conditions
      </label>

      <button
        type="submit"
        class="checkout-button"
        :disabled="!isChecked"
        @click="closeModal"
      >I agree and wish to proceed with the order</button>
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
