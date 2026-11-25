# CandleClash — Frontend

Interfaz web del auto-battler Web3 CandleClash. Un solo `index.html`
(~197 KB) con Tailwind por CDN, desplegado como sitio estático.
15 razas × 15 linajes cripto = 225 combinaciones; el oráculo del
backend cambia los stats según el precio a 24h.

## Qué hay

- `index.html` — toda la app: lobby, Barracas, Forja, Arena, Mercado,
  misiones y login con MetaMask. Los peleadores 2D de la batalla son
  SVG dibujados con código (función `buildFighterSVG`).
- `nfts/` — una imagen PNG por raza (cartas, Barracas, ficha).
- `vercel.json` — sitio estático + cabeceras de seguridad
  (nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy y
  CSP en modo Report-Only: una CSP estricta rompería la app por los
  scripts inline y el CDN de Tailwind).
- `README.md` — este archivo.

## Correr en local

```bash
# Sirve la carpeta (cualquier servidor estático vale):
python3 -m http.server 8080
# Abre http://127.0.0.1:8080
```

Para apuntar al backend local en vez de al de Render:
`http://127.0.0.1:8080/?api=http://127.0.0.1:8000`
(o guarda `cc_api_base` en localStorage).

## Despliegue (producción)

Vercel, proyecto **candleclash**, repo `CdkRonin/candleclash` rama
`main`. Despliegue automático al hacer push a `main`.
URL: https://candleclash.vercel.app/

## Modo demo vs modo real

- **Sin wallet (invitado):** todo simulado en el navegador
  (localStorage): batallas, forja, cajas y $TICK demo. Sirve para
  probar la interfaz, pero nada de eso es real.
- **Con MetaMask:** login con firma (gratis, no mueve fondos) y el
  backend manda: gladiadores reales, batallas, forja, mercado P2P,
  $TICK y misiones. Los saldos de la cabecera son los del servidor.

Las cajas Básica/Escuadrón/Batallón siguen en demo (no hay endpoints
de cajas). El Paquete Recluta sí es real: 1 por cuenta.

## Seguridad (decisiones)

- El nombre del gladiador es entrada del usuario: se escapa con
  `escHtml()` en todos los sitios donde va dentro de `innerHTML`
  (cartas, ficha, arena, anuncios P2P). En `textContent` y `alert()`
  va tal cual (ahí no hay HTML que interpretar).
- El JWT vive en `localStorage` (ver el trade-off documentado en el
  README del backend).

## Límites conocidos

- Todo en un solo archivo HTML: sin bundler, sin tests automatizados
  en el repo y sin separación de módulos. Un error de JavaScript puede
  tumbar toda la app.
- El layout tiene CSS propio de respaldo por si el CDN de Tailwind
  tarda en cargar (sin él, las rejillas se desarmaban).
- Sin depósitos ni retiros de dinero real. Las apuestas en USDT y los
  premios con dinero real quedan para más adelante.
