// Funzione per copiare il codice dello script negli appunti
function copyScript(code) {
    navigator.clipboard.writeText(code).then(() => {
        alert("Script copiato negli appunti!");
    }).catch(err => {
        alert("Errore durante la copia: " + err);
    });
}

// Funzione simulatore download
function downloadItem(name) {
    alert("Inizio download per: " + name);
}
