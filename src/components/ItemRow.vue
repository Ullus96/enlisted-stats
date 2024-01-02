<template>
	<div class="item__row container">
		<div class="item__col item__col--name">{{ item.name }}</div>
		<!-- {{ item }} -->
		<div class="item__col item__col--stat">
			<span>{{ calculateStatsByLvl(item.statsMod, 1)[0] }}</span
			><span>-</span><span>{{ calculateStatsByLvl(item.statsMod, 1)[1] }}</span
			><span>-</span><span>{{ calculateStatsByLvl(item.statsMod, 1)[2] }}</span>
		</div>
		<div class="item__col item__col--stat">
			<span>{{ calculateStatsByLvl(item.statsMod, 2)[0] }}</span
			><span>-</span><span>{{ calculateStatsByLvl(item.statsMod, 2)[1] }}</span
			><span>-</span><span>{{ calculateStatsByLvl(item.statsMod, 2)[2] }}</span>
		</div>
		<div class="item__col item__col--stat">
			<span>{{ calculateStatsByLvl(item.statsMod, 3)[0] }}</span
			><span>-</span><span>{{ calculateStatsByLvl(item.statsMod, 3)[1] }}</span
			><span>-</span><span>{{ calculateStatsByLvl(item.statsMod, 3)[2] }}</span>
		</div>
		<div class="item__col item__col--stat">
			<span>{{ calculateStatsByLvl(item.statsMod, 4)[0] }}</span
			><span>-</span><span>{{ calculateStatsByLvl(item.statsMod, 4)[1] }}</span
			><span>-</span><span>{{ calculateStatsByLvl(item.statsMod, 4)[2] }}</span>
		</div>
		<div class="item__col item__col--stat">
			<span>{{ calculateStatsByLvl(item.statsMod, 5)[0] }}</span
			><span>-</span><span>{{ calculateStatsByLvl(item.statsMod, 5)[1] }}</span
			><span>-</span><span>{{ calculateStatsByLvl(item.statsMod, 5)[2] }}</span>
		</div>

		<div class="item__col item__col--desc">
			{{ item.perk }}
		</div>
	</div>
</template>

<script lang="ts">
import { IItem } from '@/type/Item';
import { defineComponent, PropType } from 'vue';
import { calculateStatsByLvl } from '@/functions/characterUtils';

export default defineComponent({
	props: {
		item: {
			required: true,
			type: Object as PropType<IItem>,
		},
	},
	setup(props) {
		return { calculateStatsByLvl };
	},
});
</script>
