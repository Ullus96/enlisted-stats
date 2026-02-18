<template>
	<section class="ccard__block">
		<div class="ccard__header">
			<h3 class="ccard__title">Персональные сборки</h3>
			<div class="ccard__chips">
				<div
					class="chip ccard__chip"
					:class="{ active: chosenFilter === 'all' }"
					v-ripple
					@click="setFilter('all')"
				>
					Все
				</div>
				<div
					class="chip ccard__chip"
					:class="{ active: chosenFilter === 'my' }"
					v-ripple
					@click="setFilter('my')"
				>
					Мои
					<template v-if="myBuildsAmount > 0">
						({{ myBuildsAmount }})
					</template>
				</div>
				<div
					class="chip ccard__chip"
					:class="{ active: chosenFilter === 'liked' }"
					v-ripple
					@click="setFilter('liked')"
				>
					Избранные
					<template v-if="likedBuildsAmount > 0">
						({{ likedBuildsAmount }})
					</template>
				</div>
			</div>
		</div>

		<div class="ccard__build-cards">
			<CompactBuildCard
				v-for="item in loadedData"
				:key="item.dbId"
				:item="item"
				:loadedUserData="loadedUserData[item.data.author] || defaultUserData"
			/>
		</div>

		<p
			class="ccard__tutorial"
			v-if="!hasLikedAndOwnedBuilds || likedBuildsAmount === 0"
		>
			<template v-if="myBuildsAmount === 0">
				♡ Создайте свою, или лайкните сборки других и они появятся здесь!
			</template>
			<template v-else-if="likedBuildsAmount === 0">
				♡ Лайкните сборки других и они появятся здесь!
			</template>
		</p>

		<div class="ccard__load-more" v-if="buildsLeftUnloaded > 0">
			<span class="ccard__load-more-desc">
				Есть еще
				<span class="ccard__load-more-number"
					>{{ buildsLeftUnloaded }}
					{{
						getDeclension(buildsLeftUnloaded, ['сборка', 'сборки', 'сборок'])
					}}</span
				>
			</span>
			<button class="btn btn-m btn-secondary">Показать еще</button>
		</div>
	</section>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref, reactive, onMounted } from 'vue';
import CompactBuildCard from './CompactBuildCard.vue';
import {
	saveToLocalStorageArray,
	loadFromLocalStorage,
	saveToLocalStorage,
} from '@/functions/localStorageUtils';
import { getLocalStorageUsersDataByKeyAndValue } from '@/functions/getDataByKeyAndValue';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { getAuth } from 'firebase/auth';
import { ISkillBuildWithID } from '@/type/SkillBuild';

export default defineComponent({
	components: { CompactBuildCard },
	props: {
		soldierClass: {
			type: String,
			required: true,
			default: 'rifleman1',
		},
	},
	setup(props) {
		type Filter = 'all' | 'my' | 'liked';
		const chosenFilter: Ref<Filter> = ref('all');
		function setFilter(filter: Filter) {
			chosenFilter.value = filter;
			loadData(true);
		}

		const defaultUserData = {
			displayName: 'Пользователь не найден',
			photoURL: 'https://place-hold.it/80x80/8c8f94/8c8f94.jpg',
			avatarProvider: null,
			emailHash: null,
		};

		// data
		const loadedData = reactive([] as ISkillBuildWithID[]);
		const loadedUserData: any = reactive({});
		const isFinishedLoading: Ref<boolean> = ref(false);
		const auth = getAuth().currentUser;

		const myBuildsAmount: Ref<number> = ref(0);
		const likedBuildsAmount: Ref<number> = ref(0);
		const hasLikedAndOwnedBuilds = computed(
			() => !!(myBuildsAmount.value + likedBuildsAmount.value),
		);

		const buildsLeftUnloaded: Ref<number> = ref(0);

		function getDeclension(number: number, titles: [string, string, string]) {
			const cases = [2, 0, 1, 1, 1, 2];
			return titles[
				number % 100 > 4 && number % 100 < 20
					? 2
					: cases[number % 10 < 5 ? number % 10 : 5]
			];
		}

		function getBuildsQueryConditions(
			source: 'base' | 'liked' | 'my',
			userId: string | null,
			soldierClass: string | null,
		) {
			const conditions: any[] = [];

			if (source === 'base') {
				conditions.push(where('data.isPublic', '==', true));
			} else if (source === 'liked' && userId) {
				conditions.push(where('data.isPublic', '==', true));
				conditions.push(where('data.likedBy', 'array-contains', userId));
			} else if (source === 'my' && userId) {
				conditions.push(where('data.author', '==', userId));
			}

			if (soldierClass) {
				conditions.push(where('soldierClass', '==', soldierClass));
			}

			return conditions;
		}

		async function loadBuildsFromDB(clearData: boolean) {
			if (clearData) {
				loadedData.length = 0;
				isFinishedLoading.value = false;
			}

			try {
				const sortBy = 'data.createdAt';
				const sortOrder: 'desc' | 'asc' = 'desc';
				const userId = auth?.uid || null;

				const source =
					chosenFilter.value === 'all' ? 'base' : chosenFilter.value;

				const soldierClass = props.soldierClass || null;
				const conditions = getBuildsQueryConditions(
					source as any,
					userId,
					soldierClass,
				);

				const queryConstraints = [
					orderBy(sortBy, sortOrder),
					...conditions,
					limit(12),
				];

				const buildsQuery = query(
					collection(db, 'builds'),
					...queryConstraints,
				);
				const res = await getDocs(buildsQuery);

				if (res) {
					// @ts-expect-error
					const newData: ISkillBuildWithID[] = res.docs.map((doc) => ({
						...doc.data(),
						dbId: doc.id,
					}));

					loadedData.push(...newData);
				}
			} catch (err: any) {
				// keep console log minimal
				console.log(err?.message || err);
			}
		}

		async function loadUsersFromDB() {
			const IDs = new Set<string>(loadedData.map((d) => d.data.author));

			const localStorageTimestamp: Date | null =
				loadFromLocalStorage('usersTimestamp');
			const timeNow = new Date();
			let localStorageData = loadFromLocalStorage('usersData');

			if (
				!localStorageTimestamp ||
				(localStorageTimestamp &&
					timeNow.getTime() - new Date(localStorageTimestamp).getTime() >
						3_600_000)
			) {
				localStorageData = null;
				saveToLocalStorage('usersData', localStorageData);
				saveToLocalStorage('usersTimestamp', new Date());
			}

			for (const user of IDs) {
				if (
					localStorageData &&
					localStorageData.length &&
					localStorageData.some((item: any) => item.user === user)
				) {
					const userData = {
						displayName: getLocalStorageUsersDataByKeyAndValue(
							localStorageData,
							'user',
							user,
							'displayName',
						),
						photoURL: getLocalStorageUsersDataByKeyAndValue(
							localStorageData,
							'user',
							user,
							'photoURL',
						),
						avatarProvider: getLocalStorageUsersDataByKeyAndValue(
							localStorageData,
							'user',
							user,
							'avatarProvider',
						),
						emailHash: getLocalStorageUsersDataByKeyAndValue(
							localStorageData,
							'user',
							user,
							'emailHash',
						),
					};
					loadedUserData[user] = { ...userData };
				} else {
					const userRef = doc(db, 'users', user);
					const userSnap = await getDoc(userRef);

					if (userSnap.exists()) {
						const userData = userSnap.data();
						loadedUserData[user] = { ...userData };
						saveToLocalStorageArray('usersData', { ...userData, user });
					} else {
						loadedUserData[user] = { ...defaultUserData };
					}
				}
			}

			isFinishedLoading.value = true;
		}

		async function loadData(clearData = false) {
			await loadBuildsFromDB(clearData);
			await loadUsersFromDB();

			const uid = auth?.uid || null;
			myBuildsAmount.value = uid
				? loadedData.filter((i) => i.data.author === uid).length
				: 0;
			likedBuildsAmount.value = uid
				? loadedData.filter(
						(i) =>
							Array.isArray(i.data.likedBy) && i.data.likedBy.includes(uid),
				  ).length
				: 0;
			buildsLeftUnloaded.value = Math.max(0, 0);
		}

		onMounted(() => {
			loadData(true);
		});

		return {
			chosenFilter,
			setFilter,
			myBuildsAmount,
			likedBuildsAmount,
			hasLikedAndOwnedBuilds,
			buildsLeftUnloaded,
			getDeclension,
			loadedData,
			loadedUserData,
			defaultUserData,
			isFinishedLoading,
			loadData,
		};
	},
});
</script>

<style scoped></style>
