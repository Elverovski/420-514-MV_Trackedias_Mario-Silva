export function validateEmail(email: string): boolean {
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function validateNom(nom: string): boolean {
  const nomRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;
  return nomRegex.test(nom);
}

export function validateUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9._-]{3,30}$/;
  return usernameRegex.test(username);
}


export function validatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
  return passwordRegex.test(password);
}

export function validateRole(role: string): boolean {
  const roleRegex = /^(User|Admin)$/;
  return roleRegex.test(role);
}

export function validateTitre(titre: string): boolean {
  const titreRegex = /^[\wÀ-ÿ0-9 .,'’!?-]{1,200}$/;
  return titreRegex.test(titre);
}

export function validateGenre(genre: string): boolean {
  const genreRegex = /^[A-Za-zÀ-ÿ\s'-]{1,30}$/;
  return genreRegex.test(genre);
}

export function validateStatuts(statut: string): boolean {
  const statutRegex = /^(en_cours|en_attente|termine)$/;
  return statutRegex.test(statut);
}

export function validateDuration(durationMin: number): boolean {
  return durationMin >= 1 && durationMin <= 600;
}

export function validateEpisodeDuration(durationMin: number): boolean {
  return durationMin >= 1 && durationMin <= 300;
}

export function validateSeasonNo(seasonNo: number): boolean {
  return seasonNo >= 1;
}

export function validateEpisodeNo(epNo: number): boolean {
  return epNo >= 1;
}

export function validateScore(score: number): boolean {
  return score >= 0 && score <= 10;
}

export function sanitizeReview(review?: string): string {
  if (!review) return '';
  return review.replace(/<[^>]*>?/gm, '').substring(0, 2000);
}
 