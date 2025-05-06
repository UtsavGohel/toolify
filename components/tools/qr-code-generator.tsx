"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QrCode, Download, Smartphone, Link as LinkIcon } from "lucide-react";
import QRCode from "qrcode";
import Image from "next/image";

export function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(200);
  const [qrCode, setQrCode] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [format, setFormat] = useState("svg");
  const [errorCorrection, setErrorCorrection] = useState("M");

  const qrRef = useRef<HTMLDivElement>(null);

  const generateQR = async () => {
    if (!text) {
      setQrCode("");
      return;
    }

    try {
      // Define options with proper type assertion
      const options: any = {
        errorCorrectionLevel: errorCorrection,
        margin: 1,
        width: size,
        color: {
          dark: color,
          light: bgColor,
        },
      };

      // Handle different format types
      if (format === "jpeg" || format === "webp") {
        options.type = format === "jpeg" ? "image/jpeg" : "image/webp";
        // Add quality only if needed and supported
        if (format === "jpeg") {
          options.rendererOpts = {
            quality: 0.9,
          };
        }
      } else {
        // For PNG (default)
        options.type = "image/png";
      }

      const url = await QRCode.toDataURL(text, options);
      setQrCode(String(url));
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  // Generate QR code whenever text changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isValidUrl(text)) {
        generateQR();
      } else {
        setQrCode(""); // Clear QR code if URL is invalid
      }
    }, 300); // Debounce for better performance

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, size, color, bgColor, format, errorCorrection]);

  const downloadQR = () => {
    if (!qrCode) return;

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `qrcode.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // URL validation
  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <QrCode className="mr-2 h-5 w-5" />
          QR Code Generator
        </CardTitle>
        <CardDescription>Create customizable QR codes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">URL</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="url">Enter URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="url"
                  type="url"
                  value={text}
                  onChange={handleTextChange}
                  placeholder="https://example.com"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  disabled={!text || !isValidUrl(text)}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
              {text && !isValidUrl(text) && (
                <p className="text-sm text-destructive">
                  Please enter a valid URL
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="text">Enter Text</Label>
              <div className="flex space-x-2">
                <Input
                  id="text"
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Enter text for QR code"
                  className="flex-1"
                />
                <Button variant="outline" size="icon" disabled={!text}>
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label htmlFor="size">Size: {size}px</Label>
                  <span className="text-sm text-muted-foreground">100-500</span>
                </div>
                <Slider
                  id="size"
                  min={100}
                  max={500}
                  step={10}
                  value={[size]}
                  onValueChange={(value) => setSize(value[0])}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="color">Foreground Color</Label>
                <div className="flex space-x-2">
                  <div
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: color }}
                  />
                  <Input
                    id="color"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-8"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bgColor">Background Color</Label>
                <div className="flex space-x-2">
                  <div
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: bgColor }}
                  />
                  <Input
                    id="bgColor"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full h-8"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="format">Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="svg">SVG</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="errorCorrection">Error Correction</Label>
                <Select
                  value={errorCorrection}
                  onValueChange={setErrorCorrection}
                >
                  <SelectTrigger id="errorCorrection">
                    <SelectValue placeholder="Error correction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Low (7%)</SelectItem>
                    <SelectItem value="M">Medium (15%)</SelectItem>
                    <SelectItem value="Q">Quartile (25%)</SelectItem>
                    <SelectItem value="H">High (30%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div
              className="flex flex-col items-center justify-center space-y-4"
              ref={qrRef}
            >
              {qrCode ? (
                <>
                  <div className="relative p-4 border rounded-lg bg-white">
                    <Image
                      src={qrCode}
                      alt="QR Code"
                      className="mx-auto"
                      width={Math.min(size, 300)}
                      height={Math.min(size, 300)}
                    />
                  </div>

                  <Button onClick={downloadQR} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code
                  </Button>
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-64 border rounded-lg bg-muted/20">
                  <p className="text-muted-foreground">
                    Enter text to generate a QR code
                  </p>
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
