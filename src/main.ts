import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './css/main.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Your web app's Firebase configuration
import { firebaseConfig } from '@/firebaseConfig';

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(router).use(store).mount('#app');
