import { useEffect, useState } from "react";
import { useDebounce, useCopyToClipboard } from "@uidotdev/usehooks";
import { CheckIcon, CopyIcon, LoaderCircleIcon, PlayCircleIcon, StopCircle, XIcon } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useTextToSpeech } from "@/hooks/use-text-to-speech";

export const TextTranslator = () => {
    const [originalText, setOriginalText] = useState("");
    const [translatedText, setTranslatedText] = useState("");

    const [fromLanguage, setFromLanguage] = useState("");
    const [toLanguage, setToLanguage] = useState("en");

    const [translating, setTranslating] = useState(false);
    const debouncedText = useDebounce(originalText, 300);

    const [_, copyToClipboard] = useCopyToClipboard();
    const [hasCopiedText, setHasCopiedText] = useState(false);

    const { speak, cancel, speaking } = useTextToSpeech(translatedText, toLanguage);

    useEffect(() => {
        const onTranslate = async () => {
            if (debouncedText === "") {
                setTranslatedText("");
                return;
            }

            setTranslating(true);
            setTranslatedText("");

            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: debouncedText,
                    from: fromLanguage,
                    to: toLanguage,
                }),
            });

            const { text } = await response.json();

            setTranslating(false);
            setTranslatedText(text);
        }

        onTranslate();
    }, [debouncedText, fromLanguage, toLanguage]);

    const onCopyText = async () => {
        setHasCopiedText(true);
        await copyToClipboard(translatedText)
        setTimeout(() => setHasCopiedText(false), 500);
    }

    return <div className="flex flex-col gap-2">
        <div className="flex gap-2">
            <div className="w-1/2 space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Source Language
                </label>
                <Select onValueChange={setFromLanguage}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-1/2 space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Target Language
                </label>
                <Select onValueChange={setToLanguage} defaultValue={toLanguage} required>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
            <div className="relative">
                <Textarea rows={6} value={originalText} onChange={e => setOriginalText(e.target.value)} placeholder="Enter text here" />
                {originalText && (<div className="absolute right-3 top-2">
                    <button onClick={() => setOriginalText("")} className="text-sm text-gray-700 dark:text-gray-300">
                        <XIcon className="size-3" />
                    </button>
                </div>)}
            </div>
            <div className="relative">
                <Textarea rows={6} readOnly placeholder={translating ? undefined : 'Translation'} value={translatedText} className="bg-gray-100" />
                <div className="absolute left-3 top-2 flex items-center justify-center">
                    <LoaderCircleIcon className={`size-4 animate-spin ${translating ? 'block' : 'hidden'}`} />
                </div>
                {translatedText &&
                    <div className="absolute right-3 top-2">
                        <button onClick={onCopyText} className="text-sm text-gray-700 dark:text-gray-300">
                            {hasCopiedText ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                        </button>
                    </div>
                }
                {translatedText &&
                    <div className="absolute left-3 bottom-2">
                        <button onClick={() => {
                            if (speaking) {
                                cancel();
                            } else {
                                speak();
                            }
                        }} className="text-sm text-gray-700 dark:text-gray-300">
                            {speaking ? <StopCircle className="size-4" /> : <PlayCircleIcon className="size-4" />}
                        </button>
                    </div>
                }
            </div>
        </div>
    </div>
}