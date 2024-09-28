const teamNames = {
    default: [
        "Blizzard Kings", "Blizzard Bears", "Blizzard Knights", "Blizzard Blades", "Blizzard Storm",
        "Blizzard Riders", "Blizzard Smash", "Blizzard Warriors", "Blizzard Wolves", "Blizzard Crushers",
        "Glacier Giants", "Glacier Sabers", "Glacier Panthers", "Glacier Eagles", "Glacier Knights",
        "Glacier Guardians", "Glacier Mammoths", "Glacier Titans", "Glacier Crushers", "Glacier Dragons",
        "Rage Warriors", "Rage Sharks", "Rage Blades", "Rage Knights", "Rage Bulls",
        "Rage Lions", "Rage Sabers", "Rage Eagles", "Rage Hunters", "Rage Titans",
        "Frost Giants", "Frost Wolves", "Frost Panthers", "Frost Knights", "Frost Titans",
        "Frost Eagles", "Frost Blades", "Frost Hunters", "Frost Warriors", "Frost Sabers"
    ],
    blizzard: [
        "Blizzard Kings", "Blizzard Bears", "Blizzard Knights", "Blizzard Blades", "Blizzard Storm",
        "Blizzard Riders", "Blizzard Smash", "Blizzard Warriors", "Blizzard Wolves", "Blizzard Crushers"
    ],
    glacier: [
        "Glacier Giants", "Glacier Sabers", "Glacier Panthers", "Glacier Eagles", "Glacier Knights",
        "Glacier Guardians", "Glacier Mammoths", "Glacier Titans", "Glacier Crushers", "Glacier Dragons"
    ],
    rage: [
        "Rage Warriors", "Rage Sharks", "Rage Blades", "Rage Knights", "Rage Bulls",
        "Rage Lions", "Rage Sabers", "Rage Eagles", "Rage Hunters", "Rage Titans"
    ],
    frost: [
        "Frost Giants", "Frost Wolves", "Frost Panthers", "Frost Knights", "Frost Titans",
        "Frost Eagles", "Frost Blades", "Frost Hunters", "Frost Warriors", "Frost Sabers"
    ]
};

const generateBtn = document.getElementById('generate-btn');
const teamNameElement = document.getElementById('team-name');
const themeSelect = document.getElementById('theme-select');
const keywordInput = document.getElementById('keyword-input');
const favoritesList = document.getElementById('favorites-list');
const shareTwitter = document.getElementById('share-twitter');
const shareFacebook = document.getElementById('share-facebook');
const saveBtn = document.getElementById('save-btn');
const noFavoritesText = document.getElementById('no-favorites');

let typingInterval;
let isTyping = false;

// Function to type out the team name
function typeEffect(text) {
    let i = 0;
    teamNameElement.textContent = '';
    teamNameElement.classList.remove('hide-cursor');
    isTyping = true;

    clearInterval(typingInterval);

    typingInterval = setInterval(() => {
        if (i < text.length) {
            teamNameElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            teamNameElement.classList.add('hide-cursor');
            isTyping = false; // Mark typing as finished
        }
    }, 100);
}

// Generate a random team name and apply the typing effect
generateBtn.addEventListener('click', () => {
    const theme = themeSelect.value;
    const keyword = keywordInput.value.trim();
    const nameArray = teamNames[theme] || teamNames.default;
    let randomName = nameArray[Math.floor(Math.random() * nameArray.length)];

    if (keyword) {
        randomName = `${keyword} ${randomName.split(' ')[1]}`;
    }

    typeEffect(randomName);
});

function updateButtonText() {
    const button = document.getElementById('generate-btn');
    if (window.innerWidth < 500) {
      button.textContent = 'Generate';
    } else {
      button.textContent = 'Generate Team Name';
    }
  }
  
  // Call the function initially
  updateButtonText();
  
  // Add an event listener to handle window resizing
  window.addEventListener('resize', updateButtonText);

function updateHeight() {
    // Get the current height of the document inside the iframe
    const height = document.body.offsetHeight;

    // Send a message to the parent with the updated height
    window.parent.postMessage({ type: 'height', height }, '*');
}

setInterval(() => {
    updateHeight()
}, 1000);

function updateNoFavoritesText() {
    console.log(favoritesList.children.length > 1)
    if (favoritesList.children.length > 1) { // More than one child means there are actual favorites added
        noFavoritesText.style.display = 'none';
    } else {
        noFavoritesText.style.display = 'block';
    }
}

updateNoFavoritesText();

// Save favorite name when the "+" button is clicked
saveBtn.addEventListener('click', () => {
    // Only save if typing is finished
    if (!isTyping) {
        const name = teamNameElement.textContent.trim();
        if (name && !Array.from(favoritesList.children).some(li => li.textContent.includes(name))) {
            const li = document.createElement('li');
            li.textContent = name;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.style.marginLeft = '10px';
            deleteBtn.onclick = () => {
                li.remove();
                updateNoFavoritesText(); // Update the visibility of "No favourites added" when an item is deleted
            };
            li.appendChild(deleteBtn);
            favoritesList.appendChild(li);
            updateNoFavoritesText();
        }
    } else {
        alert('Please wait for the name to finish typing before saving!');
    }
});

// Share buttons functionality
shareTwitter.addEventListener('click', () => {
    const name = teamNameElement.textContent.trim();
    if (name) {
        const twitterUrl = `https://twitter.com/intent/tweet?text=Check out my new hockey team name: ${encodeURIComponent(name)}!`;
        window.open(twitterUrl, '_blank');
    }
});

shareFacebook.addEventListener('click', () => {
    const name = teamNameElement.textContent.trim();
    if (name) {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=&quote=Check out my new hockey team name: ${encodeURIComponent(name)}!`;
        window.open(facebookUrl, '_blank');
    }
});
