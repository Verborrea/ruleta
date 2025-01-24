<script lang="ts">
	import { Confetti } from "svelte-confetti"
	import { onMount, tick } from 'svelte'
	import { goto } from "$app/navigation";
	import { user } from '$lib/shared.svelte';
	import Roulette from "./Roulette.svelte";
	import spinning_sound from '$lib/spinning.mp3';

	let confetti = $state(false);
	let girar = $state(false);
	let index = $state(0);
	let myText = $state("Gracias 😊");

	let premio: any;
	let premios: any[] = [];

	async function fetchPremios() {
		const response = await fetch('/api/premios');
		premios = await response.json();
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
<Roulette {girar} {index}/>
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
</style>