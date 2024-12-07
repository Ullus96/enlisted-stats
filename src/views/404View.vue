<template>
	<div class="mt-l">
		<div class="container-sm wip">
			<img
				src="@/assets/work-in-progress.jpg"
				alt="Work In Progress"
				class="wip__img"
			/>
			<div class="wip__text-block">
				<h2 class="wip__title">Этой страницы не существует</h2>
				<p class="wip__desc">Возможно, была допущена опечатка.</p>

				<router-link to="/" class="mt-s">
					<button class="btn btn-m btn-primary" v-ripple>
						Вернуться на главную
					</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
