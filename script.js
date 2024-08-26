const teamNames = [
    "Thunder Wolves",
    "Ice Dragons",
    "Frost Giants",
    "Glacier Hawks",
    "Polar Bears",
    "Arctic Foxes",
    "Snow Panthers",
    "Blizzard Sharks",
    "Frozen Titans",
    "Frostbite Knights",
    "Winter Warriors",
    "Icy Predators",
    "Northern Storm",
    "Frozen Flames",
    "Glacial Guardians"
];

document.getElementById('generate-btn').addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * teamNames.length);
    const teamName = teamNames[randomIndex];
    document.getElementById('team-name').textContent = teamName;
});
