<template>
	<section class="ccard__block">
		<div class="ccard__header">
			<h3 class="ccard__header-title">Персональные сборки</h3>
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
			<PersonalBuildCard
				v-for="item in filteredData"
				:key="item.dbId"
				:item="item"
				:loadedUserData="loadedUserData[item.data.author] || defaultUserData"
				:isPinned="pinnedSet.has(item.dbId)"
				@toggle-pin="onTogglePin"
			/>
		</div>

		<p
			class="ccard__tutorial"
			v-if="
				(!hasLikedAndOwnedBuilds || likedBuildsAmount === 0) &&
				$store.state.settings.showTutorial
			"
		>
			<template v-if="myBuildsAmount === 0">
				♡ Создайте свою, или лайкните сборки других и они появятся здесь!
			</template>
			<template v-else-if="likedBuildsAmount === 0 && chosenFilter !== 'my'">
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
import PersonalBuildCard from './PersonalBuildCard.vue';
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
	components: { PersonalBuildCard },
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

		// @ts-expect-error
		const pinnedSet: Ref<Set<string>> = ref(new Set());

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

		// For compact view we fetch once: my builds + liked builds (two queries), merge and dedupe, take up to 15
		function tsToMs(value: any) {
			if (!value) return 0;
			if (typeof value === 'number') return value;
			if (typeof value.toMillis === 'function') return value.toMillis();
			if (value.seconds) return value.seconds * 1000;
			const parsed = Date.parse(String(value));
			return isNaN(parsed) ? 0 : parsed;
		}

		async function loadInitialBuilds() {
			loadedData.length = 0;
			isFinishedLoading.value = false;

			const uid = auth?.uid || null;
			if (!uid) {
				// no user: nothing to fetch for my/liked
				isFinishedLoading.value = true;
				return;
			}

			try {
				const soldierClass = props.soldierClass || null;

				// my builds
				const myConstraints = [
					orderBy('data.createdAt', 'desc'),
					where('data.author', '==', uid),
					...(soldierClass ? [where('soldierClass', '==', soldierClass)] : []),
					limit(10),
				];
				const myQuery = query(collection(db, 'builds'), ...myConstraints);
				const myRes = await getDocs(myQuery);
				// liked builds (public only)
				const likedConstraints = [
					orderBy('data.createdAt', 'desc'),
					where('data.isPublic', '==', true),
					where('data.likedBy', 'array-contains', uid),
					...(soldierClass ? [where('soldierClass', '==', soldierClass)] : []),
					limit(7),
				];
				const likedQuery = query(collection(db, 'builds'), ...likedConstraints);
				const likedRes = await getDocs(likedQuery);

				const map = new Map<string, ISkillBuildWithID>();

				if (myRes) {
					// @ts-expect-error
					const myData: ISkillBuildWithID[] = myRes.docs.map((d) => ({
						...d.data(),
						dbId: d.id,
					}));
					myData.forEach((b) => map.set(b.dbId, b));
				}

				if (likedRes) {
					// @ts-expect-error
					const likedData: ISkillBuildWithID[] = likedRes.docs.map((d) => ({
						...d.data(),
						dbId: d.id,
					}));
					likedData.forEach((b) => map.set(b.dbId, b));
				}

				const merged = Array.from(map.values()).sort(
					(a, b) => tsToMs(b.data.createdAt) - tsToMs(a.data.createdAt),
				);

				// load pinned ids from localStorage for this soldierClass
				const pinnedKey = `pinned_builds_${props.soldierClass}`;
				const pinnedFromStorage: string[] | null =
					loadFromLocalStorage(pinnedKey) || [];
				pinnedSet.value = new Set(pinnedFromStorage || []);

				const pinnedList = merged.filter((m) => pinnedSet.value.has(m.dbId));
				const rest = merged.filter((m) => !pinnedSet.value.has(m.dbId));
				loadedData.push(...[...pinnedList, ...rest]);
			} catch (err: any) {
				console.log(err?.message || err);
			}

			isFinishedLoading.value = true;
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
			// keep for manual refresh: re-run initial load
			await loadInitialBuilds();
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
			buildsLeftUnloaded.value = 0;
		}

		function savePinnedToStorage() {
			const key = `pinned_builds_${props.soldierClass}`;
			saveToLocalStorage(key, Array.from(pinnedSet.value));
		}

		function onTogglePin(id: string) {
			if (!id) return;
			if (pinnedSet.value.has(id)) {
				pinnedSet.value.delete(id);
			} else {
				pinnedSet.value.add(id);
			}

			savePinnedToStorage();

			// reorder loadedData so pinned are on top
			const pinnedList = loadedData.filter((m) => pinnedSet.value.has(m.dbId));
			const rest = loadedData.filter((m) => !pinnedSet.value.has(m.dbId));
			loadedData.length = 0;
			loadedData.push(...[...pinnedList, ...rest]);
		}

		onMounted(() => {
			loadData(true);
		});

		const filteredData = computed(() => {
			const uid = auth?.uid || null;
			if (chosenFilter.value === 'all') return loadedData;
			if (chosenFilter.value === 'my')
				return uid ? loadedData.filter((i) => i.data.author === uid) : [];
			if (chosenFilter.value === 'liked')
				return uid
					? loadedData.filter(
							(i) =>
								Array.isArray(i.data.likedBy) && i.data.likedBy.includes(uid),
					  )
					: [];
			return loadedData;
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
			filteredData,
			loadedUserData,
			defaultUserData,
			isFinishedLoading,
			loadData,
			pinnedSet,
			onTogglePin,
		};
	},
});
</script>

<style scoped></style>
