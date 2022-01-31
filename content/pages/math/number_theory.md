---
published: true
path: "/math/number_theory"
date: "2022-01-31"
title: "Number theory"
tags: ["math", "number", 'theory']
---
## Number Theory

Links: https://oeis.org/

### Definition: Arithmetic Function

Functions from the natural numbers to the complex numbers

$$\{ f(n) = c \vert n \isin \mathbb{N}, c \isin \mathbb{C} \}$$

### Definition: Multiplicative Function

An arithmetic function $f$ is called multiplicative if for any pair $n$ and $m$ with $gcd(n, m) = 1$ we have $f(nm) = f(n)f(m)$ i.e. this property holds if $n$ and $m$ are coprime.

If this holds for any $n$ and $m$, then we call $f$ completely multiplicative.

### Notation: Sum over divisors

* $g$ is an arithmetic function
* $f$ is an arithmetic function defined from $g$ in this way:

$$f(n) = \sum _{ d \vert n } g(d)$$

### Lemma 1

**Property**: if the function $g$ is multiplicative, then so is $f$.

### Special Arithmetic Functions

* Identity

$$I(n) = \begin{cases}
      1 & \text{if $n$ = 1} \\
      0 & \text{otherwise}
    \end{cases}$$

* Unit

$$u(n) = 1 \quad \forall n \isin \mathbb{N}$$

* Natural number

$$N(n) = n \quad \forall n \isin \mathbb{N}$$

* Euler totient $\phi$

Number of natural numbers less than the argument that is relatively prime to the argument.

$$\phi(n) = \sum _{ k=1, gcd(k,n) = 1 } ^{n} 1$$

$\phi$ is multiplicative

* Möbius function $\mu$

$\mu(1) = 1$. $n \isin \mathbb{N}$. If $n$ is divisible by a square $m^2$ for some natural number $m$, then $\mu(n) = 0$. Note that this immediately implies that if $n$ is divisible by a prime to a power greater than 1, then $\mu(n) = 0$ since the square of that prime also divides it.

If no square divides $n$, then if the number of primes dividing $n$:

* is odd, then $\mu(n) = -1$
* is even, then $\mu(n) = 1$.

$\mu$ is multiplicative

$$\sum _{ d \vert n } \mu(d) = I(n)$$

* Number of divisors $d$

* Sum of divisors $\sigma$

### Definition: Dirichlet Convolution

$$(f \star g)(n) = \sum _{ d \vert n } f(d)g(\frac{n}{d})$$

Properties:

* $(f \star g) \star h = f \star (g \star h)$
* $f \star I = I \star f = f$
* if $f(1) ≠ 0$, then $f$ has an inverse $g$ such as $f \star g = I$
* $\phi = N \star \mu$
* $N = \sigma \star \mu$

### Dirichlet series

$$\sum _{n=1} ^{ \infty } \frac{f(n)}{n^s}$$

### Euler product

$$\sum _{n=1} ^{ \infty } \frac{1}{n^s} = \prod _{ p \isin \mathbb{P}} \frac{1}{1 - p^{-s}}$$
