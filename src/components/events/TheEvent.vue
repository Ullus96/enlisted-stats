<template>
	<template v-if="status === 'going'">
		<section class="container mt-l">
			<h1 class="event__title">{{ data.name }}</h1>

			<div class="event__content">
				<div class="event__left-col">
					<div class="event__header tooltip-anchor">
						<h2>Все награды события</h2>
						<div class="tooltip-anchor">
							<TooltipComponent :direction="'top'" :width="37.5">
								<p>
									Если пропустил награды, нажимай по пропущенным этапам
									слева-направо.
								</p>
								<p>
									В случае некорректного отображения наград - перезагрузи
									страницу.
								</p>
							</TooltipComponent>
							<button class="btn btn-sm btn-tertiary">
								<IconBase>
									<IconQuestionCircle />
								</IconBase>
							</button>
						</div>
					</div>

					<div class="event__cards-flex">
						<events-card
							v-for="(item, index) in stagesWithRewards"
							:key="item"
							:cardData="item"
							:stageIndex="index"
							:reward="item.reward"
							:isActive="index === currentStageInfo.index"
							:isSkipped="skippedStages.includes(index)"
							@skip-stage="handleSkipStage"
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
							v-ripple
						>
							<IconBase>
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
							v-ripple
						>
							<IconBase>
								<IconCoins />
							</IconBase>
						</button>
					</div>

					<div class="event__reward-description-block">
						<div class="event__reward-wrapper">
							<transition name="boundary-fade" mode="out-in">
								<div
									v-if="activeReward === 'current'"
									class="event__reward-boundary event__reward-boundary--left"
								></div>
								<div
									v-else
									class="event__reward-boundary event__reward-boundary--right"
								></div>
							</transition>

							<transition name="reward" mode="out-in">
								<div v-if="activeReward === 'current'">
									<p
										class="event__reward-item"
										v-for="item in separateLineBySemicolon(
											stagesWithRewards[currentStageInfo.index].reward
										)"
										:key="item"
									>
										{{ item ? item : '—' }}
									</p>
								</div>
								<div v-else>
									<template
										v-if="stagesWithRewards[currentStageInfo.index + 1]"
									>
										<p
											class="event__reward-item event__reward-item--right"
											v-for="item in separateLineBySemicolon(
												stagesWithRewards[currentStageInfo.index + 1].reward
											)"
											:key="item"
										>
											{{ item ? item : '—' }}
										</p>
									</template>
									<p
										class="event__reward-item event__reward-item--right"
										v-else
									>
										—
									</p>
								</div>
							</transition>
						</div>
					</div>
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
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	onMounted,
	onUnmounted,
	PropType,
	reactive,
	Ref,
	ref,
} from 'vue';
import EventsCard from '@/components/events/EventsCard.vue';
import EventsCardTop from '@/components/events/EventsCardTop.vue';
import EventsCountdownCard from '@/components/events/EventsCountdownCard.vue';
import { IEvent, IEventFirestore } from '@/type/Events';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconQuestion from '@/components/ui/icon/icons/IconQuestion.vue';
import IconQuestionCircle from '@/components/ui/icon/icons/IconQuestionCircle.vue';
import IconCoins from '@/components/ui/icon/icons/IconCoins.vue';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';
import { separateLineBySemicolon } from '@/functions/separateLineBySemicolon';
import {
	loadFromLocalStorage,
	saveToLocalStorage,
} from '@/functions/localStorageUtils';

export default defineComponent({
	components: {
		EventsCard,
		EventsCardTop,
		EventsCountdownCard,
		IconBase,
		IconQuestion,
		IconQuestionCircle,
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

		// Skipped stages
		const skippedStages: Ref<number[]> = ref([]);
		// @ts-ignore
		const storageKey = props.data.dbId;
		const endDateKey = `end-${storageKey}`;
		const currentDate = new Date();

		const stagesWithRewards = computed(() =>
			props.data.stages.map((stage, index) => ({
				...stage,
				reward: calculateReward(index),
			}))
		);

		function calculateReward(index: number) {
			const rewards = [...props.data.rewards];
			skippedStages.value.forEach((skippedIndex) => {
				if (skippedIndex <= index) {
					rewards.splice(skippedIndex, 0, rewards[skippedIndex - 1]);
				}
			});
			return rewards[index];
		}

		function handleSkipStage(stageIndex: number) {
			const stageIndexPosition = skippedStages.value.indexOf(stageIndex);
			if (stageIndexPosition !== -1) {
				skippedStages.value.splice(stageIndexPosition, 1);
			} else {
				skippedStages.value.push(stageIndex);
			}
			saveToLocalStorage(storageKey, skippedStages.value);
			saveToLocalStorage(endDateKey, props.data.endDate);
			updateRewards();
		}

		function updateRewards() {
			stagesWithRewards.value; // Пересчитываем награды
		}

		function loadAndCleanLocalStorage() {
			const savedSkippedStages = loadFromLocalStorage(storageKey);
			const savedEndDate = new Date(loadFromLocalStorage(endDateKey));

			if (
				savedSkippedStages &&
				savedSkippedStages.length > 0 &&
				currentDate <= savedEndDate
			) {
				skippedStages.value = savedSkippedStages;
			} else {
				localStorage.removeItem(storageKey);
				localStorage.removeItem(endDateKey);
			}
		}

		onMounted(() => {
			loadAndCleanLocalStorage();
			updateRewards(); // Пересчитываем награды при загрузке компонента
		});

		onUnmounted(() => {
			if (intervalID) {
				clearInterval(intervalID);
				intervalID = null;
			}
		});

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
			separateLineBySemicolon,
			skippedStages,
			stagesWithRewards,
			handleSkipStage,
			updateRewards,
		};
	},
});
</script>

<style scoped>
.boundary-fade-enter-active,
.boundary-fade-leave-active {
	transition: opacity 0.1s 0.05s ease-in, transform 0.2s ease-in-out;
}

.boundary-fade-enter-from,
.boundary-fade-leave-to {
	opacity: 0;
	transform: scaleY(0);
}

.boundary-fade-enter-to,
.boundary-fade-leave-from {
	opacity: 1;
	transform: scaleY(1);
}

.reward-enter-active,
.reward-leave-active {
	transition: opacity 0.4s 0.1s ease-in-out, transform 0.3s ease-in-out;
}

.reward-enter-from,
.reward-leave-to {
	opacity: 0;
	transform: translateX(-2rem);
}

.event__reward-item--right.reward-enter-from,
.event__reward-item--right.reward-leave-to {
	opacity: 0;
	transform: translateX(2rem);
}

.reward-enter-to,
.reward-leave-from {
	opacity: 1;
	transform: translateX(0);
}
</style>
