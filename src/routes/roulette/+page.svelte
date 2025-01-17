<script lang="ts">
	import { Confetti } from "svelte-confetti"
	import { user } from '$lib/shared.svelte';
	import { tick } from 'svelte'
	import congratulations from '$lib/output.mp3';
	import Roulette from "./Roulette.svelte";
	import { premios } from "./options";
	import { goto } from "$app/navigation";

	let confetti = $state(false);
	let girar = $state(false);

	function getRandomElement(array: any[]) {
		if (!Array.isArray(array) || array.length === 0) {
			throw new Error("El argumento debe ser un array no vacío.");
		}
		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	}


	function printUser() {

		girar = true;
		setTimeout(async () => {
			girar = false
			// const audio2 = new Audio(congratulations);
			// audio2.play();
			confetti = false
			await tick();
			confetti = true

			user.premio = getRandomElement(premios).desc;

			const dialog = document.getElementById("favDialog") as HTMLDialogElement
			dialog.showModal()

		}, 6250)
	}

	function closeDialog() {
		const dialog = document.getElementById("favDialog") as HTMLDialogElement
		dialog.close()
		user.name = ''
		user.mail = ''
		user.phone = ''
		user.instagram = ''
		user.premio = ''
		goto('/')
	}
</script>

<header>
	<p class="center">Ok {user.name.split(' ')[0]}, ahora desliza tu dedo para ganar</p>
</header>
<Roulette {girar}/>
<button type="button" class="btn" onclick={printUser}>GIRAR</button>
<dialog id="favDialog" class="g6" open={false}>
	<div class="fcol fc g6">
		<h1 class="center">¡Felicidades!<br/>🎊 {user.name.split(' ')[0]} 🎊</h1>
		<p class="center">Acabas de ganar {user.premio}</p>
		<button type="button" onclick={closeDialog} class="btn">Gracias 😊</button>
	</div>
	{#if confetti}
		<div class="abs">
			<Confetti x={[-2, 2]} y={[-1, 4]} duration={3000} amount={400} />
		</div>
	{/if}
</dialog>

<style>
	.rel {
		position: relative;
		z-index: 999;
	}
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