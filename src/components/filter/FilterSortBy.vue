<template>
	<Teleport to="#sortBy">
		<div class="filter__sort-by-block">
			<span class="filter__sort-by-desc">Сортировка</span>
			<div class="filter__sort-items">
				<button
					class="btn btn-m btn-tertiary filter__sort-item"
					@click="setSortBy('nameLowercase')"
				>
					По названию
				</button>
				<button
					class="btn btn-m btn-tertiary filter__sort-item"
					@click="setSortBy('likesAmount')"
				>
					По лайкам
				</button>
				<button
					class="btn btn-m btn-tertiary filter__sort-item"
					@click="setSortBy('createdAt')"
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
