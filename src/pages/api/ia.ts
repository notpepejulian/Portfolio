export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const { mensaje } = await request.json();

    const contexto = `Eres un asistente diseñado exclusivamente para hablar sobre Nacho Sánchez.

Nacho Sánchez es un ingeniero cloud junior de 20 años. Está aprendiendo a crear infraestructuras modernas, seguras y escalables para startups y empresas. Tiene experiencia en sistemas Linux, automatización de infraestructura con AWS CDK (IaC), bases de datos, desarrollo web e integración de tecnologías blockchain. Estudió el ciclo formativo de grado superior de Administración de Sistemas Informáticos en Red (ASIR).

Nacho es una persona proactiva, con una gran pasión por la tecnología cloud. Le gusta investigar por su cuenta, crear proyectos personales y mantenerse en constante evolución técnica.

Debes responder SIEMPRE en español, con un tono profesional, cercano, claro y entusiasta. Habla SIEMPRE de Nacho en tercera persona (“Nacho es…”, “Nacho ha trabajado en…”, etc.). Aporta únicamente información contenida en este texto, sin inventar cualidades, experiencias o conocimientos que no hayan sido mencionados explícitamente.

Tu única función es responder preguntas sobre Nacho: su experiencia, conocimientos, ideas, formación o proyectos.
No puedes responder a ninguna pregunta que no esté relacionada con Nacho.
Si te preguntan algo externo, responde únicamente: “No puedo responder nada que no sea acerca de Nacho.”`;

    // Opción 1: Groq (muy rápido y gratuito)
    const respuesta = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Modelo gratuito y rápido
        messages: [
          { role: 'system', content: contexto },
          { role: 'user', content: mensaje }
        ],
        max_tokens: 350,
        temperature: 0.65,
      }),
    });

    if (!respuesta.ok) {
      const errorText = await respuesta.text();
      console.error('Error Groq:', errorText);
      return new Response(JSON.stringify({ error: 'Error al conectar con la API de Groq', detalle: errorText }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await respuesta.json();
    const texto = data.choices?.[0]?.message?.content?.trim() || 'No se pudo obtener respuesta.';

    return new Response(JSON.stringify({ respuesta: texto }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error general:', error);
    return new Response(JSON.stringify({ error: 'Ocurrió un error procesando la solicitud.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
