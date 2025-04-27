"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Binary, Copy, Trash, ArrowDownUp } from "lucide-react";

export function Base64Converter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [encoding, setEncoding] = useState("utf-8");
  
  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(inputText)));
      setOutputText(encoded);
    } catch (e) {
      setOutputText("Error: Invalid input for encoding");
    }
  };
  
  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(inputText)));
      setOutputText(decoded);
    } catch (e) {
      setOutputText("Error: Invalid Base64 input");
    }
  };
  
  const handleProcess = () => {
    if (!inputText) return;
    if (mode === "encode") {
      handleEncode();
    } else {
      handleDecode();
    }
  };
  
  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };
  
  const handleSwap = () => {
    setInputText(outputText);
    setOutputText("");
    setMode(mode === "encode" ? "decode" : "encode");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Binary className="mr-2 h-5 w-5" />
          Base64 Encoder/Decoder
        </CardTitle>
        <CardDescription>
          Convert text to and from Base64 encoding
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex justify-between items-center">
            <RadioGroup 
              value={mode} 
              onValueChange={(value) => setMode(value as "encode" | "decode")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="encode" id="encode" />
                <Label htmlFor="encode">Encode to Base64</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="decode" id="decode" />
                <Label htmlFor="decode">Decode from Base64</Label>
              </div>
            </RadioGroup>
            
            <Button variant="outline" size="icon" onClick={handleSwap} disabled={!outputText}>
              <ArrowDownUp className="h-4 w-4" />
              <span className="sr-only">Swap</span>
            </Button>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="input">
              {mode === "encode" ? "Text to encode" : "Base64 to decode"}
            </Label>
            <Textarea
              id="input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === "encode" ? "Enter text to encode to Base64..." : "Enter Base64 to decode..."}
              className="min-h-[120px]"
            />
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleClear} disabled={!inputText && !outputText}>
              <Trash className="mr-2 h-4 w-4" />
              Clear
            </Button>
            <Button onClick={handleProcess} disabled={!inputText}>
              {mode === "encode" ? "Encode" : "Decode"}
            </Button>
          </div>
          
          {outputText && (
            <div className="grid gap-2 mt-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="output">Result</Label>
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
              <Textarea
                id="output"
                value={outputText}
                readOnly
                className="min-h-[120px] font-mono text-sm"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}