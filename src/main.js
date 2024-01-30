// 1. Ler os arquivos json:

// Acessar o módulo fs do Node.js
const fs = require('fs');

const dataFile1 = fs.readFileSync('../db/broken_database_1.json', 'utf8');
const dataFile2 = fs.readFileSync('../db/broken_database_2.json', 'utf8');

const jsonData1 = JSON.parse(dataFile1);
const jsonData2 = JSON.parse(dataFile2);

// test
// console.log(jsonData1, jsonData2);


// 2. Corrigir nomes de marca e veículo --> substituir caracteres indesejáveis por vogais:

function changeCharacters(database, key, replacement) {
    for (let i = 0; i < database.length; i++) {
        if (database[i][key] && typeof database[i][key] === 'string') {
            for (let substitution of replacement) {
                database[i][key] = database[i][key].replace(substitution[0], substitution[1]);
            }
        }
    }
}

const replacement = [
    [new RegExp('ø', 'g'), 'o'],
    [new RegExp('æ', 'g'), 'a']
];

changeCharacters(jsonData1, 'nome', replacement);
changeCharacters(jsonData2, 'marca', replacement);

// test
// console.log(jsonData1, jsonData2);


// 3. Corrigir vendas --> passar tipo "string" para "number":

// o último objeto contém a chave "vendas" com valor do tipo string
// console.log(jsonData1[(jsonData1.length - 1)]);

function fixSalesType(database, key) {
    for (let i = 0; i < database.length; i++) {
        if (database[i][key] && typeof database[i][key] === 'string') {
            database[i][key] = parseFloat(database[i][key]);
        }
    }
}

fixSalesType(jsonData1, 'vendas');

// test
// console.log(jsonData1);

// teste do último objeto alterando o tipo da chave "vendas" "para number"
// console.log(jsonData1[(jsonData1.length - 1)]);


// 4. Exportar os arquivos JSON após correções:

function exportToFile(database, nomeArquivo) {
    const jsonCorrigido = JSON.stringify(database, null, 2);
    fs.writeFileSync(nomeArquivo, jsonCorrigido, 'utf-8');
}

exportToFile(jsonData1, 'edited_database_1.json');
exportToFile(jsonData2, 'edited_database_2.json');

// test
// console.log(jsonData1, jsonData2);