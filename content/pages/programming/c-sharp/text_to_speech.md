---
published: true
path: "/programming/c-sharp/text-to-speech"
date: "2018-12-25"
title: "Text to Speech"
tags: ["programming", "csharp", "text to speech", "TODO_cleanup"]
---
# C# Text to Speech

## Assembly (reference)

```csharp
System.Speech
```

## Using directive

```csharp
using System.Speech.Synthesis;
```

## Code: say "hello world"

```csharp
SpeechSynthesizer speaker = new SpeechSynthesizer();
speaker.Rate = 1;
speaker.Volume = 100;
speaker.SelectVoiceByHints(VoiceGender.Female, VoiceAge.Adult);
speaker.SpeakAsync("Hello World");
```

## Code: list available voices

```csharp
SpeechSynthesizer speaker = new SpeechSynthesizer();
speaker.GetInstalledVoices()
```
