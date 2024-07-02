<template>
	<div class="calculator__skill tooltip-anchor">
		<TooltipComponent :width="25" :color="'dark'" class="calculator__tooltip">
			<div class="calculator__tooltip-desc-block">
				<span class="calculator__tooltip-desc">{{
					getSoldierData('id', soldierClass, 'perk')
				}}</span>
			</div>
		</TooltipComponent>

		<img
			:src="
				require('@/assets/soldier_icons/' +
					getSoldierData('id', soldierClass, 'icon'))
			"
			alt=""
			class="calculator__img soldier-perk"
		/>

		<div class="calculator__cost-block">
			<span>Перк класса</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SoldierID } from '@/type/Soldier';
import { getSoldierData } from '@/functions/convertSoldierDataToName';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';

export default defineComponent({
	components: { TooltipComponent },
	props: {
		soldierClass: {
			required: true,
			type: String as PropType<SoldierID>,
			default: 'base',
		},
	},
	setup(props) {
		return { getSoldierData };
	},
});
</script>
