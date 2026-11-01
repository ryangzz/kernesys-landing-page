# TODO — Kernesys Landing

Pendientes de la auditoría digital 2026 (PDF) después de la refactorización técnica.
La refactorización ya cubrió: eliminación de jQuery, SEO técnico, JSON-LD, sitemap, robots, llms.txt,
formulario AJAX, páginas legales, 404, contadores visibles, un solo H1 y FAQ visible.

---

## 1. Código (se puede hacer sin decisiones de negocio)

- [ ] **Medición de conversiones** — instalar GA4 o Google Tag Manager *(requiere ID de GA4/GTM)*
  - [ ] Evento: formulario enviado con éxito
  - [ ] Evento: clic en WhatsApp (botón flotante y footer)
  - [ ] Evento: clic en teléfono (`tel:`)
  - [ ] Evento: clic en correo (`mailto:`)
  - [ ] Agregar los dominios de GA4/GTM a la CSP en `netlify.toml` si hace falta
- [ ] **Página `/gracias/`** después de enviar el formulario (evento de conversión para Google Ads), con `noindex`
- [ ] **Quitar promesas absolutas** del texto visible:
  - [ ] "adaptados al 100%" / "la solución exacta que necesitas" (Software a la medida)
  - [ ] "sin interrumpir tu operación" (Migración y modernización)
  - [ ] "alta disponibilidad" (Integración de sistemas y nube; Cloud & DevOps)
  - [ ] "asegurando entregas puntuales" (slide 3 del hero)
  - [ ] Revisar la FAQ de soporte ("todos nuestros proyectos incluyen…")
- [ ] **"Empresa mexicana desde 2019" visible en Nosotros** (hoy solo aparece en la FAQ)
- [ ] **Enlace a WhatsApp en el footer**, junto al teléfono y el correo
- [ ] **Imágenes sin WebP**: `LogoLabNova.png` y otras que solo existen en PNG
- [ ] **Caché de CSS/JS**: `netlify.toml` usa `max-age=31536000, immutable` en archivos sin hash.
      Cambiar a una caché corta o versionar los archivos (`styles-LTR.css?v=…`) para que los cambios lleguen a los visitantes recurrentes
- [ ] **Borrar código Vue que ya no se usa**: `src/`, `vue.config.js`, dependencias de Vue en `package.json`
      (existe respaldo en la rama `vue-backup`)
- [ ] (Opcional) Badges de proyectos: `.project-badge` se estira a todo el ancho por el flex; agregar `align-self: flex-start`

## 2. Decisiones pendientes (negocio / diseño)

- [ ] **CTA principal en el hero** (ej. "Agendar diagnóstico" → `#contact-us`) y CTA secundaria ("Ver casos y resultados")
- [ ] **Definir la oferta de entrada** (¿diagnóstico gratuito? ¿sesión de alcance?)
- [ ] **Reemplazar el carrusel por un hero estático** con un solo mensaje, una prueba y una CTA
- [ ] **Título y H1**: decidir si se incluye "Monterrey"
      (propuestas del PDF: "Software a la Medida en Monterrey | Kernesys" o "ERP, WMS e Integraciones para Operaciones | Kernesys")
- [ ] **Posicionamiento**: elegir 2 industrias prioritarias (manufactura, logística, distribución)
- [ ] **Formulario B2B**: agregar empresa, teléfono/WhatsApp, servicio de interés, problema a resolver,
      usuarios o sucursales, fecha estimada y presupuesto (opcional); cambiar el botón "Enviar" por "Solicitar diagnóstico"
- [ ] **Proyectos**: si son demos internas, etiquetarlas como "Demo" o "Concepto"; si son de clientes, agregar cliente o sector, problema, alcance, duración y resultado
- [ ] **Cifras de contadores** (+60 proyectos, +50 clientes, +15 migraciones): confirmar que son reales y demostrables
- [x] **Tech Stack**: reducirlo al stack principal y explicar que la tecnología se elige según los requisitos
      (rehecho como 4 pestañas para perfiles no técnicos: Web, Escritorio, Móvil, Analítica e IA)
  - [x] Confirmar las tecnologías de Escritorio (C# / .NET, C++, Java, Python) y de Analítica e IA (Python, "Machine learning", PostgreSQL, MongoDB, Elasticsearch, AWS)
  - [x] Confirmar que se pueden cumplir los beneficios descritos: apps de escritorio sin conexión, conexión con impresoras, básculas y lectores, y pronósticos de demanda
  - [x] (Opcional) Sustituir las ilustraciones SVG por capturas reales de sistemas cuando existan
  - [x] Actualizar la FAQ y el JSON-LD de "¿Qué tecnologías utiliza Kernesys?" si cambia la lista de tecnologías
- [ ] **Franja de confianza** bajo el hero (ej. "Empresa mexicana desde 2019 | Entregas por sprint | Soporte postimplementación")

## 3. Contenido nuevo

- [x] **Landing pages por servicio** (agregarlas al `sitemap.xml`):
  - [x] `/software-a-medida-monterrey/`
  - [x] `/wms-inventarios/`
  - [x] `/erp-crm-a-medida/`
  - [x] `/modernizacion-sistemas-legacy/`
  - [x] `/integraciones-api/`
  - [x] `/aplicaciones-moviles-empresariales/`
  - [x] `/industrias/manufactura/` y `/industrias/logistica/`
  - [x] Agregadas al `sitemap.xml` y a `llms.txt`; enlazadas desde las tarjetas de servicios de la home ("Conoce más")
  - [ ] Revisar los textos de cada landing (beneficios, preguntas frecuentes y tecnologías) antes de publicar
  - [ ] Confirmar que el proceso de 5 pasos (diagnóstico → alcance → desarrollo por etapas → puesta en marcha → soporte) refleja cómo trabajan
  - [ ] Agregar casos o capturas reales a las landings que hoy no tienen (WMS, integraciones, móviles, legacy, logística)
  - [ ] Cuando exista `/gracias/` y GA4, medir los clics de WhatsApp y "Enviar un mensaje" de estas páginas
- [ ] **`/casos-de-exito/`** con al menos 2 casos documentados (cliente o sector, problema, línea base, solución, implementación, resultado, prueba)
- [ ] **`/nosotros/`**: equipo, trayectoria y metodología
- [ ] **Página o sección de proceso de trabajo** (diagnóstico → alcance → sprints → despliegue → soporte)
- [ ] **Testimonios** con nombre, cargo, empresa y resultado
- [ ] **Sustituir imágenes de banco** (hero, Nosotros, sello "Best Quality Guarantee") por capturas reales de sistemas, diagramas o fotos del equipo
- [ ] **Capturas reales** en los espacios de mockup de WMS/TMS/MES y de los casos (Huasion, Florería Hortensia, COEXSA)
- [ ] **Artículos SEO** (2 al mes), por ejemplo:
  - [ ] Software a medida vs. ERP comercial
  - [ ] Cuánto cuesta desarrollar un ERP o WMS a medida
  - [ ] Cómo modernizar un sistema legacy por etapas
  - [ ] Checklist para elegir un WMS en manufactura
  - [ ] Señales de que Excel ya no es suficiente para el almacén

## 4. Legal

- [ ] **Revisar el Aviso de Privacidad**:
  - [ ] Dice que se usa Google Analytics, pero hoy no está instalado (corregir o instalarlo)
  - [ ] Los datos del formulario los procesa Web3Forms (tercero); mencionarlo
  - [ ] Agregar la identidad y el domicilio del responsable, como exige la LFPDPPP
- [ ] Confirmar el código postal del JSON-LD (`64000`) o quitarlo

## 5. Fuera del código (configuración y marketing)

- [ ] **Netlify**: verificar una sola redirección HTTP→HTTPS y www/sin www (dominio principal: `www.kernesys.com`)
- [ ] **Search Console**: verificar el dominio, enviar `sitemap.xml` y revisar la indexación
- [ ] **Validar datos estructurados** en la prueba de resultados enriquecidos de Google
- [ ] **PageSpeed Insights / Lighthouse** en móvil y escritorio (meta: LCP < 2.5 s, INP < 200 ms, CLS < 0.1)
- [ ] **Perfil de Empresa de Google**: crear o verificar, con el mismo nombre, teléfono y ubicación que el sitio
- [ ] **Reseñas auténticas** de clientes
- [ ] **LinkedIn**: corregir el tipo de empresa ("Public Company") y el tamaño, y publicar contenido semanal
- [ ] **CRM o registro de leads** con origen y estado
- [ ] **Google Ads (Search)**: solo después de tener CTA, landing pages, casos y medición.
      Campañas por servicio y palabras negativas (empleo, curso, gratis, tutorial…)
- [ ] **Retargeting** (Google/Meta) y **LinkedIn por cuentas** en una segunda fase
