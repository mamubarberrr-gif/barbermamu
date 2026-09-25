# Mamut Barber — web para GitHub Pages

Web estática responsive para Mamut Barber. Incluye catálogo de servicios, galería decorativa, horario, preguntas frecuentes y formulario de solicitud de cita que prepara un mensaje en WhatsApp.

## Archivos
- `index.html`: estructura de la página.
- `style.css`: diseño y estilos responsive.
- `script.js`: calendario, selección de hora y enlace de WhatsApp.
- `logo.png`: logotipo proporcionado.

## Publicar en GitHub Pages
1. Crea un repositorio en GitHub, por ejemplo `mamut-barber`.
2. Sube estos cuatro archivos a la raíz del repositorio.
3. Entra en **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/ (root)`, y pulsa **Save**.
6. Espera a que GitHub Pages publique la web y abre la URL que aparece en esa misma sección.

## WhatsApp
El número está configurado en `script.js` como `34634368378` (España, sin el signo +). El cliente elige fecha y hora y se abre WhatsApp con el mensaje preparado. **La reserva no queda confirmada automáticamente** y esta web no bloquea citas ya solicitadas; confirma la disponibilidad manualmente.

## Personalización
- Cambia el nombre, textos, horarios y servicios en `index.html`.
- Cambia colores y diseño en `style.css`.
- Cambia el número en `WHATSAPP_NUMBER` dentro de `script.js`.
- Sustituye las tarjetas ilustrativas de la galería por fotografías propias si lo deseas.
