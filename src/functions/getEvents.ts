import { db } from '@/firebase/firebase';
import { IEvent, IEventFirestore } from '@/type/Events';
import { getDocs, query, collection, orderBy } from 'firebase/firestore';
import { Ref, ref } from 'vue';

const getEvents = () => {
	const events: Ref<IEventFirestore[]> = ref([]);
	const error = ref(null);
	const loadEvents = async () => {
		try {
			const res = await getDocs(
				query(collection(db, 'events'), orderBy('startDate', 'asc'))
			);
			events.value = res.docs.map((doc) => {
				const { name, startDate, endDate, hoursInStage, stages, rewards } =
					doc.data();
				let singleEvent: IEvent = {
					name: name,
					startDate: new Date(startDate.seconds * 1000),
					endDate: new Date(endDate.seconds * 1000),
					hoursInStage: hoursInStage,
					stages: stages.map((stage: any) => {
						return {
							startDate: new Date(stage.startDate.seconds * 1000),
							endDate: new Date(stage.endDate.seconds * 1000),
						};
					}),
					rewards: rewards,
				};
				return { ...singleEvent, dbId: doc.id };
			});
		} catch (err: any) {
			error.value = err.message;
			console.log(error.value);
		}
	};
	return { events, error, loadEvents };
};

export default getEvents;
