"use client"

import { useState } from "react";

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
    <div className="container mx-auto my-4">
      <TranslatorTypeTabs defaultValue={activeTab} tabsList={tabsList}>
        <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl mx-auto">
          <TabsContent className="mt-0" value="text">
            <TextTranslator />
          </TabsContent>
          <TabsContent className="mt-0" value="image">
            Work in progress...
          </TabsContent>
        </div>
        <p className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
          Powered by OpenAI
        </p>
      </TranslatorTypeTabs>
    </div>
  );
}
