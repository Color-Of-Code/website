---
published: true
path: "/glossary/programming-terms"
date: "2018-12-26"
title: "Programming Terms"
tags: ["glossary", "programming", "terms", "TODO_cleanup"]
---

I often had trouble reading complicated explanations about some terms and the list here tries to make a definition that can be understood by normal human beings without theoretical mathematics and other higher level skills.

 | Letter | Term            | Meaning                                                                                                                                                                                                                                                                                       | 
 | ------ | ----            | -------                                                                                                                                                                                                                                                                                       | 
 | "A"    | ACID            | Atomicity, Consistency, Isolation, Durability. If a Database follows ACID rules then the operation will success and data will be stored or the operation will fail and the database remains in a safe state. Concurrent operations are handled transparently by the database. [More](https://en.wikipedia.org/wiki/ACID) | 
 | "A"    | Amdahl's Law    | Law used to predict the maximum possible performance speedup when adapting programs to use more processors. [More](https://en.wikipedia.org/wiki/Amdahl%27s_law)                                                                                                                                                         | 
 | "C"    | Coupling        | Objects or components are tightly coupled if they highly depend on each other what hinders their reuse and extendabilty. [More](https://en.wikipedia.org/wiki/Coupling_%28computer_science%29)                                                                                                                           | 
 | "D"    | Demeter's Law   | [More](https://en.wikipedia.org/wiki/Law_of_Demeter)                                                                                                                                                                                                                                                                     | 
 | "D"    | DRY principle   | **D**on't **R**epeat **Y**ourself [More](https://en.wikipedia.org/wiki/Don't_repeat_yourself)]                                                                                                                                                                                                                           | 
 | "K"    | KISS principle  | **K**eep **I**t **S**imple, **S**tupid! Avoid unnecessary complexity. [More](https://en.wikipedia.org/wiki/KISS_principle)                                                                                                                                                                                               | 
 | "R"    | Reentrancy      | A routine is said to be reentrant if while one thread is running the code, another thread can enter and run also the routine safely. Usually involves not using static variables or calling only reentrant functions. [More](https://en.wikipedia.org/wiki/Reentrancy_(computing))                                   | 
 | "S"    | SOLID principle | **S**ingle responsibility, **O**pen/closed, **L**iskov substitution, **I**nterface segregation, **D**ependency inversion principles [More](https://en.wikipedia.org/wiki/SOLID)                                                                                                             | 

### closure

Example: a function declares another function inside itself that uses its local variables. The inner function + local variables is called closure. [More](https://en.wikipedia.org/wiki/Closure_(computer_programming))

### code metric

A quantitative measure of a characteristic of the software source code. A simple metric is the amount of lines, or the ration comments/lines of code

### Fluent interface

A readable way to cascade and transfer a context to subsequent method calls. [More](https://en.wikipedia.org/wiki/Fluent_interface)

### GRASP

**G**eneral **R**esponsibility **A**ssignment **S**oftware **P**atterns [More](https://en.wikipedia.org/wiki/GRASP_%28object-oriented_design%29)

### immutable

An immutable object cannot be modified after creation. [More](https://www.ibm.com/developerworks/java/library/j-jtp02183.html)

### Kerkhoffs' principle

A cryptosystem should be secure even if everything about the system, except the key, is public knowledge. [More](https://en.wikipedia.org/wiki/Kerkhoffs%27_laws)

### lambda expression

Description of a function by mean of a statement binding parameters to an expression. For example: (x,y) => x*y defines an anonymous function that returns the product of the two arguments. This is often used to define delegates in a more readable way.

### Liskov substitution principle

A derived class shall behave in the same way than the base class (keeping same semantics). [More](https://en.wikipedia.org/wiki/Liskov_substitution_principle)

### Mc Cabe complexity

A code metric representing the amount of decisions taken by a piece of code. Having complex code makes the maintenance and testing of that code harder and costly. Here is a small drop-in tool that computes metrics for you: [ACQC metrics](/software/acqc/metrics).

### OCP: open/closed principle

"software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification" [More](https://en.wikipedia.org/wiki/Open/closed_principle)

### overloading

A derived class overrides a base class virtual method, the implementation is replaced by the derived one, this is done at run-time.

### overriding

The same method has different implementations with different parameter types (in the same scope).

### REST/RESTful (Representational State Transfer)

An architecture that is resource oriented (accessible over an URL for example) and follows the constraints of requests being cacheable and the requests holding all parameters needed for operation (no need to manage a state or session on server side) among others. [More](https://en.wikipedia.org/wiki/Representational_State_Transfer)

### Semantic Versioning

[http://semver.org/](http://semver.org/), how to create/update versions according to these rules


### TOCTTOU

**T**ime **O**f **C**heck **T**o **T**ime **O**f **U**se: Security issue or bug caused by a change to a system between the check (where the conditions were ok) and the time at which a resource is used. Usually the solution consist into locking the resource before the check and while the resource is used. [More](https://en.wikipedia.org/wiki/Time-of-check-to-time-of-use)
