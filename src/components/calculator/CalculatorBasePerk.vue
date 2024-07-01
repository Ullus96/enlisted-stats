<template>
	<div class="calculator__skill">
		<img
			:src="
				require('@/assets/soldier_icons/' +
					getSoldierData('id', soldierClass, 'icon'))
			"
			alt=""
			class="calculator__img soldier-perk"
		/>
		<div class="calculator__tooltip">
			<div class="calculator__tooltip-desc-block">
				<span class="calculator__tooltip-desc">{{
					getSoldierData('id', soldierClass, 'perk')
				}}</span>
			</div>
		</div>
		<!-- <div class="calculator__counter-block">
			<button class="btn calculator__button">&nbsp;</button>
			<div class="calculator__bars-wrapper">
				<div
					class="calculator__bar calculator__bar-highlight base-perk"
					v-for="item in 1"
					:key="item"
				>
					&nbsp;
				</div>
			</div>
			<button class="btn calculator__button">&nbsp;</button>
		</div> -->
		<div class="calculator__cost-block">
			<span class="base-perk">Перк класса</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SoldierID } from '@/type/Soldier';
import { getSoldierData } from '@/functions/convertSoldierDataToName';

export default defineComponent({
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
