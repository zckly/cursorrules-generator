"use client";

import { toast } from "~/hooks/use-toast";
/* eslint-disable react/no-unescaped-entities */
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SettingsDialogProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  anthropicApiKey: string;
  setAnthropicApiKey: (key: string) => void;
  openaiApiKey: string;
  setOpenaiApiKey: (key: string) => void;
  saveSettings: () => void;
}

export function SettingsDialog({
  selectedModel,
  setSelectedModel,
  anthropicApiKey,
  setAnthropicApiKey,
  openaiApiKey,
  setOpenaiApiKey,
  saveSettings,
}: SettingsDialogProps) {
  const handleSave = () => {
    saveSettings();
    toast({
      title: "Settings saved",
      description: "Your settings have been saved.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer text-sm text-white underline">
          Settings
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Make changes to the model settings here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Model
            </Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="claude-3-5-sonnet">
                  Claude 3.5 Sonnet
                </SelectItem>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="NotDiamond">NotDiamond</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid items-center gap-4">
            <Label htmlFor="anthropic-api-key" className="text-left">
              Anthropic API Key
            </Label>
            <Input
              id="anthropic-api-key"
              className="w-full"
              value={anthropicApiKey}
              onChange={(e) => setAnthropicApiKey(e.target.value)}
              placeholder="sk-ant-api03-..."
            />
          </div>
          <div className="grid items-center gap-4">
            <Label htmlFor="openai-api-key" className="text-left">
              OpenAI API Key
            </Label>
            <Input
              id="openai-api-key"
              className="w-full"
              value={openaiApiKey}
              onChange={(e) => setOpenaiApiKey(e.target.value)}
              placeholder="sk-..."
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSave}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
