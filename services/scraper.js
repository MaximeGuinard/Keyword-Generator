import axios from 'axios';

// Fonction utilitaire pour nettoyer et normaliser les suggestions
function normalizeSuggestions(suggestions) {
  return suggestions
    .filter(suggestion => suggestion && typeof suggestion === 'string')
    .map(suggestion => suggestion.toLowerCase().trim())
    .filter((suggestion, index, self) => self.indexOf(suggestion) === index);
}

// Simuler des suggestions pour éviter les problèmes CORS
function getSimulatedSuggestions(keyword) {
  const commonPrefixes = ['meilleur', 'top', 'comment', 'pourquoi', 'où'];
  const commonSuffixes = ['en ligne', 'gratuit', 'pas cher', 'professionnel', 'avis'];
  
  const suggestions = [
    ...commonPrefixes.map(prefix => `${prefix} ${keyword}`),
    ...commonSuffixes.map(suffix => `${keyword} ${suffix}`),
    `${keyword} formation`,
    `${keyword} entreprise`,
    `${keyword} définition`,
    `${keyword} exemple`,
    `${keyword} prix`,
    `${keyword} comparatif`,
    `${keyword} service`,
    `${keyword} conseil`
  ];

  // Ajouter des variations spécifiques au domaine
  if (keyword.includes('marketing')) {
    suggestions.push(
      'stratégie marketing',
      'marketing digital',
      'marketing automation',
      'marketing de contenu'
    );
  } else if (keyword.includes('seo')) {
    suggestions.push(
      'seo on page',
      'seo technique',
      'seo local',
      'audit seo'
    );
  }

  return normalizeSuggestions(suggestions);
}

export async function getAllSuggestions(keyword) {
  try {
    if (!keyword || typeof keyword !== 'string') {
      throw new Error('Mot-clé invalide');
    }

    // Utiliser des suggestions simulées au lieu du scraping
    const suggestions = getSimulatedSuggestions(keyword);
    
    // Retourner un maximum de 8 suggestions
    return suggestions.slice(0, 8);
  } catch (error) {
    console.error('Erreur suggestions:', error);
    return getSimulatedSuggestions(keyword).slice(0, 8);
  }
}