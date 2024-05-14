import { useState, useEffect } from "react";

export function useTextToSpeech(text: string, lang?: string) {
    const [speaking, setSpeaking] = useState(false);
    const [canSpeak, setCanSpeak] = useState(!!window?.speechSynthesis);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

    const speak = () => {
        if (utterance) {
            utterance.lang = lang || 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    }

    const cancel = () => {
        if (utterance) {
            // This method does not change the paused state of the global SpeechSynthesis instance.
            // So we need to set speaking to false manually
            window.speechSynthesis.cancel();
            setSpeaking(false);
        }
    }

    useEffect(() => {
        const instance = window?.speechSynthesis;

        if (instance) {
            const utterance = new SpeechSynthesisUtterance(text);

            setUtterance(utterance);

            utterance.addEventListener('start', () => {
                setSpeaking(true);
            });
            utterance.addEventListener('end', () => {
                setSpeaking(false);
            });

            setCanSpeak(() => instance.getVoices().find((voice) => voice.lang.search(lang || 'en') > -1) !== undefined);
        } else {
            console.error('Speech synthesis not supported');
        }

        return () => {
            if (utterance) {
                window.speechSynthesis.cancel();

                utterance.removeEventListener('start', () => {
                    setSpeaking(true);
                });
                utterance.removeEventListener('end', () => {
                    setSpeaking(false);
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, lang]);

    return { speak, cancel, speaking, canSpeak }
}