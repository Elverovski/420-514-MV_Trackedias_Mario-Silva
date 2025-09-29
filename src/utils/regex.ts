export function validateTitre(titre: string): boolean {
    const titreRegex = /^[a-zA-Z0-9 ]$/;
    return titreRegex.test(titre);
}


export function validateDuration(duration: string): boolean {
    const durationRegex = /^[0-9]$/;
    return durationRegex.test(duration);
}

export function validateStatus(status: string): boolean {
    const statusRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return statusRegex.test(status);
}
