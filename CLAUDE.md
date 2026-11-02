# Kernesys Landing — guía para Claude

Sitio estático de Kernesys. Netlify sirve directamente `public/` (sin build). El código Vue de `src/` ya no se usa.

## Sitio bilingüe (español / inglés)

**Regla obligatoria: todo cambio que se haga en una página se debe hacer también en su contraparte del otro idioma, en el mismo cambio.**

Esto incluye textos, secciones nuevas o eliminadas, enlaces, imágenes, estilos en línea, JSON-LD (FAQ, servicios, breadcrumbs) y metadatos (title, description, Open Graph). La estructura HTML de cada par debe ser la misma; solo cambia el idioma. Si un cambio aplica a un solo idioma, avísale al usuario.

### Pares de páginas

| Español | Inglés |
|---|---|
| `public/index.html` (`/`) | `public/en/index.html` (`/en/`) |
| `public/nosotros/` | `public/en/about/` |
| `public/software-a-medida-monterrey/` | `public/en/custom-software-monterrey/` |
| `public/wms-inventarios/` | `public/en/wms-inventory/` |
| `public/erp-crm-a-medida/` | `public/en/custom-erp-crm/` |
| `public/modernizacion-sistemas-legacy/` | `public/en/legacy-system-modernization/` |
| `public/integraciones-api/` | `public/en/api-integrations/` |
| `public/aplicaciones-moviles-empresariales/` | `public/en/enterprise-mobile-apps/` |
| `public/industrias/manufactura/` | `public/en/industries/manufacturing/` |
| `public/industrias/logistica/` | `public/en/industries/logistics/` |
| `public/privacidad/` | `public/en/privacy/` |
| `public/terminos/` | `public/en/terms/` |
| `public/404.html` | `public/en/404.html` |

### Cómo se enlazan los pares

- `<link rel="alternate" hreflang="es|en|x-default">` en el `<head>` de ambas páginas (`x-default` apunta a la versión en español).
- Selector de idioma en el navbar: `<div class="lang-switch">` con las banderas `/img/flags/mx.svg` y `/img/flags/us.svg`. La bandera del idioma actual lleva `is-active` y `aria-current="page"`; cada bandera apunta a la página equivalente, no a la home.
- Las páginas en inglés enlazan solo a páginas en inglés (`/en/...`); la única excepción es el selector de idioma (y la nota de traducción de las páginas legales).

### Al agregar una página nueva

1. Crea las dos versiones (la inglesa bajo `public/en/` con slug en inglés).
2. Agrega `hreflang` y el selector de idioma en ambas.
3. Agrega las dos URLs a `public/sitemap.xml`, cada una con sus tres `xhtml:link`.
4. Agrega la página a `public/llms.txt` (sección en español y sección en inglés).
5. Actualiza la tabla de pares de este archivo.

### JavaScript

`public/js/main.js` toma sus textos de `STRINGS.es` o `STRINGS.en` según el `<html lang>` de la página. Todo texto nuevo va en los dos idiomas.

### Caché de CSS y JS

`netlify.toml` sirve `/css/*` y `/js/*` con caché `immutable` de un año. Si cambias `css/landing.css` o `js/main.js`, actualiza el parámetro `?v=AAAAMMDD` en **todas** las páginas que los cargan (ES y EN); si no, los visitantes recurrentes no verán el cambio.
