<template>
	<div class="debug">
		<p v-for="(line, key) in store.state.user" :key="line">
			{{ key }}: {{ line }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	setup() {
		const store = useStore();

		return { store };
	},
});
</script>
