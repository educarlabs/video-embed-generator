/**
 * Tests para el parámetro 'autostart', 'start'.
 */
describe("El control 'Iniciar automáticamente'", function() {

    var $form,
        $textarea,
        $startControl,
        $autostartControl;


    beforeEach(function () {
        loadFixtures('valid-form.html');
        $form             = $('[data-videoembedgenerator]');
        $textarea         = $('[data-videoembedgenerator-target]');
        $autostartControl = $('[name="autostart"]');
        $startControl     = $('[name="start"]');

        VideoEmbedGenerator.init();
    });


    it("debe añadir 'autostart=1' al código si está chequeado", function() {

        if (!$autostartControl.prop('checked')){
            $autostartControl.trigger('click');
        }

        expect($autostartControl).toBeChecked();
        expect($textarea.val()).toMatch(/&autostart=1/);

    });


    it("debe eliminar el parámetro 'autostart' del código si no está chequeado", function() {

        if ($autostartControl.prop('checked')){
            $autostartControl.trigger('click');
        }

        expect($autostartControl).not.toBeChecked();
        expect($textarea.val()).not.toMatch(/&autostart=/);

    });


    it("debe añadir el valor seteado por el usuario al parámetro 'start' al código", function() {

        if (!$autostartControl.prop('checked')){
            $autostartControl.trigger('click');
        }

        $startControl.val("10");
        $startControl[0].dispatchEvent(new Event('change', {bubbles: true}));

        expect($textarea.val()).toMatch(/&start=10/);

    });


    it("debe poder ser reemplazado por un campo oculto con valor 0", function() {

        VideoEmbedGenerator.kill();
        $autostartControl.remove();
        $('<input name="autostart" type="hidden" value="0">').appendTo($form);
        VideoEmbedGenerator.init();
        expect($textarea.val()).not.toMatch(/&autostart=/);

    });


    it("debe poder ser reemplazado por un campo oculto con valor 1", function() {

        VideoEmbedGenerator.kill();
        $autostartControl.remove();
        $('<input name="autostart" type="hidden" value="1">').appendTo($form);
        VideoEmbedGenerator.init();
        expect($textarea.val()).toMatch(/&autostart=1/);

    });


    it("debe activar y llevar a '0' el campo 'Tiempo de inicio' si está chequeado", function() {

        expect($startControl.prop('readonly')).toBe(true);
        expect($startControl.val()).toBe("");

        if (!$autostartControl.prop('checked')){
            $autostartControl.trigger('click');
        }

        expect($autostartControl).toBeChecked();
        expect($startControl.prop('readonly')).toBe(false);
        expect($startControl.val()).toBe("0");


    });


    it("debe desactivar y limpiar el campo 'Tiempo de inicio' si no está chequeado", function() {

        if (!$autostartControl.prop('checked')){
            $autostartControl.trigger('click');
        }

        expect($autostartControl).toBeChecked();
        expect($startControl.prop('readonly')).toBe(false);
        expect($startControl.val()).not.toBe("");

        $autostartControl.trigger('click');

        expect($startControl.prop('readonly')).toBe(true);
        expect($startControl.val()).toBe("");

    });

});
