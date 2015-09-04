Generador de códigos de embebido
================================

Funcionalidad client-side para generar de forma interactiva códigos de video embebido compatibles con el servicio de la CDN de educ.ar.

#### [Ver demo](http://nrlp.educ.ar/video-embed-generator/demo/)

---

## Cómo se usa

1.  Copiar el archivo `VideoEmbedGenerator.js` en tu proyecto e incluirlo en la vista.

    ```html
    <script type="text/javascript" src="../src/VideoEmbedGenerator.js"></script>
    ```

2. Agregar en la vista el marcado HTML necesario (ver más abajo).

3. Luego de cargado el DOM, llamar al método `init()` del objeto, opcionalmente pasando un objeto de configuración:

    ```javascript
    VideoEmbedGenerator.init({
        // configuración opcional...
    });
    ```

4. Listo.


> :bulb: **Seguramente tu sitio no necesite tener esta funcionalidad disponible todo el tiempo**. En ese caso sería una buena idea descargar e inicializar este script de forma asincrónica sólo cuando el usuario lo requiera, optimizando de esta forma el tiempo de carga inicial de la página. Podés aprovechar una función como  [loadJS()](https://github.com/filamentgroup/loadJS) para hacer esto.

> ```javascript
> // Correr esto cuando el usuario pide embeber el video:

> loadJS("path/to/scripts/VideoEmbedGenerator.js", function(){
>     VideoEmbedGenerator.init();
> });
> ```


## Dependencias

Ninguna :)


## Marcado HTML necesario

El marcado necesario es un formulario HTML estándar como el del siguiente ejemplo. Tener en cuenta que el marcado puede modificarse pero **todos los campos deben estar presentes**, sea de forma visible u oculta.

Se sugiere que en su estado original todos los campos tengan el atributo `disabled`.


```html
<form data-videoembedgenerator>

  <!-- Campos ocultos con datos no editables por el usuario -->
  <input type="hidden" name="baseurl"   value="http://cdn.educ.ar/embed/" disabled>
  <input type="hidden" name="rec_id"    value="12345" disabled>
  <input type="hidden" name="referente" value="educar" disabled>

  <label for="info"><input type="checkbox" id="info" name="info" checked disabled>Mostrar título y descripción del video</label>

  <label for="controls"><input type="checkbox" id="controls" name="controls" checked disabled>Mostrar controles del reproductor</label>

  <label for="cc"><input type="checkbox" id="cc" name="cc" disabled>Mostrar subtítulos por defecto</label>

  <label for="autostart"><input type="checkbox" id="autostart" name="autostart" disabled>Iniciar automáticamente</label>
  a los <input type="text" value="" name="start" id="start" readonly disabled> segundos.

  <label for="autostop"><input type="checkbox" id="autostop" name="autostop" disabled>Detener automáticamente</label>
  a los <input type="text" value="" name="stop" id="stop" readonly disabled> segundos.

  <label for="dimensiones">Dimensiones</label>
  <select name="dimensiones" id="dimensiones" disabled>
    <option value="w320h180" selected>320 x 180</option>
    <option value="w480h270">480 x 270</option>
    <option value="custom">Personalizado</option>
    <option value="none">No definidas (adaptativo)</option>
  </select>

  <label for="width">Ancho</label>
  <input type="text" value="320" name="width" id="width" readonly disabled>

  <label for="height">Alto</label>
  <input type="text" value="180" name="height" id="height" readonly disabled>

  <label for="skin">Diseño</label>
  <select name="skin" id="skin" disabled>
    <option value="seven" selected>Seven</option>
    <option value="six">Six</option>
    <!-- etc... -->
  </select>

  <label for="embeddercode" disabled>Código</label>
  <textarea data-videoembedgenerator-target name="embeddercode" readonly></textarea>
</form>
```

#### Etiqueta `<form>`

Para la configuración más sencilla debe contener el atributo `data-videoembedgenerator` (Ver sección "Objeto de configuración").


#### Etiqueta `<textarea>`

Para la configuración más sencilla debe contener el atributo `data-videoembedgenerator-target` (Ver sección "Objeto de configuración").

Debe estar marcada con el atributo `readonly`.


#### Campos `baseurl`, `rec_id` y `referente`

Generalmente estos valores son fijos para el sitio que implementa el generador y no deben ser editables por el usuario por lo que se los incluye como `input type="hidden"`.

Para el caso del campo `referente`, debe tener como valor una de las cadenas soportadas como alias de referente por la CDN.


#### Campos `info` y `controls`

Son checkboxes que pueden o no tener el atributo `checked` por defecto. Si no se quiere ofrecer estas opciones al usuario se deben reemplazar por campos de tipo `input type="hidden"` con el valor aproppiado.


#### Campos `cc`, `autostart` y `autostop`

Son checkboxes que no deben tener el atributo `checked` por defecto. Si no se quiere ofrecer estas opciones al usuario se deben reemplazar por campos de tipo `input type="hidden"` con el valor apropiado.


#### Campos `start` y `stop`

Son campos de texto. El valor que contienen y el atributo `readonly` es manejado automáticamente.


#### Campo `dimensiones`

Es un combo con las distintas opciones de tamaño que se quiera ofrecer. Las hay de 3 tipos: fijas, personalizadas e indefinidas. Para mostrar una de las opciones marcado por defecto agregar el atributo `selected` a la opción.


#### Dimensiones fijas

Se pueden agregar todas las medidas fijas que se quiera, asignando como valor del `<option>` una cadena con el formato `wAAhBB` en donde `AA` es el ancho y `BB` es el alto en píxeles.

Por ejemplo, si se quisiera agregar como opción una medida fija de 480 x 360 píxeles habría que incluir dentro del combo la siguiente etiqueta:

```html
<option value="w480h360">480 x 360</option>
```

Los valores de los campos `width`y `height` así como sus atributos `readonly` son manejados automáticamente.


#### Dimensiones personalizadas

Para dar la opción de que el usuario ingrese las dimensiones a mano, agregar en el combo la siguiente etiqueta:

```html
<option value="custom">Personalizado</option>
```

Los valores de los campos `width`y `height` así como sus atributos `readonly` son manejados automáticamente.


#### Dimensiones no definidas (para diseño adaptativo)

Para ofrecer un marcado sin medidas fijas para que el video se adapte al tamaño de su contenedor manteniendo su relación de aspecto (lo cual resulta muy útil en el diseño adaptativo), agregar en el combo la siguiente etiqueta:

```html
<option value="none">No definidas (adaptativo)</option>
```

Los valores de los campos `width`y `height` así como sus atributos `readonly` son manejados automáticamente.


#### Campos `width` y `height`

Son campos de texto. Si no se quiere ofrecer la opción de dimensiones personalizadas se deben reemplazar por campos de tipo `input type="hidden"` con el valor apropiado.


#### Campo `skin`

Es un combo con las distintas opciones de skin que se quiera ofrecer. Para mostrar una de las opciones marcada por defecto agregar el atributo `selected` a la opción.

Cada etiqueta `<option>` debe tener como valor una de las cadenas soportadas como alias de skin por la [CDN de educ.ar](https://gitlab.educ.ar/repositorio/cdn).

Si no se quiere ofrecer esta opción al usuario se deben reemplazar el combo por un campos de tipo `input type="hidden"` con el valor apropiado.



## Objeto de configuración

La forma más simple de hacer funcionar todo esto es aplicarle al formulario del generador el atributo `data-videoembedgenerator` y al elemenento que muestra el código el atributo `data-videoembedgenerator-target`.

Ejemplo:

```html
<form data-videoembedgenerator>

    <!-- controles del formulario... -->

    <textarea data-videoembedgenerator-target name="embeddercode" readonly rows="5"></textarea>
</form>
```

Pero si queremos usar nuestro propio marcado lo podemos hacer, en cuyo caso vamos a necesitar seleccionar ambos elementos a través de selectores CSS válidos.

Por ejemplo, si nuestro marcado fuera algo así:

```html
<form id="my-generator">

    <!-- controles del formulario... -->

    <textarea name="embeddercode" readonly rows="5"></textarea>
</form>
```

Podríamos inicializar el generador aprovechando las propiedades `formSelector` y `targetSelector` del objeto de configuración:

```javascript
VideoEmbedGenerator.init({
    formSelector  : '#my-generator',
    targetSelector: '[name="embeddercode"]'
});
```
