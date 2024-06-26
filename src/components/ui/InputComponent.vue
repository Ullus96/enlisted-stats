<template>
	<div class="input__wrapper">
		<label class="input__label"
			>Лейбл
			<div class="input__content">
				<div class="input__main-content">
					<input
						class="input__input"
						type="text"
						name=""
						placeholder="плейсхолдер"
					/>

					<div class="input__sub-text">
						<span class="input__error">Должен быть уникальным</span>
						<span class="input__desc">Время по местному</span>
					</div>
				</div>

				<button class="btn btn-secondary btn-m input__btn">
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
	components: { IconBase, IconCheck },
	setup() {},
});
</script>
