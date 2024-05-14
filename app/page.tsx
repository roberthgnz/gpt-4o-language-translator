"use client"

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Globe } from "lucide-react";
import { TranslatorTypeTabs } from "@/components/translator-type-tabs";
import { TabsContent } from "@/components/ui/tabs";
import { TextTranslator } from "@/components/text-translator";


export default function Home() {
  const [activeTab] = useState("text");

  const tabsList = [
    {
      key: "text",
      name: "Text",
    },
    {
      key: "image",
      name: "Image",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader className="flex items-center">
          <Globe className="mr-2 h-6 w-6" />
          <CardTitle>Language Translator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TranslatorTypeTabs defaultValue={activeTab} tabsList={tabsList}>
            <TabsContent value="text">
              <TextTranslator />
            </TabsContent>
          </TranslatorTypeTabs>
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
