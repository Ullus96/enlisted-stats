<template>
	<Teleport to="#sortBy">
		<div class="filter__sort-by-block">
			<span class="filter__sort-by-desc">Сортировка</span>
			<div class="filter__sort-items">
				<button
					class="btn btn-m btn-tertiary filter__sort-item"
					@click="setSortBy('name')"
					v-ripple
				>
					По названию
				</button>
				<button
					class="btn btn-m btn-tertiary filter__sort-item"
					@click="setSortBy('likes')"
					v-ripple
				>
					По лайкам
				</button>
				<button
					class="btn btn-m btn-tertiary filter__sort-item"
					@click="setSortBy('date')"
					v-ripple
				>
					По дате создания
				</button>
			</div>
		</div>
	</Teleport>
	<Teleport to="body">
		<div class="page-mask" @click="close"></div>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { sortByValues } from './types';

export default defineComponent({
	emits: ['close', 'setSortBy'],
	setup(props, context) {
		function close() {
			context.emit('close');
		}

		function setSortBy(sortBy: sortByValues) {
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
