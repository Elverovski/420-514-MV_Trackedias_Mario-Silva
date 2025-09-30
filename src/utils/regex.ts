// RegEx qui permet uniquement les lettres, chiffres et espace
export function validateTitre(titre: string): boolean {
    const titreRegex = /^[a-zA-Z0-9 ]+$/;
    return titreRegex.test(titre);
}

// RegEx qui permet uniquement les lettres
export function validatePlateforme(plateforme: string): boolean {
    const plateformeRegex = /^[a-zA-Z]+$/;
    return plateformeRegex.test(plateforme);
}

// RegEx qui permet uniquement les entiers positifs
export function validateDuration(duration: string): boolean {
    const durationRegex = /^[1-9][0-9]*$/; 
    return durationRegex.test(duration);
}

// RegEx qui permet uniquement les valeurs en_attente, en cours et termine
export function validateStatus(status: string): boolean {
    const statusRegex = /^(en_attente|en_cours|termine)$/;
    return statusRegex.test(status);
}
