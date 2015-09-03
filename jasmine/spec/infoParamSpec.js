/**
 * Tests para el parámetro 'info'.
 */
describe("El control 'Mostrar título y descripción del video'", function() {

    var $form,
        $textarea,
        $infoControl;


    beforeEach(function () {
        loadFixtures('valid-form.html');
        $form         = $('[data-videoembedgenerator]');
        $textarea     = $('[data-videoembedgenerator-target]');
        $infoControl  = $('[name="info"]');

        VideoEmbedGenerator.init();
    });


    it("debe añadir 'info=0' al código si no está chequeado", function() {

        if ($infoControl.prop('checked')){
            $infoControl.trigger('click');
        }

        expect($infoControl).not.toBeChecked();
        expect($textarea.val()).toMatch(/&info=0/);

    });


    it("debe elminar el parámetro 'info' al código si está chequeado", function() {

        if (!$infoControl.prop('checked')){
            $infoControl.trigger('click');
        }

        expect($infoControl).toBeChecked();
        expect($textarea.val()).not.toMatch(/&info/);

    });


    it("debe poder ser reemplazado por un campo oculto con valor 0", function() {

        VideoEmbedGenerator.kill();
        $infoControl.remove();
        $('<input name="info" type="hidden" value="0">').appendTo($form);
        VideoEmbedGenerator.init();
        expect($textarea.val()).toMatch(/&info=0/);

    });


    it("debe poder ser reemplazado por un campo oculto con valor 1", function() {

        VideoEmbedGenerator.kill();
        $infoControl.remove();
        $('<input name="info" type="hidden" value="1">').appendTo($form);
        VideoEmbedGenerator.init();
        expect($textarea.val()).not.toMatch(/&info/);

    });

});
