import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmedText = text.trim();

    // Character count
    const characterCount = text.length;
    const characterCountNoSpaces = text.replace(/\s/g, "").length;

    // Word count
    const wordCount = trimmedText
      ? trimmedText.split(/\s+/).filter(word => word.length > 0).length
      : 0;

    // Sentence count
    const sentenceCount = trimmedText
      ? trimmedText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length
      : 0;

    // Paragraph count
    const paragraphCount = trimmedText
      ? trimmedText.split(/\n\n+/).filter(para => para.trim().length > 0).length
      : 0;

    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(wordCount / 200);

    return {
      characterCount,
      characterCountNoSpaces,
      wordCount,
      sentenceCount,
      paragraphCount,
      readingTime,
    };
  }, [text]);

  const handleClear = () => {
    setText("");
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Word Counter</h1>
          <p className="text-muted-foreground mt-2">
            Count words, characters, sentences, and paragraphs in your text
          </p>
        </div>

        <div className="bg-card border rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handlePaste}>
                Paste
              </Button>
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="w-full min-h-[300px] p-4 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y font-mono"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card border rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Words
            </div>
            <div className="text-3xl font-bold">{stats.wordCount}</div>
          </div>

          <div className="bg-card border rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Characters
            </div>
            <div className="text-3xl font-bold">{stats.characterCount}</div>
          </div>

          <div className="bg-card border rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Characters (no spaces)
            </div>
            <div className="text-3xl font-bold">
              {stats.characterCountNoSpaces}
            </div>
          </div>

          <div className="bg-card border rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Sentences
            </div>
            <div className="text-3xl font-bold">{stats.sentenceCount}</div>
          </div>

          <div className="bg-card border rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Paragraphs
            </div>
            <div className="text-3xl font-bold">{stats.paragraphCount}</div>
          </div>

          <div className="bg-card border rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Reading Time
            </div>
            <div className="text-3xl font-bold">
              {stats.readingTime} min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
