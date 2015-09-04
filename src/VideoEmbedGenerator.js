/**
 * Herramienta para generar códigos de embebido de forma interactiva al estilo YouTube
 *
 * @author Pablo Enrici
 */

(function(window, document, undefined){

  var url,
      code,
      form,
      target,
      initialized = false,
      widthHeightRegex = /w(\d+)h(\d+)/,
      requiredFields   = ['rec_id', 'referente', 'baseurl', 'cc', 'width', 'height',
                          'autostart', 'start', 'stop', 'info', 'controls', 'skin'],

      // Opciones de configuración por defecto
      defaults = {
        formSelector  : "[data-videoembedgenerator]",
        targetSelector: "[data-videoembedgenerator-target]"
      };


  /**
   * Inicializa el generador de códigos de embebido.
   */
  function init(options) {

    // Mergeo el objeto de configuración con los defaults o devuelvo error si se pasó un parámetro de tipo incorrecto.
    if (options !== null && typeof options === 'object') {
      for (var prop in defaults) {
        if (prop in options) { continue; }
        options[prop] = defaults[prop];
      }
    } else if (undefined === options) {
      options = defaults;
    } else {
      console.warn("Parámetros para VideoEmbedGenerator.init() inválidos.");
      return;
    }

    form = document.querySelector(options.formSelector);

    if (null === form) {
      console.warn("No se encontró un elemento que coincida con el selector '" + options.formSelector + "' para inicializar el generador de códigos de embebido.");
      return;
    }

    target = document.querySelector(options.targetSelector);

    if (null === target) {
      console.warn("No se encontró un elemento que coincida con el selector '" + options.targetSelector + "' para inicializar el generador de códigos de embebido.");
      return;
    }

    if (!hasAllRequiredFields(form)) { return; }

    target.value = getEmbedCode();

    form.addEventListener("change", refreshCode);

    setAllControlsState(form, true);
    initialized = true;
  }


  /**
   * Indica si el formulario tiene los campos requeridos
   *
   * @return {bool}
   */
  function hasAllRequiredFields(form) {
    var missing     = [];

    for (var i = requiredFields.length - 1; i >= 0; i--){
      if (undefined === form.elements[requiredFields[i]]) {
        missing.push(requiredFields[i]);
      }
    }

    if (missing.length !== 0) {
      console.warn("No se puede inicializar VideoEmbedGenerator porque faltan estos campos en el formulario: " + missing.join(', '));
    }

    return (missing.length === 0);
  }


  /**
   * Activa o desactiva todos los controles de un formulario
   *
   * @param {Element} form - Formulario al que se quiere activar o desactivar sus controles
   * @param {bool} state - true para activar los controles, false para desactivarlos
   */
  function setAllControlsState(form, state) {
    for (var i = form.elements.length - 1; i >= 0; i--){
      form.elements[i].disabled = !state;
    }
  }


  /**
   * Destruye la instancia del generador.
   */
  function kill() {
    if (!initialized) {return;}
    form.removeEventListener("change", refreshCode);
    target.value = "";
    setAllControlsState(form, false);
    form = target = url = code = null;
    initialized = false;
  }


  /**
   * Actualiza el código de embebido en base a la configuración del formulario.
   *
   * @param {Event} event - Evento de tipo "change" sobre le formulario.
   */
  function refreshCode(event) {
    updateForm(event.target);
    target.value = getEmbedCode();
  }


  /**
   * Actualiza estados y valores del fomulario ante un cambio.
   *
   * @param {Element} changedElement - Elemento que disparó el cambio.
   */
  function updateForm(changedElement) {
    switch (changedElement.name) {

      case "autostart":
        form.elements.start.readOnly = !changedElement.checked;
        form.elements.start.value    =  changedElement.checked ? 0 : null;
        break;

      case "autostop":
        form.elements.stop.readOnly = !changedElement.checked;
        form.elements.stop.value    =  changedElement.checked ? +form.elements.start.value + 1 : null;
        break;

      case "dimensiones":
        switch(form.elements.dimensiones.value) {

          case "none":
            form.elements.width.value     = null;
            form.elements.height.value    = null;
            form.elements.width.readOnly  = true;
            form.elements.height.readOnly = true;
            break;

          case "custom":
            form.elements.width.value     = 320;
            form.elements.height.value    = 240;
            form.elements.width.readOnly  = false;
            form.elements.height.readOnly = false;
            break;

          default:
            form.elements.width.readOnly  = true;
            form.elements.height.readOnly = true;

            var dimsArr = form.elements.dimensiones.value.match(widthHeightRegex);
            form.elements.width.value  = dimsArr ? dimsArr[1] : null;
            form.elements.height.value = dimsArr ? dimsArr[2] : null;
        }
    }
  }


  /**
   * Devuelve la URL del servicio de videos.
   *
   * @return {string}
   */
  function getUrl() {
    url  = form.elements.baseurl.value;
    url += "?id=" + form.elements.rec_id.value;
    url +=  getFieldState(form.elements.cc)           ? "&cc=1"                                       : "";
    url += !getFieldState(form.elements.info)         ? "&info=0"                                     : "";
    url += !getFieldState(form.elements.controls)     ? "&controls=0"                                 : "";
    url +=  getFieldState(form.elements.autostart)    ? "&autostart=1"                                : "";
    url +=  form.elements.start.value                 ? "&start="     + form.elements.start.value     : "";
    url +=  form.elements.stop.value                  ? "&stop="      + form.elements.stop.value      : "";
    url +=  form.elements.skin.value      != "seven"  ? "&skin="      + form.elements.skin.value      : "";
    url +=  form.elements.referente.value != "educar" ? "&referente=" + form.elements.referente.value : "";

    return url;
  }


  /**
   * Devuelve el estado booleano de un control sea checkbox o hidden input
   *
   * @param {Element} element - Control de formulario
   * @return {bool}
   */
  function getFieldState(element) {
    return (element.type === "checkbox" && element.checked) ||
           (element.type === "hidden"   && element.value == 1);
  }


  /**
   * Devuelve el código completo para embeber un video.
   *
   * @return {string}
   */
  function getEmbedCode() {
    var rwdOpenWrapper  = '<div style="position: relative; height: 0; padding-top: 56.248%">',
        rwdCloseWrapper = '</div>',
        rwdIframeStyles = 'style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"',
        rwd = (!form.elements.width.value && !form.elements.height.value);

    code  = rwd ? rwdOpenWrapper : '';
    code += '<iframe frameborder="0" ' + (rwd ? rwdIframeStyles : "") + ' allowfullscreen src="' + getUrl() + '"';
    code += form.elements.width.value  ? ' width="'  + form.elements.width.value  + '"' : "";
    code += form.elements.height.value ? ' height="' + form.elements.height.value + '"' : "";
    code += '></iframe>';
    code += rwd ? rwdCloseWrapper : '';

    return code;
  }

  // Exportamos la API al scope global
  window.VideoEmbedGenerator = {
    init: init,
    kill: kill
  };

})(window, document);
