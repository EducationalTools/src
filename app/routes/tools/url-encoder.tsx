import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy, RefreshCw, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

export default function UrlEncoder() {
  const [decoded, setDecoded] = useState("");
  const [encoded, setEncoded] = useState("");

  const encode = (text: string) => {
    try {
      return encodeURIComponent(text);
    } catch (error) {
      return "Error encoding";
    }
  };

  const decode = (text: string) => {
    try {
      return decodeURIComponent(text);
    } catch (error) {
      return "Error decoding";
    }
  };

  const handleDecodedChange = (value: string) => {
    setDecoded(value);
    setEncoded(encode(value));
  };

  const handleEncodedChange = (value: string) => {
    setEncoded(value);
    setDecoded(decode(value));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const clear = () => {
    setDecoded("");
    setEncoded("");
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">URL Encoder/Decoder</h1>
          <p className="text-muted-foreground mt-2">
            Encode and decode URLs and URL components
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Decoded URL</h2>
              {decoded && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(decoded)}
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
              )}
            </div>
            <Input
              placeholder="Enter URL or text to encode..."
              value={decoded}
              onChange={(e) => handleDecodedChange(e.target.value)}
              className="font-mono"
            />
            <div className="text-sm text-muted-foreground">
              Enter a URL or text to encode
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Encoded URL</h2>
              {encoded && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(encoded)}
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
              )}
            </div>
            <Input
              placeholder="Enter encoded URL to decode..."
              value={encoded}
              onChange={(e) => handleEncodedChange(e.target.value)}
              className="font-mono"
            />
            <div className="text-sm text-muted-foreground">
              Enter an encoded URL to decode
            </div>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button variant="ghost" onClick={clear}>
            <RefreshCw className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>

        {(decoded || encoded) && (
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Preview</div>
                <div className="bg-muted rounded-md p-4 space-y-2">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Decoded:</div>
                    <div className="font-mono text-sm break-all">{decoded || "(empty)"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Encoded:</div>
                    <div className="font-mono text-sm break-all">{encoded || "(empty)"}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6 bg-muted/50">
          <h3 className="text-lg font-semibold mb-2">About URL Encoding</h3>
          <p className="text-sm text-muted-foreground mb-2">
            URL encoding converts characters into a format that can be transmitted over
            the Internet. Special characters are replaced with a percent sign (%) followed
            by two hexadecimal digits.
          </p>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>• Space becomes %20</div>
            <div>• Special characters are encoded (e.g., & becomes %26)</div>
            <div>• Used in query strings, form data, and URLs</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

