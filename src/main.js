import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';


// Set the base URL for all Axios requests
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.withCredentials = true;

axios.get('/api/csrf-token')
  .then(response => {
    const csrfToken = response.data.csrfToken;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
  })
  .catch(error => {
    console.error('Error fetching CSRF token:', error);
  });

createApp(App)
  .use(router)
  .mount('#app');