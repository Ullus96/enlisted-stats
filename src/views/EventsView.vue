<template>
	<the-event v-for="item in eventsData" :key="item" :data="item"></the-event>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import TheEvent from '@/components/events/TheEvent.vue';
import { IEvent } from '@/type/Events';

export default defineComponent({
	components: { TheEvent },
	setup() {
		// Год, месяц-1,число, часы, минуты, секунды
		// 2023 декабря, 20, 16:00:00
		// new Date(2023, 11, 20, 16, 0, 0)
		const eventsData: IEvent[] = [
			{
				name: 'Операция "Зимнее Приключение"',
				startDate: new Date(2023, 11, 20, 16, 0, 0),
				endDate: new Date(2024, 0, 19, 15, 59, 59),
				stages: [],
				rewards: [
					'внешка',
					'олень',
					'улучшение солдат',
					'внешка',
					'олень',
					'Штурмовики Германии с Автоматами Хорна',
					'Декоратор техники "Лыжи"',
					'снегоступы',
					'Штурмовики СССР с АТ-44',
					'Декоратор имени "Ёлочка"',
					'внешка',
					'Золотая заявка на солдат',
					'внешка',
					'Золотая заявка на оружие',
					'',
				],
				//
			},
		];

		function generateStages(event: IEvent) {
			const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000; // 2 дня в миллисекундах

			const durationInMillis =
				event.endDate.getTime() - event.startDate.getTime();

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
			eventsData,
		};
	},
});
</script>
