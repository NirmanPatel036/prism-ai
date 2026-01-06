console.log("🛡️ PrismAI: Content script successfully injected and monitoring...");

// Configuration
const MODAL_ENDPOINT = "https://nirmanpatel036--llama-risk-compliant-chat-completions.modal.run";
let timeout = null;
let isMonitoringEnabled = false;

// 1. Initial State Sync
chrome.storage.sync.get(['isActive'], (result) => {
    isMonitoringEnabled = result.isActive === true;
    console.log('PrismAI: Initial monitoring state:', isMonitoringEnabled);
});

// 2. Toggle Message Listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleMonitoring') {
        isMonitoringEnabled = request.enabled;
        console.log('PrismAI monitoring:', isMonitoringEnabled ? 'enabled' : 'disabled');
        sendResponse({ success: true });
    }
    return true;
});

// 3. Input Event Listener (Main Logic)
document.addEventListener('input', (event) => {
    if (!isMonitoringEnabled) return;

    const target = event.target;
    const isTextField = target.tagName === 'TEXTAREA' || 
                        target.tagName === 'INPUT' || 
                        target.isContentEditable;

    if (isTextField) {
        clearTimeout(timeout);

        // Debounce: Wait 1 second after user stops typing
        timeout = setTimeout(() => {
            const userText = target.value || target.innerText;

            if (userText && userText.trim().length > 15) {
                console.log("PrismAI: Checking for compliance...");

                // Increment scan analytics (with error handling for invalidated context)
                try {
                    chrome.storage.sync.get(['scanCount'], (result) => {
                        if (chrome.runtime.lastError) {
                            console.log('PrismAI: Extension context invalidated, please reload page');
                            return;
                        }
                        const newScanCount = (result.scanCount || 0) + 1;
                        chrome.storage.sync.set({ scanCount: newScanCount });
                    });
                } catch (e) {
                    console.log('PrismAI: Extension context invalidated, please reload page');
                    return;
                }

                // Call Modal endpoint with OpenAI-compatible format
                fetch(MODAL_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [
                            { role: "system", content: "You are a legal compliance AI." },
                            { role: "user", content: userText }
                        ],
                        temperature: 0.1
                    })
                })
                .then(response => response.json())
                .then(data => {
                    // Extract response from OpenAI-compatible format
                    const advice = data.choices?.[0]?.message?.content;
                    
                    if (advice) {
                        // Double-layer scrubbing for LLM artifacts
                        const cleanedAdvice = advice
                            .replace(/<\|end_of_text\|>/gi, '')
                            .replace(/<\|.*?\|>/g, '')
                            .replace(/###/g, '')
                            .trim();

                        // Increment alert analytics (with error handling)
                        try {
                            chrome.storage.sync.get(['alertCount'], (result) => {
                                if (chrome.runtime.lastError) return;
                                const newAlertCount = (result.alertCount || 0) + 1;
                                chrome.storage.sync.set({ alertCount: newAlertCount });
                            });
                        } catch (e) {
                            console.log('PrismAI: Extension context invalidated');
                        }

                        displayAlert(target, cleanedAdvice);
                    }
                })
                .catch(err => console.error("PrismAI Error:", err));
            }
        }, 1000);
    }
});

// 4. Floating UI Function
function displayAlert(element, message) {
    const oldAlert = document.getElementById('prism-tip');
    if (oldAlert) oldAlert.remove();

    const tip = document.createElement('div');
    tip.id = 'prism-tip';
    tip.innerText = `🛡️ Prism: ${message}`;

    // Sleek floating UI styling
    tip.style.cssText = `
        position: absolute;
        background: linear-gradient(135deg, #fff9e6 0%, #fff3cd 100%);
        color: #664d03;
        border: 1px solid #ffc107;
        padding: 12px 16px;
        border-radius: 12px;
        font-size: 13px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        z-index: 10000;
        box-shadow: 0px 4px 12px rgba(0,0,0,0.15);
        max-width: 320px;
        line-height: 1.4;
        transition: all 0.3s ease;
        cursor: pointer;
    `;

    // Position relative to the typing field
    const rect = element.getBoundingClientRect();
    tip.style.top = `${rect.bottom + window.scrollY + 5}px`;
    tip.style.left = `${rect.left + window.scrollX}px`;

    document.body.appendChild(tip);

    // Auto-hide logic
    let hideTimer = setTimeout(() => {
        if (tip.parentNode) tip.remove();
    }, 5000);

    // Interactive Hover effects
    tip.addEventListener('mouseenter', () => {
        clearTimeout(hideTimer);
        tip.style.transform = 'translateY(-2px)';
        tip.style.boxShadow = '0px 6px 16px rgba(0,0,0,0.2)';
    });

    tip.addEventListener('mouseleave', () => {
        tip.style.transform = 'translateY(0)';
        hideTimer = setTimeout(() => {
            if (tip.parentNode) tip.remove();
        }, 2000);
    });

    tip.addEventListener('click', () => tip.remove());
}