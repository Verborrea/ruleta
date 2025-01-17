<script lang="ts">
	import { onMount } from "svelte";
	import { premios } from "./options";

	let ruleta = $state();

	let { girar, index } = $props();

	const colores = ['var(--red)', 'var(--ora)', 'var(--yel)', 'var(--gre)', 'var(--cya)', 'var(--blu)', 'var(--vio)', 'var(--pin)'];
	const numPremios = premios.length;
	const anguloSegmento = 360 / numPremios;

	onMount(() => {
		premios.forEach((premio, i) => {
			const segmento = document.createElement('div'); // segmento is an HTMLDivElement
			segmento.classList.add('segmento');
			segmento.style.backgroundColor = colores[i % colores.length];
			segmento.style.setProperty("--segment", `${anguloSegmento * i}deg`);
			segmento.style.zIndex = (numPremios - i).toString();

			segmento.innerHTML = premio.icon; // No need to cast

			(ruleta as HTMLElement).appendChild(segmento);
		});
	})
</script>

<div class="ruleta" class:girar id="ruleta" bind:this={ruleta} style="--numo: {`${180 / numPremios}deg`}; --index: {index}">
	<div class="center">GAUDí</div>
</div>

<style>
	.ruleta, .center {
		box-shadow: 0 4px 20px #1C1D2040;
	}
	.ruleta {
		width: calc(100vw - 48px);
		height: calc(100vw - 48px);
		border-radius: 50%;
		border: 6px solid white;
		position: relative;
		overflow: hidden;
		max-height: 60vh;
    max-width: 60vh;
	}
	:global(.segmento) {
		width: 50%;
		height: 50%;
		position: absolute;
		transform-origin: 100% 100%;
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
		transform: rotate(calc(var(--segment) + var(--numo)));
		display: flex;
    align-items: center;
    justify-content: center;
	}
	:global(.segmento svg) {
		transform: rotate(-25deg) translate(min(12vw, 8vh), 0vw);
    width: 12vw;
    height: 12vw;
    max-width: 10vh;
    max-height: 10vh;
		opacity: 0.3;
	}
	.girar :global(.segmento) {
		animation: rotate 6s cubic-bezier(0, 0.53, 0.44, 0.96) forwards;
	}
	@keyframes rotate {
		from {
			transform: rotate(calc(0deg + var(--segment) + var(--numo)));
		}
		to {
			transform: rotate(
				calc(
					calc(8 * 360deg) + var(--segment) + var(--numo) - calc(45deg * var(--index))
					)
			);
		}
	}
	.center {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 99;
		background: var(--bg);
		padding: 1em;
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-items: center;
		border-radius: 100%;
		font-weight: 700;
		letter-spacing: -0.04em;
	}
	.center::before {
		position: absolute;
		content: '';
		top: 0;
		box-sizing: content-box;
		border-bottom: 30px solid var(--bg);
		border-right: 20px solid transparent;
		border-left: 20px solid transparent;
		left: 50%;
		transform: translate(-50%, -24px);
	}
</style>