<template>
	<section class="admin__category">
		<template v-if="isLoading">
			<loading-spinner class="mt-xl mb-m"></loading-spinner>
		</template>

		<template v-else>
			<p class="admin__category-title">События в базе:</p>

			<div class="admin__chips-flex">
				<template v-if="events">
					<button
						class="chip admin__chip"
						v-for="event in events"
						:key="event.dbId"
						@click="setActiveEvent(event.dbId)"
						:class="{ active: event.dbId == eventData.dbId }"
						v-ripple
					>
						{{ event.name }}
					</button>
				</template>
				<button
					class="chip admin__chip"
					@click="createNewEvent"
					:class="{ active: !eventData.dbId }"
					v-ripple
				>
					<IconBase>
						<IconPlus />
					</IconBase>
				</button>
			</div>

			<transition name="slide-to-top" mode="out-in">
				<div :key="eventData.dbId">
					<div class="admin__inputs-block">
						<InputComponent
							:key="eventData.dbId"
							:type="'text'"
							:label="'Название события'"
							:placeholder="operationName"
							:required="true"
							:presetInput="eventData.name"
							@onChange="(val) => (eventData.name = val)"
						/>

						<InputComponent
							:key="eventData.dbId"
							:type="'text'"
							:label="'Ссылка на новость'"
							:placeholder="'Необязательно'"
							:presetInput="eventData.articleLink"
							@onChange="(val) => (eventData.articleLink = val)"
						/>

						<InputComponent
							:key="eventData.dbId"
							:type="'datetime-local'"
							:label="'Дата начала'"
							:desc="'По местному'"
							:required="true"
							:presetInput="
								eventData.dbId ? setInputDateFormat(eventData.startDate) : ''
							"
							@onChange="(val) => (startDate = val)"
						/>

						<InputComponent
							:key="eventData.dbId"
							:type="'datetime-local'"
							:label="'Дата конца'"
							:desc="'По местному'"
							:required="true"
							:presetInput="
								eventData.dbId ? setInputDateFormat(eventData.endDate) : ''
							"
							@onChange="(val) => (endDate = val)"
						/>

						<InputComponent
							:key="eventData.dbId"
							:type="'number'"
							:label="'Часов между этапами'"
							:placeholder="48"
							:desc="'24, 48, 72...'"
							:required="true"
							:presetInput="eventData.hoursInStage"
							@onChange="(val) => (eventData.hoursInStage = val)"
						/>
					</div>

					<button
						class="btn btn-secondary btn-m admin__btn"
						@click="calculateStages"
						v-ripple
					>
						Рассчитать количество этапов
					</button>
					<span class="admin__separator"></span>

					<template v-if="eventData.rewards.length">
						<p class="admin__stages-useful-symbols">
							Символы, которые могут пригодиться: «»★
						</p>
						<p class="admin__stages-title">Награды за этапы</p>
						<div class="admin__stages">
							<textarea
								class="input__input admin__input"
								v-for="(reward, idx) in eventData.rewards"
								:key="idx"
								v-model="eventData.rewards[idx]"
								:placeholder="String(idx + 1)"
								@input="resizeAll"
							/>
						</div>
					</template>

					<template v-if="!eventData.dbId">
						<div class="admin__last-btns">
							<button
								class="btn btn-m btn-primary admin__main-btn"
								:disabled="!eventData.rewards.length"
								@click="addEventToDB"
								v-ripple
							>
								Создать событие
							</button>
							<!-- Shift rewards -->
							<button
								class="btn btn-m btn-secondary admin__delete-btn svg"
								:disabled="!eventData.rewards.length"
								@click="shiftRewards('left')"
								v-ripple
							>
								<IconBase
									:style="{ rotate: '-90deg', scale: '1.2', translate: '-1px' }"
								>
									<IconAngleUp />
								</IconBase>
							</button>
							<button
								class="btn btn-m btn-secondary admin__delete-btn svg"
								:disabled="!eventData.rewards.length"
								@click="shiftRewards('right')"
								v-ripple
							>
								<IconBase
									:style="{ rotate: '90deg', scale: '1.2', translate: '1px' }"
								>
									<IconAngleUp />
								</IconBase>
							</button>
						</div>
					</template>

					<template v-else>
						<div class="admin__last-btns">
							<button
								class="btn btn-m btn-primary admin__main-btn"
								:disabled="!eventData.rewards.length"
								@click="updateEvent"
								v-ripple
							>
								Обновить
							</button>
							<!-- Shift rewards -->
							<button
								class="btn btn-m btn-secondary admin__delete-btn svg"
								:disabled="!eventData.rewards.length"
								@click="shiftRewards('left')"
								v-ripple
							>
								<IconBase
									:style="{ rotate: '-90deg', scale: '1.2', translate: '-1px' }"
								>
									<IconAngleUp />
								</IconBase>
							</button>
							<button
								class="btn btn-m btn-secondary admin__delete-btn svg"
								:disabled="!eventData.rewards.length"
								@click="shiftRewards('right')"
								v-ripple
							>
								<IconBase
									:style="{ rotate: '90deg', scale: '1.2', translate: '1px' }"
								>
									<IconAngleUp />
								</IconBase>
							</button>
							<!-- Delete -->
							<button
								class="btn btn-m btn-secondary admin__delete-btn svg"
								:disabled="!eventData.rewards.length"
								@click="$store.state.dialog.isDeletingEvent = true"
								v-ripple
							>
								<IconBase>
									<IconTrash />
								</IconBase>
							</button>

							<DialogComponent
								:dialogName="'isDeletingEvent'"
								v-if="$store.state.dialog.isDeletingEvent"
								:yes="{ text: 'Удалить', type: 'primary' }"
								:no="{ text: 'Отмена', type: 'tertiary' }"
								@confirm="deleteEvent"
							>
								<template #title>Удалить событие?</template>

								Это действие удалит событие
								<span>{{ eventData.name }}</span
								>.
							</DialogComponent>
						</div>
					</template>
				</div>
			</transition>
		</template>
	</section>
</template>

<script lang="ts">
import { IEvent, IEventFirestore } from '@/type/Events';
import { defineComponent, nextTick, reactive, ref, Ref, watch } from 'vue';
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
import LoadingSpinner from '../ui/LoadingSpinner.vue';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconPlus from '@/components/ui/icon/icons/IconPlus.vue';
import IconTrash from '@/components/ui/icon/icons/IconTrash.vue';
import IconAngleUp from '../ui/icon/icons/IconAngleUp.vue';
import InputComponent from '@/components/input/InputComponent.vue';
import DialogComponent from '@/components/ui/DialogComponent.vue';

export default defineComponent({
	components: {
		LoadingSpinner,
		IconBase,
		IconPlus,
		IconTrash,
		IconAngleUp,
		InputComponent,
		DialogComponent,
	},
	setup() {
		const startDate: Ref<Date> = ref(new Date());
		const endDate: Ref<Date> = ref(new Date());
		const isLoading: Ref<boolean> = ref(true);

		let eventData: IEventFirestore = reactive({
			name: '',
			articleLink: '',
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

			eventData.stages.length = 0;
			generateStages(eventData);

			const tempArr = [...eventData.rewards];
			eventData.rewards.length = 0;
			eventData.rewards = Array.from(
				{ length: eventData.stages.length },
				(_, i) => {
					return tempArr[i] || '';
				}
			);
		}

		function generateStages(event: IEvent | IEventFirestore) {
			const stageDurationInMillis: number = event.hoursInStage * 60 * 60 * 1000; // в миллисекундах

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

		function shiftRewards(direction: 'left' | 'right') {
			if (!eventData.rewards.length) return;

			if (direction === 'left') {
				eventData.rewards.shift();
				eventData.rewards.push('');
			} else {
				eventData.rewards.pop();
				eventData.rewards.unshift('');
			}
		}

		const { events, error, loadEvents } = getEvents();
		loadEvents().then(() => {
			isLoading.value = false;
		});

		function setInputDateFormat(date: Date): string {
			function setZero(num: number): string {
				return String(num).padStart(2, '0');
			}

			const year = date.getFullYear();
			const month = setZero(date.getMonth() + 1);
			const day = setZero(date.getDate());
			const hours = setZero(date.getHours());
			const minutes = setZero(date.getMinutes());

			// инпут принимает строку типа "yyyy-MM-ddThh:mm"
			return `${year}-${month}-${day}T${hours}:${minutes}`;
		}

		const addEvent = async (data: IEvent) => {
			try {
				const docRef = await addDoc(collection(db, 'events'), {
					name: data.name,
					articleLink: data.articleLink,
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
						articleLink,
						startDate,
						endDate,
						hoursInStage,
						stages,
						rewards,
						dbId,
					} = event;
					eventData.name = name;
					eventData.articleLink = articleLink;
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
			eventData.articleLink = '';
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
				articleLink: eventData.articleLink,
				startDate: new Date(startDate.value),
				endDate: new Date(endDate.value),
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

		const operationName: Ref<string> = ref(
			operationNames[Math.floor(Math.random() * operationNames.length)]
		);

		function isHTMLTextAreaElement(
			el: EventTarget | null
		): el is HTMLTextAreaElement {
			return el instanceof HTMLTextAreaElement;
		}

		function setHeight(el: HTMLTextAreaElement | EventTarget | null) {
			if (isHTMLTextAreaElement(el)) {
				el.style.height = 'auto';
				el.style.height = `${el.scrollHeight}px`;
			}
		}

		function resizeTextarea(event: Event) {
			const textarea = event.target;

			setHeight(textarea);
		}

		function resizeAll() {
			nextTick(() => {
				const textareas = document.querySelectorAll('.admin__input');

				if (textareas) {
					// console.log('ресайз всех textarea');
					textareas.forEach((el) => {
						setHeight(el);
					});
				} else {
					// console.warn('❌ textareas пуст');
				}
			});
		}

		watch(
			() => eventData.rewards,
			() => {
				setTimeout(() => {
					resizeAll();
				}, 500);
			}
		);

		return {
			operationName,
			eventData,
			calculateStages,
			checkTime,
			startDate,
			endDate,
			isLoading,
			events,
			setInputDateFormat,
			addEventToDB,
			setActiveEvent,
			createNewEvent,
			deleteEvent,
			updateEvent,
			shiftRewards,
			resizeTextarea,
			resizeAll,
		};
	},
});
</script>

<style scoped>
.slide-to-top-enter-active,
.slide-to-top-leave-active {
	transition: opacity 0.4s ease-in-out, transform 0.3s ease-in;
}

.slide-to-top-enter-from,
.slide-to-top-leave-to {
	transform: translateY(10rem);
	opacity: 0;
}
.slide-to-top-enter-to,
.slide-to-top-leave-from {
	transform: translateY(0rem);
	opacity: 1;
}
</style>
