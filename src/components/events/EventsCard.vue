<template>
	<div
		class="event__card"
		:class="{
			'event__card--active': isActive,
			skipped: isSkipped,
			'inline-rewards': $store.state.settings.inlineRewards,
		}"
		@click="handleClick"
	>
		<TooltipComponent
			:direction="'top'"
			:width="20"
			v-if="!$store.state.settings.inlineRewards"
		>
			<p>Награда:</p>
			<p v-for="item in separateLineBySemicolon(reward)" :key="item">
				{{ item ? item : '—' }}
			</p>
		</TooltipComponent>
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
import { defineComponent, PropType, ref, Ref } from 'vue';
import TooltipComponent from '@/components/ui/TooltipComponent.vue';
import { separateLineBySemicolon } from '@/functions/separateLineBySemicolon';

export default defineComponent({
	components: { TooltipComponent },
	props: {
		cardData: { required: true, type: Object as PropType<IStage> },
		stageIndex: { required: true, type: Number },
		reward: { required: false, type: String, default: '—' },
		isActive: { required: true, type: Boolean },
		isSkipped: { required: true, type: Boolean },
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

		function handleClick() {
			context.emit('skip-stage', props.stageIndex);
		}

		return {
			day,
			month,
			hours,
			handleClick,
			separateLineBySemicolon,
		};
	},
});
</script>
