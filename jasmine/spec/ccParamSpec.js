/**
 * Tests para el parámetro 'cc'.
 */
describe("El control 'Mostrar subtítulos por defecto'", function() {

    var $form,
        $textarea,
        $ccControl;


    beforeEach(function () {
        loadFixtures('valid-form.html');
        $form      = $('[data-videoembedgenerator]');
        $textarea  = $('[data-videoembedgenerator-target]');
        $ccControl = $('[name="cc"]');

        VideoEmbedGenerator.init();
    });


    it("debe añadir 'cc=1' al código si está chequeado", function() {

        if (!$ccControl.prop('checked')){
            $ccControl.trigger('click');
        }

        expect($ccControl).toBeChecked();
        expect($textarea.val()).toMatch(/&cc=1/);

    });


    it("debe eliminar el parámetro 'cc' al código si no está chequeado", function() {

        if ($ccControl.prop('checked')){
            $ccControl.trigger('click');
        }

        expect($ccControl).not.toBeChecked();
        expect($textarea.val()).not.toMatch(/&cc=/);

    });


    it("debe poder ser reemplazado por un campo oculto con valor 0", function() {

        VideoEmbedGenerator.kill();
        $ccControl.remove();
        $('<input name="cc" type="hidden" value="0">').appendTo($form);
        VideoEmbedGenerator.init();
        expect($textarea.val()).not.toMatch(/&cc=/);

    });


    it("debe poder ser reemplazado por un campo oculto con valor 1", function() {

        VideoEmbedGenerator.kill();
        $ccControl.remove();
        $('<input name="cc" type="hidden" value="1">').appendTo($form);
        VideoEmbedGenerator.init();
        expect($textarea.val()).toMatch(/&cc=1/);

    });

});
