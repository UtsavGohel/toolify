"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Text, Copy, RefreshCw } from "lucide-react";

const LOREM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "ut",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "dolor",
  "in",
  "reprehenderit",
  "in",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "dolore",
  "eu",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "in",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
];

export function LoremIpsum() {
  const [type, setType] = useState<"words" | "sentences" | "paragraphs">(
    "paragraphs"
  );
  const [count, setCount] = useState<number>(3);
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [result, setResult] = useState<string>("");

  const generateText = () => {
    let text = "";

    if (type === "words") {
      const words = [...LOREM_WORDS];
      if (startWithLorem) {
        text = "Lorem ipsum ";
        for (let i = 2; i < count; i++) {
          text += words[Math.floor(Math.random() * words.length)] + " ";
        }
      } else {
        for (let i = 0; i < count; i++) {
          text += words[Math.floor(Math.random() * words.length)] + " ";
        }
      }
      text = text.trim();
    } else if (type === "sentences") {
      for (let i = 0; i < count; i++) {
        let sentence = "";
        const wordCount = Math.floor(Math.random() * 10) + 5;

        if (i === 0 && startWithLorem) {
          sentence =
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
        } else {
          for (let j = 0; j < wordCount; j++) {
            sentence +=
              LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)] + " ";
          }
          sentence = sentence.trim() + ". ";
        }
        text += sentence;
      }
    } else if (type === "paragraphs") {
      for (let i = 0; i < count; i++) {
        let paragraph = "";
        const sentenceCount = Math.floor(Math.random() * 3) + 3;

        for (let j = 0; j < sentenceCount; j++) {
          let sentence = "";
          const wordCount = Math.floor(Math.random() * 10) + 5;

          if (i === 0 && j === 0 && startWithLorem) {
            sentence =
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
          } else {
            for (let k = 0; k < wordCount; k++) {
              sentence +=
                LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)] +
                " ";
            }
            sentence = sentence.trim() + ". ";
          }
          paragraph += sentence;
        }
        text += paragraph + "\n\n";
      }
    }

    setResult(text.trim());
  };

  const copyText = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Text className="mr-2 h-5 w-5" />
          Lorem Ipsum Generator
        </CardTitle>
        <CardDescription>
          Generate the placeholders for the text of your designs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="result">Result</TabsTrigger>
          </TabsList>
          <TabsContent value="generate" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={type}
                  onValueChange={(value) =>
                    setType(value as "words" | "sentences" | "paragraphs")
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="words">Words</SelectItem>
                    <SelectItem value="sentences">Sentences</SelectItem>
                    <SelectItem value="paragraphs">Paragraphs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label htmlFor="count">Count: {count}</Label>
                  <span className="text-sm text-muted-foreground">
                    {type === "words"
                      ? "1-100"
                      : type === "sentences"
                      ? "1-20"
                      : "1-10"}
                  </span>
                </div>
                <Slider
                  id="count"
                  min={1}
                  max={type === "words" ? 100 : type === "sentences" ? 20 : 10}
                  step={1}
                  value={[count]}
                  onValueChange={(value) => setCount(value[0])}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="lorem"
                  checked={startWithLorem}
                  onCheckedChange={setStartWithLorem}
                />
                <Label htmlFor="lorem">
                  Start with &quot;Lorem ipsum&quot;
                </Label>
              </div>

              <Button onClick={generateText} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Lorem Ipsum
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="result" className="space-y-4">
            <div className="relative">
              <Textarea
                value={result}
                readOnly
                className="min-h-[200px] resize-y font-mono text-sm"
                placeholder="Your lorem ipsum text will appear here..."
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2"
                onClick={copyText}
                disabled={!result}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
