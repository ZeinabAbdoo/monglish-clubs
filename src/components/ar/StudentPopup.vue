<template>
  <div class="student-popup">
    <div class="popup-content">
      <button class="close-btn" @click="closePopup">&times;</button>
      <h2>إضافة كود الطالب</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <div class="form-item">
            <label for="student-name">اسم الطالب</label>
            <input
              type="text"
              id="student-name"
              v-model="student.name"
              placeholder="أدخل اسم الطالب"
              required
            />
          </div>
          <div class="form-item">
            <label for="student-code">كود الطالب</label>
            <input
              type="text"
              id="student-code"
              v-model="student.code"
              placeholder="أدخل كود الطالب"
              required
            />
          </div>
        </div>
        <div class="form-group">
          
            <label for="student-school">المدرسة</label>
            <select id="student-school" v-model="student.school" required>
              <option value="LG Kids">LG Kids</option>
              <option value="LG Kids Plus">LG Kids Plus</option>
              <option value="UG Kids">UG Kids</option>
              <option value="Teens">Teens</option>
              <option value="Adults">Adults</option>
              <option value="IELTS">IELTS</option>
            </select>
        </div>
        <button type="submit">إضافة</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "StudentPopup",
    data() {
      return {
        student: {
          code: "",
          name: "",
          school: ""
        },
      };
    },
    methods: {
      handleSubmit() {
        if (this.student.code && this.student.name) {
          const sessionGroupId = this.$parent.selectedSessionGroupId;
          const quantity = 1;

          const userInfo = JSON.parse(sessionStorage.getItem("userInfo")) || [];
          const studentData = {
            name: this.student.name,
            code: this.student.code,
            school: this.student.school,
            session_group_data: [
              {
                session_group_id: sessionGroupId,
                quantity: quantity,
              },
            ],
          };
          userInfo.push(studentData);
          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          this.resetForm();
          this.closePopup();
          // this.$router.push({ path: "/ar/cart/", name: "CartAr" });
        } else {
          console.log("Please fill in all fields.");
        }
      },
      resetForm() {
        this.student = { code: "", name: "", school: "" };
      },
      closePopup() {
        this.$emit("close");
      },
    },
  };
</script>

<style scoped>
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

  .popup-content {
    background: #ffffff;
    width: 60%;
    border-radius: 25px;
    direction: rtl;
    text-align: right;
    padding: 20px;
    position: relative;
  }

  .popup-content h2 {
    text-align: center;
    margin-bottom: 20px;
    font-family: "DIN Next LT Arabic", sans-serif;
    font-weight: 600;
    color: #333;
  }

  .form-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    gap: 10px;
  }

  .form-item {
    width: 40%;
    flex: 1;
  }

  label {
    display: block;
    font-size: 15px;
    margin-bottom: 5px;
    color: #4a4a4a;
    font-family: "DIN Next LT Arabic", sans-serif;
    font-weight: 500;
  }

  input, select {
    width: 95%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: "DIN Next LT Arabic", sans-serif;
    color: #333;
    transition: border-color 0.3s;
  }

  input:focus {
    border-color: #ff9442;
    outline: none;
  }

  button {
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

  button:hover {
    background: linear-gradient(45deg, #ff6f00, #ff9442);
  }

  .close-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 30px;
    color: #333;
    background: transparent;
    border: none;
    cursor: pointer;
    width: 8%;
  }

  .close-btn:hover {
    color: #ff9442;
  }

  /* Media Query for Mobile Devices */
  @media (max-width: 768px) {
    .popup-content {
      width: 100%;
      border-radius: 0;
    }

    .form-group {
      flex-direction: column;
      align-items: stretch;
    }

    .form-item {
      width: 100%;
      margin-bottom: 10px;
    }

    .close-btn {
      font-size: 25px;
      top: 5px;
      right: 5px;
    }
  }
</style>
