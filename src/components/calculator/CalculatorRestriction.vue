<template>
	<div
		class="calculator__restriction-text-block"
		:class="{ inactive: !isHigherTiersBlocked }"
		v-if="!$store.state.settings.compactMode"
	>
		<IconBase :height="24" :width="24">
			<IconLock />
		</IconBase>
		<p class="calculator__restriction-text">
			Потрать еще
			<b class="calculator__highlight"
				>{{ howManyPointsToUnlock }} {{ getDeclension() }}</b
			>, чтобы получить доступ к Tier&#8209;2/3 навыкам
		</p>
		<div class="calculator__separator"></div>
	</div>

	<div
		class="calculator__restriction-text-block"
		:class="{ inactive: !isHigherTiersBlocked }"
		v-else
	>
		<div class="calculator__restriction-upper-block">
			<IconBase :height="20" :width="20">
				<IconLock />
			</IconBase>
			<p class="calculator__restriction-text">
				Потрать еще
				<b class="calculator__highlight"
					>{{ howManyPointsToUnlock }} {{ getDeclension() }}</b
				>.
			</p>
		</div>
		<div class="calculator__separator"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconLock from '@/components/ui/icons/IconLock.vue';

export default defineComponent({
	components: { IconBase, IconLock },
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
