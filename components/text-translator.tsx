import { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useDebounce } from "@uidotdev/usehooks";
import { LoaderCircleIcon } from "lucide-react";


export const TextTranslator = () => {
    const [originalText, setOriginalText] = useState("");
    const [translatedText, setTranslatedText] = useState("");

    const [fromLanguage, setFromLanguage] = useState("");
    const [toLanguage, setToLanguage] = useState("en");

    const [translating, setTranslating] = useState(false);
    const debouncedText = useDebounce(originalText, 300);

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
            <Textarea value={originalText} onChange={e => setOriginalText(e.target.value)} placeholder="Enter text here" />
            <div className="relative">
                <Textarea readOnly placeholder={translating ? undefined : 'Translation'} value={translatedText} className="bg-gray-100" />
                <div className="absolute left-3 top-2 flex items-center justify-center">
                    <LoaderCircleIcon className={`size-4 animate-spin ${translating ? 'block' : 'hidden'}`} />
                </div>
            </div>
        </div>
    </div>
}