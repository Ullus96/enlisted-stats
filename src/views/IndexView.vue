<template>
	<div class="container mt-m">
		<h1 class="section-title">
			Характеристики и статы солдат Enlisted по классам
		</h1>
		<label for="searchInput">
			<search class="table__search" role="search">
				<div class="table__search-icon tooltip-anchor">
					<TooltipComponent :direction="'bottom'">
						<p><span class="hotkey">Esc</span> - сбросить ввод</p>
					</TooltipComponent>
					<IconBase>
						<IconSearch />
					</IconBase>
				</div>
				<input
					type="text"
					class="table__input"
					@input="setSearchValue($event.target.value)"
					id="searchInput"
					v-focus="{ onMount: true, onUpdate: true }"
					@keydown.esc="
						clearSearchValue();
						$event.target.value = '';
					"
					:placeholder="
						!isFilteredToClass ? 'Начни вводить название класса' : ''
					"
					:disabled="isFilteredToClass"
				/>
			</search>
		</label>

		<div class="table__wrapper mt-s">
			<div class="table__header table__row">
				<div class="table__header--col table__col table__col--first">
					<div class="table__header-question-icon tooltip-anchor">
						<TooltipComponent :direction="'right'" :width="25">
							<p>Нажми по строчке чтобы включить/выключить фильтрацию.</p>
						</TooltipComponent>

						<IconBase>
							<IconQuestionCircle />
						</IconBase>
					</div>
				</div>
				<div class="table__header--col table__col table__col--star">★</div>
				<div class="table__header--col table__col table__col--star">★★</div>
				<div class="table__header--col table__col table__col--star">★★★</div>
				<div class="table__header--col table__col table__col--star">★★★★</div>
				<div class="table__header--col table__col table__col--star">★★★★★</div>
				<div class="table__header--col table__col table__col--perk">
					Начальный перк
				</div>
			</div>

			<!-- Table itself -->
			<template v-if="!isFilteredToClass">
				<transition-group name="fade" tag="div" class="table__wrapper--body">
					<item-row
						v-for="(item, idx) in filteredItems"
						:key="item.id"
						:item="item"
						@click="handleClick(idx)"
					></item-row>
				</transition-group>
			</template>

			<!-- render single selected soldier -->
			<template v-if="isFilteredToClass">
				<div class="table__wrapper--body">
					<item-row
						:item="filteredItems[activeIdx]"
						@click="removeFilter()"
					></item-row>
				</div>

				<div
					class="table__calculator"
					v-if="isFilteredToClass && isCalculatorSelected"
				>
					<calculator-block
						:stats="calculateStatsByLvl(filteredItems[activeIdx].statsMod, 5)"
						:tags="filteredItems[activeIdx].tags"
						:soldierClass="filteredItems[activeIdx].id"
					></calculator-block>
					<div class="table__promo-buttons" style="margin-top: 1.2rem">
						<span class="table__promo-or">ИЛИ</span>
						<button
							class="btn btn-m btn-secondary"
							@click="filteredSoldierButtonHandler('presets')"
							v-ripple
						>
							Назад
						</button>
					</div>
				</div>

				<div class="table__promo-block" v-else>
					<CompactBuildsBlock
						v-if="$store.state.user.isLoggedIn"
						:soldierClass="filteredItems[activeIdx].id"
					/>
					<div
						class="table__promo-popular"
						:class="{
							'table__promo-popular--full-width': !$store.state.user.isLoggedIn,
						}"
					>
						<h2 class="table__promo-title">Популярные сборки от сообщества</h2>
						<div class="table__promo-builds">
							<build-card
								class="table__build"
								v-for="item in loadedData"
								:key="item"
								:item="item"
								:loadedUserData="
									loadedUserData && loadedUserData[item.data.author]
										? loadedUserData[item.data.author]
										: {
												displayName: 'Пользователь не найден',
												photoURL:
													'https://place-hold.it/80x80/8c8f94/8c8f94.jpg',
												emailHash: null,
												avatarProvider: null,
										  }
								"
								:isFinishedLoading="isFinishedLoading"
							></build-card>
						</div>
						<div class="table__promo-buttons">
							<router-link :to="link">
								<button class="btn btn-m btn-secondary" v-ripple>
									Посмотреть еще
								</button>
							</router-link>
							<span class="table__promo-or">ИЛИ</span>
							<button
								class="btn btn-m btn-primary"
								@click="filteredSoldierButtonHandler('calculator')"
								v-ripple
							>
								Создать свою сборку
							</button>
						</div>
					</div>
				</div>
			</template>
		</div>

		<div class="container-sm" v-show="!isFilteredToClass">
			<div class="faq__section-title-wrapper">
				<h2 class="faq__section-title">Часто задаваемые вопросы</h2>
			</div>
			<FaqGroup :title="'Вопросы по прокачке'">
				<FaqItem :title="'Как правильно прокачивать солдат в Enlisted?'">
					<p>
						Прокачка солдат в Enlisted зависит от класса и стиля игры. Общих
						правил нет, но есть топовые мета-сборки.
					</p>
					<p>
						Актуальные сборки можно глянуть на странице
						<a href="/skill-builds" class="link">Сборки</a>.
					</p>
				</FaqItem>
				<FaqItem :title="'Какие скиллы качать бойцам в Enlisted?'">
					<p>
						Лучшие перки для солдат в Enlisted зависят от класса: пехоте -
						"Живучесть", танкистам - перк на смену снаряда.
					</p>
					<p>
						Пехота: "Живучесть" (красная ветка) + скорость бега (зелёная) +
						быстрая аптечка. Жёлтая ветка: уменьшение разброса, отдача (в 95%
						случаев вертикальная), перезарядка.
					</p>
					<p>
						Танкисты: перк на смену снаряда + улучшенное наведение. Водителя
						собирать отдельно.
					</p>
					<p>
						Мета-сборки можно глянуть на странице
						<a href="/skill-builds" class="link">Сборки</a>.
					</p>
				</FaqItem>
				<FaqItem
					:title="'Какие отряды лучше прокачивать в Enlisted в первую очередь?'"
				>
					<p>
						Лучшие отряды для прокачки - это инженеры и штурмовики. Они наиболее
						эффективны в бою.
					</p>
					<p>
						Штурмовики - основной боевой отряд для игры, туда можно ставить
						специалистов.
					</p>
					<p>
						Инженеры - для повышения их максимального уровня. Их нужно ставить в
						каждый отряд.
					</p>
				</FaqItem>
				<FaqItem :title="'Как правильно прокачивать отряд в Enlisted?'">
					<p>
						Оптимальная прокачка отряда - через опыт, слот инженера и
						численность отряда.
					</p>
					<p>
						Сначала открой увеличение опыта → как только сможешь - инженера →
						добавляй специалистов и увеличивай численность → прокачай ветку
						уровня специалистов отряда.
					</p>
				</FaqItem>
				<FaqItem :title="'Как быстро прокачаться в Enlisted?'">
					<p>
						Самый быстрый способ качаться в Enlisted - строить точки респауна
						инженером.
					</p>
					<p>
						Они дают пассивный опыт в течение всего боя, особенно если они
						поставлены эффективно. Поэтому в любой отряд нужно ставить инженера.
					</p>
				</FaqItem>
				<FaqItem
					:title="'Что делает перк на разброс пуль после резкого разворота в Enlisted?'"
				>
					<p>
						Перк снижает разброс пуль при движении влево и вправо (стрейфы A/D).
					</p>
					<p>
						Полезен для штурмовиков и агрессивных игроков, особенно с
						автоматикой.
					</p>
				</FaqItem>
			</FaqGroup>
			<FaqGroup :title="'Вопросы по событиям'">
				<FaqItem :title="'Когда начинается следующий этап события в Enlisted?'">
					<p>Этапы событий в Enlisted обычно длятся по 2 суток.</p>
					<p>
						Точное расписание смотри на странице
						<a href="/events" class="link">События</a>.
					</p>
				</FaqItem>
				<FaqItem :title="'Какая награда за следующий этап события Enlisted?'">
					<p>
						Награды за этапы можно посмотреть на карточках дат на странице
						<a href="/events" class="link">События</a>.
					</p>
				</FaqItem>
				<FaqItem :title="'Как получить награды из прошлых ивентов Enlisted?'">
					<p>
						Разработчики периодически добавляют Ящики за серебро с небольшим
						шансом на старые награды.
					</p>
					<p>
						Следи за новостями и акциями, старые скины и оружие иногда
						возвращают в игру.
					</p>
				</FaqItem>
			</FaqGroup>
		</div>
	</div>
</template>

<script lang="ts">
import ItemRow from '@/components/ItemRow.vue';
import {
	computed,
	defineComponent,
	nextTick,
	onMounted,
	onUpdated,
	reactive,
	ref,
	watch,
} from 'vue';
import type { Ref } from 'vue';
import CalculatorBlock from '@/components/calculator/CalculatorBlock.vue';
import CalculatorBranch from '@/components/calculator/CalculatorTier.vue';
import CalculatorSkill from '@/components/calculator/CalculatorSkill.vue';
import { calculateStatsByLvl } from '@/functions/characterUtils';
import { items } from '@/data/soldiersList';
import { useRoute, useRouter } from 'vue-router';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconSearch from '@/components/ui/icon/icons/IconSearch.vue';
import IconQuestionCircle from '@/components/ui/icon/icons/IconQuestionCircle.vue';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';
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
import {
	loadFromLocalStorage,
	saveToLocalStorage,
	saveToLocalStorageArray,
} from '@/functions/localStorageUtils';
import { SoldierID } from '@/type/Soldier';
import BuildCard from '@/components/build/BuildCard.vue';
import { transliterateWithRomanCheck } from '@/functions/transliterate';
import Fuse from 'fuse.js';
import { IItem } from '@/type/Item';
import FaqGroup from '@/components/faq/FaqGroup.vue';
import FaqItem from '@/components/faq/FaqItem.vue';
import CompactBuildsBlock from '@/components/build-compact/CompactBuildsBlock.vue';
import { getAuth } from 'firebase/auth';

export default defineComponent({
	name: 'App',
	components: {
		ItemRow,
		CalculatorBlock,
		CalculatorBranch,
		CalculatorSkill,
		IconBase,
		IconSearch,
		IconQuestionCircle,
		TooltipComponent,
		BuildCard,
		FaqGroup,
		FaqItem,
		CompactBuildsBlock,
	},
	setup() {
		const isFilteredToClass: Ref<boolean> = ref(false);
		const activeIdx: Ref<number> = ref(0);
		const route = useRoute();
		const router = useRouter();
		let loadedData = reactive([] as ISkillBuildWithID[]);
		const usersSet: Ref<Set<string> | Set<unknown>> = ref(new Set());
		const isFinishedLoading: Ref<boolean> = ref(false);
		const loadedUserData = reactive<any>({});
		const soldierClass: Ref<SoldierID> = ref('standart');
		const buildsAmount: Ref<number> = ref(0);
		let lastVisible: any = null; // Для пагинации
		const loadedBuildIDs: Set<string> = new Set(); // Для хранения ID загруженных билдов
		let noMoreData: boolean = false; // Флаг для проверки наличия данных
		const auth = getAuth().currentUser;

		function handleClick(idx: number) {
			isFilteredToClass.value = true;
			activeIdx.value = idx;
			// @ts-expect-error
			soldierClass.value = filteredItems.value[idx].id;

			// сбрасываем состояние перед загрузкой
			loadedData.length = 0;
			loadedBuildIDs.clear();
			lastVisible = null;
			noMoreData = false;
			if (isCalculatorSelected.value) return;
			loadData();
		}

		function removeFilter() {
			isFilteredToClass.value = false;
			filteredSoldierButtonHandler('presets');
			router.push({ name: 'Home' });
		}

		function getImgPath(link: string): string {
			if (typeof link === 'string') {
				return link;
			} else {
				throw new Error('No path found');
			}
		}

		// Input and search
		const search: Ref<string> = ref('');
		const filteredItems: Ref<[] | IItem[]> = ref([]);

		function setSearchValue(input: string | null) {
			if (!input) {
				search.value = '';
				return;
			}

			search.value = transliterateWithRomanCheck(input);

			// используем fuse.js для поиска
			const result = fuse.search(search.value);
			// сохраняем результаты поиска
			filteredItems.value = result.map((r) => r.item); // fuse возвращает объекты, нам нужны только items
		}

		function clearSearchValue() {
			search.value = '';
		}

		// настройки для fuse.js
		const fuseOptions = {
			keys: ['name'], // ищем по имени
			threshold: 0.3, // чувствительность поиска (чем меньше, тем точнее)
			minMatchCharLength: 2, // минимальная длина совпадения
		};

		const fuse = new Fuse(items, fuseOptions);

		function updateFilteredItems() {
			if (search.value === '') {
				filteredItems.value = items; // если пустой запрос, возвращаем все
			} else {
				const result = fuse.search(search.value);
				filteredItems.value = result.map((r) => r.item);
			}
		}

		// следим за изменением переменной search и обновляем фильтрованные элементы
		watch(search, updateFilteredItems);

		// инициализация начального состояния
		updateFilteredItems();

		// === End of Input and Search

		const isCalculatorSelected: Ref<boolean> = ref(false);

		function filteredSoldierButtonHandler(option: 'presets' | 'calculator') {
			isCalculatorSelected.value = false;

			switch (option) {
				case 'calculator':
					isCalculatorSelected.value = true;
					break;

				default:
					isCalculatorSelected.value = false;
					break;
			}
		}

		// Load data
		async function loadData() {
			try {
				if (noMoreData) return; // Прекращаем загрузку, если больше данных нет

				await loadBuildsFromDB();

				loadedData.forEach((item) => {
					usersSet.value.add(item.data.author);
				});

				if (
					usersSet.value instanceof Set &&
					typeof [...usersSet.value][0] === 'string'
				) {
					loadUsersFromDB(usersSet.value as Set<string>);
				}

				buildsAmount.value = loadedData.length;
				isFinishedLoading.value = true;

				// если билдов меньше 3 и данные еще могут быть, вызываем снова
				if (buildsAmount.value < 3 && !noMoreData) {
					await loadData();
				} else {
					// ограничиваем массив до 3 элементов
					loadedData.splice(3);
				}
			} catch (err: any) {
				console.log(err.message);
			}
		}

		async function loadBuildsFromDB() {
			try {
				let q;
				if (lastVisible) {
					q = query(
						collection(db, 'builds'),
						orderBy(`data.likesAmount`, 'desc'),
						where('data.isPublic', '==', true),
						where('soldierClass', '==', soldierClass.value),
						startAfter(lastVisible),
						limit(3),
					);
				} else {
					q = query(
						collection(db, 'builds'),
						orderBy(`data.likesAmount`, 'desc'),
						where('data.isPublic', '==', true),
						where('soldierClass', '==', soldierClass.value),
						limit(3),
					);
				}

				const res = await getDocs(q);

				// res будет всегда, просто компилятор ts ругается
				if (res && res.docs.length > 0) {
					lastVisible = res.docs[res.docs.length - 1]; // Сохраняем последний видимый документ для пагинации
					const newData: ISkillBuildWithID[] = [];
					res.docs.forEach((doc) => {
						if (!loadedBuildIDs.has(doc.id)) {
							let parsedData = { ...doc.data(), dbId: doc.id };
							// @ts-expect-error
							newData.push(parsedData);
							loadedBuildIDs.add(doc.id);
						}
					});

					// обновляем состояние loadedData
					loadedData.push(...newData);

					// если получили меньше 3 документов, данных больше нет
					if (res.docs.length < 3) {
						noMoreData = true;
					}
				}
			} catch (err: any) {
				console.log(err.message);
			}
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
							item.user === user,
					)
				) {
					// console.log('User found in a localStorage');
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
					// console.log('No user in localStorage, making a fetch');
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
							emailHash: null,
							avatarProvider: null,
						};
						// console.log('No such document!');
					}
				}
			});

			// console.log(`At the end of iterations, loadedUserData is:`);
			// console.log(loadedUserData);
			isFinishedLoading.value = true;
		}

		// Make a link
		const link = computed(
			() =>
				`/skill-builds?soldierClass=${soldierClass.value}&sortBy=likes&order=desc`,
		);

		return {
			items,
			handleClick,
			isFilteredToClass,
			activeIdx,
			removeFilter,
			getImgPath,
			search,
			setSearchValue,
			clearSearchValue,
			filteredItems,
			isCalculatorSelected,
			filteredSoldierButtonHandler,
			calculateStatsByLvl,
			loadedData,
			loadedUserData,
			isFinishedLoading,
			link,
			auth,
		};
	},
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.18s ease-in-out, transform 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}
</style>
