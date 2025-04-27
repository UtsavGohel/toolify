"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, FileText, Trash } from "lucide-react";

export function WordCounter() {
  const [text, setText] = useState("");

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: text.trim() === "" ? 0 : text.trim().split(/\s+/).length,
    sentences: text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length,
    paragraphs: text.trim() === "" ? 0 : text.split(/\n+/).filter(Boolean).length,
    readingTime: Math.max(1, Math.ceil(text.trim() === "" ? 0 : text.trim().split(/\s+/).length / 225))
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
  };

  const clearText = () => {
    setText("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Word Counter
        </CardTitle>
        <CardDescription>
          Count words, characters, and estimate reading time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="text">Enter your text</Label>
            <div className="relative">
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="min-h-[200px] resize-y"
              />
              <div className="absolute bottom-2 right-2 flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={copyText}
                  disabled={!text}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={clearText}
                  disabled={!text}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Stats</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Stats</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <StatCard title="Words" value={stats.words} />
                <StatCard title="Characters" value={stats.characters} />
                <StatCard title="Paragraphs" value={stats.paragraphs} />
                <StatCard 
                  title="Reading Time" 
                  value={`${stats.readingTime} min${stats.readingTime === 1 ? '' : 's'}`} 
                />
              </div>
            </TabsContent>
            <TabsContent value="detailed" className="space-y-4">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <StatCard title="Words" value={stats.words} />
                <StatCard title="Characters" value={stats.characters} />
                <StatCard 
                  title="Characters (no spaces)" 
                  value={stats.charactersNoSpaces} 
                />
                <StatCard title="Sentences" value={stats.sentences} />
                <StatCard title="Paragraphs" value={stats.paragraphs} />
                <StatCard 
                  title="Reading Time" 
                  value={`${stats.readingTime} min${stats.readingTime === 1 ? '' : 's'}`} 
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="rounded-lg border bg-card p-3 text-center shadow-sm">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}