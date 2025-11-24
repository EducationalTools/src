import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, RefreshCw } from "lucide-react";
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
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Markdown Preview</h1>
          <p className="text-muted-foreground mt-2">
            Write markdown and see it rendered in real-time
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Markdown</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  Load Sample
                </Button>
                <Button variant="ghost" size="sm" onClick={clear}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <textarea
              className="w-full h-[600px] p-4 border rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Enter markdown here..."
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(markdown)}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy Markdown
            </Button>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Preview</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(parseMarkdown(markdown))}
              >
                <Copy className="mr-2 h-4 w-4" /> Copy HTML
              </Button>
            </div>
            <div className="h-[600px] overflow-auto p-4 border rounded-md bg-muted/30 prose prose-sm dark:prose-invert max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
              />
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-muted/50">
          <h3 className="text-lg font-semibold mb-2">Markdown Syntax Guide</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <div className="font-semibold mb-1">Headers</div>
              <div># H1, ## H2, ### H3</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Emphasis</div>
              <div>**bold**, *italic*</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Code</div>
              <div>`inline`, ```block```</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Links</div>
              <div>[text](url)</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Lists</div>
              <div>- item, 1. item</div>
            </div>
            <div>
              <div className="font-semibold mb-1">Images</div>
              <div>![alt](url)</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

