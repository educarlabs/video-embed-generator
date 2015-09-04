/**
 * Tests para el momento de destruir el generador.
 */
describe("Al intentar destruir el generador de códigos de embebido", function() {

    var $form,
        $textarea,
        defaultEmbedCode = '<iframe frameborder="0"  allowfullscreen src="http://cdn.educ.ar/embed/?id=12345" width="320" height="180"></iframe>';


    beforeEach(function () {
        loadFixtures('valid-form.html');
        $form     = $('[data-videoembedgenerator]');
        $textarea = $('[data-videoembedgenerator-target]');
    });


    it("se debe destruir correctamente limpiando el textarea", function() {

        VideoEmbedGenerator.init();
        expect($textarea).not.toHaveValue('');
        expect($textarea).not.toBeDisabled();

        VideoEmbedGenerator.kill();
        expect($textarea).toHaveValue('');
        expect($textarea).toBeDisabled();

    });


    it("no se debe hacer nada si el generador no estaba inicializado", function() {
        expect(VideoEmbedGenerator.kill).not.toThrow();
        expect($textarea).toHaveValue('');
        expect($textarea).toBeDisabled();
    });


    it("se deben desactivar todos los campos que estaban activados", function() {

        var fields = ['rec_id', 'referente', 'baseurl', 'cc', 'width', 'height',
                      'autostart', 'autostop', 'start', 'stop', 'info', 'controls', 'skin'];

        VideoEmbedGenerator.init();

        $.each(fields, function(index, value){
            expect($('[name="' + value + '"]')).not.toBeDisabled();
        });

        VideoEmbedGenerator.kill();

        $.each(fields, function(index, value){
            expect($('[name="' + value + '"]')).toBeDisabled();
        });

    });

});
