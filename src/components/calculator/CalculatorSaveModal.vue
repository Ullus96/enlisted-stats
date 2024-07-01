<template>
	<ModalComponent :modalName="'isBuildSaveModalVisible'">
		<h3>Сохранить сборку</h3>

		<div class="modal__body">
			<InputComponent
				:label="'Название сборки'"
				:placeholder="
					soldierClass == 'custom' ? `Отряд и особенность` : `Особенность`
				"
				:counter="50"
				:required="true"
				@hasErrors="
					(val) => {
						isBtnDisabled = val;
					}
				"
				@onChange="
					(val) => {
						title = val;
					}
				"
			/>
			<p class="modal__desc" v-if="soldierClass == 'custom'">
				Т.к. это акционный/премиумный отряд, для упрощения поиска, используйте
				следующую конструкцию: название оружия/отряда и краткое описание,
				например:<br />- Винтовка тип 100, японский десант - скорострельность,
				или<br />- Sten Mk II(S) инженер быстрый.
			</p>
			<p class="modal__desc" v-else>
				Опишите кратко эту сборку, например:<br />- Быстрый спринтер + бегун,
				или<br />- Болтовки - скорострельность.
			</p>

			<div class="checkbox-wrapper-2" v-if="!openedInSingleBuild">
				<label for="isPublic" class="modal__input-checkbox"
					>Видна для всех пользователей:
					<input type="checkbox" v-model="isPublic" class="sc-gJwTLC ikxBAC" />
				</label>
			</div>
			<div class="checkbox-wrapper-2" v-else>
				<template v-if="item?.data.author == user?.uid">
					<label for="isPublic" class="modal__input-checkbox"
						>Видна для всех пользователей:
						<input
							type="checkbox"
							v-model="isPublic"
							class="sc-gJwTLC ikxBAC"
						/>
					</label>
				</template>
				<template v-else>
					<p class="modal__input-checkbox">Сборка будет видна только Вам</p>
				</template>
			</div>
		</div>

		<button
			class="btn btn-m btn-primary modal__confirm"
			:disabled="isBtnDisabled"
			@click="saveBuild"
			v-if="!openedInSingleBuild"
		>
			Сохранить
		</button>
		<button
			class="btn btn-m btn-primary modal__confirm"
			:disabled="isBtnDisabled"
			@click="modifyBuild('update')"
			v-else-if="item?.data.author == user?.uid"
		>
			Обновить
		</button>
		<button
			class="btn btn-m btn-primary modal__confirm"
			:disabled="isBtnDisabled"
			@click="modifyBuild('new')"
			v-else
		>
			Сохранить для себя
		</button>
	</ModalComponent>
</template>

<script lang="ts">
import { ISkillBuild } from '@/type/SkillBuild';
import { getAuth } from 'firebase/auth';
import { ref, Ref, defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import ModalComponent from '@/components/ui/ModalComponent.vue';
import InputComponent from '@/components/ui/InputComponent.vue';
import { createPopUp } from '../popup/utils';
import { POPUP_BUILD_CREATED, POPUP_BUILD_MODIFIED } from '../popup/data';

export default defineComponent({
	components: { ModalComponent, InputComponent },
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
		const store = useStore();

		function closeModal() {
			store.commit('toggleModalVisibility', {
				name: 'isBuildSaveModalVisible',
				forceClose: true,
			});
		}

		function saveBuild() {
			context.emit('saveBuild', {
				title: title.value,
				isPublic: isPublic.value,
			});
			createPopUp(store, POPUP_BUILD_CREATED);
			closeModal();
		}

		function modifyBuild(saveAction: 'update' | 'new') {
			context.emit('modifyBuild', {
				saveAction,
				title: title.value,
				isPublic: isPublic.value,
			});
			createPopUp(store, POPUP_BUILD_MODIFIED);
			closeModal();
		}

		let isBtnDisabled: Ref<boolean> = ref(false);

		return {
			title,
			isPublic,
			isBtnDisabled,
			closeModal,
			saveBuild,
			keysPressedCounter,
			user,
			modifyBuild,
		};
	},
});
</script>
