<template>
	<div class="container">
		<work-in-progress></work-in-progress>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getAuth } from 'firebase/auth';
import WorkInProgress from '@/components/no-page/WorkInProgress.vue';

export default defineComponent({
	components: { WorkInProgress },
	setup() {},
});
</script>
