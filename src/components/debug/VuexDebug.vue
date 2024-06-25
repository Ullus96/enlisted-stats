<template>
	<div class="debug" v-if="isVisible">
		<button class="btn btn-sm btn-tertiary" @click="isVisible = !isVisible">
			Hide
		</button>
		<p class="debug__title">Other data:</p>
		<p>isNavigationVisible: {{ $store.state.isNavigationVisible }}</p>
		<div class="aside__line debug__line"></div>
		<p class="debug__title">Modals:</p>
		<p v-for="(line, key) in store.state.modal" :key="line">
			{{ key }}: {{ line }}
		</p>
		<div class="aside__line debug__line"></div>
		<p class="debug__title">LoadingData:</p>
		<p v-for="(line, key) in store.state.loading" :key="line">
			{{ key }}: {{ line }}
		</p>
		<div class="aside__line debug__line"></div>
		<p class="debug__title">UserData:</p>
		<p v-for="(line, key) in store.state.user" :key="line">
			{{ key }}: {{ line }}
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	setup() {
		const isVisible: Ref<boolean> = ref(true);
		const store = useStore();

		return { isVisible, store };
	},
});
</script>
