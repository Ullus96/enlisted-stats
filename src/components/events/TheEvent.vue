<template>
	<template v-if="status === 'going'">
		<section class="container mt-l">
			<h1 class="event__title">{{ data.name }}</h1>

			<div class="event__content">
				<div class="event__left-col">
					<div class="event__header">
						<h2>Все награды события</h2>
						<button class="btn btn-sm btn-tertiary">
							<IconBase :iconName="'Set last stage'">
								<IconCog />
							</IconBase>
						</button>
					</div>

					<div class="event__cards-flex">
						<events-card
							v-for="(item, index) in data.stages"
							:key="item"
							:cardData="item"
							:stageIndex="index"
							:reward="data.rewards[index]"
							:class="{
								'event__card--active': index === currentStageInfo.index,
							}"
						></events-card>

						<div class="event__card finish">
							<TooltipComponent :direction="'top'" :width="20">
								<p>Конец события</p>
							</TooltipComponent>
							<p class="event__counter">
								<i class="fa-regular fa-flag"></i>
							</p>
							<p class="event__date">{{ day }}</p>
							<p class="event__month">{{ month }}</p>
							<p class="event__time">{{ hours }}:00</p>
						</div>
					</div>
				</div>

				<div class="event__right-col">
					<div class="event__timer-block">
						<events-countdown-card
							v-for="(item, index) in 3"
							:key="item"
							:timerValue="timerValues[index]"
							:index="index"
						></events-countdown-card>
					</div>

					<div class="event__reward-block">
						<button
							class="event__chip"
							:class="{ 'event__chip--active': activeReward === 'current' }"
							@mouseenter="setActiveReward('current')"
							@click="setActiveReward('current')"
						>
							<IconBase :iconName="'Previous reward'">
								<IconCoins />
							</IconBase>
						</button>

						<div class="event__progress-bar-block">
							<div class="event__progress-bar">
								<div
									class="event__progress-bar-progress"
									:style="{
										background: `linear-gradient(to right,  #621313 ${progressBarPercents}%, transparent ${progressBarPercents}%`,
									}"
								></div>
								<div class="event__progress-bar-animated"></div>

								<!-- <p class="event__progress-text">
									{{
										data.rewards[currentStageInfo.index]
											? data.rewards[currentStageInfo.index]
											: '—'
									}}
								</p> -->
							</div>

							<span
								class="event__progress-bar-stage event__progress-bar-stage--current"
							>
								{{ currentStageInfo.index + 1 }}
							</span>
							<span
								v-if="checkIfTheStageIsNotFinal(currentStageInfo.index + 2)"
								class="event__progress-bar-stage event__progress-bar-stage--next"
							>
								{{ currentStageInfo.index + 2 }}
							</span>
							<span
								v-else
								class="event__progress-bar-stage event__progress-bar-stage--next"
							>
								конец
							</span>
						</div>

						<button
							class="event__chip"
							:class="{ 'event__chip--active': activeReward === 'next' }"
							@mouseenter="setActiveReward('next')"
							@click="setActiveReward('next')"
						>
							<IconBase :iconName="'Next reward'">
								<IconCoins />
							</IconBase>
						</button>
					</div>

					<!-- <div class="events__reward-block">
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
					</div> -->
					<!--  -->
				</div>
			</div>
		</section>
	</template>

	<template v-else-if="status === 'finished'">
		<section class="container mt-l">
			<p class="event__end">Событие "{{ data.name }}" завершилось.</p>
		</section>
	</template>

	<template v-else-if="status === 'notStarted'">
		<section class="container mt-l">
			<p class="event__end">Событие "{{ data.name }}" еще не началось.</p>
		</section>
	</template>
	<!-- <template v-if="data.stages[currentStageInfo.index]?.startDate">
		<div class="events container">
			<div class="events__count-block"> -->
	<!-- check if there is more stages -->
	<!-- <div class="events__title">{{ data.name }}.</div>
				<template v-if="checkIfTheStageIsNotFinal(currentStageInfo.index + 1)">
					<h2 class="events__count-title">
						Следующий этап [{{ currentStageInfo.index + 2 }}/{{
							data.stages.length
						}}]
					</h2>
					<events-card-top
						:stageIndex="currentStageInfo.index + 1"
						:date="data.stages[currentStageInfo.index + 1].startDate"
					></events-card-top>
				</template> -->
	<!-- else we show the timer until the end of the event -->
	<!-- <template v-else>
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

					<div class="events__card events__all-card finish">
						<div class="events__card-tooltip">
							<p>Конец события</p>
						</div>
						<p class="events__counter">
							<i class="fa-regular fa-flag"></i>
						</p>
						<p class="events__date finish">{{ day }}</p>
						<p class="events__month finish">{{ month }}</p>
						<p class="events__time finish">{{ hours }}:00</p>
					</div>
				</div>
			</div>
		</div>
	</template> -->
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, Ref, ref } from 'vue';
import EventsCard from '@/components/events/EventsCard.vue';
import EventsCardTop from '@/components/events/EventsCardTop.vue';
import EventsCountdownCard from '@/components/events/EventsCountdownCard.vue';
import { IEvent } from '@/type/Events';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconCog from '@/components/ui/icons/IconCog.vue';
import IconCoins from '@/components/ui/icons/IconCoins.vue';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';

export default defineComponent({
	components: {
		EventsCard,
		EventsCardTop,
		EventsCountdownCard,
		IconBase,
		IconCog,
		IconCoins,
		TooltipComponent,
	},
	props: {
		data: {
			required: true,
			type: Object as PropType<IEvent>,
		},
	},
	setup(props) {
		const isFinalStage: Ref<boolean> = ref(false);
		let status: 'notStarted' | 'going' | 'finished' | null = null;
		const activeReward: Ref<'current' | 'next'> = ref('next');

		function getCurrentStage(event: IEvent): {
			index: number;
			timeLeft: number;
		} {
			const currentDate: Date = new Date();

			if (currentDate < event.startDate) {
				// Событие еще не началось
				status = 'notStarted';
				return {
					index: -1,
					timeLeft: event.startDate.getTime() - currentDate.getTime(),
				};
			}

			for (let i = 0; i < event.stages.length; i++) {
				const stage = event.stages[i];

				if (currentDate >= stage.startDate && currentDate <= stage.endDate) {
					status = 'going';
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
			status = 'finished';
			return { index: event.stages.length, timeLeft: 0 };
		}

		let currentStageInfo: { index: number; timeLeft: number } = reactive(
			getCurrentStage(props.data)
		);

		// Timer
		let intervalID: number | null = null;

		function updateTimer() {
			currentStageInfo = getCurrentStage(props.data);

			if (currentStageInfo.index === -1) {
				console.log(
					`Событие "${props.data.name}" еще не началось. Время до начала: ${currentStageInfo.timeLeft}`
				);
				if (intervalID) {
					clearInterval(intervalID);
					intervalID = null;
				}
			} else if (currentStageInfo.index === props.data.stages.length) {
				console.log(`Событие "${props.data.name}" уже завершилось.`);
				if (intervalID) {
					clearInterval(intervalID);
					intervalID = null;
				}
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
		intervalID = setInterval(updateTimer, 1000);

		function checkIfTheStageIsNotFinal(index: number): boolean {
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

		const localDateTime = props.data.endDate.toLocaleString('ru-RU', options);
		const parts = localDateTime.split(',');

		const day = parts[1].split(' ')[1];
		const month = parts[1].split(' ')[2];
		const hours = parts[1].split(' ')[6].split(':')[0];

		function setActiveReward(status: 'current' | 'next') {
			activeReward.value = status;
		}

		return {
			status,
			currentStageInfo,
			timerValues,
			isFinalStage,
			checkIfTheStageIsNotFinal,
			progressBarPercents,
			day,
			month,
			hours,
			activeReward,
			setActiveReward,
		};
	},
});
</script>
