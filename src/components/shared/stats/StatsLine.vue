<template>
	<div class="build__stats">
		<span class="build__stat">
			<IconBase :iconColor="'#94FF94'" :width="14" :height="14">
				<IconMobility />
			</IconBase>
			{{ stats[0] }}
		</span>
		<span class="build__separator">-</span>
		<span class="build__stat">
			<IconBase :iconColor="'#FF9494'" :width="14" :height="14">
				<IconMobility />
			</IconBase>
			{{ stats[1] }}
		</span>
		<span class="build__separator">-</span>
		<span class="build__stat">
			<IconBase :iconColor="'#FFFF94'" :width="14" :height="14">
				<IconMobility />
			</IconBase>
			{{ stats[2] }}
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
			type: Array as PropType<number[]>,
			default: [0, 0, 0],
		},
	},
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
