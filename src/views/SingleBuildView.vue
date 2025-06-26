<template>
	<div class="container mt-l">
		<!-- {{ loadedData }} -->

		<template v-if="isLoading">
			<loading-spinner class="mt-xl mb-xl"></loading-spinner>
		</template>

		<template v-else-if="pageExists">
			<!-- <build-card-single
				:item="loadedData"
				:loadedUserData="userData"
				:user="userData"
				:buildId="id"
				:hasLink="false"
				:isStatusVisible="true"
				class="sbuild__single-build"
			></build-card-single> -->

			<template v-if="loadedData">
				<build-card
					:key="loadedData.dbId"
					:item="loadedData"
					:loadedUserData="
						userData
							? userData
							: {
									displayName: 'Пользователь не найден',
									photoURL: 'https://place-hold.it/80x80/8c8f94/8c8f94.jpg',
									emailHash: 'null',
									avatarProvider: null,
							  }
					"
					:isFinishedLoading="true"
					:variation="isUserAnAuthor() ? 'full' : 'preview'"
					:is-clickable="false"
					class="sbuild__single-build"
				></build-card>

				<!-- {{ loadedData }} -->
				<calculator-block
					:stats="loadedData.stats"
					:tags="loadedData.tags"
					:soldierClass="loadedData.soldierClass"
					:dataFromDB="loadedData.skillsData"
					:isOpenedBySkillBuild="true"
					:openedInSingleBuild="true"
					:item="loadedData"
					:dbId="loadedData.dbId"
				></calculator-block>
			</template>
		</template>

		<template v-else>
			<build-page-404></build-page-404>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from 'vue';
import CalculatorBlock from '@/components/calculator/CalculatorBlock.vue';
import BuildCardSingle from '@/components/build/BuildCardSingle.vue';
import BuildCard from '@/components/build/BuildCard.vue';
import { ISkillBuild, ISkillBuildWithID } from '@/type/SkillBuild';
import { items } from '@/data/soldiersList';
import { getSoldierData } from '@/functions/convertSoldierDataToName';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store/useStore';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import BuildPage404 from '@/components/no-page/BuildPage404.vue';
import {
	loadFromLocalStorage,
	saveToLocalStorage,
	saveToLocalStorageArray,
} from '@/functions/localStorageUtils';
import { getLocalStorageUsersDataByKeyAndValue } from '@/functions/getDataByKeyAndValue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default defineComponent({
	components: {
		CalculatorBlock,
		BuildCardSingle,
		BuildCard,
		LoadingSpinner,
		BuildPage404,
	},
	setup() {
		const loadedData: Ref<ISkillBuildWithID | null> = ref(null);
		let currentUser = ref(getAuth().currentUser);
		const userData: Ref<{
			photoURL: string;
			displayName: string;
			emailHash: string;
			avatarProvider: 'google' | 'gravatar' | 'none' | null;
		}> = ref({
			photoURL: '',
			displayName: '',
			emailHash: '',
			avatarProvider: null,
		});
		const store = useStore();
		const router = useRouter();
		const route = useRoute();
		let id = route.path.split('/')[route.path.split('/').length - 1];
		const isLoading: Ref<boolean> = ref(true);
		const pageExists: Ref<boolean> = ref(true);

		onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				currentUser.value = user;
			} else {
				currentUser.value = null;
			}
		});

		async function loadData() {
			const buildRef = doc(db, 'builds', id);
			const buildSnap = await getDoc(buildRef);

			if (buildSnap.exists()) {
				const buildData = buildSnap.data();
				// @ts-expect-error
				loadedData.value = buildData;
				// @ts-expect-error
				loadedData.value.dbId = buildSnap.id;
				await loadUserFromDB();
			} else {
				// userSnap.data() will be undefined in this case
				console.log('No such document!');
				return Promise.reject('No such document');
			}

			if (
				// @ts-expect-error
				!loadedData.value.data.isPublic &&
				// @ts-expect-error
				loadedData.value.data.author !== getAuth().currentUser?.uid
			) {
				router.push('/');
			}

			isLoading.value = false;
		}

		async function loadUserFromDB() {
			if (loadedData.value) {
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
					console.log(
						`usersData resetted because of TimeStamp has been expired`
					);
					// create a new TimeStamp
					saveToLocalStorage('usersTimestamp', new Date());
				}

				// Check if we have this user saved in localStorage
				// then add them to loadedUserData
				if (
					localStorageData &&
					localStorageData.length &&
					localStorageData.some(
						(item: { displayName: string; photoURL: string; user: string }) =>
							item.user === loadedData.value?.data.author
					)
				) {
					console.log('User found in a localStorage');
					userData.value.displayName = getLocalStorageUsersDataByKeyAndValue(
						localStorageData,
						'user',
						loadedData.value.data.author,
						'displayName'
					);
					userData.value.photoURL = getLocalStorageUsersDataByKeyAndValue(
						localStorageData,
						'user',
						loadedData.value.data.author,
						'photoURL'
					);
					userData.value.emailHash = getLocalStorageUsersDataByKeyAndValue(
						localStorageData,
						'user',
						loadedData.value.data.author,
						'emailHash'
					);
					userData.value.avatarProvider = getLocalStorageUsersDataByKeyAndValue(
						localStorageData,
						'user',
						loadedData.value.data.author,
						'avatarProvider'
					);
					userData.value = {
						displayName: userData.value.displayName,
						photoURL: userData.value.photoURL,
						emailHash: userData.value.emailHash ?? 'none',
						avatarProvider: userData.value.avatarProvider ?? null,
					};
				} else {
					const userRef = doc(db, 'users', loadedData.value.data.author);
					const userSnap = await getDoc(userRef);

					if (userSnap.exists()) {
						const singleUserData = userSnap.data() as {
							displayName: string;
							photoURL: string;
							avatarProvider?: 'google' | 'gravatar' | 'none' | null;
							emailHash?: string;
						};
						userData.value = {
							...singleUserData,
							avatarProvider: singleUserData.avatarProvider ?? null,
							emailHash: singleUserData.emailHash ?? 'none',
						};
						saveToLocalStorageArray('usersData', { ...userData.value });

						console.log('Document data:', userSnap.data());
						console.log(`userData:`);
						console.log(userData);
					} else {
						// userSnap.data() will be undefined in this case
						userData.value = {
							displayName: 'Пользователь не найден',
							photoURL: 'https://place-hold.it/80x80/8c8f94/8c8f94.jpg',
							emailHash: '',
							avatarProvider: 'google',
						};
						console.log('No such document!');
						return Promise.reject('No such document');
					}
				}
			}
		}

		loadData()
			.then(() => {
				isLoading.value = false;
				if (loadedData.value?.data.name) {
					document.title = `${loadedData.value.data.name} | Сборка`;
				}
			})
			.catch((error) => {
				console.error('Error:', error);
				isLoading.value = false;
				pageExists.value = false;
			});

		function isUserAnAuthor() {
			return loadedData.value?.data.author === currentUser.value?.uid;
		}

		return {
			loadedData,
			userData,
			items,
			isLoading,
			pageExists,
			getSoldierData,
			id,
			isUserAnAuthor,
		};
	},
});
</script>
