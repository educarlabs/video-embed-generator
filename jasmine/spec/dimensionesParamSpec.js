/**
 * Tests para el parámetro 'skin'.
 */
describe("El control 'Dimensiones'", function() {

    var $form,
        $textarea,
        $dimensionesControl,
        widthHeightRegex = /w(\d+)h(\d+)/,
        rwdCodeRegex = /^<div style="position: relative; height: 0; padding-top: 56.248%">(.*)<iframe (.*)style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"(.*)><\/iframe>(.*)<\/div>$/;


    beforeEach(function () {
        loadFixtures('valid-form.html');
        $form               = $('[data-videoembedgenerator]');
        $textarea           = $('[data-videoembedgenerator-target]');
        $dimensionesControl = $('[name="dimensiones"]');
        $widthControl       = $('[name="width"]');
        $heightControl      = $('[name="height"]');

        VideoEmbedGenerator.init();
    });


    it("debe activar los campos 'Ancho' y 'Alto' si se elige la opción 'Personalizadas'", function() {

        expect($widthControl.prop('readonly')).toBe(true);
        expect($heightControl.prop('readonly')).toBe(true);

        $dimensionesControl.val('custom');
        $dimensionesControl[0].dispatchEvent(new Event('change', {bubbles: true}));  // en los selects hay que forzar el evento 'change'
                                                                                     // pero funciona esto en todos los browsers?
        expect($widthControl.prop('readonly')).toBe(false);
        expect($heightControl.prop('readonly')).toBe(false);

    });


    it("debe desactivar los campos 'Ancho' y 'Alto' si se elige una opción distinta a 'Personalizadas'", function() {

        var sizes = ['w480h270', 'w320h180', 'w640h480', 'none'];

        $.each(sizes, function(index, value){

            $dimensionesControl.val('custom');
            $dimensionesControl[0].dispatchEvent(new Event('change', {bubbles: true}));

            expect($widthControl.prop('readonly')).toBe(false);
            expect($heightControl.prop('readonly')).toBe(false);

            $dimensionesControl.val(value);
            $dimensionesControl[0].dispatchEvent(new Event('change', {bubbles: true}));

            expect($widthControl.prop('readonly')).toBe(true);
            expect($heightControl.prop('readonly')).toBe(true);

        });

    });


    it("debe añadir 'width=ANCHO' y 'height=ALTO' al código si se eligen dimensiones fijas", function() {

        var sizes = ['w480h270', 'w320h180', 'w640h480'],
            dimsArr,
            regexW,
            regexH;

        expect($textarea.val()).toMatch(/width="320"/);
        expect($textarea.val()).toMatch(/height="180"/);

        $.each(sizes, function(index, value){

            $dimensionesControl.val(value);
            $dimensionesControl[0].dispatchEvent(new Event('change', {bubbles: true}));

            dimsArr = value.match(widthHeightRegex);

            regexW = new RegExp('width="' + dimsArr[1] + '"');
            expect($textarea.val()).toMatch(regexW);

            regexH = new RegExp('height="' + dimsArr[2] + '"');
            expect($textarea.val()).toMatch(regexH);

        });

    });


    it("debe autocompletar los campos 'Ancho' y 'Alto' si se eligen dimensiones fijas", function() {

        var sizes = ['w480h270', 'w320h180', 'w640h480'],
            dimsArr;

        expect($widthControl.val()).toBe("320");
        expect($heightControl.val()).toBe("180");

        $.each(sizes, function(index, value){

            $dimensionesControl.val(value);
            $dimensionesControl[0].dispatchEvent(new Event('change', {bubbles: true}));

            dimsArr = value.match(widthHeightRegex);

            expect($widthControl.val()).toBe(dimsArr[1]);
            expect($heightControl.val()).toBe(dimsArr[2]);

        });

    });


    it("debe limpiar los campos 'Ancho' y 'Alto' si se elige la opción 'No definidas'", function() {

        expect($widthControl.val()).toBe("320");
        expect($heightControl.val()).toBe("180");

        $dimensionesControl.val('none');
        $dimensionesControl[0].dispatchEvent(new Event('change', {bubbles: true}));

        expect($widthControl.val()).toBe("");
        expect($heightControl.val()).toBe("");

    });


    it("debe añadir el 'width=ANCHO' y 'height=ALTO' definido por el usuario al código si se eligen la opción 'Personalizadas'", function() {

        expect($textarea.val()).toMatch(/width="320"/);
        expect($textarea.val()).toMatch(/height="180"/);

        $dimensionesControl.val('custom');
        $dimensionesControl[0].dispatchEvent(new Event('change', {bubbles: true}));

        $widthControl.val("500");
        $widthControl[0].dispatchEvent(new Event('change', {bubbles: true}));
        expect($textarea.val()).toMatch(/width="500"/);

        $heightControl.val("500");
        $heightControl[0].dispatchEvent(new Event('change', {bubbles: true}));
        expect($textarea.val()).toMatch(/height="500"/);

    });


    it("debe quitar los atributos 'width' y 'height' del código si se elige la opción 'No definidas'", function() {

        expect($textarea.val()).toMatch(/width="320"/);
        expect($textarea.val()).toMatch(/height="180"/);

        $dimensionesControl.val('none');
        $dimensionesControl[0].dispatchEvent(new Event('change', {bubbles: true}));

        expect($textarea.val()).not.toMatch(/width="/);
        expect($textarea.val()).not.toMatch(/height="/);

    });


    it("debe añadir el wrapper adaptativo al código si se elige la opción 'No definidas'", function() {

        expect($textarea.val()).not.toMatch(rwdCodeRegex);

        $dimensionesControl.val('none');
        $dimensionesControl[0].dispatchEvent(new Event('change', {bubbles: true}));

        expect($textarea.val()).toMatch(rwdCodeRegex);

        $dimensionesControl.val('custom');
        $dimensionesControl[0].dispatchEvent(new Event('change', {bubbles: true}));

        expect($textarea.val()).not.toMatch(rwdCodeRegex);

    });


    it("debe poder ser reemplazado por campos ocultos con valores fijos", function() {


        VideoEmbedGenerator.kill();
        $dimensionesControl.remove();
        $widthControl.remove();
        $heightControl.remove();

        $('<input name="width" type="hidden" value="500">').appendTo($form);
        $('<input name="height" type="hidden" value="500">').appendTo($form);

        VideoEmbedGenerator.init();

        expect($textarea.val()).toMatch(/width="500"/);
        expect($textarea.val()).toMatch(/height="500"/);

    });

});
