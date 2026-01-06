// Toggle functionality
const toggle = document.getElementById('toggleStatus');
const statusBadge = document.getElementById('statusBadge');
const alertCount = document.getElementById('alertCount');
const scanCount = document.getElementById('scanCount');
const resetBtn = document.getElementById('resetStats');

// Tab switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to the clicked button
    event.target.classList.add('active');
}

// Make switchTab available globally
window.switchTab = switchTab;

// Add event listeners to tabs
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab').forEach((tab, index) => {
        const tabNames = ['monitor', 'engine', 'info'];
        tab.addEventListener('click', () => {
            switchTab(tabNames[index]);
        });
    });
});

// Function to load and update stats
function loadStats() {
    chrome.storage.sync.get(['alertCount', 'scanCount'], (result) => {
        alertCount.textContent = result.alertCount || 0;
        scanCount.textContent = result.scanCount || 0;
    });
}

// Reset statistics
resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all statistics?')) {
        chrome.storage.sync.set({ 
            alertCount: 0, 
            scanCount: 0 
        }, () => {
            alertCount.textContent = '0';
            scanCount.textContent = '0';
            console.log('Statistics reset successfully');
        });
    }
});

// Load saved state and stats
chrome.storage.sync.get(['isActive'], (result) => {
    const isActive = result.isActive === true; // Default to false (inactive)
    toggle.checked = isActive;
    updateBadge(isActive);
    loadStats();
});

// Listen for storage changes to update stats in real-time
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
        if (changes.alertCount) {
            alertCount.textContent = changes.alertCount.newValue || 0;
        }
        if (changes.scanCount) {
            scanCount.textContent = changes.scanCount.newValue || 0;
        }
    }
});

function updateBadge(isActive) {
    if (isActive) {
        statusBadge.textContent = 'Active';
        statusBadge.style.background = 'rgba(34, 197, 94, 0.1)';
        statusBadge.style.color = '#22c55e';
    } else {
        statusBadge.textContent = 'Inactive';
        statusBadge.style.background = 'rgba(239, 68, 68, 0.1)';
        statusBadge.style.color = '#ef4444';
    }
}

// Save state when toggled
toggle.addEventListener('change', (e) => {
    const isActive = e.target.checked;
    console.log('Toggle changed to:', isActive);
    chrome.storage.sync.set({ isActive: isActive }, () => {
        console.log('Saved isActive:', isActive);
        updateBadge(isActive);
    });
    
    // Send message to content script to enable/disable monitoring
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0] && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'toggleMonitoring',
                enabled: isActive
            }, (response) => {
                if (chrome.runtime.lastError) {
                    console.log('Could not send message to content script. Please refresh the page:', chrome.runtime.lastError.message);
                } else {
                    console.log('Message sent successfully to content script');
                }
            });
        }
    });
});
