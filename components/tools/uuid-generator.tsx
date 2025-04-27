"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Hash, Copy, RefreshCw } from "lucide-react";

export function UUIDGenerator() {
  const [uuids, setUUIDs] = useState<string[]>([]);
  const [version, setVersion] = useState<string>("v4");
  const [format, setFormat] = useState<string>("standard");
  const [count, setCount] = useState<number>(5);
  
  const generateUUID = () => {
    const newUUIDs: string[] = [];
    
    for (let i = 0; i < count; i++) {
      let uuid = '';
      
      if (version === "v4") {
        uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      } else if (version === "v1") {
        // Simple mock of v1 (time-based) - Not a real implementation
        const timestamp = new Date().getTime().toString(16);
        uuid = `${timestamp.padStart(8, '0')}-xxxx-1xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      
      // Format UUID based on user preference
      if (format === "uppercase") {
        uuid = uuid.toUpperCase();
      } else if (format === "braces") {
        uuid = `{${uuid}}`;
      } else if (format === "no-hyphens") {
        uuid = uuid.replace(/-/g, '');
      }
      
      newUUIDs.push(uuid);
    }
    
    setUUIDs(newUUIDs);
  };
  
  const copyUUID = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
  };
  
  const copyAllUUIDs = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Hash className="mr-2 h-5 w-5" />
          UUID Generator
        </CardTitle>
        <CardDescription>
          Generate random UUIDs/GUIDs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="version" className="mb-1 block">Version</Label>
              <Select value={version} onValueChange={setVersion}>
                <SelectTrigger id="version">
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v4">UUID v4 (Random)</SelectItem>
                  <SelectItem value="v1">UUID v1 (Time-based)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="format" className="mb-1 block">Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard (lowercase)</SelectItem>
                  <SelectItem value="uppercase">Uppercase</SelectItem>
                  <SelectItem value="braces">With Braces</SelectItem>
                  <SelectItem value="no-hyphens">No Hyphens</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="count" className="mb-1 block">Count</Label>
              <RadioGroup 
                id="count" 
                value={count.toString()} 
                onValueChange={(value) => setCount(parseInt(value))}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="1" id="count-1" />
                  <Label htmlFor="count-1">1</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="5" id="count-5" />
                  <Label htmlFor="count-5">5</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="10" id="count-10" />
                  <Label htmlFor="count-10">10</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <Button onClick={generateUUID} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate UUID{count > 1 ? 's' : ''}
          </Button>
          
          {uuids.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <Label>Generated UUIDs</Label>
                {uuids.length > 1 && (
                  <Button variant="outline" size="sm" onClick={copyAllUUIDs}>
                    <Copy className="mr-1 h-3 w-3" />
                    Copy All
                  </Button>
                )}
              </div>
              
              <div className="rounded-md border divide-y">
                {uuids.map((uuid, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-card">
                    <code className="text-sm font-mono">{uuid}</code>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => copyUUID(uuid)}
                      className="h-8 w-8"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}