<template>
	<template v-if="isLoading">
		<loading-spinner class="mt-xl mb-xl"></loading-spinner>
	</template>

	<div v-else>
		<template v-if="!isEventsEnded()">
			<the-event
				v-for="item in events"
				:key="item.dbId"
				:data="item"
			></the-event>

			<ModalComponent
				:modal-name="'isEventStageSkippingTutorialModalVisible'"
				v-if="$store.state.modal.isEventStageSkippingTutorialModalVisible"
				:close-btn="{ text: 'Понятно', variant: 'primary' }"
			>
				<template #title> Пропуск этапов </template>
				<template #body>
					<p>
						Чтобы отметить пропущенные этапы события, кликай по датам в порядке
						<span class="modal__accent">слева-направо</span>. Так ты сможешь
						перерасчитать актуальную награду твоего текущего этапа.
					</p>
					<p>
						Если вдруг награды отображаются некорректно, просто ещё раз пройди
						все пропущенные этапы, начиная с самой ранней даты и до самой
						поздней.
					</p>
				</template>
			</ModalComponent>
		</template>
		<no-events v-else></no-events>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import TheEvent from '@/components/events/TheEvent.vue';
import { IEvent } from '@/type/Events';
import NoEvents from '@/components/no-page/NoEvents.vue';
import getEvents from '@/functions/getEvents';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import ModalComponent from '@/components/modal/ModalComponent.vue';

export default defineComponent({
	components: { TheEvent, NoEvents, LoadingSpinner, ModalComponent },
	setup() {
		const { events, error, loadEvents } = getEvents();
		const isLoading: Ref<boolean> = ref(true);
		loadEvents().then(() => {
			isLoading.value = false;
		});
		// Год, месяц-1,число, часы, минуты, секунды
		// 2023 декабря, 20, 13:00:00 UTC (3 hours less than MSK)
		// new Date(Date.UTC(2023, 11, 20, 13, 0, 0))

		// {
		// 	name: 'Операция "Имя"',
		// 	startDate: new Date(Date.UTC(2023, 11, 20, 13, 0, 0)),
		// 	endDate: new Date(Date.UTC(2024, 0, 19, 12, 59, 59)),
		//  hoursInStage: 48,
		// 	stages: [],
		// 	rewards: ['',	'',	''],
		// },
		// const eventsData: IEvent[] = [
		// 	{
		// 		name: '',
		// 		startDate: new Date(),
		// 		endDate: new Date(),
		// 		hoursInStage: 48,
		// 		stages: [],
		// 		rewards: [],
		// 	},
		// ];

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

		// eventsData.forEach((element) => {
		// 	generateStages(element);
		// });

		function addSeconds(date: Date, seconds: number): Date {
			const result = new Date(date);
			result.setSeconds(seconds + result.getSeconds());
			return result;
		}

		function isEventNotStarted(event: IEvent): boolean {
			const timeNow = new Date();
			return timeNow < event.startDate;
		}

		function isEventsEnded(): boolean {
			let latestEndDate = new Date();

			events.value.forEach((event) => {
				if (!isEventNotStarted(event) && event.endDate > latestEndDate) {
					latestEndDate = event.endDate;
				}
			});

			const timeNow = addSeconds(new Date(), 2);

			return timeNow > latestEndDate;
		}

		return {
			isLoading,
			// eventsData,
			events,
			isEventsEnded,
		};
	},
});
</script>
