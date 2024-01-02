<template>
	<div class="events__card events__all-card">
		<p class="events__counter">#4</p>
		<p class="events__date">3</p>
		<p class="events__month">сентября</p>
		<p class="events__time">16:00</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: { cardData: { required: false, type: Object } },
	setup(props) {},
});
</script>
