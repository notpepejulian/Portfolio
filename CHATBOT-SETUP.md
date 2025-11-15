# 🤖 Configuración de APIs Gratuitas para Chatbot

## 📋 Resumen de cambios realizados:

✅ **Problema original**: Token de Hugging Face expirado y modelo no disponible
✅ **Solución**: Migración a múltiples APIs gratuitas con sistema de fallback

## 🚀 APIs Gratuitas Disponibles:

### 1. **Groq (RECOMENDADO) - Muy Rápido**
- **Website**: https://console.groq.com/
- **Límites**: 14,400 requests/día GRATIS
- **Velocidad**: Extremadamente rápida
- **Modelos**: Llama 3.1, Mixtral, Gemma

**Pasos para obtener API Key:**
1. Ve a https://console.groq.com/
2. Registrarse con email/Google
3. Ve a "API Keys" → "Create API Key"
4. Copia la key y ponla en `.env`: `GROQ_API_KEY=gsk_...`

### 2. **Together AI - Alternativa Sólida**
- **Website**: https://api.together.xyz/
- **Límites**: $25 crédito gratis
- **Modelos**: Llama 2, Code Llama, RedPajama

**Pasos para obtener API Key:**
1. Ve a https://api.together.xyz/
2. Sign up
3. Ve a Settings → API Keys
4. Copia y pega: `TOGETHER_API_KEY=...`

### 3. **OpenRouter - Muchos Modelos**
- **Website**: https://openrouter.ai/
- **Límites**: Varios modelos gratuitos
- **Modelos**: GPT-3.5, Claude, Llama, etc.

**Pasos para obtener API Key:**
1. Ve a https://openrouter.ai/
2. Sign up
3. Ve a Keys → Create Key
4. Agrega: `OPENROUTER_API_KEY=sk-or-v1-...`

## ⚙️ Configuración:

### 1. Actualizar archivo `.env`:
```bash
# Opción 1: Groq (Recomendado)
GROQ_API_KEY=gsk_tu_key_aqui

# Opción 2: Together AI
TOGETHER_API_KEY=tu_together_key_aqui

# Opción 3: OpenRouter
OPENROUTER_API_KEY=sk-or-v1-tu_key_aqui
```

### 2. Los archivos ya están actualizados:
- ✅ `src/pages/api/ia.ts` - Usa Groq por defecto
- ✅ `src/pages/api/ia-alternativas.ts` - Sistema con múltiples APIs y fallback

## 🔄 Sistema de Fallback Inteligente:

El archivo `ia-alternativas.ts` incluye:
1. **Intenta Groq** (más rápido)
2. **Si falla → Intenta Together AI**
3. **Si falla → Intenta OpenRouter**
4. **Si todo falla → Respuestas locales predefinidas**

## 🚀 Cómo usar:

### Opción A: Solo Groq (Simple)
1. Obtén API key de Groq
2. Ponla en `.env`
3. ¡Ya funciona!

### Opción B: Sistema completo con múltiples APIs
1. Renombra `ia-alternativas.ts` a `ia.ts`
2. Configura las APIs que quieras
3. El sistema usará la primera disponible

## 🎯 Ventajas de cada API:

| API | Velocidad | Límite Diario | Calidad | Facilidad |
|-----|-----------|---------------|---------|-----------|
| **Groq** | ⚡⚡⚡ | 14,400 req | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Together** | ⚡⚡ | $25 crédito | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **OpenRouter** | ⚡ | Variable | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 🔧 Problemas comunes:

### Error: "API key no válida"
- Verifica que copiaste toda la key
- Asegúrate que no tiene espacios extra
- Reinicia el servidor de desarrollo

### Error: "Modelo no encontrado"
- Verifica que el modelo esté disponible
- Groq: usa `llama-3.1-8b-instant`
- Together: usa `meta-llama/Llama-2-7b-chat-hf`

### El chatbot no responde
- Verifica la consola del navegador
- Revisa los logs del servidor
- El sistema de fallback debería funcionar siempre

## ✨ ¡Recomendación Final!

**Usa Groq** - Es la opción más rápida, confiable y fácil de configurar. Con 14,400 requests gratuitos al día, es perfecta para tu portfolio.

```bash
# Solo necesitas esto en .env:
GROQ_API_KEY=gsk_tu_key_de_groq_aqui
```

¡Y ya tienes un chatbot funcionando al 100%! 🚀
