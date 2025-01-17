<script lang="ts">
	import UserRound from "lucide-svelte/icons/user-round";
	import Mail from "lucide-svelte/icons/mail";
	import Phone from "lucide-svelte/icons/phone";
	import AtSign from "lucide-svelte/icons/at-sign";

	import { user } from '$lib/shared.svelte';
	import { validateEmail } from "$lib/utils";
	import { goto } from "$app/navigation";

	let { next } = $props();

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (user.mail === '' || (user.mail && validateEmail(user.mail))) {
			goto('/roulette')
		}
	}

	function handleInput(e: Event) {
		let target = e.target as HTMLInputElement
		// Eliminar cualquier carácter que no sea un número
		let value = target.value.replace(/\D/g, '');

		// Formatear el valor: agregar un espacio cada tres dígitos
		const formattedValue = value.replace(/(\d{3})(?=\d)/g, '$1 ');

		// Establecer el nuevo valor formateado
		target.value = formattedValue;
	}
</script>

<p class="center">Ingresa tus datos para jugar:</p>
<form id="leform" class="fcol g4" method="get" onsubmit={handleSubmit}>
	<label for="name">
		<div class="wrapper">
			<UserRound size={20} absoluteStrokeWidth />
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Pepe"
				bind:value={user.name}
				required
			/>
		</div>
		<span>Nombre <span class="red">*</span></span>
	</label>
	<label for="phone">
		<div class="wrapper">
			<Phone size={20} absoluteStrokeWidth />
			<input
				type="text"
				name="phone"
				id="phone"
				placeholder="987 654 321"
				minlength="9"
				maxlength="11"
				required
				inputmode="numeric"
				bind:value={user.phone}
				oninput={handleInput}
			/>
		</div>
		<span>Teléfono <span class="red">*</span></span>
	</label>
	<label for="email">
		<div class="wrapper">
			<Mail size={20} absoluteStrokeWidth />
			<input
				type="email"
				name="email"
				id="email"
				placeholder="tu@correo.com"
				bind:value={user.mail}
			/>
		</div>
		<span>Correo</span>
	</label>
	<label for="instagram">
		<div class="wrapper">
			<AtSign size={20} absoluteStrokeWidth />
			<input
				type="text"
				name="instagram"
				id="instagram"
				placeholder="kombucha_lover"
				bind:value={user.instagram}
			/>
		</div>
		<span>Instagram</span>
	</label>
</form>
<button form="leform" type="submit" class="btn" onclick={next}>A jugar!</button>

<style>
	form {
		width: 100%;
		max-width: 400px;
	}
	label {
		display: flex;
		flex-direction: column-reverse;
		gap: 8px;
	}
	input {
		padding: 0;
		border: 0;
		width: 100%;
		font-size: 18px;
	}
	input:focus {
		outline: none;
	}
	input:user-invalid {
		color: var(--red);
	}
	.red {
		color: var(--red);
	}
	.wrapper {
		padding: 10px 12px;
		color: var(--text-low);
		background: white;
		border-radius: 12px;
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.wrapper:has(input:focus) {
		outline: 3px solid;
	}
	.wrapper:has(input:user-invalid) {
		outline: 3px solid var(--red);
	}
	.wrapper:has(input:user-invalid) + span {
		color: var(--red);
	}
	.wrapper:has(input) {
		color: var(--text);
	}
	::placeholder {
		color: var(--text-low);
	}
</style>
