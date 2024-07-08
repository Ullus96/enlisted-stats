<template>
	<div class="container sbuild">
		<filters-block
			@filterParams="filterParamsChanged"
			:title="title"
			:selectedClass="filterParams.selectedClass"
			:sortByID="filterParams.sortByID"
			:sortByMethod="filterParams.sortByMethod"
		></filters-block>
		{{ filterParams }}
		<div class="filter__under">
			<button class="btn btn-m btn-primary filter__btn" @click="loadData(true)">
				Загрузить сборки
			</button>
		</div>
		<div class="sbuild__grid">
			<build-card
				v-for="item in loadedData"
				:key="item"
				:item="item"
				:loadedUserData="
					loadedUserData && loadedUserData[item.data.author]
						? loadedUserData[item.data.author]
						: {
								displayName: 'Пользователь не найден',
								photoURL: 'https://place-hold.it/80x80/8c8f94/8c8f94.jpg',
						  }
				"
				:isFinishedLoading="isFinishedLoading"
			></build-card>
		</div>
		<div class="sbuild__load-more mt-m" v-if="lastVisible">
			<button
				class="btn btn-m btn-tertiary filter__btn"
				@click="loadData(false)"
			>
				Загрузить еще
			</button>
		</div>
		<div class="sbuild__no-more-text-block" v-else>
			<p class="sbuild__no-more-text" v-if="loadedTimes">
				По данному запросу сборок больше нет.
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
	saveToLocalStorageArray,
	loadFromLocalStorageArray,
	saveToLocalStorage,
	loadFromLocalStorage,
} from '@/functions/localStorageUtils';
import WorkInProgress from '@/components/no-page/WorkInProgress.vue';
import BuildCard from '@/components/build/BuildCard.vue';
import { ISkillBuildWithID } from '@/type/SkillBuild';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	where,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { getLocalStorageUsersDataByKeyAndValue } from '@/functions/getDataByKeyAndValue';
import FiltersBlock from '@/components/filter/FiltersBlock.vue';
import { IFilterParams } from '@/components/filter/types';
import { getAuth } from 'firebase/auth';
import { SoldierID } from '@/type/Soldier';

export default defineComponent({
	components: { WorkInProgress, BuildCard, FiltersBlock },
	props: {
		from: {
			required: true,
			type: String as PropType<'base' | 'my' | 'liked'>,
			default: 'base',
		},
		title: {
			required: false,
			type: String,
			default: '',
		},
	},
	setup(props) {
		let loadedData = reactive([] as ISkillBuildWithID[]);
		const usersSet: Ref<Set<string> | Set<unknown>> = ref(new Set());
		const loadedUserData = reactive<any>({});
		const isFinishedLoading: Ref<boolean> = ref(false);
		const auth = getAuth().currentUser;

		async function loadData(clearData: boolean) {
			await loadBuildsFromDB(clearData);

			loadedData.forEach((item) => {
				usersSet.value.add(item.data.author);
			});

			if (
				usersSet.value instanceof Set &&
				typeof [...usersSet.value][0] === 'string'
			) {
				loadUsersFromDB(usersSet.value as Set<string>);
			}

			isFinishedLoading.value = true;
		}

		const lastVisible: any = ref('');
		const loadedTimes: Ref<number> = ref(0);

		async function loadBuildsFromDB(clearData: boolean) {
			if (clearData) {
				loadedData.length = 0;
				loadedTimes.value = 0;
				lastVisible.value = '';
			}

			try {
				let res;

				// ==============================
				// If Loading from 'skill-builds'
				if (props.from === 'base') {
					if (!lastVisible.value) {
						// Check if there is a selected class
						if (filterParams.value.selectedClass) {
							res = await getDocs(
								query(
									collection(db, 'builds'),
									orderBy(
										`data.${filterParams.value.sortByID}`,
										filterParams.value.sortByMethod
									),
									where('data.isPublic', '==', true),
									where('soldierClass', '==', filterParams.value.selectedClass),
									limit(12)
								)
							);
						} else {
							res = await getDocs(
								query(
									collection(db, 'builds'),
									orderBy(
										`data.${filterParams.value.sortByID}`,
										filterParams.value.sortByMethod
									),
									where('data.isPublic', '==', true),
									limit(12)
								)
							);
						}
					} else {
						if (filterParams.value.selectedClass) {
							res = await getDocs(
								query(
									collection(db, 'builds'),
									orderBy(
										`data.${filterParams.value.sortByID}`,
										filterParams.value.sortByMethod
									),
									where('data.isPublic', '==', true),
									where('soldierClass', '==', filterParams.value.selectedClass),
									startAfter(lastVisible.value),
									limit(12)
								)
							);
						} else {
							res = await getDocs(
								query(
									collection(db, 'builds'),
									orderBy(
										`data.${filterParams.value.sortByID}`,
										filterParams.value.sortByMethod
									),
									where('data.isPublic', '==', true),
									startAfter(lastVisible.value),
									limit(12)
								)
							);
						}
					}
				}
				// ==============================
				// If Loading from 'saved-builds'
				else if (props.from === 'liked' && auth) {
					if (!lastVisible.value) {
						if (filterParams.value.selectedClass) {
							res = await getDocs(
								query(
									collection(db, 'builds'),
									orderBy(
										`data.${filterParams.value.sortByID}`,
										filterParams.value.sortByMethod
									),
									where('data.isPublic', '==', true),
									where('soldierClass', '==', filterParams.value.selectedClass),
									where('data.likedBy', 'array-contains', auth.uid),
									limit(12)
								)
							);
						} else {
							res = await getDocs(
								query(
									collection(db, 'builds'),
									orderBy(
										`data.${filterParams.value.sortByID}`,
										filterParams.value.sortByMethod
									),
									where('data.isPublic', '==', true),
									where('data.likedBy', 'array-contains', auth.uid),
									limit(12)
								)
							);
						}
					} else {
						if (filterParams.value.selectedClass) {
							res = await getDocs(
								query(
									collection(db, 'builds'),
									orderBy(
										`data.${filterParams.value.sortByID}`,
										filterParams.value.sortByMethod
									),
									where('data.isPublic', '==', true),
									where('soldierClass', '==', filterParams.value.selectedClass),
									where('data.likedBy', 'array-contains', auth.uid),
									startAfter(lastVisible.value),
									limit(12)
								)
							);
						} else {
							res = await getDocs(
								query(
									collection(db, 'builds'),
									orderBy(
										`data.${filterParams.value.sortByID}`,
										filterParams.value.sortByMethod
									),
									where('data.isPublic', '==', true),
									where('data.likedBy', 'array-contains', auth.uid),
									startAfter(lastVisible.value),
									limit(12)
								)
							);
						}
					}
				}
				// ==============================
				// If Loading from 'my-builds'
				else if (props.from === 'my' && auth) {
					if (!lastVisible.value) {
						if (filterParams.value.selectedClass) {
							res = await getDocs(
								query(
									collection(db, 'builds'),
									orderBy(
										`data.${filterParams.value.sortByID}`,
										filterParams.value.sortByMethod
									),
									where('data.author', '==', auth.uid),
									where('soldierClass', '==', filterParams.value.selectedClass),
									limit(12)
								)
							);
						} else {
							res = await getDocs(
								query(
									collection(db, 'builds'),
									orderBy(
										`data.${filterParams.value.sortByID}`,
										filterParams.value.sortByMethod
									),
									where('data.author', '==', auth.uid),
									limit(12)
								)
							);
						}
					} else {
						if (filterParams.value.selectedClass) {
							res = await getDocs(
								query(
									collection(db, 'builds'),
									orderBy(
										`data.${filterParams.value.sortByID}`,
										filterParams.value.sortByMethod
									),
									where('data.author', '==', auth.uid),
									where('soldierClass', '==', filterParams.value.selectedClass),
									startAfter(lastVisible.value),
									limit(12)
								)
							);
						} else {
							res = await getDocs(
								query(
									collection(db, 'builds'),
									orderBy(
										`data.${filterParams.value.sortByID}`,
										filterParams.value.sortByMethod
									),
									where('data.author', '==', auth.uid),
									startAfter(lastVisible.value),
									limit(12)
								)
							);
						}
					}
				}

				// res будет всегда, просто компилятор ts ругается
				if (res) {
					lastVisible.value = res.docs[res.docs.length - 1];
					loadedTimes.value++;

					const newData: ISkillBuildWithID[] = [];
					res.docs.forEach((doc) => {
						let parsedData = { ...doc.data(), dbId: doc.id };
						// @ts-ignore
						newData.push(parsedData);
					});
					console.log(newData);

					// Обновляем состояние loadedData
					loadedData.push(...newData);
				}
			} catch (err: any) {
				console.log(err.message);
			}

			// return data;
		}

		async function loadUsersFromDB(IDs: Set<string>) {
			const localStorageTimestamp: Date | null =
				loadFromLocalStorage('usersTimestamp');
			const timeNow = new Date();
			let localStorageData = loadFromLocalStorage('usersData');

			// If timestamp is outdated (>1h) then reset data
			if (
				!localStorageTimestamp ||
				(localStorageTimestamp &&
					timeNow.getTime() - new Date(localStorageTimestamp).getTime() >
						3_600_000)
			) {
				localStorageData = null;
				saveToLocalStorage('usersData', localStorageData);
				console.log(`usersData resetted because of TimeStamp has been expired`);
				// create a new TimeStamp
				saveToLocalStorage('usersTimestamp', new Date());
			}

			IDs.forEach(async (user) => {
				// Check if we have this user saved in localStorage
				// then add them to loadedUserData
				if (
					localStorageData &&
					localStorageData.length &&
					localStorageData.some(
						(item: { displayName: string; photoURL: string; user: string }) =>
							item.user === user
					)
				) {
					console.log('User found in a localStorage');
					const userData = {
						displayName: getLocalStorageUsersDataByKeyAndValue(
							localStorageData,
							'user',
							user,
							'displayName'
						),
						photoURL: getLocalStorageUsersDataByKeyAndValue(
							localStorageData,
							'user',
							user,
							'photoURL'
						),
					};
					loadedUserData[user] = { ...userData };
				} else {
					console.log('No user in localStorage, making a fetch');
					const userRef = doc(db, 'users', user);
					const userSnap = await getDoc(userRef);

					if (userSnap.exists()) {
						const userData = userSnap.data();
						loadedUserData[user] = { ...userData };
						saveToLocalStorageArray('usersData', { ...userData, user });
					} else {
						// userSnap.data() will be undefined in this case
						loadedUserData[user] = {
							displayName: 'Пользователь не найден',
							photoURL: 'https://place-hold.it/80x80/8c8f94/8c8f94.jpg',
						};
						console.log('No such document!');
					}
				}
			});

			console.log(`At the end of iterations, loadedUserData is:`);
			console.log(loadedUserData);
			isFinishedLoading.value = true;
		}

		// filters
		const filterParams: Ref<IFilterParams> = ref({
			selectedClass: false,
			sortByID: 'createdAt',
			sortByMethod: 'desc',
		});

		function filterParamsChanged(payload: IFilterParams) {
			filterParams.value.selectedClass = payload.selectedClass;
			filterParams.value.sortByID = payload.sortByID;
			filterParams.value.sortByMethod = payload.sortByMethod;
		}

		// Query Validation
		const validParams: {
			selectedClass: SoldierID[];
			sortByID: Array<'nameLowercase' | 'likesAmount' | 'createdAt'>;
			sortByMethod: Array<'asc' | 'desc'>;
		} = {
			selectedClass: [
				'custom',
				'standart',
				'rifleman1',
				'rifleman2',
				'rifleman3',
				'medic',
				'assaulter1',
				'assaulter2',
				'assaulter3',
				'assaulter4',
				'engineer1',
				'engineer2',
				'sniper1',
				'sniper2',
				'sniper3',
				'at1',
				'at2',
				'mg1',
				'mg2',
				'mg3',
				'radio1',
				'radio2',
				'mortar',
				'flamethrower1',
				'flamethrower2',
				'pilot-fighter1',
				'pilot-fighter2',
				'pilot-fighter3',
				'pilot-attacker1',
				'pilot-attacker2',
				'pilot-attacker3',
				'tank1',
				'tank2',
				'tank3',
				'moto1',
				'apc-driver',
			],
			sortByID: ['nameLowercase', 'likesAmount', 'createdAt'],
			sortByMethod: ['asc', 'desc'],
		};

		const isQueryParamsOk = reactive<{
			selectedClass: boolean;
			sortByID: boolean;
			sortByMethod: boolean;
		}>({
			selectedClass: false,
			sortByID: false,
			sortByMethod: false,
		});

		// Set query params
		const router = useRouter();

		interface Params {
			selectedClass?: string;
			sortByID?: string;
			sortByMethod?: string;
		}
		const params: Params = router.currentRoute.value.query;
		console.log(router.currentRoute.value.query);

		function validateParams(params: Params) {
			if (
				params.selectedClass &&
				validParams.selectedClass.includes(params.selectedClass as any)
			) {
				// @ts-ignore
				filterParams.value.selectedClass = params.selectedClass;
			} else {
				filterParams.value.selectedClass = false;
			}

			if (
				params.sortByID &&
				validParams.sortByID.includes(params.sortByID as any)
			) {
				filterParams.value.sortByID = params.sortByID;
			}

			// validate sortByMethod
			if (
				params.sortByMethod &&
				validParams.sortByMethod.includes(params.sortByMethod as any)
			) {
				// @ts-ignore
				filterParams.value.sortByMethod = params.sortByMethod;
			}
		}

		if (params) {
			validateParams(params);
			loadData(false);
		}

		return {
			loadData,
			loadedData,
			usersSet,
			loadedUserData,
			isFinishedLoading,
			filterParams,
			filterParamsChanged,
			lastVisible,
			loadedTimes,
		};
	},
});
</script>
