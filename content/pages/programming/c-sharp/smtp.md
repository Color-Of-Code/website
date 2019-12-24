---
published: true
path: "/programming/c-sharp/smtp"
date: "2018-12-27"
title: "SMTP"
tags: ["programming", "csharp", "smtp"]
---

## C# SMTP

### Assembly (reference)

```csharp
System
```

### Using directive

```csharp
using System.Net.Mail;
```

### Code: send an Email

For details: [http://msdn.microsoft.com/en-us/library/system.net.mail.smtpclient.aspx](http://msdn.microsoft.com/en-us/library/system.net.mail.smtpclient.aspx)

```csharp
var client = new SmtpClient("SMTP mail server name or IP goes here");

// (do not use ';', this was used in previous API )
String to          = "Email recipients go here [',' separated]";
String from        = "Sender Email goes here";

MailMessage message = new MailMessage(from, to);
message.Subject     = "Email title goes here";
message.Body        = "Body text goes here";
client.Credentials  = CredentialCache.DefaultNetworkCredentials;

client.Send(message);
```
