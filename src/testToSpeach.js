let voices = [];

function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
        // If voices are not loaded yet, listen for the voiceschanged event
        window.speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices();
        };
    }
}

export function speakText(text, languageCode) {
    if (voices.length === 0) {
        loadVoices(); // Ensure voices are loaded
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageCode;

    // Wait for voices to load if they are not available yet
    if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices();
            const voice = voices.find(voice => voice.lang.startsWith(languageCode));
            if (voice) {
                utterance.voice = voice;
            }
            window.speechSynthesis.speak(utterance);
        };
    } else {
        const voice = voices.find(voice => voice.lang.startsWith(languageCode));
        if (voice) {
            utterance.voice = voice;
        }
        window.speechSynthesis.speak(utterance);
    }
}

