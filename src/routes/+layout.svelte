<script>
	import '../styles.css'

	let { children } = $props();
</script>

<main class="fcol fc p6 g6">
	<div class="deco">
		<svg class="tl" width="144" height="184" viewBox="0 0 144 184" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M96 184C122.51 184 144 162.51 144 136V0H120V136C120 149.255 109.255 160 96 160H0V184H96Z" fill="var(--deco)"/>
		</svg>
		<svg class="br" width="144" height="184" viewBox="0 0 144 184" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M48 0C21.4903 0 0 21.4903 0 48V184H24V48C24 34.7452 34.7452 24 48 24H144V0H48Z" fill="var(--deco)"/>
		</svg>
		<svg class="points" width="168" height="96" viewBox="0 0 168 96" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="12" cy="12" r="12" fill="var(--deco)"/>
			<circle cx="48" cy="12" r="12" fill="var(--deco)"/>
			<circle cx="84" cy="12" r="12" fill="var(--deco)"/>
			<circle cx="120" cy="12" r="12" fill="var(--deco)"/>
			<circle cx="156" cy="12" r="12" fill="var(--deco)"/>
			<circle cx="12" cy="48" r="12" fill="var(--deco)"/>
			<circle cx="48" cy="48" r="12" fill="var(--deco)"/>
			<circle cx="84" cy="48" r="12" fill="var(--deco)"/>
			<circle cx="120" cy="48" r="12" fill="var(--deco)"/>
			<circle cx="156" cy="48" r="12" fill="var(--deco)"/>
			<circle cx="12" cy="84" r="12" fill="var(--deco)"/>
			<circle cx="48" cy="84" r="12" fill="var(--deco)"/>
			<circle cx="84" cy="84" r="12" fill="var(--deco)"/>
			<circle cx="120" cy="84" r="12" fill="var(--deco)"/>
			<circle cx="156" cy="84" r="12" fill="var(--deco)"/>
		</svg>
	</div>
	{@render children()}
</main>

<style>
	main {
		position: relative;
		min-height: 100dvh;
		justify-content: center;
		gap: 48px;
	}
	.deco {
		position: absolute;
		inset: 0;
		z-index: -1;
	}
	.deco > * {
		position: absolute;
	}
	.tl {
		top: 0;
		left: 0;
	}
	.br {
		bottom: 0;
		right: 0;
	}
	.points {
		right: 24px;
		top: 15%;
	}
</style>