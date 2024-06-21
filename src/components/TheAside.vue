<template>
	<aside class="aside">
		<!-- User is logged in -->
		<template v-if="$store.state.user.isLoggedIn">
			<div class="aside__profile">
				<img
					src="https://i.imgur.com/T39kQkM.jpeg"
					alt="Profile Picture"
					class="aside__avatar"
				/>
				<div class="aside__nickname">zxcvenorez but with 2 lines</div>
			</div>
		</template>
		<!-- User is NOT logged in -->
		<template v-else>
			<div class="aside__profile">
				<img
					src="https://i.imgur.com/T39kQkM.jpeg"
					alt="Profile Picture"
					class="aside__avatar"
				/>
				<div class="aside__nickname">
					<button class="btn btn-sm btn-tertiary">Войти</button>
				</div>
			</div>
		</template>

		<div class="aside__line aside__line--top"></div>
		<div class="aside__main-content">
			<nav class="aside__navigation">
				<section class="aside__links">
					<router-link class="aside__link" to="/">
						<IconBase :iconName="'Table'">
							<IconAngleDoubleUp />
						</IconBase>
						<span class="aside__link-desc">Таблица</span>
					</router-link>

					<router-link class="aside__link" to="/calculator">
						<IconBase :iconName="'Calculator'">
							<IconUserCog />
						</IconBase>
						<span class="aside__link-desc">Калькулятор</span>
					</router-link>

					<router-link class="aside__link" to="/skill-builds">
						<IconBase :iconName="'Skill Builds'">
							<IconBookOpen />
						</IconBase>
						<span class="aside__link-desc">Сборки</span>
					</router-link>

					<router-link class="aside__link" to="/events">
						<IconBase :iconName="'Events Calendar'">
							<IconCalendar />
						</IconBase>
						<span class="aside__link-desc">События</span>
					</router-link>
				</section>

				<div class="aside__line"></div>

				<section class="aside__links">
					<router-link class="aside__link" to="/my-builds">
						<IconBase :iconName="'My Builds'">
							<IconHammer />
						</IconBase>
						<span class="aside__link-desc">Мои сборки</span>
					</router-link>

					<router-link class="aside__link" to="/saved-builds">
						<IconBase :iconName="'Saved Builds'">
							<IconBookmark />
						</IconBase>
						<span class="aside__link-desc">Сохраненные</span>
					</router-link>
				</section>

				<div class="aside__line"></div>

				<section class="aside__links">
					<router-link class="aside__link" to="/admin">
						<IconBase :iconName="'Admin Panel'">
							<IconCrown />
						</IconBase>
						<span class="aside__link-desc">Админка</span>
					</router-link>
				</section>

				<div class="aside__line"></div>

				<section class="aside__links">
					<router-link class="aside__link" to="/profile">
						<IconBase :iconName="'Settings'">
							<IconCog />
						</IconBase>
						<span class="aside__link-desc">Настройки</span>
					</router-link>

					<button class="aside__link" to="/contacts">
						<IconBase :iconName="'Discord'">
							<IconDiscord />
						</IconBase>
						<span class="aside__link-desc">Контакты</span>
					</button>

					<button class="aside__link" to="/sign-out">
						<IconBase :iconName="'Skill Builds'">
							<IconSignOut />
						</IconBase>
						<span class="aside__link-desc">Выйти</span>
					</button>
				</section>
			</nav>

			<footer class="aside__footer">
				<div class="aside__footer-legal">
					<p>Enlisted — зарегистрированная товарная марка Gaijin Games Kft.</p>
					<p>
						Этот сайт не аффилирован с Gaijin Games Kft. Все игровые изображения
						и имена являются собственностью Gaijin Games Kft.
					</p>
				</div>
				<div class="aside__footer-links">
					<router-link to="/">Политика конфиденциальности</router-link> |
					<router-link to="/">Пользовательское соглашение</router-link>
				</div>
			</footer>
		</div>
	</aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import IconBase from '@/components/ui/icons/IconBase.vue';
import IconAngleDoubleUp from '@/components/ui/icons/IconAngleDoubleUp.vue';
import IconUserCog from '@/components/ui/icons/IconUserCog.vue';
import IconBookOpen from '@/components/ui/icons/IconBookOpen.vue';
import IconCalendar from '@/components/ui/icons/IconCalendar.vue';
import IconHammer from '@/components/ui/icons/IconHammer.vue';
import IconBookmark from '@/components/ui/icons/IconBookmark.vue';
import IconCrown from '@/components/ui/icons/IconCrown.vue';
import IconCog from '@/components/ui/icons/IconCog.vue';
import IconDiscord from '@/components/ui/icons/IconDiscord.vue';
import IconSignOut from '@/components/ui/icons/IconSignOut.vue';

export default defineComponent({
	components: {
		IconBase,
		IconAngleDoubleUp,
		IconUserCog,
		IconBookOpen,
		IconCalendar,
		IconHammer,
		IconBookmark,
		IconCrown,
		IconCog,
		IconDiscord,
		IconSignOut,
	},
	setup() {
		const store = useStore();
		console.log(store);
	},
});
</script>
