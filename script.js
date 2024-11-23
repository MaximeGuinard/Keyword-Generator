// Données de démonstration pour simuler une API
const keywordDatabase = {
    'marketing': ['marketing digital', 'marketing strategy', 'social media marketing', 'email marketing'],
    'seo': ['seo optimization', 'seo tools', 'local seo', 'technical seo'],
    'design': ['web design', 'graphic design', 'ui design', 'logo design'],
    'development': ['web development', 'app development', 'software development', 'frontend development']
};

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateKeywords() {
    const input = document.getElementById('keyword').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    
    if (!input) {
        resultsDiv.innerHTML = '<div class="keyword-card"><h3>Erreur</h3>Veuillez entrer un mot-clé</div>';
        return;
    }

    // Afficher le loading
    resultsDiv.innerHTML = '<div class="loading">Génération des mots-clés...</div>';

    // Simuler un délai d'API
    setTimeout(() => {
        let results = '';
        const baseKeywords = keywordDatabase[input] || generateRelatedKeywords(input);

        baseKeywords.forEach(keyword => {
            const volume = getRandomNumber(1000, 50000);
            const competition = (Math.random() * 100).toFixed(1);
            
            results += `
                <div class="keyword-card">
                    <h3>${keyword}</h3>
                    <div class="stats">
                        <div class="stat">
                            Volume mensuel: <span>${volume.toLocaleString()}</span>
                        </div>
                        <div class="stat">
                            Concurrence: <span>${competition}%</span>
                        </div>
                    </div>
                </div>
            `;
        });

        resultsDiv.innerHTML = results;
    }, 1500);
}

function generateRelatedKeywords(keyword) {
    // Générer des suggestions basées sur des modèles communs
    return [
        `meilleur ${keyword}`,
        `${keyword} professionnel`,
        `${keyword} pas cher`,
        `${keyword} en ligne`,
        `${keyword} gratuit`
    ];
}

// Permettre l'utilisation de la touche Entrée
document.getElementById('keyword').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateKeywords();
    }
});