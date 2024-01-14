<template>
	<template v-if="data.stages[currentStageInfo.index]?.startDate">
		<div class="events container">
			<div class="events__count-block">
				<!-- check if there is more stages -->
				<div class="events__title">{{ data.name }}</div>
				<template v-if="checkIfTheStageIsFinal(currentStageInfo.index + 1)">
					<h2 class="events__count-title">
						Следующий этап [{{ currentStageInfo.index + 2 }}/{{
							data.stages.length
						}}]
					</h2>
					<events-card-top
						:stageIndex="currentStageInfo.index + 1"
						:date="data.stages[currentStageInfo.index + 1].startDate"
					></events-card-top>
				</template>
				<!-- else we show the timer until the end of the event -->
				<template v-else>
					<h2 class="events__count-title">До завершения события:</h2>
				</template>
				<div class="events__countdown-block">
					<events-countdown-card
						v-for="(item, index) in 3"
						:key="item"
						:timerValue="timerValues[index]"
						:index="index"
					></events-countdown-card>
				</div>

				<div class="events__reward-block">
					<div class="events__reward-upper-block">
						<div class="events__reward-bar events__reward-bar-left">
							<div
								class="events__reward-bar-progress"
								:style="{
									background: `linear-gradient(to right,  #47484a ${progressBarPercents}%, transparent ${progressBarPercents}%`,
								}"
							></div>
							<div class="events__reward-bar-animated"></div>
							<p class="events__reward-text">
								{{
									data.rewards[currentStageInfo.index]
										? data.rewards[currentStageInfo.index]
										: '—'
								}}
							</p>
						</div>
						<div class="events__reward-bar events__reward-bar-right">
							<p class="events__reward-text">
								{{
									data.rewards[currentStageInfo.index + 1]
										? data.rewards[currentStageInfo.index + 1]
										: '—'
								}}
							</p>
						</div>
					</div>
					<div class="events__reward-lower-block">
						<p class="events__reward-description">текущая награда</p>
						<p class="events__reward-description">следующая награда</p>
					</div>
				</div>
			</div>
			<div class="events__all-block">
				<h2 class="events__all-title">Все этапы данного события:</h2>
				<div class="events__all-cards-flex">
					<events-card
						v-for="(item, index) in data.stages"
						:key="item"
						:cardData="item"
						:stageIndex="index"
						:reward="data.rewards[index]"
						:class="{
							'events__all-card--active': index === currentStageInfo.index,
						}"
					></events-card>
				</div>
			</div>
		</div>
	</template>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, Ref, ref } from 'vue';
import EventsCard from '@/components/events/EventsCard.vue';
import EventsCardTop from '@/components/events/EventsCardTop.vue';
import EventsCountdownCard from '@/components/events/EventsCountdownCard.vue';
import { IEvent } from '@/type/Events';

export default defineComponent({
	components: { EventsCard, EventsCardTop, EventsCountdownCard },
	props: {
		data: {
			required: true,
			type: Object as PropType<IEvent>,
		},
	},
	setup(props) {
		const isFinalStage: Ref<boolean> = ref(false);
		function getCurrentStage(event: IEvent): {
			index: number;
			timeLeft: number;
		} {
			const currentDate: Date = new Date();

			if (currentDate < event.startDate) {
				// Событие еще не началось
				return {
					index: -1,
					timeLeft: event.startDate.getTime() - currentDate.getTime(),
				};
			}

			for (let i = 0; i < event.stages.length; i++) {
				const stage = event.stages[i];

				if (currentDate >= stage.startDate && currentDate <= stage.endDate) {
					// Мы находимся внутри этапа
					return {
						index: i,
						timeLeft: stage.endDate.getTime() - currentDate.getTime(),
					};
				}

				if (currentDate < stage.startDate) {
					// Мы находимся перед началом этапа
					return {
						index: i,
						timeLeft: stage.startDate.getTime() - currentDate.getTime(),
					};
				}
			}

			// Событие уже завершилось
			return { index: event.stages.length, timeLeft: 0 };
		}

		let currentStageInfo: { index: number; timeLeft: number } = reactive(
			getCurrentStage(props.data)
		);

		function updateTimer() {
			currentStageInfo = getCurrentStage(props.data);

			if (currentStageInfo.index === -1) {
				console.log(
					`Событие "${props.data.name}" еще не началось. Время до начала: ${currentStageInfo.timeLeft}`
				);
			} else if (currentStageInfo.index === props.data.stages.length) {
				console.log(`Событие "${props.data.name}" уже завершилось.`);
			} else {
				// обновляем переменные
				const date = new Date(currentStageInfo.timeLeft);
				timerValues[0] = Math.floor(+date / (1000 * 60 * 60));
				timerValues[1] = date.getMinutes();
				timerValues[2] = date.getSeconds();
			}
		}

		const timerValues: number[] = reactive([0, 0, 0]);

		// get timer values on page load
		updateTimer();
		// then update every second
		setInterval(updateTimer, 1000);

		function checkIfTheStageIsFinal(index: number): boolean {
			if (props.data.stages[index]?.startDate) {
				return true;
			} else {
				return false;
			}
		}

		// progress bar
		let progressBarPercents: Ref<number> = ref(0);

		function getProgressBarPercentage() {
			const { timeLeft } = getCurrentStage(props.data);
			const twoDaysInMs: number = 172800000;
			progressBarPercents.value = (1 - timeLeft / twoDaysInMs) * 100;
		}

		// get percents on page load
		getProgressBarPercentage();
		// then update percents every hour
		setInterval(getProgressBarPercentage, 3600000);

		return {
			currentStageInfo,
			timerValues,
			isFinalStage,
			checkIfTheStageIsFinal,
			progressBarPercents,
		};
	},
});
</script>
