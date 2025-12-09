# 📄 CV Maker Web

Genera tu Currículum Vitae de forma rápida, accesible y profesional. Incluye menú lateral plegable, secciones por acordeón, chips dinámicos y exportación a PDF/Word.

![Status](https://img.shields.io/badge/status-active-06b6d4)
![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JavaScript-0891b2)
![License](https://img.shields.io/badge/license-MIT-64748b)

## ✨ Características

- Menú lateral plegable, sticky y siempre visible junto a la hoja
- Acordeones accesibles con indicadores `▸/▾` y contadores dinámicos
- Estructura del formulario alineada 1:1 con la previsualización del CV
- Chips dinámicos para habilidades e idiomas (agregar/eliminar con Enter y Backspace)
- Exportación a `PDF` y a `Word (.doc)`
- Persistencia en `localStorage` para que no pierdas tu progreso
- Plantillas de CV con estilos alternativos (`template-1`, `template-2`)
- Diseño adaptable y separación visual de listas (Experiencia/Educación)

## 🖥️ Demo local

- Abre `index.html` en tu navegador. No requiere servidor.

## 🧩 Arquitectura

- `js/utils.js`: utilidades compartidas (`$`, `qa`, `splitLines`, `sanitizeFileName`)
- `js/state.js`: estado central del CV + persistencia en `localStorage`
- `js/renderer.js`: renderiza la previsualización del CV en tiempo real
- `js/form.js`: UI del formulario, acordeones, chips y menú lateral
- `js/exporter.js`: exportación a PDF y Word
- `js/main.js`: inicialización de módulos y enlace de eventos

## 🧭 Uso

- Edita los datos personales; se reflejan al instante en la hoja
- Añade experiencias/educación como tarjetas con campos estructurados
- Usa chips para categorías de habilidades e idiomas
- Cambia la plantilla del CV en Configuración
- Exporta con los botones `Descargar PDF` o `Descargar Word`
- Alterna el menú con el botón `Menú` (expande/colapsa todas las secciones)

## ♿ Accesibilidad

- Acordeones con `details/summary` y estados anunciables
- `aria-live` en contenedores dinámicos de chips
- Foco visible en controles (`outline`) y etiquetas asociadas

## 🎨 Estilos y adaptabilidad

- Grilla de habilidades y chips con `flex-wrap` y `grid`
- Separadores y espaciado uniforme en listas de Experiencia/Educación
- Modalidades visuales por plantilla

## 🚀 Exportación

- PDF: captura de la hoja A4 con `html2canvas` + `jsPDF`
- Word: empaquetado del HTML en `.doc` descargable

## 🛠️ Desarrollo

- Requisitos: navegador moderno
- Flujo básico:
  - Clona el repo
  - Abre `index.html`
  - Edita y exporta

## 🗺️ Roadmap

- Modo overlay del menú en móviles (drawer)
- Preferencia para permitir múltiples acordeones abiertos simultáneamente
- Más plantillas y estilos

## 🤝 Contribuir

- Haz un fork y crea tu feature branch
- Envia un PR con descripción clara y capturas

## 📄 Licencia

- MIT
