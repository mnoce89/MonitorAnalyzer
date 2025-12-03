// Funzione generica OCR che restituisce il testo estratto
async function ocrImage(file, outputElementId) {
    document.getElementById(outputElementId).innerText = "Elaborazione in corso...";

    const { createWorker } = Tesseract;
    const worker = await createWorker();

    await worker.loadLanguage("ita");
    await worker.initialize("ita");

    const { data } = await worker.recognize(file);
    await worker.terminate();

    document.getElementById(outputElementId).innerText = data.text;
}

// --- Gestione upload immagine 45' ---
document.getElementById("img45").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        ocrImage(file, "result45");
    }
});

// --- Pulsante calcolo finale (solo livello 1 per ora) ---
document.getElementById("calculateBtn").addEventListener("click", () => {
    let favorite = document.getElementById("favorite").value;

    let baseScore = 0;

    if (favorite === "home") baseScore = 8;
    else if (favorite === "away") baseScore = 8;
    else baseScore = 4;

    document.getElementById("finalScore").innerText =
        "Punteggio parziale (solo livello 1): " + baseScore;
});
