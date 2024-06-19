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
				<ul class="aside__links">
					<li class="aside__link">1</li>
					<li class="aside__link">2</li>
					<li class="aside__link">3</li>
					<li class="aside__link">3</li>
				</ul>
				<div class="aside__line"></div>
				<ul class="aside__links">
					<li class="aside__link">1</li>
					<li class="aside__link">1</li>
				</ul>
				<div class="aside__line"></div>
				<ul class="aside__links">
					<li class="aside__link">1</li>
				</ul>
				<div class="aside__line"></div>
				<ul class="aside__links">
					<li class="aside__link">1</li>
					<li class="aside__link">1</li>
					<li class="aside__link">1</li>
				</ul>
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

export default defineComponent({
	setup() {},
});
</script>
