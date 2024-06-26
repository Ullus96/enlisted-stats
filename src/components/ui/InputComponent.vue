<template>
	<label class="input__label"
		>{{ label }}
		<div class="input__content">
			<div class="input__main-content">
				<input
					class="input__input"
					:type="type"
					:placeholder="placeholder"
					v-model="inputValue"
				/>

				<div class="input__sub-text">
					<span class="input__error"> {{ errorMsg }} </span>
					<span class="input__desc" v-if="desc"> {{ desc }} </span>
					<span class="input__desc" v-if="counter">
						{{ 0 }} / {{ counter }}
					</span>
				</div>
			</div>

			<button
				class="btn btn-secondary btn-m input__btn"
				v-if="inlineButton"
				:disabled="errorMsg"
			>
				<IconBase>
					<IconCheck />
				</IconBase>
			</button>
		</div>
	</label>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, watch } from 'vue';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconCheck from '@/components/ui/icons/IconCheck.vue';
import { blacklistedWords } from '@/data/bannedSymbols';

export default defineComponent({
	props: {
		label: {
			required: false,
			type: String,
		},
		placeholder: {
			required: false,
			type: [String, Number],
		},
		desc: {
			required: false,
			type: [String, Number],
		},
		counter: {
			required: false,
			type: Number,
		},
		inlineButton: {
			required: false,
			type: Boolean,
		},
		type: {
			required: false,
			type: String as PropType<'text' | 'number' | 'datetime-local'>,
			default: 'text',
		},
	},
	components: { IconBase, IconCheck },
	emits: ['onChange'],
	setup(props, context) {
		const inputValue = ref();
		const errorMsg: Ref<string | null> = ref(null);

		watch(inputValue, (newValue) => {
			let hasForbiddenWords = false;
			// Тут проверку на валидность
			if (props.type === 'text' || props.type === 'number') {
				hasForbiddenWords = containsBlacklistedWords(newValue);
			}

			if (hasForbiddenWords) {
				errorMsg.value = 'Замени запрещенные символы';
			} else {
				errorMsg.value = null;
			}
			// Тут эмиты
			context.emit('onChange', newValue);
		});

		function containsBlacklistedWords(phrase: string | number) {
			const lowerCaseInput = String(phrase).toLowerCase();

			return blacklistedWords.some((banWord) =>
				lowerCaseInput.includes(banWord.toLowerCase())
			);
		}

		return {
			inputValue,
			errorMsg,
		};
	},
});
</script>
