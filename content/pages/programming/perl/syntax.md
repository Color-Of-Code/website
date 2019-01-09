---
published: true
path: "/programming/perl/syntax"
date: "2019-01-07"
title: "PERL"
tags: ["programming", "perl", "syntax", "TODO_cleanup"]
---
# Perl programming language

**perl**:  Practical Extraction and Report Language

## Regular expressions

* %%{[(%%)^$.|*+?\   are metacharacters (must be escaped)
* regexes        consume as much input as possible (greedy by default)\\ 
* \b    matches word boundary      \B    means not a word boundary
* \<    start of a word            \>    end of a word\\ 
* ^     start of string            $     end of string
* ()    grouping
* [     begin of a character class
* |     this or that, alternative match\\ 

## Quantifiers

* a? match 'a' 1 or 0 times 
* a*     match 'a' 0 or more times, i.e., any number of times a+     match 'a' 1 or more times, i.e., at least once a{n,m} match at least n times, but not more than m times. a{n,} match at least n or more times a{n} match exactly n times 

## Not Greedy

* a?? match 'a' 1 or 0 times smallest match
* a*?, a+?, a{n,m}? work similarly for the corresponding quantifier\\ 

## Lookahead ( ~ logical AND)

* (?=pattern) consumes nothing only if pattern matches
* (?!pattern)  consumes nothing only if pattern does not match

## Lookbehind (must be of fixed size)

* (?<=pattern) consumes nothing only if pattern matches on the left side\\ 
* (?<!pattern)  consumes nothing only if pattern does not match on the left side

## Character classes

* .     [^\n]
* \s    [\x20\f\t\r\n]       \S   [^\s]   (negation of \s)\\ 
* \w    [A-Za-z0-9_]         \W   [^\w] (negation of \w)
* \d    [0-9]                \D   [^\d] (negation of \d)
* \l    [a-z]                \L   [^\l]   (negation of \l)
* \u    [A-Z]                \U   [^\u] (negation of \u)

## Escape sequences

* \f    form feed
* \n    newline
* \r    return
* \t    tabulator
* \v    vertical tabulator

## Variables

* $_    default variable
* $0    program name
* $/    input separator
* $\    output separator
* $|    autoflush
* $!    sys/libcall error
* $@    eval error
* $$    process ID
* $.    line number
* @ARGV command line args
* @INC  include paths
* @_    subroutine args
* %ENV  environment
