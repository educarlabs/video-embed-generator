/**
 * Tests para el parámetro 'controls'.
 */
describe("El control 'Mostrar controles del reproductor'", function() {

    var $form,
        $textarea,
        $controlsControl;


    beforeEach(function () {
        loadFixtures('valid-form.html');
        $form            = $('[data-videoembedgenerator]');
        $textarea        = $('[data-videoembedgenerator-target]');
        $controlsControl = $('[name="controls"]');

        VideoEmbedGenerator.init();
    });


    it("debe añadir 'controls=0' al código si no está chequeado", function() {

        if ($controlsControl.prop('checked')){
            $controlsControl.trigger('click');
        }

        expect($controlsControl).not.toBeChecked();
        expect($textarea.val()).toMatch(/&controls=0/);

    });


    it("debe elminar el parámetro 'controls' al código si está chequeado", function() {

        if (!$controlsControl.prop('checked')){
            $controlsControl.trigger('click');
        }

        expect($controlsControl).toBeChecked();
        expect($textarea.val()).not.toMatch(/&controls/);

    });


    it("debe poder ser reemplazado por un campo oculto con valor 0", function() {

        VideoEmbedGenerator.kill();
        $controlsControl.remove();
        $('<input name="controls" type="hidden" value="0">').appendTo($form);
        VideoEmbedGenerator.init();
        expect($textarea.val()).toMatch(/&controls=0/);

    });


    it("debe poder ser reemplazado por un campo oculto con valor 1", function() {

        VideoEmbedGenerator.kill();
        $controlsControl.remove();
        $('<input name="controls" type="hidden" value="1">').appendTo($form);
        VideoEmbedGenerator.init();
        expect($textarea.val()).not.toMatch(/&controls/);

    });

});
