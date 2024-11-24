<template>
	<ModalComponent :modalName="'isContactsModalVisible'">
		<template #title>Связаться с автором сайта</template>

		<template #body>
			<p class="modal__desc">
				Если есть какие-то вопросы, или если тобой были замечены какие-то
				несостыковки в цифрах:
			</p>
			<div class="modal__contacts">
				<p class="modal__contact">
					<IconBase :width="24" :height="24">
						<IconDiscord />
					</IconBase>
					<span>@ullus77</span>
				</p>

				<p class="modal__contact modal__link">
					<IconBase :width="24" :height="24">
						<IconLetter />
					</IconBase>
					<a href="https://forum.enlisted.net/ru/u/Ullus/" target="_blank"
						>forum.enlisted.net/ru/u/Ullus/</a
					>
				</p>
			</div>

			<p class="modal__desc">
				Дискорд предпочтительнее, т.к. форум посещаю редко.
			</p>
		</template>
	</ModalComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ModalComponent from '@/components/ui/ModalComponent.vue';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconDiscord from '@/components/ui/icons/IconDiscord.vue';
import IconLetter from '@/components/ui/icons/IconLetter.vue';

export default defineComponent({
	components: {
		ModalComponent,
		IconBase,
		IconDiscord,
		IconLetter,
	},
	setup() {
		return {};
	},
});
</script>
