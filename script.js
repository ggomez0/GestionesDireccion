const gestiones =[
    {
        "nombre": "Planificar la Gestión del Alcance",
        "entradas": "ACDP,PDP(PGC,DCV,ED),FA,APO",
        "herramientas": "JE,ADD(AA),R",
        "salidas": "PGDA,PGDR"
    },
    {
        "nombre": "Recopilar Requisitos",
        "entradas": "ACDP,PDP(PGA,PGR,PII),DP(RS,RLA,RI),DNP(CN),APO,FA",
        "herramientas": "JE,RD(TI,E,GF,CYE,EC),ADD(AD),TD(V,ADMC),RD(DA,MM),HIE(TGN,OYC,F),DC,P",
        "salidas": "DR,MTR"
    },
    {
        "nombre": "Definir el Alcance",
        "entradas": "ACDP,PDP(PGA),DP,APO,FA",
        "herramientas": "JE,AD(AA),TD(ADMC),HIE(F),AP",
        "salidas": "EAP,ACDP(RS,DR,MTR,RI)"
    },
    {
        "nombre": "Crear la EDT/WBS",
        "entradas": "PDP(PGA),DP(EAP, DR)",
        "herramientas": "JE,D",
        "salidas": "LBA,ACDP(RS,DR)"
    },
    {
        "nombre": "Validar el Alcance",
        "entradas": "PDP(PGA,PGR),DP(RLA,IC,DR,MTR),EV,DDT",
        "herramientas": "I,T(V)",
        "salidas": "EA,IDT,SC,ADDP(RLA,DR,MTR)"
    },
    {
        "nombre": "Controlar el Alcance",
        "entradas": "PDP(PGA,PGR,PGC,PGC,LBA,LBMD),DP(RLA,DR,MTR),DDT,APO",
        "herramientas": "ADD(AV,AT)",
        "salidas": "IDT,SC,ACPDP(PGA,LBA,LBC,LBC,LBMD),ACDP(RLA,DR,MTR)"
    }
]


function normalizeString(str) {
    // Convertir a minúsculas y eliminar tildes
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function compareStrings(userInput, correctString) {
    const userWords = normalizeString(userInput).split(" ");
    const correctWords = normalizeString(correctString).split(" ");
    
    return correctWords.every(word => userWords.includes(word));
}

let gestionActual;

function nuevaGestion() {
    gestionActual = gestiones[Math.floor(Math.random() * gestiones.length)];
    document.getElementById('gestion').innerText = `Gestión: ${gestionActual.nombre}`;
    document.getElementById('entradas').value = '';
    document.getElementById('herramientas').value = '';
    document.getElementById('salidas').value = '';
    document.getElementById('resultado').innerText = '';
}

function verificar() {
    const entradas = document.getElementById('entradas').value;
    const herramientas = document.getElementById('herramientas').value;
    const salidas = document.getElementById('salidas').value;

    const entradasCorrectas = gestionActual.entradas;
    const herramientasCorrectas = gestionActual.herramientas;
    const salidasCorrectas = gestionActual.salidas;

    let resultado = '';

    if (compareStrings(entradas, entradasCorrectas)) {
        resultado += 'Entradas correctas. ';
    } else {
        resultado += `--- Entradas incorrectas. ${(entradasCorrectas)}.`;
    }

    if (compareStrings(herramientas, herramientasCorrectas)) {
        resultado += 'Herramientas y técnicas correctas. ';
    } else {
        resultado += `--- Herramientas y técnicas incorrectas. ${(herramientasCorrectas)}. `;
    }

    if (compareStrings(salidas, salidasCorrectas)) {
        resultado += 'Salidas correctas. ';
    } else {
        resultado += `---- Salidas incorrectas. Esperado: ${(salidasCorrectas)}. `;
    }

    document.getElementById('resultado').innerText = resultado;
}

document.addEventListener('DOMContentLoaded', nuevaGestion);