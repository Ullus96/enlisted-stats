<template>
	<transition
		:name="popUpData.type === 'danger' ? 'shake' : 'fade'"
		mode="out-in"
	>
		<PopUpComponent
			v-if="isPopUpExists"
			:key="popUpData.id"
			:type="popUpData.type"
			:title="popUpData.title"
			:desc="popUpData.desc"
			:duration="popUpData.duration"
		/>
	</transition>
	<div></div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import PopUpComponent from '@/components/ui/PopUpComponent.vue';
import { useStore } from 'vuex';

export default defineComponent({
	components: { PopUpComponent },
	setup() {
		const store = useStore();

		const isPopUpExists = computed(() => {
			return store.state.isPopUpExists;
		});

		const popUpData = computed(() => {
			return store.state.popUpData;
		});

		return { isPopUpExists, popUpData };
	},
});
</script>

<style scoped>
/* анимация тряски */
@keyframes tilt-n-move-shaking {
	0% {
		transform: translate(-50%, 0) rotate(0deg);
	}
	25% {
		transform: translate(calc(-50% + 2px), 2px) rotate(2deg);
	}
	50% {
		transform: translate(-50%, 0) rotate(0deg);
	}
	75% {
		transform: translate(calc(-50% + 2px), 2px) rotate(-2deg);
	}
	100% {
		transform: translate(-50%, 0) rotate(0deg);
	}
}

/* классы для shake анимации */
.shake-enter-active {
	animation: tilt-n-move-shaking 0.15s ease-in;
}
.shake-leave-active {
	animation: fade-out 0.1s ease-out;
}

/* анимация fade */
@keyframes fade-in {
	from {
		opacity: 0;
		transform: translate(-50%, 2rem);
	}
	to {
		opacity: 1;
		transform: translate(-50%, 0);
	}
}

@keyframes fade-out {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
}

/* классы для fade анимации */
.fade-enter-active {
	animation: fade-in 0.2s ease-in;
}
.fade-leave-active {
	animation: fade-out 0.15s ease-out;
}
</style>
