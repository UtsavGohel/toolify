"use client";

import { useState, useEffect, useRef } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Copy, Palette, Eye } from "lucide-react";

export function ColorPicker() {
  const [color, setColor] = useState("#3B82F6");
  const [red, setRed] = useState(59);
  const [green, setGreen] = useState(130);
  const [blue, setBlue] = useState(246);
  const [hue, setHue] = useState(217);
  const [saturation, setSaturation] = useState(91);
  const [lightness, setLightness] = useState(60);
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return { r, g, b };
    }
    return { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h *= 60;
    }

    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  // Handle color picker mouse/touch events
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !colorPickerRef.current) return;

      const rect = colorPickerRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      // Calculate relative position
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

      // Convert position to HSL
      const newHue = Math.round(x * 360);
      const newSaturation = Math.round((1 - y) * 100);

      setHue(newHue);
      setSaturation(newSaturation);
      const { r, g, b } = hslToRgb(newHue, newSaturation, lightness);
      setRed(r);
      setGreen(g);
      setBlue(b);
      setColor(rgbToHex(r, g, b));
      addToRecent(rgbToHex(r, g, b));
    };

    const handleUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchend", handleUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, lightness]);

  // Update RGB and HSL from hex
  const updateFromHex = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    const { h, s, l } = rgbToHsl(r, g, b);

    setRed(r);
    setGreen(g);
    setBlue(b);
    setHue(h);
    setSaturation(s);
    setLightness(l);
  };

  // Update hex and HSL from RGB
  const updateFromRgb = (r: number, g: number, b: number) => {
    const hex = rgbToHex(r, g, b);
    const { h, s, l } = rgbToHsl(r, g, b);

    setColor(hex);
    setHue(h);
    setSaturation(s);
    setLightness(l);
  };

  // Update hex and RGB from HSL
  const updateFromHsl = (h: number, s: number, l: number) => {
    const { r, g, b } = hslToRgb(h, s, l);
    const hex = rgbToHex(r, g, b);

    setColor(hex);
    setRed(r);
    setGreen(g);
    setBlue(b);
  };

  // Add to recent colors
  const addToRecent = (newColor: string) => {
    if (recentColors[0] !== newColor) {
      const updatedColors = [
        newColor,
        ...recentColors.filter((c) => c !== newColor).slice(0, 9),
      ];
      setRecentColors(updatedColors);
    }
  };

  // Handle hex input change
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);

    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
      updateFromHex(newColor);
      addToRecent(newColor);
    }
  };

  // Handle RGB changes
  const handleRedChange = (value: number[]) => {
    const newRed = value[0];
    setRed(newRed);
    updateFromRgb(newRed, green, blue);
    addToRecent(rgbToHex(newRed, green, blue));
  };

  const handleGreenChange = (value: number[]) => {
    const newGreen = value[0];
    setGreen(newGreen);
    updateFromRgb(red, newGreen, blue);
    addToRecent(rgbToHex(red, newGreen, blue));
  };

  const handleBlueChange = (value: number[]) => {
    const newBlue = value[0];
    setBlue(newBlue);
    updateFromRgb(red, green, newBlue);
    addToRecent(rgbToHex(red, green, newBlue));
  };

  // Handle HSL changes
  const handleHueChange = (value: number[]) => {
    const newHue = value[0];
    setHue(newHue);
    updateFromHsl(newHue, saturation, lightness);
    addToRecent(color);
  };

  const handleSaturationChange = (value: number[]) => {
    const newSaturation = value[0];
    setSaturation(newSaturation);
    updateFromHsl(hue, newSaturation, lightness);
    addToRecent(color);
  };

  const handleLightnessChange = (value: number[]) => {
    const newLightness = value[0];
    setLightness(newLightness);
    updateFromHsl(hue, saturation, newLightness);
    addToRecent(color);
  };

  // Copy color formats
  const copyHex = () => navigator.clipboard.writeText(color);
  const copyRgb = () =>
    navigator.clipboard.writeText(`rgb(${red}, ${green}, ${blue})`);
  const copyHsl = () =>
    navigator.clipboard.writeText(`hsl(${hue}, ${saturation}%, ${lightness}%)`);

  // Initialize with the default color
  useEffect(() => {
    updateFromHex(color);
    setRecentColors([color]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="mr-2 h-5 w-5" />
          Color Picker
        </CardTitle>
        <CardDescription>
          Select and convert between color formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div
                ref={colorPickerRef}
                className="w-full aspect-square rounded-md border shadow-sm relative cursor-crosshair"
                style={{
                  background: `linear-gradient(to right, #fff 0%, hsl(${hue}, 100%, 50%) 100%)`,
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, #000 0%, transparent 100%)",
                  }}
                />
                <div
                  className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-md"
                  style={{
                    left: `${(hue / 360) * 100}%`,
                    top: `${(1 - saturation / 100) * 100}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              <div
                className="mt-4 w-full h-24 rounded-md border shadow-sm"
                style={{ backgroundColor: color }}
              />
            </div>

            <div className="flex-1 grid gap-4">
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="hex">Hex</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyHex}
                    className="h-8 w-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    id="hex"
                    value={color}
                    onChange={handleHexChange}
                    className="font-mono"
                  />
                  <div
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full border"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label>RGB</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyRgb}
                    className="h-8 w-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <ColorSlider
                    label="R"
                    value={red}
                    max={255}
                    onChange={handleRedChange}
                    color={`rgb(${red}, 0, 0)`}
                  />
                  <ColorSlider
                    label="G"
                    value={green}
                    max={255}
                    onChange={handleGreenChange}
                    color={`rgb(0, ${green}, 0)`}
                  />
                  <ColorSlider
                    label="B"
                    value={blue}
                    max={255}
                    onChange={handleBlueChange}
                    color={`rgb(0, 0, ${blue})`}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label>HSL</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyHsl}
                    className="h-8 w-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <ColorSlider
                    label="H"
                    value={hue}
                    max={360}
                    onChange={handleHueChange}
                    color={`hsl(${hue}, 100%, 50%)`}
                    suffix="°"
                  />
                  <ColorSlider
                    label="S"
                    value={saturation}
                    max={100}
                    onChange={handleSaturationChange}
                    color={`hsl(${hue}, ${saturation}%, 50%)`}
                    suffix="%"
                  />
                  <ColorSlider
                    label="L"
                    value={lightness}
                    max={100}
                    onChange={handleLightnessChange}
                    color={`hsl(${hue}, 100%, ${lightness}%)`}
                    suffix="%"
                  />
                </div>
              </div>
            </div>
          </div>

          {recentColors.length > 1 && (
            <div className="grid gap-2 mt-2">
              <Label>Recent Colors</Label>
              <div className="flex flex-wrap gap-2">
                {recentColors.map((recentColor, index) => (
                  <button
                    key={index}
                    className="w-8 h-8 rounded-full border shadow-sm hover:scale-110 transition-transform"
                    style={{ backgroundColor: recentColor }}
                    onClick={() => {
                      setColor(recentColor);
                      updateFromHex(recentColor);
                    }}
                    title={recentColor}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface ColorSliderProps {
  label: string;
  value: number;
  max: number;
  onChange: (value: number[]) => void;
  color: string;
  suffix?: string;
}

function ColorSlider({
  label,
  value,
  max,
  onChange,
  color,
  suffix = "",
}: ColorSliderProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span>{label}</span>
        <span>
          {value}
          {suffix}
        </span>
      </div>
      <Slider
        min={0}
        max={max}
        step={1}
        value={[value]}
        onValueChange={onChange}
        className="h-3"
      />
    </div>
  );
}
