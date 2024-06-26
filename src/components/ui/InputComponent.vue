<template>
	<div class="input__wrapper">
		<label class="input__label"
			>{{ label }}
			<div class="input__content">
				<div class="input__main-content">
					<input class="input__input" type="text" :placeholder="placeholder" />

					<div class="input__sub-text">
						<!-- Тут сделать что v-if="errorMsg" -->
						<span class="input__error"></span>
						<span class="input__desc" v-if="desc"> {{ desc }} </span>
						<span class="input__desc" v-if="counter">
							{{ 0 }} / {{ counter }}
						</span>
					</div>
				</div>

				<button class="btn btn-secondary btn-m input__btn" v-if="inlineButton">
					<IconBase>
						<IconCheck />
					</IconBase>
				</button>
			</div>
		</label>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconCheck from '@/components/ui/icons/IconCheck.vue';

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
	},
	components: { IconBase, IconCheck },
	setup() {},
});
</script>
