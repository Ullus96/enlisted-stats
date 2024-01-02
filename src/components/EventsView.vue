<template>
	{{ date }}
	<the-event v-for="item in eventsData" :key="item" :data="item"></the-event>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import TheEvent from '@/components/events/TheEvent.vue';

export default defineComponent({
	components: { TheEvent },
	setup() {
		const eventsData = [
			{
				name: 'Операция "Зимнее Приключение"',
				startDate: new Date(2023, 11, 20, 16, 0, 0),
				endDate: new Date(2024, 0, 19, 15, 59, 59),
				stages: [],
				rewards: [
					'',
					'',
					'',
					'',
					'',
					'Штурмовики Германии с Автоматами Хорна',
					'',
					'',
					'Штурмовики СССР с АТ-44',
					'',
					'',
					'Золотая заявка на солдат',
					'',
					'Золотая заявка на оружие',
					'',
				],
				//
			},
		];

		// С 20 декабря 2023 года (16:00 МСК) до 19 января 2024 года (16:00 МСК)
		// Год, месяц-1,число, часы, минуты, секунды
		let date = new Date(2023, 11, 20, 16, 0);
		// const date = new Date();
		let dateOffset = date.setDate(date.getDate() + 2);

		function generateStages(event: any) {
			const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000; // 2 дня в миллисекундах

			const durationInMillis = event.endDate - event.startDate;
			const numberOfStages = Math.ceil(durationInMillis / twoDaysInMillis);

			for (let i = 0; i < numberOfStages; i++) {
				const start = new Date(event.startDate.getTime() + i * twoDaysInMillis);
				const end = new Date(start.getTime() + twoDaysInMillis - 1000);

				event.stages.push({ startDate: start, endDate: end });
			}
		}

		eventsData.forEach((element) => {
			generateStages(element);
		});

		return {
			date,
			dateOffset,
			eventsData,
		};
	},
});
</script>
