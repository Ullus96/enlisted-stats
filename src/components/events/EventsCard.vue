<template>
	<div class="event__card">
		<!-- <div class="event__card-tooltip">
			<p>Награда:</p>
			<p>{{ reward ? reward : '—' }}</p>
		</div> -->
		<p class="event__counter">#{{ stageIndex + 1 }}</p>
		<p class="event__date">{{ day }}</p>
		<p class="event__month">{{ month }}</p>
		<p class="event__time">{{ hours }}:00</p>
	</div>
</template>

<script lang="ts">
import { IStage } from '@/type/Events';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		cardData: { required: true, type: Object as PropType<IStage> },
		stageIndex: { required: true, type: Number },
		reward: { required: false, type: String, default: '—' },
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

		const localDateTime = props.cardData.startDate.toLocaleString(
			'ru-RU',
			options
		);
		const parts = localDateTime.split(',');

		const day = parts[1].split(' ')[1];
		const month = parts[1].split(' ')[2];
		const hours = parts[1].split(' ')[6].split(':')[0];

		return {
			day,
			month,
			hours,
		};
	},
});
</script>
