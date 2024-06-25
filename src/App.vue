<template>
	<div class="visible-screen" id="visible-screen" v-if="false"></div>
	<div
		class="visible-screen"
		id="visible-screen-40"
		v-if="$store.state.isLoginModalVisible"
	></div>
	<div class="page-wrapper" id="page">
		<auth-init></auth-init>
		<vuex-debug></vuex-debug>
		<the-aside></the-aside>
		<main class="main">
			<router-view></router-view>
		</main>
	</div>
</template>

<script lang="ts">
import TheAside from './components/TheAside.vue';
import AuthInit from './components/auth/AuthInit.vue';
import VuexDebug from './components/debug/VuexDebug.vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',
	components: {
		TheAside,
		AuthInit,
		VuexDebug,
	},
	setup() {},
});
</script>
