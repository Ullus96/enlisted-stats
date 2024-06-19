<template>
	<div class="page-wrapper">
		<!-- <the-header></the-header> -->
		<the-aside></the-aside>
		<main class="main">
			<router-view></router-view>
		</main>
		<!-- <the-footer></the-footer> -->
	</div>
</template>

<script lang="ts">
import TheAside from './components/TheAside.vue';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',
	components: {
		TheAside,
		TheHeader,
		TheFooter,
	},
	setup() {},
});
</script>

<style></style>
