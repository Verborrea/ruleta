import { json } from '@sveltejs/kit';
import { Client } from '@notionhq/client';

// Configura el cliente de Notion
const notion = new Client({ auth: 'ntn_z71664949536KbNdwvYHpHcjcX9NQ2C0faIWx0xk5LSgXk' });
const databaseId = '17e1ab2808e980eea2d6f344303491ee';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { name, mail, phone, instagram, premio } = await request.json();
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Nombre: { title: [{ text: { content: name } }] },
        Email: { email:( mail || null) },
        Phone: { phone_number: phone },
        Insta: { rich_text: [{ text: { content: (instagram || "") } }] },
        Premio: { select: { name: premio } }
      }
    });
    return json({ success: true, response });
  } catch (error) {
    console.error('Error al añadir la fila:', error);
    return json({ success: false }, { status: 500 });
  }
}