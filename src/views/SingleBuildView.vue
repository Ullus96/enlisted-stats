<template>
	<div class="container mt-l">
		<!-- {{ loadedData }} -->

		<template v-if="isLoading">
			<loading-spinner class="mt-xl mb-xl"></loading-spinner>
		</template>

		<template v-else-if="pageExists">
			<build-card-single
				:item="loadedData"
				:user="userData"
				:buildId="id"
				:hasLink="false"
				:isStatusVisible="true"
				class="sbuild__single-build"
			></build-card-single>

			<template v-if="loadedData">
				<!-- {{ loadedData }} -->
				<calculator-block
					:stats="loadedData.stats"
					:tags="loadedData.tags"
					:soldierClass="loadedData.soldierClass"
					:dataFromDB="loadedData.skillsData"
					:isOpenedBySkillBuild="true"
					:openedInSingleBuild="true"
					:item="loadedData"
					:userData="userData"
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
import { ISkillBuild, ISkillBuildWithID } from '@/type/SkillBuild';
import { items } from '@/data/soldiersList';
import { getSoldierData } from '@/functions/convertSoldierDataToName';
import { useRoute } from 'vue-router';
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

export default defineComponent({
	components: {
		CalculatorBlock,
		BuildCardSingle,
		LoadingSpinner,
		BuildPage404,
	},
	setup() {
		const loadedData: Ref<ISkillBuildWithID | null> = ref(null);
		const userData = ref({ photoURL: '', displayName: '', dbId: '' });
		const route = useRoute();
		let id = route.path.split('/')[route.path.split('/').length - 1];
		const isLoading: Ref<boolean> = ref(true);
		const pageExists: Ref<boolean> = ref(true);

		async function loadData() {
			const buildRef = doc(db, 'builds', id);
			const buildSnap = await getDoc(buildRef);

			if (buildSnap.exists()) {
				const buildData = buildSnap.data();
				// @ts-ignore
				loadedData.value = buildData;
				await loadUserFromDB();
			} else {
				// userSnap.data() will be undefined in this case
				console.log('No such document!');
				return Promise.reject('No such document');
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
					userData.value = {
						displayName: userData.value.displayName,
						photoURL: userData.value.photoURL,
						dbId: loadedData.value.data.author,
					};
				} else {
					const userRef = doc(db, 'users', loadedData.value.data.author);
					const userSnap = await getDoc(userRef);

					if (userSnap.exists()) {
						const singleUserData = userSnap.data() as {
							displayName: string;
							photoURL: string;
							dbId: string;
						};
						userData.value = { ...singleUserData, dbId: userSnap.id };
						saveToLocalStorageArray('usersData', { ...userData.value });

						console.log('Document data:', userSnap.data());
						console.log(`userData:`);
						console.log(userData);
					} else {
						// userSnap.data() will be undefined in this case
						userData.value = {
							displayName: 'Пользователь не найден',
							photoURL: 'https://place-hold.it/80x80/8c8f94/8c8f94.jpg',
							dbId: '',
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

		return {
			loadedData,
			userData,
			items,
			isLoading,
			pageExists,
			getSoldierData,
			id,
		};
	},
});
</script>
