// ========= OCR MULTI-IMMAGINE ========= //

async function extractMultiple(files) {
    if (!files || files.length === 0) return "";

    const worker = await Tesseract.createWorker("ita");

    let texts = [];

    for (let file of files) {
        const { data } = await worker.recognize(file);
        texts.push(data.text);
    }

    await worker.terminate();

    return mergeOCR(texts);
}

// Unisce i risultati OCR per ottenere un testo più pulito
function mergeOCR(textArray) {
    let merged = textArray.join("\n");

    // Pulizia base
    merged = merged
        .replace(/\s+/g, " ")   // rimuove spazi doppi
        .replace(/[\|•]/g, "")  // rimuove simboli inutili
        .trim();

    return merged;
}


// ========= GESTIONE BUTTON "CALCOLA" ========= //

document.getElementById("calculateBtn").addEventListener("click", async () => {
    
    let favorite = document.getElementById("favorite").value;

    // Punteggio base dal livello 1
    let baseScore = (favorite === "even") ? 4 : 8;

    // Carichiamo i file delle immagini
    let files45 = document.getElementById("img45").files;
    let files60 = document.getElementById("img60").files;
    let files75 = document.getElementById("img75").files;

    // Eseguiamo OCR multiplo
    let text45 = await extractMultiple(files45);
    let text60 = await extractMultiple(files60);
    let text75 = await extractMultiple(files75);

    // Mostra anteprima testo
    document.getElementById("result45").innerText = text45;
    document.getElementById("result60").innerText = text60;
    document.getElementById("result75").innerText = text75;

    // Punteggio finale provvisorio (poi lo evolviamo)
    let finalScore = baseScore;

    document.getElementById("finalScore").innerText =
        "Punteggio parziale: " + finalScore + " / 100";
});

