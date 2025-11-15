export const prerender = false;

export async function POST({ request }: { request: Request }) {
  try {
    const { mensaje } = await request.json();

    const contexto = `Eres Nacho Sánchez, ingeniero cloud junior. Tienes 20 años. Estas aprendiendo a crear infraestructuras modernas, seguras y escalables para startups y empresas. Tienes experiencia en sistemas LINUX, IaC (AWS CDK), bases de datos, integración de blockchain, te gusta el desarrollo web, creas proyectos personales, y tienes una gran pasión por la tecnología cloud. Estudiaste ASIR. Buenas cualidades que tienes son: ser proactivo, miras muchas cosas por tu cuenta. Responde SIEMPRE en español, de forma profesional, cercana, clara y entusiasta. Si te preguntan por proyectos, conocimientos, ideas o experiencia, responde como si fueras Nacho, aportando detalles reales y mostrando entusiasmo por la innovación tecnológica.No puedes responder por ningún otro tema que no sea de mi. En caso de que te pregunten algo externo a mi, debes responder con un "no puedo responder nada que no sea acerca de Nacho". No inventes cualidades ni nada que no te haya dicho en este texto.`;

    // Función para intentar con Groq
    async function tryGroq() {
      const respuesta = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant', // Gratuito y rápido
          messages: [
            { role: 'system', content: contexto },
            { role: 'user', content: mensaje }
          ],
          max_tokens: 350,
          temperature: 0.65,
        }),
      });

      if (respuesta.ok) {
        const data = await respuesta.json();
        return data.choices?.[0]?.message?.content?.trim();
      }
      throw new Error(`Groq failed: ${respuesta.status}`);
    }

    // Función para intentar con Together AI
    async function tryTogether() {
      const respuesta = await fetch('https://api.together.xyz/inference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.TOGETHER_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'meta-llama/Llama-2-7b-chat-hf', // Gratuito
          prompt: `${contexto}\n\nPregunta: ${mensaje}\nRespuesta:`,
          max_tokens: 350,
          temperature: 0.65,
        }),
      });

      if (respuesta.ok) {
        const data = await respuesta.json();
        return data.output?.choices?.[0]?.text?.trim();
      }
      throw new Error(`Together failed: ${respuesta.status}`);
    }

    // Función para intentar con OpenRouter
    async function tryOpenRouter() {
      const respuesta = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://tu-dominio.com', // Requerido por OpenRouter
          'X-Title': 'Portfolio Nacho', // Opcional
        },
        body: JSON.stringify({
          model: 'microsoft/dialoGPT-medium', // Modelo gratuito
          messages: [
            { role: 'system', content: contexto },
            { role: 'user', content: mensaje }
          ],
          max_tokens: 350,
          temperature: 0.65,
        }),
      });

      if (respuesta.ok) {
        const data = await respuesta.json();
        return data.choices?.[0]?.message?.content?.trim();
      }
      throw new Error(`OpenRouter failed: ${respuesta.status}`);
    }

    // Función de respuesta local como fallback
    function getFallbackResponse(mensaje: string) {
      const respuestas = [
        "¡Hola! Soy Nacho Sánchez, ingeniero cloud junior. Me especializo en infraestructuras modernas con Kubernetes y automatización. ¿En qué puedo ayudarte?",
        "Como ingeniero cloud, me apasiona crear soluciones escalables y seguras. Tengo experiencia en blockchain, IA y tecnologías cloud modernas.",
        "¡Excelente pregunta! En mi experiencia trabajando con startups, he aprendido que la innovación tecnológica es clave para el éxito empresarial.",
        "Mi enfoque se centra en infraestructuras cloud que sean tanto seguras como escalables. ¿Te interesa saber más sobre algún proyecto específico?"
      ];
      
      const index = Math.floor(Math.random() * respuestas.length);
      return respuestas[index];
    }

    // Intentar las APIs en orden de preferencia
    let texto = '';
    
    try {
      texto = await tryGroq();
    } catch (error) {
      console.log('Groq falló, intentando Together AI...');
      try {
        texto = await tryTogether();
      } catch (error) {
        console.log('Together AI falló, intentando OpenRouter...');
        try {
          texto = await tryOpenRouter();
        } catch (error) {
          console.log('Todas las APIs fallaron, usando respuesta local...');
          texto = getFallbackResponse(mensaje);
        }
      }
    }

    return new Response(JSON.stringify({ respuesta: texto }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error general:', error);
    
    // Respuesta de emergencia
    const respuestaEmergencia = "¡Hola! Soy Nacho Sánchez, ingeniero cloud junior. Actualmente hay un problema técnico con el sistema de chat, pero estaré encantado de conectar contigo a través de otros medios. ¡Gracias por tu interés!";
    
    return new Response(JSON.stringify({ respuesta: respuestaEmergencia }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
