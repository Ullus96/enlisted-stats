<template>
	<aside class="aside" :class="{ visible: $store.state.isNavigationVisible }">
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
				<div class="aside__profile aside__profile--logged-in">
					<UserAvatar class="aside__avatar" />
					<div class="aside__profile-settings-link">
						<router-link
							@click="hideNavigationVisibility"
							to="/settings"
							v-ripple
						>
							<IconBase :width="20" :height="20">
								<IconCog />
							</IconBase>
						</router-link>
					</div>
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
						<button
							@click="
								hideNavigationVisibility;
								$store.state.modal.isLoginModalVisible = true;
							"
							class="btn btn-sm btn-tertiary"
							v-ripple
						>
							Войти
						</button>
					</div>
				</div>
			</template>
		</template>

		<div class="aside__line aside__line--top"></div>
		<div class="aside__main-content">
			<nav class="aside__navigation">
				<section class="aside__links">
					<router-link
						@click="hideNavigationVisibility"
						class="aside__link"
						to="/"
						v-ripple
					>
						<IconBase>
							<IconAngleDoubleUp />
						</IconBase>
						<span class="aside__link-desc">Таблица</span>
					</router-link>

					<router-link
						@click="hideNavigationVisibility"
						class="aside__link"
						to="/calculator"
						v-ripple
					>
						<IconBase>
							<IconUserCog />
						</IconBase>
						<span class="aside__link-desc">Калькулятор</span>
					</router-link>

					<router-link
						@click="hideNavigationVisibility"
						class="aside__link"
						to="/skill-builds"
						v-ripple
					>
						<IconBase>
							<IconBookOpen />
						</IconBase>
						<span class="aside__link-desc">Сборки</span>
					</router-link>

					<router-link
						@click="hideNavigationVisibility"
						class="aside__link"
						to="/events"
						v-ripple
					>
						<IconBase>
							<IconCalendar />
						</IconBase>
						<span class="aside__link-desc">События</span>
					</router-link>
				</section>

				<template v-if="$store.state.user.isLoggedIn">
					<div class="aside__line"></div>

					<section class="aside__links">
						<router-link
							@click="hideNavigationVisibility"
							class="aside__link"
							to="/my-builds"
							v-ripple
						>
							<IconBase>
								<IconHammer />
							</IconBase>
							<span class="aside__link-desc">Мои сборки</span>
						</router-link>

						<router-link
							@click="hideNavigationVisibility"
							class="aside__link"
							to="/saved-builds"
							v-ripple
						>
							<IconBase>
								<IconBookmark />
							</IconBase>
							<span class="aside__link-desc">Сохраненные</span>
						</router-link>
					</section>
				</template>

				<template v-if="$store.state.user.isAdmin">
					<div class="aside__line"></div>

					<section class="aside__links">
						<router-link
							@click="hideNavigationVisibility"
							class="aside__link"
							to="/admin"
							v-ripple
						>
							<IconBase>
								<IconCrown />
							</IconBase>
							<span class="aside__link-desc">Админка</span>
						</router-link>
					</section>
				</template>

				<div class="aside__line"></div>

				<section class="aside__links">
					<router-link
						@click="hideNavigationVisibility"
						class="aside__link"
						to="/settings"
						v-ripple
					>
						<IconBase>
							<IconCog />
						</IconBase>
						<span class="aside__link-desc">Настройки</span>
					</router-link>

					<button
						@click="showContactsModal"
						class="aside__link"
						to="/contacts"
						v-ripple
					>
						<IconBase>
							<IconDiscord />
						</IconBase>
						<span class="aside__link-desc">Связаться</span>
					</button>

					<button
						@click="handleSignOut"
						class="aside__link"
						to="/sign-out"
						v-ripple
						v-if="$store.state.user.isLoggedIn"
					>
						<IconBase>
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
					<router-link @click="hideNavigationVisibility" to="/privacy"
						>Политика конфиденциальности</router-link
					>
					|
					<router-link @click="hideNavigationVisibility" to="/user-agreement"
						>Пользовательское соглашение</router-link
					>
					|
					<router-link @click="hideNavigationVisibility" to="/licenses"
						>Лицензии инструментов</router-link
					>
				</div>
			</footer>
		</div>
	</aside>

	<div
		class="page-mask"
		v-if="$store.state.isNavigationVisible"
		@click.stop="toggleNavigationVisibility"
	></div>

	<template v-if="mounted">
		<Teleport to="#screen-bottom">
			<div class="aside__hamburger-wrapper">
				<button
					class="btn btn-secondary aside__hamburger-btn"
					tabindex="1"
					@click="toggleNavigationVisibility"
					v-ripple
				>
					<IconBase
						:width="24"
						:height="24"
						class="aside__hamburger-icon"
						:class="{ visible: !$store.state.isNavigationVisible }"
					>
						<IconHamburger />
					</IconBase>
					<IconBase
						:width="24"
						:height="24"
						class="aside__hamburger-icon"
						:class="{ visible: $store.state.isNavigationVisible }"
					>
						<IconTimes />
					</IconBase>
				</button>
			</div>
		</Teleport>
	</template>

	<LoginOrRegister v-if="$store.state.modal.isLoginModalVisible" />
	<ContactsModal v-if="$store.state.modal.isContactsModalVisible" />
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { useStore } from '@/store/useStore';
import { useRouter } from 'vue-router';
import IconBase from '@/components/ui/icon/IconBase.vue';
import IconAngleDoubleUp from '@/components/ui/icon/icons/IconAngleDoubleUp.vue';
import IconUserCog from '@/components/ui/icon/icons/IconUserCog.vue';
import IconBookOpen from '@/components/ui/icon/icons/IconBookOpen.vue';
import IconCalendar from '@/components/ui/icon/icons/IconCalendar.vue';
import IconHammer from '@/components/ui/icon/icons/IconHammer.vue';
import IconBookmark from '@/components/ui/icon/icons/IconBookmark.vue';
import IconCrown from '@/components/ui/icon/icons/IconCrown.vue';
import IconCog from '@/components/ui/icon/icons/IconCog.vue';
import IconDiscord from '@/components/ui/icon/icons/IconDiscord.vue';
import IconSignOut from '@/components/ui/icon/icons/IconSignOut.vue';
import IconHamburger from '@/components/ui/icon/icons/IconHamburger.vue';
import IconTimes from '@/components/ui/icon/icons/IconTimes.vue';
import LoginOrRegister from '@/components/auth/LoginOrRegister.vue';
import { getAuth, signOut } from 'firebase/auth';
import ContactsModal from '@/components/modals/ContactsModal.vue';
import { createPopUp } from '@/components/popup/utils';
import { POPUP_LOGOUT_SUCCESS } from '@/components/popup/data';
import UserAvatar from '@/components/shared/avatar/UserAvatar.vue';

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
		IconTimes,
		LoginOrRegister,
		ContactsModal,
		UserAvatar,
	},
	setup() {
		const store = useStore();
		const router = useRouter();

		// Fix error caused by Teleporting button mounting
		const mounted = ref(false);
		onMounted(() => {
			mounted.value = true;
		});

		function toggleNavigationVisibility() {
			store.commit('toggleNavigationVisibility');
		}

		function hideNavigationVisibility() {
			store.commit('toggleNavigationVisibility', true);
		}

		// Контакты
		function showContactsModal() {
			store.commit('toggleModalVisibility', { name: 'isContactsModalVisible' });
		}

		// Регистрация/Логин/Выход
		function handleSignOut() {
			signOut(getAuth());
			hideNavigationVisibility();
			createPopUp(store, POPUP_LOGOUT_SUCCESS);
			router.push('/');
			store.commit('clearUserData');
		}

		return {
			mounted,
			toggleNavigationVisibility,
			hideNavigationVisibility,
			showContactsModal,
			handleSignOut,
		};
	},
});
</script>
