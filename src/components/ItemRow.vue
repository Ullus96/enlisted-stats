<template>
	<div class="item__row container">
		<div class="item__col item__col--name">{{ item.name }}</div>
		<div class="item__col item__col--stat">
			<span>{{ item.lv1[0] }}</span
			><span>-</span><span>{{ item.lv1[1] }}</span
			><span>-</span><span>{{ item.lv1[2] }}</span>
		</div>
		<div class="item__col item__col--stat">
			<span>{{ item.lv2[0] }}</span
			><span>-</span><span>{{ item.lv2[1] }}</span
			><span>-</span><span>{{ item.lv2[2] }}</span>
		</div>
		<div class="item__col item__col--stat">
			<span>{{ item.lv3[0] }}</span
			><span>-</span><span>{{ item.lv3[1] }}</span
			><span>-</span><span>{{ item.lv3[2] }}</span>
		</div>
		<div class="item__col item__col--stat">
			<span>{{ item.lv4[0] }}</span
			><span>-</span><span>{{ item.lv4[1] }}</span
			><span>-</span><span>{{ item.lv4[2] }}</span>
		</div>
		<div class="item__col item__col--stat">
			<span>{{ item.lv5[0] }}</span
			><span>-</span><span>{{ item.lv5[1] }}</span
			><span>-</span><span>{{ item.lv5[2] }}</span>
		</div>
		<div class="item__col item__col--desc">
			{{ item.perk }}
		</div>
	</div>
</template>

<script lang="ts">
import { IItem } from '@/type/Item';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		item: {
			required: true,
			type: Object as PropType<IItem>,
		},
	},
	setup(props) {},
});
</script>
