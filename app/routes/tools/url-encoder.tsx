import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiCopy, PiArrowClockwise, PiLink, PiGlobe } from "react-icons/pi";
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
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          URL Encoder/Decoder
        </h1>
        <p className="text-muted-foreground text-lg">
          Encode and decode URLs and URL components.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <PiLink className="w-4 h-4 text-muted-foreground" />
              Decoded URL
            </CardTitle>
            {decoded && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(decoded)}
                className="h-8 px-2 text-xs"
              >
                <PiCopy className="mr-2 h-3.5 w-3.5" /> Copy
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <textarea
              placeholder="Enter URL or text to encode..."
              value={decoded}
              onChange={(e) => handleDecodedChange(e.target.value)}
              className="w-full h-full min-h-[200px] p-4 border-none bg-transparent font-mono text-sm resize-none focus:outline-none"
            />
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between py-4 border-b">
            <CardTitle className="text-base flex items-center gap-2">
              <PiGlobe className="w-4 h-4 text-muted-foreground" />
              Encoded URL
            </CardTitle>
            {encoded && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(encoded)}
                className="h-8 px-2 text-xs"
              >
                <PiCopy className="mr-2 h-3.5 w-3.5" /> Copy
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <textarea
              placeholder="Enter encoded URL to decode..."
              value={encoded}
              onChange={(e) => handleEncodedChange(e.target.value)}
              className="w-full h-full min-h-[200px] p-4 border-none bg-transparent font-mono text-sm resize-none focus:outline-none"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={clear}>
          <PiArrowClockwise className="mr-2 h-4 w-4" /> Clear All
        </Button>
      </div>

      <Card className="bg-muted/50 border-none shadow-none">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">About URL Encoding</h3>
          <p className="text-sm text-muted-foreground mb-2">
            URL encoding converts characters into a format that can be
            transmitted over the Internet. Special characters are replaced with
            a percent sign (%) followed by two hexadecimal digits.
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Space becomes %20</li>
            <li>Special characters are encoded (e.g., & becomes %26)</li>
            <li>Used in query strings, form data, and URLs</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
