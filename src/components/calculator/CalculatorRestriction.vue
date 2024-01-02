<template>
	<div
		class="calculator__restriction-text-block"
		:class="{ inactive: !isHigherTiersBlocked }"
	>
		<i class="fa-solid fa-lock"></i>
		<p class="calculator__restriction-text">
			Потрать еще
			<b class="calculator__highlight"
				>{{ howManyPointsToUnlock }} {{ getDeclension() }}</b
			>, чтобы получить доступ к Tier&#8209;2/3 навыкам
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

export default defineComponent({
	props: {
		howManyPointsToUnlock: {
			required: true,
			type: Number,
		},
		isHigherTiersBlocked: {
			required: true,
			type: Boolean,
		},
	},
	setup(props) {
		function getDeclension() {
			switch (props.howManyPointsToUnlock) {
				case 6:
				case 5:
				case 0:
					return 'очков';
					break;

				case 4:
				case 3:
				case 2:
					return 'очка';
					break;

				case 1:
					return 'очко';
					break;

				default:
					return 'очков';
					break;
			}
		}

		return {
			getDeclension,
		};
	},
});
</script>
