<template>
	<div
		class="event__card inline-rewards"
		:class="{
			'event__card--active': isActive,
			skipped: isSkipped,
			animated: allowAnimation,
		}"
		@click="handleClick"
	>
		<label
			for="markAsPassed"
			class="event__checkbox btn btn-sm btn-secondary"
			:style="{
				display: !isSkipped ? 'flex' : 'none',
			}"
			@click.stop="handleStageCompletion"
		>
			<input type="checkbox" name="markAsPassed" />
			<IconBase>
				<IconCheck />
			</IconBase>
		</label>
		<PassFailStamp v-if="stampText" :text="stampText" />
		<p class="event__counter">#{{ stageIndex + 1 }}</p>
		<p class="event__date">{{ day }}</p>
		<p class="event__month">{{ month }}</p>
		<p class="event__time">{{ hours }}:00</p>
		<div class="event__mobile-reward-block">
			<p v-for="item in separateLineBySemicolon(reward)" :key="item">
				{{ item ? item : '—' }}
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import { IStage } from '@/type/Events';
import { computed, defineComponent, PropType, ref, Ref } from 'vue';
import { separateLineBySemicolon } from '@/functions/separateLineBySemicolon';
import PassFailStamp from './PassFailStamp.vue';
import IconBase from '../ui/icon/IconBase.vue';
import IconCheck from '../ui/icon/icons/IconCheck.vue';

export default defineComponent({
	components: { PassFailStamp, IconBase, IconCheck },
	props: {
		cardData: { required: true, type: Object as PropType<IStage> },
		stageIndex: { required: true, type: Number },
		reward: { required: false, type: String, default: '—' },
		isActive: { required: true, type: Boolean },
		isSkipped: { required: true, type: Boolean },
		isPassed: { required: false, type: Boolean, default: false },
	},
	setup(props, context) {
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			timeZoneName: 'short',
		};

		// не локальное время
		// const day = props.date.getDate(); // Получаем число
		// const month = props.date.getMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
		// const hours = props.date.getHours(); // Получаем часы

		const localDateTime = props.cardData.startDate.toLocaleString(
			'ru-RU',
			options
		);
		const parts = localDateTime.split(',');

		const day = parts[1].split(' ')[1];
		const month = parts[1].split(' ')[2];
		const hours = parts[1].split(' ')[6].split(':')[0];

		let allowAnimation: Ref<Boolean> = ref(false);
		setTimeout(() => {
			allowAnimation.value = true;
		}, 200);

		const stampText = computed(() => {
			if (props.isSkipped) {
				return 'fail';
			} else if (props.isPassed) {
				return 'pass';
			}
		});

		function handleClick() {
			context.emit('skip-stage', props.stageIndex);
		}

		function handleStageCompletion() {}

		return {
			day,
			month,
			hours,
			separateLineBySemicolon,
			allowAnimation,
			stampText,
			handleClick,
			handleStageCompletion,
		};
	},
});
</script>
