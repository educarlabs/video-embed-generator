/**
 * Tests para el parámetro 'skin'.
 */
describe("El control 'Diseño'", function() {

    var $form,
        $textarea,
        $ccControl;


    beforeEach(function () {
        loadFixtures('valid-form.html');
        $form        = $('[data-videoembedgenerator]');
        $textarea    = $('[data-videoembedgenerator-target]');
        $skinControl = $('[name="skin"]');

        VideoEmbedGenerator.init();
    });


    it("debe añadir 'skin=ALIAS_DE_SKIN' al código si está seteado en un valor distinto al default ('seven')", function() {

        var nonDefaultskins = ['six', 'five', 'beelden', 'vapor', 'roundster', 'bekle', 'stormtrooper', 'glow'],
            regex;

        expect($textarea.val()).not.toMatch(/&skin=/);

        $.each(nonDefaultskins, function(index, value){
            $skinControl.val(value);
            $('[name="cc"]').trigger('click'); // no encuentro manera de disparar el evento 'change' de un select!

            regex = new RegExp("&skin=" + value);
            expect($textarea.val()).toMatch(regex);
        });

    });


    it("debe eliminar el parámetro 'skin' del código si está seleccionado el diseño por default ('seven')", function() {

        expect($textarea.val()).not.toMatch(/&skin=/);

        $skinControl.val('six');
        $('[name="cc"]').trigger('click'); // no encuentro manera de disparar el evento 'change' de un select!
        expect($textarea.val()).toMatch(/&skin=six/);

        $skinControl.val('seven');
        $('[name="cc"]').trigger('click'); // no encuentro manera de disparar el evento 'change' de un select!
        expect($textarea.val()).not.toMatch(/&skin=/);

    });


    it("debe poder ser reemplazado por un campo oculto con valor default", function() {

        VideoEmbedGenerator.kill();
        $skinControl.remove();
        $('<input name="skin" type="hidden" value="seven">').appendTo($form);
        VideoEmbedGenerator.init();
        expect($textarea.val()).not.toMatch(/&skin=/);

    });


    it("debe poder ser reemplazado por un campo oculto con valor distinto al default", function() {

        var nonDefaultskins = ['six', 'five', 'beelden', 'vapor', 'roundster', 'bekle', 'stormtrooper', 'glow'],
            regex;


        $.each(nonDefaultskins, function(index, value){
            VideoEmbedGenerator.kill();
            $('[name="skin"]').remove();
            $('<input name="skin" type="hidden" value="' + value + '">').appendTo($form);
            VideoEmbedGenerator.init();

            regex = new RegExp("&skin=" + value);
            expect($textarea.val()).toMatch(regex);
        });

    });

});
