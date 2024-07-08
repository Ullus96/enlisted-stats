<template>
	<label class="input__label"
		>{{ label }}
		<div class="input__content">
			<div class="input__main-content">
				<input
					class="input__input"
					:class="{ error: errorMsg }"
					:type="type"
					:placeholder="placeholder"
					:required="required"
					v-model="inputValue"
				/>

				<div class="input__sub-text">
					<span class="input__error"> {{ errorMsg }} </span>
					<span class="input__desc" v-if="desc"> {{ desc }} </span>
					<span class="input__desc" v-if="counter">
						{{ currentCounter }} / {{ counter }}
					</span>
				</div>
			</div>

			<button
				class="btn btn-secondary btn-m input__btn"
				v-if="inlineButton"
				:disabled="errorMsg || isEmpty || outOfCharacters"
				@click="handleClick"
			>
				<IconBase>
					<IconCheck />
				</IconBase>
			</button>
		</div>
	</label>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, watch } from 'vue';
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
			type: [String, Number, Date],
		},
		desc: {
			required: false,
			type: [String, Number, Date],
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
		required: {
			required: false,
			type: Boolean,
			default: false,
		},
		presetInput: {
			required: false,
			type: [String, Number, Date],
		},
	},
	components: { IconBase, IconCheck },
	emits: ['onChange', 'onConfirm', 'hasErrors'],
	setup(props, context) {
		const inputValue = ref();
		const errorMsg: Ref<string | null> = ref(null);
		const keysPressedCounter: Ref<number> = ref(0);
		const isAfterReset: Ref<boolean> = ref(false);

		if (props.presetInput) {
			inputValue.value = props.presetInput;
			context.emit('onChange', inputValue.value);
		}

		watch(inputValue, (newValue) => {
			if (isAfterReset.value) {
				isAfterReset.value = false;
				return;
			}

			keysPressedCounter.value++;
			let hasForbiddenWords = false;

			// Тут проверку на валидность
			errorMsg.value = null;

			if (props.type === 'text' || props.type === 'number') {
				hasForbiddenWords = containsBlacklistedWords(newValue);
			}

			if (hasForbiddenWords) {
				errorMsg.value = 'Замени запрещенные символы';
			}

			if (keysPressedCounter.value > 0 && isEmpty.value) {
				errorMsg.value = 'Не может быть пустым';
			}

			if (outOfCharacters.value) {
				errorMsg.value = 'Превышен лимит символов';
			}

			// Тут эмиты
			context.emit('hasErrors', !!errorMsg.value);
			if (errorMsg.value) return;

			context.emit('onChange', newValue);
		});

		function containsBlacklistedWords(phrase: string | number) {
			const lowerCaseInput = String(phrase).toLowerCase();

			return blacklistedWords.some((banWord) =>
				lowerCaseInput.includes(banWord.toLowerCase())
			);
		}

		const isEmpty = computed(() => {
			return !inputValue.value || !keysPressedCounter.value;
		});

		// Counter
		const currentCounter = computed(() => {
			if (!inputValue.value) return 0;
			return inputValue.value.length;
		});

		const outOfCharacters = computed(() => {
			if (!props.counter) return false;

			return currentCounter.value > props.counter;
		});

		// Handle click
		function handleClick() {
			resetInput();
			context.emit('onConfirm');
		}

		function resetInput() {
			inputValue.value = null;
			keysPressedCounter.value = 0;
			errorMsg.value = null;
			isAfterReset.value = true;
		}

		return {
			inputValue,
			errorMsg,
			currentCounter,
			keysPressedCounter,
			isEmpty,
			outOfCharacters,
			handleClick,
		};
	},
});
</script>
