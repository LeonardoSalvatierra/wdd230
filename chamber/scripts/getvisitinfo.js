document.addEventListener('DOMContentLoaded', function() {
    const visitsMessage = document.getElementById('visits-message');
    let firstVisit = localStorage.getItem('firstVisit');

    if (!firstVisit) {
        visitsMessage.textContent = "Welcome! Let us know if you have any questions.";
        localStorage.setItem('firstVisit', Date.now().toString());
    } else {
        const lastVisit = localStorage.getItem('lastVisit');
        const currentDate = Date.now();
        const daysDifference = Math.floor((currentDate - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));

        let message = (daysDifference === 0) ? "Back so soon! Awesome!" :
            (daysDifference === 1) ? "You last visited 1 day ago." :
            `You last visited ${daysDifference} days ago.`;

        visitsMessage.textContent = message;
    }

    localStorage.setItem('lastVisit', Date.now().toString());
});