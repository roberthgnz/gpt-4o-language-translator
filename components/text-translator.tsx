import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { SpellCheck } from "lucide-react";

export const TextTranslator = () => {
    const [originalText, setOriginalText] = useState("Why is the sky blue?");
    const [translatedText, setTranslatedText] = useState("");

    const [fromLanguage, setFromLanguage] = useState("");
    const [toLanguage, setToLanguage] = useState("");

    const onTranslate = async () => {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: originalText,
                from: fromLanguage,
                to: toLanguage,
            }),
        });

        const { text } = await response.json();

        setTranslatedText(text);
    }


    return <><div className="flex space-x-2">
        <div className="w-1/2 space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Source Language
            </label>
            <Select onValueChange={setFromLanguage}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Source Language" />
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
            <Select onValueChange={setToLanguage}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Target Language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Text to Translate
            </label>
            <Textarea value={originalText} onChange={e => setOriginalText(e.target.value)} placeholder="Enter text here" />
        </div>
        <Button className="w-full mt-4" disabled={!originalText} onClick={onTranslate}>
            <SpellCheck className="mr-2 h-4 w-4" />
            Translate
        </Button>
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Translated Text
            </label>
            <Textarea readOnly placeholder="Translation" value={translatedText} />
        </div></>
}