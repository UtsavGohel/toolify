"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, Copy, Info } from "lucide-react";

interface RegexSample {
  name: string;
  pattern: string;
  flags: string;
  description: string;
}

const regexSamples: RegexSample[] = [
  {
    name: "Email",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: "g",
    description: "Matches email addresses",
  },
  {
    name: "URL",
    pattern:
      "https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)",
    flags: "g",
    description: "Matches URLs (http or https)",
  },
  {
    name: "IP Address",
    pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
    flags: "g",
    description: "Matches IPv4 addresses",
  },
  {
    name: "Date (YYYY-MM-DD)",
    pattern: "\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])",
    flags: "g",
    description: "Matches dates in YYYY-MM-DD format",
  },
  {
    name: "US Phone Number",
    pattern: "\\(?\\d{3}\\)?[-. ]?\\d{3}[-. ]?\\d{4}",
    flags: "g",
    description: "Matches US phone numbers in various formats",
  },
];

export function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const flagOptions = [
    { label: "Global (g)", value: "g", id: "global" },
    { label: "Case Insensitive (i)", value: "i", id: "case" },
    { label: "Multiline (m)", value: "m", id: "multiline" },
    { label: "Unicode (u)", value: "u", id: "unicode" },
    { label: "Sticky (y)", value: "y", id: "sticky" },
  ];

  const testRegex = () => {
    if (!pattern || !testText) {
      setMatches([]);
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      setIsValid(true);
      setErrorMessage("");

      // Find matches
      const allMatches: string[] = [];
      let match;
      if (flags.includes("g")) {
        while ((match = regex.exec(testText)) !== null) {
          allMatches.push(match[0]);
        }
      } else {
        match = regex.exec(testText);
        if (match) {
          allMatches.push(match[0]);
        }
      }

      setMatches(allMatches);
    } catch (e) {
      setIsValid(false);
      setErrorMessage((e as Error).message);
      setMatches([]);
    }
  };

  useEffect(() => {
    if (pattern && testText) {
      testRegex();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pattern, flags, testText]);

  const loadSample = (sample: RegexSample) => {
    setPattern(sample.pattern);
    setFlags(sample.flags);
  };

  const copyPattern = () => {
    navigator.clipboard.writeText(`/${pattern}/${flags}`);
  };

  const toggleFlag = (flag: string, checked: boolean) => {
    if (checked) {
      if (!flags.includes(flag)) {
        setFlags(flags + flag);
      }
    } else {
      setFlags(flags.replace(flag, ""));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="mr-2 h-5 w-5" />
          Regex Tester
        </CardTitle>
        <CardDescription>Test and debug regular expressions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tester" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tester">Tester</TabsTrigger>
            <TabsTrigger value="samples">Samples</TabsTrigger>
          </TabsList>

          <TabsContent value="tester" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pattern">Regular Expression</Label>
                  {pattern && (
                    <Button variant="ghost" size="sm" onClick={copyPattern}>
                      <Copy className="mr-1 h-3 w-3" />
                      Copy
                    </Button>
                  )}
                </div>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-muted-foreground">/</span>
                    </div>
                    <Input
                      id="pattern"
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      placeholder="Enter regex pattern"
                      className={`pl-6 pr-6 ${
                        !isValid ? "border-destructive" : ""
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-muted-foreground">/{flags}</span>
                    </div>
                  </div>
                </div>
                {!isValid && (
                  <p className="text-sm text-destructive">{errorMessage}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Flags</Label>
                <div className="flex flex-wrap gap-4">
                  {flagOptions.map((flag) => (
                    <div key={flag.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={flag.id}
                        checked={flags.includes(flag.value)}
                        onCheckedChange={(checked) =>
                          toggleFlag(flag.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={flag.id}>{flag.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="testText">Test Text</Label>
                <Textarea
                  id="testText"
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  placeholder="Enter text to test against the regular expression"
                  className="min-h-[150px]"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>
                    Matches {matches.length > 0 ? `(${matches.length})` : ""}
                  </Label>
                </div>
                {matches.length > 0 ? (
                  <div className="border rounded-md p-2 max-h-[150px] overflow-y-auto">
                    <ul className="space-y-1">
                      {matches.map((match, index) => (
                        <li
                          key={index}
                          className="text-sm font-mono bg-muted rounded px-2 py-1"
                        >
                          {match}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground border rounded-md p-4 flex items-center justify-center">
                    {pattern && testText
                      ? "No matches found"
                      : "Enter a pattern and test text to see matches"}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="samples" className="space-y-4">
            <p className="text-sm text-muted-foreground mb-2">
              Click on any sample to load it into the tester.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {regexSamples.map((sample, index) => (
                <AccordionItem key={index} value={`sample-${index}`}>
                  <AccordionTrigger className="hover:bg-muted/50 px-2 rounded-md">
                    <div className="flex items-center">
                      <Info className="mr-2 h-4 w-4 text-muted-foreground" />
                      {sample.name}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-2">
                    <div className="space-y-2">
                      <p className="text-sm">{sample.description}</p>
                      <div className="font-mono text-sm bg-muted p-2 rounded-md">
                        /{sample.pattern}/{sample.flags}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadSample(sample)}
                        className="w-full mt-2"
                      >
                        Load This Pattern
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
