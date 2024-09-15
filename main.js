function checkName() {
    const nameInput = document.getElementById('name').value.trim();
    const message = document.getElementById('message');
    const mainContent = document.getElementById('main-content');
    const nameBox = document.getElementById('name-input');

    // Get current date and time
    const currentDate = new Date();
    // Set target date and time for April 1, 2025, 00:00:00
    const targetDate = new Date('2025-04-01T00:00:00');

    if (currentDate < targetDate) {
        // Calculate the difference in milliseconds
        const diffInMs = targetDate - currentDate;
        // Convert milliseconds to hours
        const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60));
        
        // If current date is before target date
        if (nameInput.toLowerCase() === 'hellen') {
            message.textContent = `Wait until April 1, 2025. Only ${diffInHours} hours left!`;
        } else {
            message.textContent = `Ups, I only know today is Hellen's birthday, not you ${nameInput}.`;
        }
    } else {
        // If current date is on or after the target date
        if (nameInput.toLowerCase() === 'hellen') {
            nameBox.style.display = 'none';
            mainContent.style.display = 'block';
        } else {
            message.textContent = `Ups, I only know today is Hellen's birthday, not you ${nameInput}.`;
        }
    }
}

function toggleSubmit() {
    const nameInput = document.getElementById('name').value.trim();
    const submitBtn = document.getElementById('submit-btn');

    if (nameInput) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

function checkEnter(event) {
    if (event.key === 'Enter' && !document.getElementById('submit-btn').disabled) {
        event.preventDefault(); // Prevent the default form submission
        checkName();
    }
}

function showMessage(response) {
    const messageText = document.getElementById('message-text');
    messageText.textContent = `You chose: ${response}`;
}
