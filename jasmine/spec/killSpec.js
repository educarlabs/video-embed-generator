/**
 * Tests para el momento de destruir el generador.
 */
describe("Al intentar destruir el generador de códigos de embebido", function() {

    var $textarea,
        defaultEmbedCode = '<iframe frameborder="0"  allowfullscreen src="http://cdn.educ.ar/embed/?id=12345" width="320" height="180"></iframe>';


    beforeEach(function () {
        loadFixtures('valid-form.html');
        $form     = $('[data-videoembedgenerator]');
        $textarea = $('[data-videoembedgenerator-target]');
    });


    it("se debe destruir correctamente limpiando el textarea", function() {

        VideoEmbedGenerator.init();
        expect($textarea).not.toHaveValue('');

        VideoEmbedGenerator.kill();
        expect($textarea).toHaveValue('');

    });


    it("no se debe hacer nada si el generador no está inicializado", function() {

    });

});
