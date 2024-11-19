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

window.addEventListener('keydown', (event) => {
    const modal = document.getElementById('imageModal');
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Open a modal with more details (optional)
function openDetailModal(title, image, description) {
    const modal = document.getElementById('imageModal');
    modal.style.display = "block";
    const modalImage = document.getElementById('modalImage');
    modalImage.src = image;
    modalImage.alt = title;
    // Optionally display a description in the modal if desired
}

// Improved error handling
function loadMaps() {
    const mapsGrid = document.getElementById('maps-grid');
    mapsGrid.innerHTML = '<p>Loading maps...</p>';
    fetch('maps.json')
        .then((response) => response.json())
        .then((maps) => {
            mapsGrid.innerHTML = ''; // Clear loading spinner
            maps.forEach((map) => {
                const mapCard = document.createElement('div');
                mapCard.className = 'grid-item';
                mapCard.onclick = () => openModal(map.image);
                mapCard.innerHTML = `
                    <img src="${map.image}" alt="${map.name}" loading="lazy">
                    <h3>${map.name}</h3>
                    <p>${map.description}</p>
                `;
                mapsGrid.appendChild(mapCard);
            });
        })
        .catch((error) => {
            console.error('Error loading maps:', error); // Log error for debugging
            mapsGrid.innerHTML = '<p>Failed to load maps. Please try again later.</p>';
        });
}

// Load quests dynamically
function loadQuests() {
    const questsGrid = document.getElementById('quests-grid');
    questsGrid.innerHTML = '<p>Loading quests...</p>'; // Spinner
    fetch('quests.json')
        .then((response) => response.json())
        .then((quests) => {
            questsGrid.innerHTML = ''; // Clear spinner
            quests.forEach((quest) => {
                const questCard = document.createElement('div');
                questCard.className = 'quest-item';
                questCard.innerHTML = `
                    <img src="${quest.image}" alt="${quest.name}" loading="lazy">
                    <h3>${quest.name}</h3>
                    <button onclick="viewQuestDetails('${quest.id}')" aria-label="View details for ${quest.name}">
                        View Details
                    </button>
                `;
                questsGrid.appendChild(questCard);
            });
        })
        .catch(() => {
            questsGrid.innerHTML = '<p>Failed to load quests. Please try again later.</p>'; // Error fallback
        });
}

// View quest details
function viewQuestDetails(questId) {
    fetch('quests.json')
        .then((response) => response.json())
        .then((quests) => {
            const quest = quests.find((q) => q.id === questId);
            if (quest) {
                const questsGrid = document.getElementById('quests-grid');
                questsGrid.innerHTML = `
                    <div class="quest-detail">
                        <h3>${quest.name}</h3>
                        <img src="${quest.image}" alt="${quest.name}">
                        <ol>
                            ${quest.steps.map((step) => `<li>${step}</li>`).join('')}
                        </ol>
                        <button onclick="loadQuests()" aria-label="Back to quests">Back to Quests</button>
                    </div>
                `;
            }
        })
        .catch(() => {
            const questsGrid = document.getElementById('quests-grid');
            questsGrid.innerHTML = '<p>Failed to load quest details. Please try again later.</p>'; // Error fallback
        });
}

// Load updates dynamically
function loadUpdates() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '<p>Loading updates...</p>'; // Spinner
    fetch('updates.json')
        .then((response) => response.json())
        .then((updates) => {
            postList.innerHTML = ''; // Clear spinner
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
        })
        .catch(() => {
            postList.innerHTML = '<p>Failed to load updates. Please try again later.</p>'; // Error fallback
        });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadMaps();
    loadQuests();
    loadUpdates();
});
