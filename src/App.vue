<template>
	<div class="page-wrapper">
		<the-header></the-header>
		<main class="main">
			<router-view></router-view>
		</main>
		<the-footer></the-footer>
	</div>
</template>

<script lang="ts">
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',
	components: {
		TheHeader,
		TheFooter,
	},
	setup() {},
});
</script>

<style></style>
