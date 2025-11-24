import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const downloadQrCode = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `qrcode-${Date.now()}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            QR Code Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate QR codes for text, URLs, or other data
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="bg-card border rounded-lg shadow-sm p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Input
                placeholder="Enter text or URL..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <label className="text-sm font-medium">Size</label>
                <Tabs 
                  value={size.toString()} 
                  onValueChange={(v) => setSize(parseInt(v))}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="128">128x128</TabsTrigger>
                    <TabsTrigger value="256">256x256</TabsTrigger>
                    <TabsTrigger value="512">512x512</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Foreground</label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-12 h-12 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Background</label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-12 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-card border rounded-lg shadow-sm p-6 flex flex-col items-center justify-center space-y-6 min-h-[400px]">
            {text ? (
              <>
                <div className="p-4 rounded-lg border bg-white">
                  <QRCodeSVG
                    id="qr-code-svg"
                    value={text}
                    size={size > 280 ? 280 : size} // Visual cap for preview, real size for download
                    fgColor={fgColor}
                    bgColor={bgColor}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <Button onClick={downloadQrCode} className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download PNG
                </Button>
              </>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>Enter content to generate a QR code</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
