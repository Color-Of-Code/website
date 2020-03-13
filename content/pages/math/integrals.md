---
published: true
path: "/math/integrals"
date: "2020-03-13"
title: "Integrals"
tags: ["math", "integrals"]
---
## Integrals

* $a$, $b$, $c$, $\alpha$, $\beta$ are constants
* $f$, $g$, $u$ are functions of a variable $x$

## Basic properties

### Properties

1. $$ \int _a ^a f(x)dx = 0 $$
2. $$ \int _b ^a f(x)dx = - \int _a ^b f(x)dx $$

3. Chasles' theorem:

$$ \int _a ^b f(x)dx + \int _b ^c f(x)dx = \int _a ^c f(x)dx $$

### Linearity

$$ \int (\alpha f(x) + \beta g(x)) dx = \alpha \int f(x) dx + \beta \int g(x) dx $$

### Integration by substitution

$$ \int _a ^b (f \circ g) (t) g'(t) dt = \int _{g(a)} ^{g(b)} f(x) dx $$
when substituting $x = g(t)$

### Integration by parts

$$ \int f(x) g'(x) dx = f(x) g(x) - \int f'(x) g(x) dx $$

## Common integrals

### Polynomials

$$ \int dx = x +c $$

$$ \int x^{n}dx = \frac {1}{n+1} x^{n+1}+c $$

### Others

$$ \int \frac {u'} {u} dx = ln |u| + c $$

$$ \int \frac {-u'} {u^2} dx = \frac {1} {u} + c $$

## Common primitive functions

| $f(x)$ | Domain $I$ | $F(x)$ |
| ---  | --- | --- |
| $x^n$  | $\Bbb{R}$ | $\frac{x^{n+1}}{n+1}$ |
| $1/x$  | $]0,+\infty[$ | $\ln x$ |
| $\ln x$  | $]0,+\infty[$ | $x\ln x -x$ |
| $e^x$  | $\Bbb{R}$ | $e^x$ |
| $\cos x$  | $\Bbb{R}$ | $\sin x$ |
| $\sin x$  | $\Bbb{R}$ | $-\cos x$ |
| $\tan x$  | $\Bbb{R}$ | $-\ln \mid\cos x\mid$ |
| $\sinh x$  | $\Bbb{R}$ | $\cosh x$ |
| $\cosh x$  | $\Bbb{R}$ | $\sinh x$ |
| $\tanh x$  | $\Bbb{R}$ | $\ln(\cosh x)$ |
