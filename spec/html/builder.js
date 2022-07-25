const algoritmo = require('../../js/html/builder.js');

describe("element() -> cria um element de uma tag html ->", function () {
    it("[1] deve retornar a montagem de um element", function () {
        let div = algoritmo.element('div', { id: 'div-id', class: 'div-class' }, []);
        let esperado = {
            node: 'element', tag: 'div',
            attr: { id: 'div-id', class: 'div-class' },
            child: []
        };
        expect(div).toEqual(esperado);
    });

    it("[2] deve retornar a montagem de um element com outro element dentro", function () {
        let span = algoritmo.element('span', { id: 'span-id', class: 'span-class' }, [])
        let div = algoritmo.element('div', { id: 'div-id', class: 'div-class' }, [span]);
        let esperado = {
            node: 'element', tag: 'div',
            attr: { id: 'div-id', class: 'div-class' },
            child: [{
                node: 'element', tag: 'span',
                attr: { id: 'span-id', class: 'span-class' },
                child: []
            }]
        };
        expect(div).toEqual(esperado);
    });
});

describe("text() -> cria um element de texto ->", function () {
    it("[1] deve retornar a montagem de um objeto de texto", function () {
        let div = algoritmo.text('Texto Exibido');
        let esperado = { node: 'text', text: 'Texto Exibido' };
        expect(div).toEqual(esperado);
    });

    it("[2] deve retornar a montagem de um element com um objeto de texto dentro", function () {
        let div = algoritmo.element('div', { id: 'div-id', class: 'div-class' }, [algoritmo.text('Texto Exibido')]);
        let esperado = {
            node: 'element', tag: 'div',
            attr: { id: 'div-id', class: 'div-class' },
            child: [{ node: 'text', text: 'Texto Exibido' }]
        };
        expect(div).toEqual(esperado);
    });
});

describe("build() -> cria o html baseado em um objeto json ->", function () {
    it("[1] deve retornar o codigo html de uma div com um span dentro", function () {
        let span = algoritmo.element('span', { id: 'span-id', class: 'span-class' }, [algoritmo.text('Texto Exibido')])
        let div = algoritmo.element('div', { id: 'div-id', class: 'div-class' }, [span]);
        let esperado = `<div id="div-id" class="div-class"><span id="span-id" class="span-class">Texto Exibido</span></div>`;
        let retorno = algoritmo.build([div]);
        expect(retorno).toEqual(esperado);
    });

    it("[2] deve retornar o codigo html de uma div seguida de um span", function () {
        let span = algoritmo.element('span', { id: 'span-id', class: 'span-class' }, [algoritmo.text('Texto SPAN')])
        let div = algoritmo.element('div', { id: 'div-id', class: 'div-class' }, [algoritmo.text('Texto DIV')]);
        let esperado = `<div id="div-id" class="div-class">Texto DIV</div><span id="span-id" class="span-class">Texto SPAN</span>`;
        let retorno = algoritmo.build([div, span]);
        expect(retorno).toEqual(esperado);
    });
});

describe("replaceCamelCase() -> corrige a string do codigo html gerada com CamelCase ->", function () {
    it("[1] deve retornar o codigo html com a de CamelCase trocada para hifen", function () {
        let objeto = {
            dataToggle: 'toggle', dataTarget: 'target', dataParent: 'parent', ariaExpanded: 'expanded',
            ariaValuenow: 'valuenow', ariaValuemin: 'valuemin', ariaValuemax: 'valuemax',
        }
        let div = algoritmo.element('div', objeto, []);
        let esperado1 = `<div dataToggle="toggle" dataTarget="target" dataParent="parent" ariaExpanded="expanded" ariaValuenow="valuenow" ariaValuemin="valuemin" ariaValuemax="valuemax"></div>`;
        let esperado2 = `<div data-toggle="toggle" data-target="target" data-parent="parent" aria-expanded="expanded" aria-valuenow="valuenow" aria-valuemin="valuemin" aria-valuemax="valuemax"></div>`;
        let retorno1 = algoritmo.build([div]);
        let retorno2 = algoritmo.replaceCamelCase(retorno1);
        expect(retorno1).toEqual(esperado1);
        expect(retorno2).toEqual(esperado2);
    });
});

describe("loading() -> gera o codigo html do botao de loading ->", function () {
    it("[1] deve o html hardcoded", function () {
        expect(algoritmo.loading()).toEqual('<button type="button" class="btn btn-outline btn-primary btn-lg btn-block">LOADING...</button>');
    });
});
