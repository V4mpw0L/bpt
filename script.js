function showPage(pageId) {
    document.querySelectorAll('.content').forEach((content) => {
        content.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
}

function openModal(src) {
    document.getElementById('imageModal').style.display = "block";
    document.getElementById('modalImage').src = src;
}

function closeModal() {
    document.getElementById('imageModal').style.display = "none";
}

// Event listener to close the modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Load Maps
function loadMaps() {
    fetch('maps.json')
        .then((response) => response.json())
        .then((maps) => {
            const mapsGrid = document.getElementById('maps-grid');
            mapsGrid.innerHTML = ''; // Clear previous content
            maps.forEach((map) => {
                const mapCard = document.createElement('div');
                mapCard.className = 'grid-item';
                mapCard.onclick = () => openModal(map.image); // Add click event to open modal
                mapCard.innerHTML = `
                    <img src="${map.image}" alt="${map.name}">
                    <h3>${map.name}</h3>
                    <p>${map.description}</p>
                `;
                mapsGrid.appendChild(mapCard);
            });
        });
}

// Load Quests
function loadQuests() {
    fetch('quests.json')
        .then((response) => response.json())
        .then((quests) => {
            const questsGrid = document.getElementById('quests-grid');
            questsGrid.innerHTML = ''; // Clear previous content to avoid duplication
            quests.forEach((quest) => {
                const questCard = document.createElement('div');
                questCard.className = 'quest-item';
                questCard.innerHTML = `
                    <img src="${quest.image}" alt="${quest.name}">
                    <h3>${quest.name}</h3>
                    <button onclick="viewQuestDetails('${quest.id}')">Ver Detalhes</button>
                `;
                questsGrid.appendChild(questCard);
            });
        });
}

// View Quest Details
function viewQuestDetails(questId) {
    fetch('quests.json')
        .then((response) => response.json())
        .then((quests) => {
            const quest = quests.find((q) => q.id === questId);
            if (quest) {
                const questsGrid = document.getElementById('quests-grid');
                questsGrid.innerHTML = ''; // Clear grid for details view
                questsGrid.innerHTML = `
                    <div class="quest-detail">
                        <h3>${quest.name}</h3>
                        <img src="${quest.image}" alt="${quest.name}">
                        <ol>${quest.steps.map((step) => `<li>${step}</li>`).join('')}</ol>
                        <button onclick="loadQuests()">Voltar para Quests</button>
                    </div>
                `;
            }
        });
}

// Load Updates
function loadUpdates() {
    fetch('updates.json')
        .then((response) => response.json())
        .then((updates) => {
            const postList = document.getElementById('post-list');
            postList.innerHTML = ''; // Clear previous content
            updates.forEach((update) => {
                const post = document.createElement('div');
                post.className = 'post';
                post.innerHTML = `
                    <h4>${update.title}</h4>
                    <p><strong>${update.date}</strong></p>
                    <p>${update.content}</p>
                `;
                postList.appendChild(post);
            });
        });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadMaps();
    loadQuests();
    loadUpdates();
});
