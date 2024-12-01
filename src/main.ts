import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';
import { storeKey } from '@/store/storeKey';
import './css/main.css';

import shinyBorder from './directives/shiny-border/shinyBorder';
import ripple from './directives/ripple/ripple';
import focus from './directives/focus/focus';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Your web app's Firebase configuration
import { firebaseConfig } from '@/firebase/firebaseConfig';

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
	.use(router)
	.use(store, storeKey)
	.directive('shiny-border', shinyBorder)
	.directive('ripple', ripple)
	.directive('focus', focus)
	.mount('#app');
