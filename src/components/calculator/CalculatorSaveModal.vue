<template>
	<div class="page-mask">
		<div class="modal__popup modal__popup-calc">
			<button class="btn modal__close-btn" @click="closeModal">
				<i class="fa-solid fa-xmark"></i>
			</button>
			<h2>Сохранить сборку</h2>
			<div class="modal__input-block">
				<div class="modal__input-item modal__input-item-required">
					<label for="buildTitle">Название сборки</label>
					<input
						type="text"
						v-model="title"
						id="buildTitle"
						required
						:placeholder="
							soldierClass == 'custom'
								? `Оружие/отряд - название`
								: `Оружие/особенность или название`
						"
						@keypress="keysPressedCounter++"
					/>
				</div>
				<p class="modal__text-desc" v-if="soldierClass == 'custom'">
					Т.к. это акционный/премиумный отряд, для упрощения поиска, используйте
					следующую конструкцию: название оружия/отряда и краткое описание,
					например:<br />- Винтовка тип 100, японский десант - скорострельность,
					или<br />- Sten Mk II(S) инженер быстрый.
				</p>
				<p class="modal__text-desc" v-else>
					Опишите кратко эту сборку, например:<br />- Быстрый спринтер + бегун,
					или<br />- Болтовки - скорострельность.
				</p>
				<div class="modal__input-item-inline">
					<label for="isPublic">Видна для всех пользователей:</label>
					<input type="checkbox" v-model="isPublic" id="isPublic" />
				</div>
			</div>
			<p class="modal__error-msg" v-if="errorMsg">{{ errorMsg }}</p>
			<button class="btn btn-small btn-wide modal__btn" @click="saveTest">
				срака говняка
			</button>
			<button
				class="btn btn-small btn-wide modal__btn"
				:disabled="isBtnDisabled"
				@click="saveBuild"
			>
				Сохранить
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, Ref, defineComponent, computed } from 'vue';

export default defineComponent({
	props: {
		soldierClass: {
			required: true,
			type: String,
			default: 'custom',
		},
	},
	setup(props, context) {
		const title: Ref<string> = ref('');
		const isPublic: Ref<boolean> = ref(true);
		const keysPressedCounter: Ref<number> = ref(0);

		function closeModal() {
			context.emit('closeModal');
		}

		function saveBuild() {
			context.emit('saveBuild', {
				title: title.value,
				isPublic: isPublic.value,
			});
			closeModal();
		}

		function saveTest() {
			console.log(title.value);
			console.log(isPublic.value);
			console.log(isBtnDisabled.value);
			console.log(keysPressedCounter.value);
		}

		let errorMsg = computed(() => {
			if (!title.value && keysPressedCounter.value > 0) {
				return 'Название не может быть пустым';
			}
		});

		let isBtnDisabled = computed(() => {
			if (keysPressedCounter.value == 0) {
				return true;
			}
			return !!errorMsg.value;
		});

		return {
			title,
			isPublic,
			errorMsg,
			isBtnDisabled,
			closeModal,
			saveBuild,
			keysPressedCounter,
			saveTest,
		};
	},
});
</script>
