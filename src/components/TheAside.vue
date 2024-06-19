<template>
	<aside class="aside">
		<img
			src="https://i.imgur.com/T39kQkM.jpeg"
			alt="Profile Picture"
			class="aside__avatar"
		/>
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

					<router-link class="aside__link" to="/">
						<IconBase :iconName="'Calculator'">
							<IconUserCog />
						</IconBase>
						<span class="aside__link-desc">Калькулятор</span>
					</router-link>

					<router-link class="aside__link" to="/">
						<IconBase :iconName="'Skill Builds'">
							<IconBookOpen />
						</IconBase>
						<span class="aside__link-desc">Сборки</span>
					</router-link>

					<router-link class="aside__link" to="/">
						<IconBase :iconName="'Events Calendar'">
							<IconCalendar />
						</IconBase>
						<span class="aside__link-desc">Календарь событий</span>
					</router-link>
				</section>

				<div class="aside__line"></div>

				<section class="aside__links">
					<router-link class="aside__link" to="/">
						<IconBase :iconName="'My Builds'">
							<IconHammer />
						</IconBase>
						<span class="aside__link-desc">Мои сборки</span>
					</router-link>

					<router-link class="aside__link" to="/">
						<IconBase :iconName="'Saved Builds'">
							<IconBookmark />
						</IconBase>
						<span class="aside__link-desc">Сохраненные</span>
					</router-link>
				</section>

				<div class="aside__line"></div>

				<section class="aside__links">
					<router-link class="aside__link" to="/">
						<IconBase :iconName="'Admin Panel'">
							<IconCrown />
						</IconBase>
						<span class="aside__link-desc">Админка</span>
					</router-link>
				</section>

				<div class="aside__line"></div>

				<section class="aside__links">
					<router-link class="aside__link" to="/">
						<IconBase :iconName="'Settings'">
							<IconCog />
						</IconBase>
						<span class="aside__link-desc">Настройки</span>
					</router-link>

					<button class="aside__link" to="/">
						<IconBase :iconName="'Discord'">
							<IconDiscord />
						</IconBase>
						<span class="aside__link-desc">Контакты</span>
					</button>

					<button class="aside__link" to="/">
						<IconBase :iconName="'Skill Builds'">
							<IconSignOut />
						</IconBase>
						<span class="aside__link-desc">Выйти</span>
					</button>
				</section>
			</nav>

			<footer class="aside__footer">
				<div class="aside__footer-legal">
					<p>1</p>
					<p>2</p>
				</div>
				<div class="aside__footer-links">1 | 2</div>
			</footer>
		</div>
	</aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
	setup() {},
});
</script>
