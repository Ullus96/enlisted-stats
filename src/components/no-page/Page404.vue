<template>
	<div class="wip__block">
		<img
			src="@/assets/work-in-progress.jpg"
			alt="Work In Progress"
			class="wip__img"
		/>
		<h2>Этой страницы не существует</h2>
		<p>Возможно, сборка была удалена ее создателем.</p>
		<router-link to="/skill-builds" class="mt-s">
			<button class="btn btn-main" v-ripple>Посмотреть другие сборки</button>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {},
});
</script>
