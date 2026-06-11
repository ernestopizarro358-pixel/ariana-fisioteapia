# Ariana · Fisioterapia — Tu página web

¡Tu web está lista! Es una página profesional, rápida y moderna, sin programas raros:
son solo archivos que puedes subir a Hostinger (o cualquier hosting).

---

## ✅ 3 cosas para dejarla 100% tuya

### 1) Tu foto
Guarda tu fotografía profesional dentro de la carpeta:

```
assets/img/   →   con el nombre   ariana.jpg
```

- Vale **.jpg** o **.png** (si es PNG, llámala `ariana.png`, también funciona).
- Mejor una foto **vertical** (de pie o de medio cuerpo). Se usa en el inicio y en "Sobre mí".
- Mientras no la pongas, se ve un marcador azul elegante en su lugar (no es un error).

### 2) Tu número de WhatsApp
Abre el archivo **`config.js`** con el Bloc de notas y cambia el número:

```js
whatsapp: "34600000000",   // ← pon aquí TU número
```

- Formato internacional, **sin** el "+", sin espacios ni guiones.
  - España: `34600112233`  ·  México: `5215512345678`  ·  Colombia: `573001234567`
- Ese número se usa en el botón verde flotante, en el formulario y en los botones de "Solicitar información".

### 3) Tu email (opcional)
En el mismo `config.js` cambia:

```js
email: "hola@arianafisioterapia.com"
```

Y, si quieres, en el pie de página del archivo `index.html` (busca ese mismo correo).

---

## 👀 Ver la web en tu ordenador
Haz **doble clic en `index.html`**. Se abrirá en tu navegador con todo funcionando.

---

## 🚀 Subirla a internet (Hostinger)
1. Entra en Hostinger → **Administrador de archivos** → carpeta `public_html`.
2. Sube **todo el contenido** de esta carpeta (no la carpeta en sí, sino lo de dentro):
   `index.html`, `styles.css`, `main.js`, `config.js`, la carpeta `assets/` y el archivo `.htaccess`.
3. ⚠️ El archivo **`.htaccess`** es importante (evita que se vean versiones antiguas). Si tu
   administrador de archivos oculta los archivos que empiezan por punto, actívalos en "Configuración".
4. Listo: visita tu dominio.

> La carpeta `tools/` y este archivo `INSTRUCCIONES.md` son solo de ayuda. No hace falta subirlos
> (aunque tampoco molestan si lo haces).

---

## ✏️ Cambiar textos
Todo el texto está en **`index.html`**. Ábrelo con el Bloc de notas y edita lo que quieras
(títulos, servicios, preguntas...). Guarda y recarga la página.

> Cada vez que subas cambios a Hostinger, recarga con **Ctrl + F5** para ver la versión nueva.

---

¿Necesitas ajustes (colores, textos, otra foto, más secciones)? Pídemelo cuando quieras.
