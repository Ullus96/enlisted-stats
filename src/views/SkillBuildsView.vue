<template>
	<div class="container sbuild mt-m">
		<button class="btn btn-main" @click="loadData('savedSkills')">
			Загрузить сборки
		</button>
		<div class="sbuild__grid">
			<div class="sbuild__item" v-for="item in 4" :key="item">
				<div class="sbuild__header-block">
					<h2 class="sbuild__name">SAS инженер быстрый</h2>
					<div
						class="sbuild__likes-block"
						:class="{ active: getTrueOrFalse() }"
					>
						<p class="sbuild__likes-amount">1</p>
						<svg
							width="20"
							height="16"
							viewBox="0 0 20 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="sbuild__likes-svg"
						>
							<path
								d="M9.62064 2.29822C9.71563 2.40892 9.85422 2.47262 10.0001 2.47262C10.146 2.47262 10.2846 2.40892 10.3795 2.29822C12.042 0.360759 14.697 -0.164272 16.7433 1.53117C18.8279 3.25825 19.0829 6.18754 17.4711 8.25512C16.761 9.16591 15.3047 10.6111 13.8175 12.0104C12.3398 13.4007 10.8626 14.7173 10.1329 15.3615C10.0911 15.3983 10.0585 15.4271 10.0298 15.4516C10.0158 15.4637 10.004 15.4736 9.99388 15.4818C9.96318 15.4567 9.92162 15.4203 9.85502 15.3615L9.85497 15.3615C9.12523 14.7173 7.64801 13.4007 6.17037 12.0104C4.68313 10.6111 3.22682 9.16591 2.51676 8.25513C0.90935 6.19323 1.19206 3.2793 3.24966 1.5268L2.92546 1.14615L3.24966 1.5268C5.25246 -0.179029 7.95452 0.35653 9.62064 2.29822Z"
								fill="transparent"
								stroke="#fff"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</div>

				<div class="sbuild__data-block">
					<div class="sbuild__data-left">
						<img
							:src="require('@/assets/soldier_icons/tags.svg')"
							alt=""
							class="sbuild__data-icon"
						/>
						<p class="sbuild__data-desc">Пехотинец, инженер</p>
					</div>
					<div class="sbuild__data-stats">
						[<span>14</span> - <span>18</span> - <span>22</span>]
					</div>
				</div>

				<div class="sbuild__author-block">
					<img
						src="@/assets/anime_eye.jpg"
						alt=""
						class="sbuild__author-avatar"
					/>
					<div class="sbuild__author-block-right">
						<p class="sbuild__author-name">tilted depressed psychokid死涙</p>
						<p class="sbuild__author-date">31.12.23</p>
					</div>
				</div>
			</div>
		</div>
		<div v-if="loadedData.length">
			{{ loadedData[0].data }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import {
	saveToLocalStorage,
	loadFromLocalStorage,
} from '@/functions/localStorageUtils';

export default defineComponent({
	setup() {
		const loadedData: Ref<any[]> = ref([]);
		function loadData(key: string) {
			loadedData.value = loadFromLocalStorage(key);
			console.log(loadedData.value);
		}

		function getTrueOrFalse(): boolean {
			return !!Math.floor(Math.random() * 2);
		}

		return { loadData, loadedData, getTrueOrFalse };
	},
});
</script>
