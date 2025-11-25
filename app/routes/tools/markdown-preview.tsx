import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCw, FileText, Eye } from "lucide-react";
import { toast } from "sonner";

// Simple markdown parser
function parseMarkdown(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
  html = html.replace(/__(.*?)__/gim, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");
  html = html.replace(/_(.*?)_/gim, "<em>$1</em>");

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>");
  html = html.replace(/`([^`]+)`/gim, "<code>$1</code>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" />');

  // Lists
  html = html.replace(/^\* (.*$)/gim, "<li>$1</li>");
  html = html.replace(/^- (.*$)/gim, "<li>$1</li>");
  html = html.replace(/^\+ (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

  // Ordered lists
  html = html.replace(/^\d+\. (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/s, "<ol>$1</ol>");

  // Line breaks
  html = html.replace(/\n\n/gim, "</p><p>");
  html = html.replace(/\n/gim, "<br />");

  // Wrap in paragraph if not already wrapped
  if (!html.startsWith("<")) {
    html = "<p>" + html + "</p>";
  }

  return html;
}

const SAMPLE_MARKDOWN = `# Markdown Preview

This is a **markdown preview** tool. You can write markdown and see it rendered in real-time.

## Features

- Real-time preview
- Support for common markdown syntax
- Easy to use

### Code Example

Here's some \`inline code\` and a code block:

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Links and Images

[Visit Example](https://example.com)

### Lists

1. First item
2. Second item
3. Third item

**Bold text** and *italic text* are supported.`;

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const clear = () => {
    setMarkdown("");
  };

  const loadSample = () => {
    setMarkdown(SAMPLE_MARKDOWN);
  };

  return (
    <div className="container mx-auto p-6 max-w-[1600px] h-[calc(100vh-4rem)] flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Markdown Preview</h1>
        <p className="text-muted-foreground text-lg">
          Write markdown and see it rendered in real-time.
        </p>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-6 min-h-0 pb-6">
        <Card className="flex flex-col min-h-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b space-y-0">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Markdown
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={loadSample} className="h-8 px-2 text-xs">
                Load Sample
              </Button>
              <Button variant="ghost" size="sm" onClick={clear} className="h-8 px-2 text-xs">
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Clear
              </Button>
               <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(markdown)}
                className="h-8 px-2 text-xs"
              >
                <Copy className="mr-2 h-3.5 w-3.5" /> Copy MD
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 relative">
            <textarea
              className="absolute inset-0 w-full h-full p-4 bg-transparent font-mono text-sm resize-none focus:outline-none focus:ring-0"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Enter markdown here..."
            />
          </CardContent>
        </Card>

        <Card className="flex flex-col min-h-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b space-y-0">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(parseMarkdown(markdown))}
              className="h-8 px-2 text-xs"
            >
              <Copy className="mr-2 h-3.5 w-3.5" /> Copy HTML
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 relative bg-white dark:bg-zinc-950 overflow-hidden rounded-b-lg">
             <div className="absolute inset-0 w-full h-full overflow-auto p-6 prose prose-sm dark:prose-invert max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
