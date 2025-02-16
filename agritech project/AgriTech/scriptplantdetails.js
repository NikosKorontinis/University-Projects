function getPlantName() {
    const params = new URLSearchParams(window.location.search);
    const plantName = params.get('name');
    document.getElementById('plantName').textContent = plantName;
}

document.addEventListener('DOMContentLoaded', getPlantName);