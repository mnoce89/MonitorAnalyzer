async function extractText(file) {
    const worker = await Tesseract.createWorker();
    const { data } = await worker.recognize(file);
    await worker.terminate();
    return data.text;
}

document.getElementById("calculateBtn").addEventListener("click", () => {
    let favorite = document.getElementById("favorite").value;

    let baseScore = 0;

    if (favorite === "home") baseScore = 8;
    else if (favorite === "away") baseScore = 8;
    else baseScore = 4;

    document.getElementById("finalScore").innerText =
        "Punteggio parziale (solo livello 1): " + baseScore;
});
