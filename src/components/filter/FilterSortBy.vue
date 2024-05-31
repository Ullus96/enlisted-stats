<template>
	<Teleport to="#sortBy">
		<div class="filter__sort-by-block">
			<span class="filter__sort-by-desc">Сортировка</span>
			<button class="filter__sort-item btn" @click="setSortBy('nameLowercase')">
				По названию
			</button>
			<button class="filter__sort-item btn" @click="setSortBy('likesAmount')">
				По лайкам
			</button>
			<button class="filter__sort-item btn" @click="setSortBy('createdAt')">
				По дате создания
			</button>
		</div>
	</Teleport>
	<Teleport to="body">
		<div class="page-mask" @click="close"></div>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	emits: ['close', 'setSortBy'],
	setup(props, context) {
		function close() {
			context.emit('close');
		}

		function setSortBy(sortBy: string) {
			context.emit('setSortBy', sortBy);
			context.emit('close');
		}

		return {
			close,
			setSortBy,
		};
	},
});
</script>
