<template>
	{{ data }}
	<div class="events container">
		<div class="events__count-block">
			<div class="events__title">Операция "Зимнее Приключение"</div>
			<h2 class="events__count-title">Следующий этап [4/16]</h2>
			<events-card-top></events-card-top>
			<div class="events__countdown-block">
				<events-countdown-card
					v-for="item in 3"
					:key="item"
				></events-countdown-card>
			</div>
			<h2 class="events__reward-title">Награда:</h2>
			<p class="events__reward-desc">Декоратор техники “Снегоступы”</p>
		</div>
		<div class="events__all-block">
			<h2 class="events__all-title">Все этапы данного события:</h2>
			<div class="events__all-cards-flex">
				<events-card
					v-for="(item, index) in data.stages"
					:key="item"
					:cardData="item"
					:class="{ 'events__all-card--active': index === 2 }"
				></events-card>
				<!-- event card with :amount='multiple' to render lines -->
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import EventsCard from '@/components/events/EventsCard.vue';
import EventsCardTop from '@/components/events/EventsCardTop.vue';
import EventsCountdownCard from '@/components/events/EventsCountdownCard.vue';

export default defineComponent({
	components: { EventsCard, EventsCardTop, EventsCountdownCard },
	props: {
		data: {
			required: true,
			type: Object,
		},
	},
	setup(props) {
		// function getCurrentStage(event: any): { index: number; timeLeft: number } {
		// 	const currentDate: Date = new Date();

		// 	if (currentDate < event.startDate) {
		// 		// Событие еще не началось
		// 		return {
		// 			index: -1,
		// 			timeLeft: event.startDate.getTime() - currentDate.getTime(),
		// 		};
		// 	}

		// 	for (let i = 0; i < event.stages.length; i++) {
		// 		const stage = event.stages[i];

		// 		if (currentDate >= stage.startDate && currentDate <= stage.endDate) {
		// 			// Мы находимся внутри этапа
		// 			return {
		// 				index: i,
		// 				timeLeft: stage.endDate.getTime() - currentDate.getTime(),
		// 			};
		// 		}

		// 		if (currentDate < stage.startDate) {
		// 			// Мы находимся перед началом этапа
		// 			return {
		// 				index: i,
		// 				timeLeft: stage.startDate.getTime() - currentDate.getTime(),
		// 			};
		// 		}
		// 	}

		// 	// Событие уже завершилось
		// 	return { index: event.stages.length, timeLeft: 0 };
		// }

		// let currentStageInfo = reactive(getCurrentStage(props.data));

		// if (currentStageInfo.index === -1) {
		// 	console.log(
		// 		`Событие "${props.data.name}" еще не началось. Время до начала: ${currentStageInfo.timeLeft}`
		// 	);
		// } else if (currentStageInfo.index === props.data.stages.length) {
		// 	console.log(`Событие "${props.data.name}" уже завершилось.`);
		// } else {
		// 	console.log(
		// 		`Сейчас проходит этап ${currentStageInfo.index + 1} "${
		// 			props.data.name
		// 		}". Время до завершения: ${currentStageInfo.timeLeft}`
		// 	);
		// }

		// function updateTimer() {
		// 	currentStageInfo = getCurrentStage(props.data);

		// 	if (currentStageInfo.index === -1) {
		// 		console.log(
		// 			`Событие "${props.data.name}" еще не началось. Время до начала: ${currentStageInfo.timeLeft}`
		// 		);
		// 	} else if (currentStageInfo.index === props.data.stages.length) {
		// 		console.log(`Событие "${props.data.name}" уже завершилось.`);
		// 	} else {
		// 		console.log(
		// 			`Сейчас проходит этап ${currentStageInfo.index + 1} "${
		// 				props.data.name
		// 			}". Время до завершения: ${currentStageInfo.timeLeft}`
		// 		);
		// 	}
		// }

		// Обновляем каждую секунду
		// setInterval(updateTimer, 1000);

		return {};
	},
});
</script>
