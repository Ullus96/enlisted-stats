<template>
	<footer class="footer">
		<div class="container footer__container">
			<div class="footer__block">
				<div class="footer__col">
					<!-- <p>&nbsp;</p> -->
					<img src="@/assets/cursed-cat.gif" alt="" class="footer__gif" />
				</div>
				<div class="footer__col">
					<p class="footer__how-to-contact">
						Если вы заметили какие-то несостыковки в цифрах, или что-то в таком
						роде, можете связаться со мной:
					</p>
					<div class="footer__links-block">
						<div class="footer__link-w-tooltip">
							<p class="footer__link">
								<i class="fa-brands fa-discord"></i> Discord
							</p>
							<div class="footer__link-tooltip">ullus77</div>
						</div>
					</div>
				</div>
			</div>
			<p class="footer__legal">
				Enlisted — зарегистрированная товарная марка Gaijin Games Kft. Этот сайт
				не аффилирован с Gaijin Games Kft. Все игровые изображения и имена
				являются собственностью Gaijin Games Kft.
			</p>
		</div>
	</footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	components: {},
	setup() {
		return {};
	},
});
</script>
