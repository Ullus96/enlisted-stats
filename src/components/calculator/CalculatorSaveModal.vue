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
						:class="{ 'btn-error': errorMsg }"
					/>
					<span
						class="modal__input-item-counter"
						:class="{ 'modal__input-item-counter--error': titleLength > 50 }"
					>
						{{ titleLength }} / 50
					</span>
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
				<div class="modal__input-item-inline" v-if="!openedInSingleBuild">
					<label for="isPublic">Видна для всех пользователей:</label>
					<input type="checkbox" v-model="isPublic" id="isPublic" />
				</div>
				<div class="modal__input-item-inline" v-else>
					<template v-if="item?.data.author == user?.uid">
						<label for="isPublic">Видна для всех пользователей:</label>
						<input type="checkbox" v-model="isPublic" id="isPublic" />
					</template>
					<template v-else>
						<p>Сборка будет видна только Вам</p>
					</template>
				</div>
			</div>
			<p class="modal__error-msg" v-if="errorMsg">{{ errorMsg }}</p>

			<button
				class="btn btn-small btn-wide modal__btn"
				:disabled="isBtnDisabled"
				@click="saveBuild"
				v-if="!openedInSingleBuild"
			>
				Сохранить
			</button>
			<button
				class="btn btn-small btn-wide modal__btn"
				:disabled="isBtnDisabled"
				@click="modifyBuild('update')"
				v-else-if="item?.data.author == user?.uid"
			>
				Обновить
			</button>
			<button
				class="btn btn-small btn-wide modal__btn"
				:disabled="isBtnDisabled"
				@click="modifyBuild('new')"
				v-else
			>
				Сохранить для себя
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { ISkillBuild } from '@/type/SkillBuild';
import { getAuth } from 'firebase/auth';
import { ref, Ref, defineComponent, computed, PropType } from 'vue';

export default defineComponent({
	props: {
		soldierClass: {
			required: true,
			type: String,
			default: 'custom',
		},
		openedInSingleBuild: {
			required: false,
			type: Boolean,
		},
		item: {
			required: false,
			type: Object as PropType<ISkillBuild>,
		},
	},
	setup(props, context) {
		const title: Ref<string> = ref('');
		const isPublic: Ref<boolean> = ref(true);
		const keysPressedCounter: Ref<number> = ref(0);
		const user = getAuth().currentUser;

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

		function modifyBuild(saveAction: 'update' | 'new') {
			context.emit('modifyBuild', {
				saveAction,
				title: title.value,
				isPublic: isPublic.value,
			});
			closeModal();
		}

		let errorMsg = computed(() => {
			if (!title.value && keysPressedCounter.value > 0) {
				return 'Название не может быть пустым';
			}
		});

		let isBtnDisabled = computed(() => {
			if (keysPressedCounter.value == 0 || title.value.split('').length > 50) {
				return true;
			}
			return !!errorMsg.value;
		});

		let titleLength = computed(() => {
			return title.value.split('').length;
		});

		return {
			title,
			isPublic,
			errorMsg,
			isBtnDisabled,
			closeModal,
			saveBuild,
			keysPressedCounter,
			user,
			modifyBuild,
			titleLength,
		};
	},
});
</script>
