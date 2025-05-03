<template>
	<div class="container container-sm legal">
		<h1 class="mt-l">Лицензии инструментов</h1>
		<p v-if="isLoading">Загрузка лицензий...</p>
		<p v-else-if="error">Не удалось загрузить лицензии</p>
		<section v-else-if="filteredLicenses.length > 0">
			<ul>
				<li v-for="{ pkg, name } in filteredLicenses" :key="name">
					<strong>{{ name }}</strong
					>: {{ pkg.licenses }} (
					<a :href="pkg.repository" target="_blank" class="link">Repository</a>)
				</li>
			</ul>
		</section>
		<p v-else>Лицензии отсутствуют</p>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';

export default defineComponent({
	setup() {
		interface ILicense {
			licenses: string;
			publisher?: string;
			repository: string;
			url?: string;
		}

		type Licenses = Record<string, ILicense>;

		const licenses: Ref<Licenses> = ref({});
		const isLoading: Ref<boolean> = ref(true);
		const error: Ref<boolean> = ref(false);

		onMounted(async () => {
			try {
				const response = await fetch('/licenses.json');
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				licenses.value = (await response.json()) as Licenses;
			} catch (err) {
				console.error('Не удалось загрузить лицензии: ', err);
				error.value = true;
			} finally {
				isLoading.value = false;
			}
		});

		const filteredLicenses = computed(() => {
			return Object.entries(licenses.value)
				.filter(([_, pkg]) => pkg.licenses && pkg.repository)
				.map(([name, pkg]) => ({ name, pkg }));
		});

		return { licenses, isLoading, error, filteredLicenses };
	},
});
</script>

<style scoped>
ul {
	list-style: disc;
	padding: 0;
}
li {
	list-style: disc;
	margin: 1.2rem 0;
}
</style>
