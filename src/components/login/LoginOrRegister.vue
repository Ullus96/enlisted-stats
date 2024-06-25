<template>
	<Teleport to="#visible-screen-40">
		<div class="page-mask page-mask--above" @click.stop="forceClose"></div>
		<section class="modal">
			<button class="btn btn-tertiary btn-sm modal__btn">
				<IconBase :iconName="'Close modal window'">
					<IconTimes />
				</IconBase>
			</button>
			<h3 class="modal__title">Войти или зарегистрироваться</h3>
			<!-- google btn -->
			<div class="modal__google-btn">Кнопка</div>
			<p class="modal__legal">
				Регистрируясь на сайте, Вы соглашаетесь с
				<router-link to="/user-agreement" class="modal__link"
					>пользовательским соглашением</router-link
				>
				и
				<router-link to="/privacy" class="modal__link"
					>политикой обработки персональных данных</router-link
				>.
			</p>
		</section>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconTimes from '@/components/ui/icons/IconTimes.vue';

export default defineComponent({
	components: { IconBase, IconTimes },
	setup() {
		const store = useStore();

		function forceClose() {
			store.commit('toggleLoginModalVisibility', true);
		}

		return {
			forceClose,
		};
	},
});
</script>
