---
published: true
path: "/math/derivatives"
date: "2020-03-12"
title: "Derivatives"
tags: ["math", "derivatives"]
---
## Derivatives

### Definition

$$f'(x)= \lim_ {h \to 0} \frac{f(x+h) - f(x)}{h}$$

### Formula

* $c$ is a constant
* $f$, $g$ are functions of a variable $x$

### Basic properties

* Linearity

$$(cf+g)'=cf'+g'$$

* Product

$$(f.g)'=f'.g + g'.f$$

* Inverse (Quotient with $f=1$)

$$(\frac{1}{g})'=\frac{-g'}{g^2}$$

* Quotient

$$(\frac{f}{g})'=\frac{f'.g-g'.f}{g^2}$$

* Chain

$$(g \circ f)'=(g' \circ f) . f'$$

### Usual functions

| $f(x)$ | Domain $I$ | $f'(x)$ |
| ---  | --- | --- |
| $c$  | $\Bbb{R}$ | $0$ |
| $x$  | $\Bbb{R}$ | $1$ |
| $x^n$ ($n\in\Bbb{N^*}$) | $\Bbb{R}$ | $nx^{n-1}$ |
| $\ln x$ | $]0,+\infty[$ | $1/x$ |
| $e^x$  | $\Bbb{R}$ | $e^x$ |
| $\cos x$  | $\Bbb{R}$ | $-\sin x$ |
| $\sin x$  | $\Bbb{R}$ | $\cos x$ |
| $\tan x$  | $]-\pi/2,+\pi/2[$ | $1+\tan^2 x = 1/\cos^2 x$ |
| $\ch x$  | $\Bbb{R}$ | $\sh x$ |
| $\sh x$  | $\Bbb{R}$ | $\ch x$ |
| $\th x$  | $\Bbb{R}$ | $1/\ch^2 x = 1 - \th^2 x$ |
