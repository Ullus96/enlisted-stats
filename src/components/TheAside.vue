<template>
	<aside class="aside" :class="{ visible: isNavigationVisible }">
		<!-- User not loaded yet -->
		<template v-if="!$store.state.loading.isAuthInitialized">
			<div class="aside__profile">
				<img
					src="@/assets/avatar-skeleton.svg"
					alt="Profile Picture Skeleton"
					class="aside__avatar"
				/>
				<div class="aside__nickname"> </div>
			</div>
		</template>
		<!-- Else have a data about user is logged in or not -->
		<template v-else>
			<!-- User is logged in -->
			<template v-if="$store.state.user.isLoggedIn">
				<div class="aside__profile">
					<img
						:src="$store.state.user.photoUrl"
						alt="Profile Picture"
						class="aside__avatar"
					/>
					<div class="aside__nickname">{{ $store.state.user.displayName }}</div>
				</div>
			</template>
			<!-- User is NOT logged in -->
			<template v-else>
				<div class="aside__profile">
					<img
						src="@/assets/avatar-unknown.svg"
						alt="No User Generic Profile Picture"
						class="aside__avatar"
					/>
					<div class="aside__nickname">
						<button class="btn btn-sm btn-tertiary">Войти</button>
					</div>
				</div>
			</template>
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

				<template v-if="$store.state.user.isLoggedIn">
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
				</template>

				<template v-if="$store.state.user.isAdmin">
					<div class="aside__line"></div>

					<section class="aside__links">
						<router-link class="aside__link" to="/admin">
							<IconBase :iconName="'Admin Panel'">
								<IconCrown />
							</IconBase>
							<span class="aside__link-desc">Админка</span>
						</router-link>
					</section>
				</template>

				<div class="aside__line"></div>

				<section class="aside__links">
					<router-link
						class="aside__link"
						to="/profile"
						v-if="$store.state.user.isLoggedIn"
					>
						<IconBase :iconName="'Settings'">
							<IconCog />
						</IconBase>
						<span class="aside__link-desc">Настройки</span>
					</router-link>

					<button class="aside__link" to="/contacts">
						<IconBase :iconName="'Discord'">
							<IconDiscord />
						</IconBase>
						<span class="aside__link-desc">Связаться</span>
					</button>

					<button
						class="aside__link"
						to="/sign-out"
						v-if="$store.state.user.isLoggedIn"
					>
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

	<div class="page-mask" v-if="isNavigationVisible"></div>

	<template v-if="mounted">
		<Teleport to="#page">
			<div class="aside__hamburger-wrapper">
				<button
					class="btn btn-secondary aside__hamburger-btn"
					tabindex="1"
					@click="toggleNavigationVisibility"
				>
					<IconBase :iconName="'Mobile Navigation'" :width="24" :height="24">
						<IconHamburger />
					</IconBase>
				</button>
			</div>
		</Teleport>
	</template>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
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
import IconHamburger from '@/components/ui/icons/IconHamburger.vue';

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
		IconHamburger,
	},
	setup() {
		const store = useStore();

		// Fix error caused by Teleporting button mounting
		const mounted = ref(false);
		onMounted(() => {
			mounted.value = true;
		});

		const isNavigationVisible: Ref<boolean> = ref(false);
		function toggleNavigationVisibility() {
			isNavigationVisible.value = !isNavigationVisible.value;
		}

		return { mounted, isNavigationVisible, toggleNavigationVisibility };
	},
});
</script>
