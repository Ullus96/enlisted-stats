<template>
	<div class="calculator__skill">
		<img
			src="@/assets/vector/mobility/1-fire-speed.svg"
			alt=""
			class="calculator__img"
		/>
		<div class="calculator__tooltip">
			+25%/+50%/+75% скорость использования аптечки
		</div>
		<div class="calculator__counter-block">
			<button class="btn calculator__button">-</button>
			<div class="calculator__level">
				<span>0</span>
				<span>/</span>
				<span>2</span>
			</div>
			<button class="btn calculator__button">+</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {},
});
</script>
