import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

// Obtener todos los premios
export async function GET() {
	const { data, error } = await supabase.from('premios').select('*').order('id');

	if (error) {
		return new Response(error.message, { status: 500 });
	}

	return json(data);
}

// Actualizar premio
export async function POST({ request }) {
	
	const { id, times } = await request.json();
	const { error } = await supabase
		.from('premios')
		.update({ times })
		.eq('id', id);

	console.log("server: ", id, " - ", times);

	if (error) {
		return new Response(error.message, { status: 500 });
	}

	return new Response('Premio actualizado', { status: 200 });
}