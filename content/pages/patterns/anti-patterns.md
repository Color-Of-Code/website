---
published: true
path: "/patterns/anti-patterns"
date: "2020-03-09"
title: "Anti-Patterns"
tags: ["software", "pattern", "anti"]
---

## Software Anti-Patterns

*Taken from Wikipedia, personal adaptations and additions made, shortened to be used as a small reference card, links back to wikipedia kept for details.*

See also [Software Design Patterns](patterns).

| Organizational anti-patterns | Detect: bad general company wide behavior                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| Analysis paralysis           | Devoting disproportionate effort to the analysis phase of a project                                   |
| Cash cow                     | A profitable legacy product that often leads to complacency about new products                        |
| Design by committee          | The result of having many contributors to a design, but no unifying vision                            |
| Escalation of commitment     | Failing to revoke a decision when it proves wrong                                                     |
| Management by perkele        | Authoritarian style of management with no tolerance for dissent                                       |
| Moral hazard                 | Insulating a decision-maker from the consequences of his or her decision                              |
| Mushroom management          | Keeping employees uninformed and misinformed (kept in the dark and fed manure)                        |
| Stovepipe                    | A structure that supports mostly up-down flow of data but inhibits cross organizational communication |
| Vendor lock-in               | Making a system excessively dependent on an externally supplied component                             |

| Project management anti-patterns | Detect: What can run a project against the wall?                                                                                                                                                                                                                                                                                    |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Death march                      | Everyone knows that the project is going to be a disaster - except the CEO. However, the truth remains hidden and the project is artificially kept alive until the Day Zero finally comes ("Big Bang"). Alternative definition: Employees are pressured to work late nights and weekends on a project with an unreasonable deadline |
| Groupthink                       | During groupthink, members of the group avoid promoting viewpoints outside the comfort zone of consensus thinking                                                                                                                                                                                                                   |
| Smoke and mirrors                | Demonstrating how unimplemented functions will appear                                                                                                                                                                                                                                                                               |
| Software bloat                   | Allowing successive versions of a system to demand ever more resources                                                                                                                                                                                                                                                              |

| Analysis anti-patterns | Detect: Analysis and reporting issues                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Bystander apathy       | When a requirement or design decision is wrong, but the people who notice this do nothing because it affects a larger number of people |

| Software design anti-patterns | Detect: bad patterns used in architecture                                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Abstraction inversion         | Not exposing implemented functionality required by users, so that they re-implement it using higher level functions                    |
| Ambiguous viewpoint           | Presenting a model (usually OOAD) without specifying its viewpoint                                                                     |
| Big ball of mud               | A system with no recognizable structure                                                                                                |
| Database-as-IPC               | Using a database as the message queue for routine interprocess communication where a much more lightweight mechanism would be suitable |
| Gas factory                   | An unnecessarily complex design                                                                                                        |
| Gold plating                  | Continuing to work on a task or project well past the point at which extra effort is adding value                                      |
| Inner-platform effect         | A system so customizable as to become a poor replica of the software development platform                                              |
| Input kludge                  | Failing to specify and implement handling of possibly invalid input                                                                    |
| Interface bloat               | Making an interface so powerful that it is extremely difficult to implement                                                            |
| Magic pushbutton              | Coding implementation logic directly within interface code, without using abstraction                                                  |
| Race hazard                   | Failing to see the consequence of different orders of events                                                                           |
| Stovepipe system              | A barely maintainable assemblage of ill-related components                                                                             |

| Object-oriented design anti-patterns | Detect: wrong implementation in detailed design                                                                                   |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Anemic Domain Model                  | The use of domain model without any business logic which is not OOP because each object should have both attributes and behaviors |
| BaseBean                             | Inheriting functionality from a utility class rather than delegating to it                                                        |
| Call super                           | Requiring subclasses to call a superclass's overridden method                                                                     |
| Circle-ellipse problem               | Subtyping variable-types on the basis of value-subtypes                                                                           |
| Circular dependency                  | Introducing unnecessary direct or indirect mutual dependencies between objects or software modules                                |
| Constant interface                   | Using interfaces to define constants                                                                                              |
| God object                           | Concentrating too many functions in a single part of the design (class)                                                           |
| Object cesspool                      | Reusing objects whose state does not conform to the (possibly implicit) contract for re-use                                       |
| Object orgy                          | Failing to properly encapsulate objects permitting unrestricted access to their internals                                         |
| Poltergeists                         | Objects whose sole purpose is to pass information to another object                                                               |
| Sequential coupling                  | A class that requires its methods to be called in a particular order                                                              |
| Yo-yo problem                        | A structure (e.g., of inheritance) that is hard to understand due to excessive fragmentation                                      |

| Programming anti-patterns | Detect: Bad low-level coding practices                                                                                       |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Accidental complexity     | Introducing unnecessary complexity into a solution                                                                           |
| Action at a distance      | Unexpected interaction between widely separated parts of a system                                                            |
| Blind faith               | Lack of checking of (a) the correctness of a bug fix or (b) the result of a subroutine                                       |
| Boat anchor               | Retaining a part of a system that no longer has any use                                                                      |
| Busy spin                 | Consuming CPU while waiting for something to happen, usually by repeated checking instead of messaging                       |
| Caching failure           | Forgetting to reset an error flag when an error has been corrected                                                           |
| Cargo cult programming    | Using patterns and methods without understanding why                                                                         |
| Coding by exception       | Adding new code to handle each special case as it is recognized                                                              |
| Error hiding              | Catching an error message before it can be shown to the user and either showing nothing or showing a meaningless message     |
| Expection handling        | (a portmanteau of expect and exception) Using a language's error handling system to implement normal program logic           |
| Hard code                 | Embedding assumptions about the environment of a system in its implementation                                                |
| Lava flow                 | Retaining undesirable (redundant or low-quality) code because removing it is too expensive or has unpredictable consequences |
| Loop-switch sequence      | Encoding a set of sequential steps using a loop over a switch statement                                                      |
| Magic numbers             | Including unexplained numbers in algorithms                                                                                  |
| Magic strings             | Including literal strings in code, for comparisons, as event types etc.                                                      |
| Soft code                 | Storing business logic in configuration files rather than source code                                                        |
| Spaghetti code            | Systems whose structure is barely comprehensible, especially because of misuse of code structures                            |

| Methodological anti-patterns                              | Detect: Bad coding behaviour                                                                                                 |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Copy and paste programming                                | Copying (and modifying) existing code rather than creating generic solutions                                                 |
| Golden hammer                                             | Assuming that a favorite solution is universally applicable (See: Silver Bullet)                                             |
| Improbability factor                                      | Assuming that it is improbable that a known error will occur                                                                 |
| Premature optimization                                    | Coding early-on for perceived efficiency, sacrificing good design, maintainability, and sometimes even real-world efficiency |
| Programming by permutation (or "programming by accident") | Trying to approach a solution by successively modifying the code to see if it works                                          |
| Reinventing the wheel                                     | Failing to adopt an existing, adequate solution                                                                              |
| Silver bullet                                             | Assuming that a favorite technical solution can solve a larger process or problem                                            |
| Tester Driven Development                                 | Software projects in which new requirements are specified in bug reports                                                     |

| Configuration management anti-patterns | Detect: Bad relationship between components                                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dependency hell                        | Problems with versions of required products                                                                                                             |
| DLL hell                               | Inadequate management of dynamic-link libraries (DLLs), specifically on Microsoft Windows                                                               |
| Extension conflict                     | Problems with different extensions to pre-Mac OS X versions of the Mac OS attempting to patch the same parts of the operating system                    |
| JAR hell                               | Overutilization of the multiple JAR files, usually causing versioning and location problems because of misunderstanding of the Java class loading model |

| Branching & Merging anti-patterns                  | Detect: Difficult integration situations                                                                          |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Merge Paranoia, Phobia                             | Avoiding merging at all cost, usually because of a fear of the consequences                                       |
| Merge Mania                                        | Spending too much time merging software assets instead of developing them                                         |
| Big Bang Merge, Mega monster merge                 | Deferring branch merging to the end of the development effort and attempting to merge all branches simultaneously |
| Never-Ending, Runaway Merge                        | Continuous merging activity because there is always more to merge                                                 |
| Never-Ending, Runaway Branch                       | The branch is used for purposes beyond the original one leading to a pot-pourri of development activities         |
| Wrong-Way Merge                                    | Merging a software asset version with an earlier version                                                          |
| Branch Mania, Branch-a-holic, Overbranching        | Creating many branches for no apparent reason                                                                     |
| Cascading Branches, Continual Cascading            | Branching but never merging back to the main line                                                                 |
| Mystery Branch, The Unknown Branch                 | Branching for no apparent reason, unclear naming, what is this branch for?                                        |
| Temporary Branches, Spaghetti or "Go To" Branching | Branching for changing reasons, so the branch becomes a permanent temporary workspace                             |
| Volatile Branches, Codeline Puddling               | Branching with unstable software assets shared by other branches or merged into another branch                    |
| Development Freeze                                 | Stopping all development activities while branching, merging, and building new base lines                         |
| Berlin Wall, Integration Wall                      | Using branches to divide the development team members, instead of dividing the work they are performing           |
