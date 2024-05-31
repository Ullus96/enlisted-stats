<template>
	<template v-if="isLoading">
		<loading-spinner class="mt-m mb-m"></loading-spinner>
	</template>
	<template v-else>
		<h2 class="profile__sub-tabs">События в Базе:</h2>
		<div class="profile__tabs mb-m">
			<template v-if="events">
				<button
					class="btn profile__tab"
					v-for="event in events"
					:key="event.dbId"
					@click="setActiveEvent(event.dbId)"
					:class="{ active: event.dbId == eventData.dbId }"
				>
					{{ event.name }}
				</button>
			</template>
			<button class="btn profile__tab" @click="createNewEvent">+</button>
		</div>

		<div class="profile__inputs-flex">
			<div class="profile__input-block">
				<label for="eventName">Название</label>
				<div class="profile__input-flex">
					<input
						type="text"
						class="input profile__input-input"
						id="eventName"
						v-model="eventData.name"
						:placeholder="
							operationNames[Math.floor(Math.random() * operationNames.length)]
						"
						:class="{ 'btn-error': false }"
					/>
				</div>
				<div class="profile__input-lower-info">
					<p class="profile__input-error"></p>
					<p class="profile__input-counter">Кавычки - " ”</p>
				</div>
			</div>

			<div class="profile__input-block">
				<label for="eventStartDate">Дата начала</label>
				<div class="profile__input-flex">
					<input
						type="datetime-local"
						class="input profile__input-input"
						id="eventStartDate"
						v-model="startDate"
						:class="{ 'btn-error': false }"
					/>
				</div>
				<div class="profile__input-lower-info">
					<p
						class="profile__input-error profile__input-error--no-color"
						v-if="eventData.startDate && eventData.dbId"
					>
						{{ eventData.startDate }}
					</p>
					<p class="profile__input-error" v-else></p>
					<p class="profile__input-counter">Часы по местному</p>
				</div>
			</div>

			<div class="profile__input-block">
				<label for="eventEndDate">Дата конца</label>
				<div class="profile__input-flex">
					<input
						type="datetime-local"
						class="input profile__input-input"
						id="eventEndDate"
						v-model="endDate"
						:class="{ 'btn-error': false }"
					/>
				</div>
				<div class="profile__input-lower-info">
					<p
						class="profile__input-error profile__input-error--no-color"
						v-if="eventData.endDate && eventData.dbId"
					>
						{{ eventData.endDate }}
					</p>
					<p class="profile__input-error" v-else></p>
					<p class="profile__input-counter">Часы по местному</p>
				</div>
			</div>

			<div class="profile__input-block">
				<label for="eventHoursInStage">Часов между этапами</label>
				<div class="profile__input-flex">
					<input
						type="number"
						class="input profile__input-input"
						id="eventHoursInStage"
						placeholder="48"
						v-model="eventData.hoursInStage"
						:class="{ 'btn-error': false }"
					/>
				</div>
				<div class="profile__input-lower-info">
					<p class="profile__input-error"></p>
					<p class="profile__input-counter">24, 48, 72...</p>
				</div>
			</div>
			<button class="btn profile__btn-admin" @click="calculateStages">
				Рассчитать количество этапов
			</button>
			<div class="profile__small-text">
				<p class="profile__input-counter">Сбросит все награды</p>
			</div>

			<template v-if="eventData.rewards.length">
				<div class="profile__stages-title">Награда за этапы:</div>
				<div class="profile__stages">
					<input
						type="text"
						class="input profile__input-input"
						v-for="(reward, idx) in eventData.rewards"
						:key="idx"
						v-model="eventData.rewards[idx]"
						:placeholder="idx + 1"
					/>
				</div>
			</template>
			<template v-if="!eventData.dbId">
				<button
					class="btn profile__btn-admin"
					:disabled="!eventData.rewards.length"
					@click="addEventToDB"
				>
					Создать событие
				</button>
			</template>
			<template v-else>
				<div class="profile__update-delete-btns">
					<button
						class="btn profile__btn-admin"
						:disabled="!eventData.rewards.length"
						@click="updateEvent"
					>
						Перезаписать
					</button>
					<button
						class="btn profile__btn-admin--delete"
						:disabled="!eventData.rewards.length"
						@click="deleteEvent"
					>
						<i class="fa-regular fa-trash-can"></i>
					</button>
				</div>
			</template></div
	></template>
</template>

<script lang="ts">
import { IEvent, IEventFirestore } from '@/type/Events';
import { defineComponent, reactive, ref, Ref } from 'vue';
import { db } from '@/firebase/firebase';
import {
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';
import getEvents from '@/functions/getEvents';
import { operationNames } from '@/data/operationNames';
import LoadingSpinner from '../LoadingSpinner.vue';

export default defineComponent({
	components: { LoadingSpinner },
	setup() {
		const startDate = ref();
		const endDate = ref();
		const isLoading: Ref<boolean> = ref(true);

		let eventData: IEventFirestore = reactive({
			name: '',
			startDate: new Date(),
			endDate: new Date(),
			hoursInStage: 48,
			stages: [],
			rewards: [],
			dbId: '',
		});
		const checkTime = ref(NaN);

		function calculateStages() {
			const startDateTimestamp = new Date(startDate.value).getTime();
			const endDataTimestamp = new Date(endDate.value).getTime();
			eventData.startDate = new Date(startDateTimestamp);
			eventData.endDate = new Date(endDataTimestamp);

			eventData.rewards.length = 0;
			eventData.stages.length = 0;
			generateStages(eventData);

			for (let i = 0; i < eventData.stages.length; i++) {
				eventData.rewards.push('');
			}
		}

		function generateStages(event: IEvent | IEventFirestore) {
			const stageDurationInMillis: number = event.hoursInStage * 60 * 60 * 1000; // 2 дня в миллисекундах

			const durationInMillis = +event.endDate - +event.startDate;

			const numberOfStages = Math.ceil(
				durationInMillis / stageDurationInMillis
			);

			for (let i = 0; i < numberOfStages; i++) {
				const start = new Date(+event.startDate + i * stageDurationInMillis);
				const end = new Date(+start + stageDurationInMillis - 1000);

				event.stages.push({ startDate: start, endDate: end });
			}
		}

		const { events, error, loadEvents } = getEvents();
		loadEvents().then(() => {
			isLoading.value = false;
		});

		const addEvent = async (data: IEvent) => {
			try {
				const docRef = await addDoc(collection(db, 'events'), {
					name: data.name,
					startDate: data.startDate,
					endDate: data.endDate,
					hoursInStage: data.hoursInStage,
					stages: data.stages,
					rewards: data.rewards,
				});
				console.log('Added event with ID: ', docRef.id);
			} catch (err: any) {
				console.log('Error adding document: ', err.message);
			}
		};

		function addEventToDB() {
			addEvent(eventData);
			createNewEvent();
			loadEvents();
		}

		function setActiveEvent(dbId: string) {
			events.value.forEach((event: any) => {
				console.log(event);
				if (event.dbId == dbId) {
					console.log('true');
					const {
						name,
						startDate,
						endDate,
						hoursInStage,
						stages,
						rewards,
						dbId,
					} = event;
					eventData.name = name;
					eventData.startDate = startDate;
					eventData.endDate = endDate;
					eventData.hoursInStage = hoursInStage;
					eventData.stages = stages;
					eventData.rewards = rewards;
					eventData.dbId = dbId;
				}
			});
		}

		function createNewEvent() {
			eventData.name = '';
			eventData.dbId = '';
			eventData.startDate = new Date();
			eventData.endDate = new Date();
			eventData.hoursInStage = 48;
			eventData.stages = [];
			eventData.rewards = [];
			startDate.value = new Date();
			endDate.value = new Date();
		}

		async function deleteEvent() {
			const docRef = doc(db, 'events', eventData.dbId);
			try {
				await deleteDoc(docRef);
				console.log(`${eventData.name} был удален из БД`);
			} catch (err: any) {
				console.log(`Произошла ошибка: ${err.message}`);
			}
			createNewEvent();
			loadEvents();
		}

		async function updateEvent() {
			const docRef = doc(db, 'events', eventData.dbId);
			const data: IEvent = {
				name: eventData.name,
				startDate: eventData.startDate,
				endDate: eventData.endDate,
				hoursInStage: eventData.hoursInStage,
				stages: eventData.stages,
				rewards: eventData.rewards,
			};
			try {
				await updateDoc(docRef, { ...data });
				console.log(`${eventData.name} был обновлен`);
			} catch (err: any) {
				console.log(`Произошла ошибка: ${err.message}`);
			}
			createNewEvent();
			loadEvents();
		}

		return {
			operationNames,
			eventData,
			calculateStages,
			checkTime,
			startDate,
			endDate,
			isLoading,
			events,
			addEventToDB,
			setActiveEvent,
			createNewEvent,
			deleteEvent,
			updateEvent,
			// eventName,
			// eventStartDate,
			// eventEndDate,
			// eventHoursInStage,
			// eventStages,
		};
	},
});
</script>
