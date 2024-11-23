import Chart from 'chart.js/auto';

let currentChart = null;

function generateRelatedKeywords(keyword) {
  const prefixes = ['meilleur', 'top', 'comment', 'pourquoi', 'où'];
  const suffixes = ['en ligne', 'gratuit', 'pas cher', 'professionnel', 'avis'];
  
  return [
    ...prefixes.map(prefix => `${prefix} ${keyword}`),
    ...suffixes.map(suffix => `${keyword} ${suffix}`)
  ].slice(0, 8);
}

function getRandomData() {
  return {
    volume: Math.floor(Math.random() * 50000) + 1000,
    cpc: Number((Math.random() * 5).toFixed(2)),
    competition: Number((Math.random()).toFixed(2)),
    difficulty: Math.floor(Math.random() * 100),
    trends: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50000) + 1000)
  };
}

function createChart(container, data) {
  if (currentChart) {
    currentChart.destroy();
  }

  const ctx = container.getContext('2d');
  currentChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      datasets: [{
        label: 'Tendance sur 12 mois',
        data: data.trends,
        borderColor: '#8a77eb',
        backgroundColor: 'rgba(138, 119, 235, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.raw.toLocaleString()} recherches`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => value.toLocaleString()
          }
        }
      }
    }
  });
}

export function generateKeywords() {
  const input = document.getElementById('keyword')?.value?.trim();
  const resultsDiv = document.getElementById('results');
  const button = document.getElementById('generate');
  
  if (!input) {
    resultsDiv.innerHTML = '<div class="error">Veuillez entrer un mot-clé</div>';
    return;
  }

  button.disabled = true;
  resultsDiv.innerHTML = '<div class="loading">Analyse en cours...</div>';

  // Simuler un délai d'API
  setTimeout(() => {
    const data = getRandomData();
    const relatedKeywords = generateRelatedKeywords(input);

    resultsDiv.innerHTML = `
      <div class="keyword-card">
        <h2>${input}</h2>
        
        <div class="stats-grid">
          <div class="stat" data-tooltip="Nombre de recherches mensuelles sur Google">
            <div class="stat-label">Volume mensuel</div>
            <div class="stat-value">${data.volume.toLocaleString()}</div>
          </div>
          
          <div class="stat" data-tooltip="Coût moyen par clic (Google Ads)">
            <div class="stat-label">CPC Moyen</div>
            <div class="stat-value">${data.cpc.toFixed(2)}€</div>
          </div>
          
          <div class="stat" data-tooltip="Niveau de difficulté pour se positionner">
            <div class="stat-label">Difficulté</div>
            <div class="stat-value">${data.difficulty}%</div>
          </div>
          
          <div class="stat" data-tooltip="Niveau de concurrence publicitaire">
            <div class="stat-label">Concurrence</div>
            <div class="stat-value">${Math.floor(data.competition * 100)}%</div>
          </div>
        </div>

        <div class="trend-chart">
          <h3>Tendance sur 12 mois</h3>
          <canvas id="trendChart" height="200"></canvas>
        </div>

        <div class="related-keywords">
          <h3>Mots-clés associés</h3>
          <div class="keyword-tags">
            ${relatedKeywords.map(kw => `
              <span class="keyword-tag" onclick="document.getElementById('keyword').value='${kw}';generateKeywords()">
                ${kw}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    createChart(document.getElementById('trendChart'), data);
    button.disabled = false;
  }, 1000);
}