// Import the Vuex createStore function to create a new store instance
import { createStore } from 'vuex';

// Function to retrieve and parse user information from session storage
function getUserInfoFromSessionStorage() {
    const storedData = sessionStorage.getItem('userInfo');
    try {
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error('Failed to parse userInfo from sessionStorage:', error);
      return null;
    }
  }

// Create a Vuex store
const store = createStore({
    // Define the initial state of the store
    state: {
        // Store user information, initialized with data from session storage or null
        userInfo: getUserInfoFromSessionStorage() || null
    },
    // Define mutations to update the state
    mutations: {
        // Mutation to set user information
        setUserInfo(state, userInfo) {
            // Update the state with the new user information
            state.userInfo = userInfo;
            // Save the user information to session storage as a JSON string
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        },
        // Mutation to clear user information
        clearUserInfo(state) {
            // Set the user information in the state to null
            state.userInfo = null;
            // Remove the user information from session storage
            sessionStorage.removeItem('userInfo');
        },
    },
    // Define actions for committing mutations
    actions: {
        // Action to update user information
        updateUser({ commit }, userInfo) {
            // Commit the 'setUserInfo' mutation with the provided user information
            commit('setUserInfo', userInfo);
        },
        // Action to clear user information
        clearUser({ commit }) {
            // Commit the 'clearUserInfo' mutation to clear user information
            commit('clearUserInfo');
        },
    },
});

export default store;