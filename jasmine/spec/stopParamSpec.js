/**
 * Tests para el parámetro 'stop'.
 */
describe("El control 'Detener automáticamente'", function() {

    var $form,
        $textarea,
        $stopControl,
        $startControl,
        $autostopControl,
        changeEvent = document.createEvent('Event');

    changeEvent.initEvent('change', true, true);


    beforeEach(function () {
        loadFixtures('valid-form.html');
        $form             = $('[data-videoembedgenerator]');
        $textarea         = $('[data-videoembedgenerator-target]');
        $autostopControl  = $('[name="autostop"]');
        $startControl     = $('[name="start"]');
        $stopControl      = $('[name="stop"]');

        VideoEmbedGenerator.init();
    });


    it("debe añadir el parámetro 'stop' al código si está chequeado", function() {

        if (!$autostopControl.prop('checked')){
            $autostopControl.trigger('click');
        }

        expect($autostopControl).toBeChecked();
        expect($textarea.val()).toMatch(/&stop=/);

    });


    it("debe añadir el valor seteado por el usuario al parámetro 'stop' al código", function() {

        if (!$autostopControl.prop('checked')){
            $autostopControl.trigger('click');
        }

        $stopControl.val("10");
        $stopControl[0].dispatchEvent(changeEvent);

        expect($textarea.val()).toMatch(/&stop=10/);

    });


    it("debe eliminar el parámetro 'stop' del código si no está chequeado", function() {

        if ($autostopControl.prop('checked')){
            $autostopControl.trigger('click');
        }

        expect($autostopControl).not.toBeChecked();
        expect($textarea.val()).not.toMatch(/&stop=/);

    });


    it("debe admitir reemplazar el campo 'Tiempo de pausa' por un campo oculto con valor vacío", function() {

        VideoEmbedGenerator.kill();
        $stopControl.remove();
        $('<input name="stop" type="hidden" value="">').appendTo($form);
        VideoEmbedGenerator.init();
        expect($textarea.val()).not.toMatch(/&stop=/);

    });


    it("debe admitir reemplazar el campo 'Tiempo de pausa' por un campo oculto con valor no vacío", function() {

        VideoEmbedGenerator.kill();
        $stopControl.remove();
        $('<input name="stop" type="hidden" value="10">').appendTo($form);
        VideoEmbedGenerator.init();
        expect($textarea.val()).toMatch(/&stop=10/);

    });


    it("debe activar y llevar a 'Tiempo de inicio + 1' el campo 'Tiempo de pausa' si está chequeado", function() {

        expect($stopControl.prop('readonly')).toBe(true);
        expect($stopControl.val()).toBe("");

        if (!$autostopControl.prop('checked')){
            $autostopControl.trigger('click');
        }

        expect($autostopControl).toBeChecked();
        expect($stopControl.prop('readonly')).toBe(false);
        expect(+$stopControl.val()).toBe(+$startControl.val() + 1); // los '+' están para castear a int


    });


    it("debe desactivar y limpiar el campo 'Tiempo de pausa' si no está chequeado", function() {

        if (!$autostopControl.prop('checked')){
            $autostopControl.trigger('click');
        }

        expect($autostopControl).toBeChecked();
        expect($stopControl.prop('readonly')).toBe(false);
        expect($stopControl.val()).not.toBe("");

        $autostopControl.trigger('click');

        expect($stopControl.prop('readonly')).toBe(true);
        expect($stopControl.val()).toBe("");

    });

});
