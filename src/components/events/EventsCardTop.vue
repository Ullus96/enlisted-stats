<template>
	<div class="events__card events__card-top">
		<p class="events__counter">#{{ stageIndex + 1 }}</p>
		<p class="events__date">{{ day }}</p>
		<p class="events__month">{{ month }}</p>
		<p class="events__time">{{ hours }}:00</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		stageIndex: { required: true, type: Number },
		date: { required: true, type: Date },
	},
	setup(props) {
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			timeZoneName: 'short',
		};

		// не локальное время
		// const day = props.date.getDate(); // Получаем число
		// const month = props.date.getMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
		// const hours = props.date.getHours(); // Получаем часы

		const localDateTime = props.date.toLocaleString('ru-RU', options);
		const parts = localDateTime.split(',');

		const day = parts[1].split('')[1];
		const month = parts[1].split(' ')[2];
		const hours = parts[1].split(' ')[6].split(':')[0];

		return { day, month, hours };
	},
});
</script>
