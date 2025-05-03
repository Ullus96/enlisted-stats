<template>
	<div class="container container-sm legal">
		<h1 class="mt-l">Лицензии инструментов</h1>
		<section v-if="licenses">
			<ul>
				<li v-for="(pkg, name) in licenses" :key="name">
					<strong>{{ name }}</strong
					>: {{ pkg.licenses }} (
					<a :href="pkg.repository" target="_blank" class="link">Repository</a>)
				</li>
			</ul>
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';

export default defineComponent({
	setup() {
		interface ILicense {
			licenses: string;
			publisher: string;
			repository: string;
			url?: string;
		}

		type Licenses = Record<string, ILicense>;

		let licenses: Ref<{} | Licenses> = ref({});

		onMounted(async () => {
			try {
				const response = await fetch('/licenses.json');
				licenses.value = (await response.json()) as Licenses;
				console.log(licenses.value);
			} catch (error) {
				console.error('Не удалось загрузить лицензии: ', error);
			}
		});

		return { licenses };
	},
});
</script>
