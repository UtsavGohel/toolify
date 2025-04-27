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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Copy, KeyRound, RefreshCw, Eye, EyeOff } from "lucide-react";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [showPassword, setShowPassword] = useState(false);

  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const [passwordStrength, setPasswordStrength] = useState(0);

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+{}[]|:;<>,.?/~`-=";

    let chars = "";
    if (includeLowercase) chars += lowercase;
    if (includeUppercase) chars += uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === "") {
      // Default to lowercase if nothing selected
      chars = lowercase;
      setIncludeLowercase(true);
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }

    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  const calculateStrength = (pass: string) => {
    let strength = 0;

    // Length
    if (pass.length >= 8) strength += 1;
    if (pass.length >= 12) strength += 1;
    if (pass.length >= 16) strength += 1;

    // Complexity
    if (/[a-z]/.test(pass)) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(pass)) strength += 1;

    // Normalize to 0-100
    setPasswordStrength(Math.min(100, (strength / 7) * 100));
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  };

  const getStrengthLabel = () => {
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 70) return "Good";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (passwordStrength < 40) return "destructive";
    if (passwordStrength < 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <KeyRound className="mr-2 h-5 w-5" />
          Password Generator
        </CardTitle>
        <CardDescription>Create strong, secure passwords</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="relative">
            <Input
              value={password}
              type={showPassword ? "text" : "password"}
              readOnly
              placeholder="Generated password will appear here"
              className="pr-20 font-mono"
            />
            <div className="absolute right-1 top-1 flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="h-8 w-8"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyPassword}
                disabled={!password}
                className="h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* {password && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Strength: {getStrengthLabel()}</span>
                <span>{Math.round(passwordStrength || 0)}%</span>
              </div>
              <Progress
                value={passwordStrength || 1}
                className={getStrengthColor()}
              />
            </div>
          )} */}
          {/* {password && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Strength: {getStrengthLabel()}</span>
                <span>{Math.round(passwordStrength || 0)}%</span>
              </div>
              <div className={getStrengthColor()}>
                <Progress value={passwordStrength || 1} />
              </div>
            </div>
          )}
           */}
          {/* {password && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Strength: {getStrengthLabel()}</span>
                <span>{Math.round(passwordStrength || 0)}%</span>
              </div>
              <Progress
                value={passwordStrength || 1}
                indicatorClassName={getStrengthColor()}
              />
            </div>
          )} */}
          {/* 
          {password && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Strength: {getStrengthLabel()}</span>
                <span>{Math.round(passwordStrength || 0)}%</span>
              </div>
              <Progress
                value={passwordStrength || 1}
                indicatorClassName={getStrengthColor()} // Correct function call
              />
            </div>
          )} */}

          {/* {password && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Strength: {getStrengthLabel()}</span>
                <span>{Math.round(passwordStrength || 0)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-300 rounded-full">
                <div
                  className={`h-full ${getStrengthColor()}`}
                  style={{ width: `${passwordStrength || 0}%` }}
                />
              </div>
            </div>
          )} */}

          {password && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Strength: {getStrengthLabel()}</span>
                <span>{Math.round(passwordStrength || 0)}%</span>
              </div>
              <div style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  value={passwordStrength || 0}
                  text={`${Math.round(passwordStrength || 0)}%`}
                  styles={{
                    path: {
                      stroke: getStrengthColor(),
                      strokeWidth: 8,
                    },
                  }}
                />
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="length">Length: {length}</Label>
              <span className="text-sm text-muted-foreground">8-32</span>
            </div>
            <Slider
              id="length"
              min={8}
              max={32}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={(checked) =>
                  setIncludeLowercase(checked as boolean)
                }
              />
              <Label htmlFor="lowercase">Lowercase (a-z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={(checked) =>
                  setIncludeUppercase(checked as boolean)
                }
              />
              <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={(checked) =>
                  setIncludeNumbers(checked as boolean)
                }
              />
              <Label htmlFor="numbers">Numbers (0-9)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={(checked) =>
                  setIncludeSymbols(checked as boolean)
                }
              />
              <Label htmlFor="symbols">Symbols (!@#$%)</Label>
            </div>
          </div>
          <Button onClick={generatePassword} className="w-full mt-2">
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
