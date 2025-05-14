<template>
	<div class="build__class">
		<!-- if soldier has a preset class -->
		<template v-if="soldierClass !== 'custom'">
			<img
				:src="
					require('@/assets/soldier_icons/' +
						getSoldierData('id', soldierClass, 'icon'))
				"
				alt=""
				class="build__class-icon"
			/>
			<p>
				{{ getSoldierData('id', soldierClass, 'name') }}
			</p>
		</template>

		<!-- else show his tags -->
		<template v-else>
			<img
				:src="require('@/assets/soldier_icons/tags.svg')"
				alt=""
				class="build__class-icon"
			/>
			<p>
				<span v-for="(tag, idx) in tags" :key="tag"
					>{{ convertSkillTagToName(tag)
					}}{{ idx + 1 < tags.length ? ', ' : '' }}</span
				>
			</p>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
	convertSkillTagToName,
	getSoldierData,
} from '@/functions/convertSoldierDataToName';
import { SoldierID } from '@/type/Soldier';
import { SkillTag } from '@/type/SkillTag';

export default defineComponent({
	props: {
		soldierClass: {
			required: true,
			type: String as PropType<SoldierID>,
		},
		tags: {
			required: false,
			type: Array as PropType<SkillTag[]>,
			default: [],
		},
	},
	setup() {
		return { convertSkillTagToName, getSoldierData };
	},
});
</script>

<style scoped></style>
