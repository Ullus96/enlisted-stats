<template>
	<div class="stats__wrapper" :class="{ build: source === 'build' }">
		<span class="stats__item">
			<IconBase
				:iconColor="source === 'build' ? '#94FF94' : 'currentcolor'"
				:width="size === 'normal' ? 16 : 14"
				:height="size === 'normal' ? 16 : 14"
			>
				<IconMobility />
			</IconBase>
			{{ stats[0] != null ? stats[0] : '—' }}
		</span>
		<span class="stats__separator">-</span>
		<span class="stats__item">
			<IconBase
				:iconColor="source === 'build' ? '#FF9494' : 'currentcolor'"
				:width="size === 'normal' ? 16 : 14"
				:height="size === 'normal' ? 16 : 14"
			>
				<IconMobility />
			</IconBase>
			{{ stats[1] != null ? stats[1] : '—' }}
		</span>
		<span class="stats__separator">-</span>
		<span class="stats__item">
			<IconBase
				:iconColor="source === 'build' ? '#FFFF94' : 'currentcolor'"
				:width="size === 'normal' ? 16 : 14"
				:height="size === 'normal' ? 16 : 14"
			>
				<IconMobility />
			</IconBase>
			{{ stats[2] != null ? stats[2] : '—' }}
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconMobility from '@/components/ui/icon/icons/IconMobility.vue';
import IconVitality from '@/components/ui/icon/icons/IconVitality.vue';
import IconWeapon from '@/components/ui/icon/icons/IconWeapon.vue';

export default defineComponent({
	components: { IconBase, IconMobility, IconVitality, IconWeapon },
	props: {
		stats: {
			required: true,
			type: Array as PropType<Array<number | null>>,
			default: [0, 0, 0],
		},
		source: {
			required: false,
			type: String as PropType<'build'>,
		},
		size: {
			required: false,
			type: String as PropType<'normal' | 'compact'>,
			default: 'normal',
		},
	},
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
