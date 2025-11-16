# Portfolio Web - Admin Cloud

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/tuusuario/portfolio-web)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/tuusuario/portfolio-web)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/tuusuario/portfolio-web?devcontainer_path=.devcontainer/devcontainer.json)

>  Portfolio basado en comandos y terminales. He plasmado mis conocimientos, certificaciones y experiencia como administrador de sistemas y cloud.

### Página Principal
Presentación profesional con diseño moderno, animaciones fluidas y navegación intuitiva. Incluye video de entrevista integrado y acceso directo a todas las secciones del portfolio.

<img width="2396" height="1148" alt="Página principal del portfolio" src="public/MainPage.gif" />

### Sección de Proyectos
Showcase de proyectos técnicos con descripciones detalladas, stack tecnológico utilizado, capturas de pantalla y enlaces directos a los repositorios de GitHub.

<img width="2396" height="1148" alt="Sección de proyectos" src="public/Proyectos_Portfolio.gif" />

### Sección de Conocimientos
Catálogo completo de tecnologías y herramientas organizadas por categorías: Cloud Platforms, DevOps, IaC, Contenedorización, Monitoring y Lenguajes de programación.

<img width="2396" height="1148" alt="Sección de conocimientos" src="public/Conocimientos_Portfolio.gif" />


## Estructura del Proyecto

```text
/
├── public/                # Archivos estáticos (favicon, logos)
├── src/
│   ├── components/        # Componentes reutilizables (terminal, layout, etc.)
│   ├── pages/             # Páginas principales del sitio
│   ├── layouts/           # Estructura visual
│   └── styles/            # Estilos globales (Tailwind u otros)
├── .github/workflows/     # CI/CD con GitHub Actions
├── .env.example           # Variables de entorno ejemplo
├── package.json           # Dependencias y scripts
└── astro.config.mjs       # Configuración de Astro
```

## Contenido

### Sección Principal
Página de presentación con diseño moderno y animaciones fluidas que introducen mi perfil profesional como Cloud Engineer. Incluye:
- Introducción profesional con enfoque en cloud computing y administración de sistemas
- Vídeo de entrevista profesional integrado con diseño tipo dispositivo móvil
- Navegación intuitiva hacia las diferentes secciones del portfolio

### Conocimientos
Showcase completo de mi stack tecnológico organizado por categorías:
- **Cloud Platforms**: AWS, Azure, Google Cloud Platform
- **Contenedorización & Orquestación**: Docker, Kubernetes, Helm
- **Infrastructure as Code**: Terraform, Ansible, CloudFormation
- **CI/CD**: GitHub Actions, GitLab CI, Jenkins
- **Sistemas Operativos**: Linux (RHEL, Ubuntu, Debian), Windows Server
- **Monitoring & Observability**: Prometheus, Grafana, ELK Stack
- **Lenguajes**: Python, Bash, PowerShell, JavaScript

### Proyectos
Portfolio de proyectos técnicos con documentación detallada:
- Descripción completa de cada proyecto con contexto y objetivos
- Stack tecnológico utilizado en cada implementación
- Capturas de pantalla y diagramas de arquitectura
- Enlaces directos a repositorios de GitHub con código fuente
- Resultados y métricas de rendimiento cuando aplica

### Certificaciones
Catálogo de certificaciones profesionales oficiales:
- Certificaciones de proveedores cloud (AWS, Azure, GCP)
- Certificaciones de sistemas y redes
- Formación académica relevante
- Cursos especializados y capacitaciones continuas

### Experiencia Profesional
Timeline visual de mi trayectoria profesional:
- Posiciones actuales y anteriores con descripción de responsabilidades
- Tecnologías y herramientas utilizadas en cada rol
- Logros y contribuciones destacadas
- Formación académica complementaria

### Contacto
Canales de comunicación profesional:
- Perfil de LinkedIn para networking profesional
- Repositorio de GitHub con proyectos open source
- Correo electrónico para contacto directo

---

## Tecnologías Utilizadas

**Frontend Framework**
- Astro 5.x - Framework moderno para sitios web rápidos
- Tailwind CSS - Framework de utilidades para estilos responsivos

**Integraciones**
- Font Awesome - Biblioteca de iconos vectoriales
- Optimización de imágenes y assets automática

**Hosting & Deploy**
- Despliegue automático con GitHub Actions
- Compatible con Vercel, Netlify y GitHub Pages

---

## Despliegue

El portfolio está configurado para despliegue automático mediante CI/CD. Compatible con las siguientes plataformas:

**Vercel** (Recomendado)
```bash
npm run build
vercel --prod
```

**Netlify**
```bash
npm run build
netlify deploy --prod --dir=dist
```

**GitHub Pages**
Configura el workflow en `.github/workflows/deploy.yml` para despliegue automático en cada push a la rama principal.

---

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## Recursos Adicionales

- [Documentación oficial de Astro](https://docs.astro.build/es/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Comunidad de Astro en Discord](https://astro.build/chat)

---

**Desarrollado por Nacho Sánchez**
