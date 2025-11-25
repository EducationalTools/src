import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardPaste, Trash2 } from "lucide-react";

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
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Word Counter</h1>
        <p className="text-muted-foreground text-lg">
          Count words, characters, sentences, and paragraphs in your text.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="flex flex-col shadow-md">
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b space-y-0">
                 <CardTitle className="text-base font-medium">Input Text</CardTitle>
                 <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handlePaste} className="h-8 px-2 text-xs">
                        <ClipboardPaste className="w-3.5 h-3.5 mr-1" /> Paste
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleClear} className="h-8 px-2 text-xs">
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here..."
                className="w-full min-h-[300px] p-6 border-none bg-transparent text-base focus:outline-none resize-y font-mono"
                />
            </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatsCard label="Words" value={stats.wordCount} />
          <StatsCard label="Characters" value={stats.characterCount} />
          <StatsCard label="Characters (no spaces)" value={stats.characterCountNoSpaces} />
          <StatsCard label="Sentences" value={stats.sentenceCount} />
          <StatsCard label="Paragraphs" value={stats.paragraphCount} />
          <StatsCard label="Reading Time" value={`${stats.readingTime} min`} />
        </div>
      </div>
    </div>
  );
}

function StatsCard({ label, value }: { label: string; value: string | number }) {
    return (
        <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                    {label}
                </div>
                <div className="text-3xl font-bold tracking-tight">
                    {value}
                </div>
            </CardContent>
        </Card>
    )
}
