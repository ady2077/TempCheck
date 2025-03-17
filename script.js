// Initialize particles
particlesJS('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: '#00bfff' }, // Deep sky blue particles
        shape: { type: 'star' }, // Star shapes for an icy vibe
        opacity: { value: 0.7, random: true },
        size: { value: 4, random: true },
        line_linked: { enable: true, distance: 130, color: '#00ffff', opacity: 0.3, width: 1.5 },
        move: { enable: true, speed: 3, direction: 'none', random: true }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'bubble' }, onclick: { enable: true, mode: 'push' } },
        modes: { bubble: { distance: 180, size: 6 }, push: { particles_nb: 5 } }
    },
    retina_detect: true
});

let isCelsius = true;
const tempHistory = [];

function checkTemp() {
    const celsius = Math.floor(Math.random() * 60) - 10; // -10°C to 50°C
    const fahrenheit = (celsius * 9/5) + 32;
    const currentTemp = isCelsius ? celsius : fahrenheit;
    const unit = isCelsius ? '°C' : '°F';
    const threshold = isCelsius ? 40 : 104; // 40°C or 104°F

    document.getElementById('temp').textContent = `${currentTemp}${unit}`;
    
    const warningDiv = document.getElementById('warning');
    if (currentTemp > threshold) {
        warningDiv.innerHTML = `<span style="animation: alertFlash 0.5s infinite;">WARNING: Temp too high (${currentTemp}${unit})!</span>`;
    } else {
        warningDiv.textContent = '';
    }

    // Log to history
    const timestamp = new Date().toLocaleTimeString();
    tempHistory.unshift(`[${timestamp}] ${currentTemp}${unit}`);
    updateHistory();
}

function toggleUnit() {
    isCelsius = !isCelsius;
    document.querySelector('.unit-btn').textContent = `Switch to ${isCelsius ? '°F' : '°C'}`;
    checkTemp(); // Recalculate with new unit
}

function updateHistory() {
    const historyList = document.getElementById('tempHistory');
    historyList.innerHTML = '';
    tempHistory.slice(0, 5).forEach(entry => { // Show last 5 entries
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

// Alert flash animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes alertFlash {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(styleSheet);

// Initial check
checkTemp();