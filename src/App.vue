<template>
	<div id="visible-screen"></div>
	<div class="page-wrapper" id="page">
		<!-- <the-header></the-header> -->
		<auth-init></auth-init>
		<!-- <vuex-debug></vuex-debug> -->
		<the-aside></the-aside>
		<main class="main">
			<router-view></router-view>
		</main>
		<!-- <the-footer></the-footer> -->
	</div>
</template>

<script lang="ts">
import TheAside from './components/TheAside.vue';
import AuthInit from './components/auth/AuthInit.vue';
import VuexDebug from './components/debug/VuexDebug.vue';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',
	components: {
		TheAside,
		AuthInit,
		VuexDebug,
		TheHeader,
		TheFooter,
	},
	setup() {},
});
</script>
