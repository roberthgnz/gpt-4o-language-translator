import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function translateText(prompt: string, from: string, to: string) {
    const { text, finishReason, usage } = await generateText({
        model: openai('gpt-4o'),
        system: `You are a Language Translator. Translate from ${from} to ${to}. Always just return the translation of the prompt.`,
        maxTokens: 4096,
        temperature: 0,
        prompt,
    });

    return { text, finishReason, usage };
}