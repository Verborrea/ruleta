<script lang="ts">
	import { Confetti } from "svelte-confetti"
	import { onMount, tick } from 'svelte'
	import { goto } from "$app/navigation";
	import { user } from '$lib/shared.svelte';
	import spinning_sound from '$lib/spinning.mp3';

	let ruleta = $state();

	let confetti = $state(false);
	let girar = $state(false);
	let index = $state(0);
	let myText = $state("Gracias 😊");

	let premio: any;
	let premios: any[] = [];
	let numPremios = $state(0);
	let anguloSegmento = 0;

	const colores = ['var(--red)', 'var(--ora)', 'var(--yel)', 'var(--gre)', 'var(--cya)', 'var(--blu)', 'var(--vio)', 'var(--pin)'];

	async function fetchPremios() {
		const response = await fetch('/api/premios');
		premios = await response.json();

		numPremios = premios.length;
		anguloSegmento = 360 / numPremios;

		premios.forEach((premio, i) => {
			const segmento = document.createElement('div'); // segmento is an HTMLDivElement
			segmento.classList.add('segmento');
			segmento.style.backgroundColor = colores[i % colores.length];
			segmento.style.setProperty("--segment", `${anguloSegmento * i}deg`);
			segmento.style.zIndex = (numPremios - i).toString();

			segmento.innerHTML = premio.icon; // No need to cast

			(ruleta as HTMLElement).appendChild(segmento);
		});
	}

	// Actualizar premio en la base de datos
	async function updatePremioInDB(item: any) {
		await fetch('/api/premios', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(item)
		});
	}

	async function seleccionarPremio() {
		if (premios.length > 0) {
			// Eliminar premios con times == 0
			premios = premios.filter((p) => p.times > 0);

			// Seleccionar premio aleatorio
			const totalWeight = premios.reduce((sum, p) => sum + p.prob, 0);

			const random = Math.random() * totalWeight;
			let cumulativeWeight = 0;

			for (const item of premios) {
				cumulativeWeight += item.prob;
				if (random < cumulativeWeight) {
					premio = item
					break
				}
			}

			// Reducir el contador y actualizar en la base de datos
			premio.times -= 1;
			await updatePremioInDB({ id: premio.id, times: premio.times });
		}
	}

	async function printUser() {

		girar = true;
		const audio1 = new Audio(spinning_sound);
		audio1.play()

		// premio = getRandomItem(premios)
		seleccionarPremio()
		index = premio.id

		user.datos.premio = premio.description

		if (premio.id !== 2 && premio.id !== 6) {
			myText = "Gracias 😊"
			try {
				const response = await fetch('/roulette', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(user.datos)
				});

				if (response.ok) {
					const data = await response.json();
				} else {
					console.error('Error al añadir la fila:', await response.json());
				}
			} catch (error) {
				console.error('Error de red:', error);
			}
		} else {
			myText = "Girar de nuevo"		
		}

		setTimeout(async () => {
			confetti = false
			await tick()
			confetti = true

			const dialog = document.getElementById("favDialog") as HTMLDialogElement
			dialog.showModal()

		}, 6250)
	}

	function closeDialog() {
		const dialog = document.getElementById("favDialog") as HTMLDialogElement
		dialog.close()
		girar = false

		if (premio.id !== 2 && premio.id !== 6) {
			user.datos.name = ''
			user.datos.mail = ''
			user.datos.phone = ''
			user.datos.instagram = ''
			user.datos.premio = ''

			if (window.localStorage) {
				localStorage.removeItem('user')
			}

			goto('/')
		}
	}

	onMount(async () => {
		user.initialize()
		await fetchPremios()
	})
</script>

<header>
	<p class="center">Ok {user.datos.name.split(' ')[0]}, es hora de ganar!</p>
</header>

<div class="ruleta" class:girar id="ruleta" bind:this={ruleta} style="--numo: {`${180 / numPremios}deg`}; --index: {index}">
	<div class="center">GAUDí</div>
</div>

<button type="button" class="btn" onclick={printUser}>GIRAR</button>
<dialog id="favDialog" class="g6" open={false}>
	<div class="fcol fc g6">
		<h1 class="center">¡Felicidades!<br/>🎊 {user.datos.name.split(' ')[0]} 🎊</h1>
		<p class="center">Acabas de ganar... {user.datos.premio}</p>
		<button type="button" onclick={closeDialog} class="btn">{myText}</button>
	</div>
	{#if confetti}
		<div class="abs">
			<Confetti x={[-2, 2]} y={[-1, 4]} duration={3000} amount={400} />
		</div>
	{/if}
</dialog>

<style>
	.abs {
		position: absolute;
		left: 50%;
		top: 50%;
	}
	dialog {
		border: none;
    padding: 48px 24px;
    border-radius: 16px;
    background: var(--bg);
		box-shadow: 0 4px 20px #1C1D2040;
		max-width: calc(100vw - 48px);
		z-index: 10;
	}
	h1 {
		font-size: 36px;
	}
	.ruleta, .ruleta .center {
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
	.ruleta .center {
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
		filter: drop-shadow(0 4px 20px #1c1d2040);
	}
	.ruleta .center::before {
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