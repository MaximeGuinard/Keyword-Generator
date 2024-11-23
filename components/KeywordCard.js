export function createKeywordCard(data) {
  const difficultyScore = Math.floor(data.competition * 100);
  
  return `
    <div class="keyword-card">
      <div class="keyword-header">
        <div class="title-group">
          <h3>${data.keyword}</h3>
          <span class="info-badge" data-tooltip="⚠️ Données simulées à des fins de démonstration">DÉMO</span>
        </div>
        <div class="difficulty-wrapper">
          <span class="difficulty-badge ${getDifficultyClass(difficultyScore)}">
            ${getDifficultyLabel(difficultyScore)}
          </span>
          <button class="info-icon" data-tooltip="Indique la difficulté globale pour se positionner sur ce mot-clé">?</button>
        </div>
      </div>
      
      <div class="stats-grid">
        <div class="stat">
          <div class="stat-header">
            <div class="stat-label">Volume mensuel</div>
            <button class="info-icon" data-tooltip="Estimation du nombre de recherches mensuelles sur Google pour ce mot-clé">?</button>
          </div>
          <div class="stat-value">${data.searchVolume.toLocaleString()}</div>
        </div>
        
        <div class="stat">
          <div class="stat-header">
            <div class="stat-label">CPC Moyen</div>
            <button class="info-icon" data-tooltip="Coût moyen par clic estimé pour les annonces Google Ads">?</button>
          </div>
          <div class="stat-value">${data.cpc}€</div>
        </div>
        
        <div class="stat">
          <div class="stat-header">
            <div class="stat-label">Résultats</div>
            <button class="info-icon" data-tooltip="Nombre approximatif de pages indexées sur Google">?</button>
          </div>
          <div class="stat-value">${data.results.toLocaleString()}</div>
        </div>
        
        <div class="stat">
          <div class="stat-header">
            <div class="stat-label">Concurrence</div>
            <button class="info-icon" data-tooltip="Niveau estimé de la concurrence publicitaire">?</button>
          </div>
          <div class="stat-value">${Math.floor(data.competition * 100)}%</div>
        </div>
      </div>

      <div class="trend-chart">
        <div class="chart-header">
          <h4>Tendance sur 12 mois</h4>
          <button class="info-icon" data-tooltip="Évolution simulée du volume de recherche">?</button>
        </div>
        <canvas id="chart-${data.keyword.replace(/\s+/g, '-')}"></canvas>
      </div>

      <div class="related-keywords">
        <div class="related-header">
          <h4>Mots-clés associés</h4>
          <button class="info-icon" data-tooltip="Suggestions de mots-clés connexes">?</button>
        </div>
        <div class="keyword-tags">
          ${data.suggestions.map(suggestion => `
            <span class="keyword-tag" data-keyword="${suggestion}">
              ${suggestion}
              <button class="tag-info" data-tooltip="Cliquez pour analyser ce mot-clé">?</button>
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function getDifficultyClass(score) {
  if (score < 33) return 'easy';
  if (score < 66) return 'medium';
  return 'hard';
}

function getDifficultyLabel(score) {
  if (score < 33) return 'Facile';
  if (score < 66) return 'Moyen';
  return 'Difficile';
}