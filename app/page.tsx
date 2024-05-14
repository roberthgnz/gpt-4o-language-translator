"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Globe, SpellCheck } from "lucide-react";


export default function Home() {
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

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader className="flex items-center">
          <Globe className="mr-2 h-6 w-6" />
          <CardTitle>Language Translator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
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
          </div>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
            Powered by OpenAI
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
