---
published: true
path: "/patterns/patterns"
date: "2018-12-27"
title: "Patterns"
tags: ["software", "pattern", "TODO_cleanup"]
---

# Software Design Patterns

*Taken from Wikipedia, personal adaptations and additions made, shortened to be used as a small reference card, links back to wikipedia kept for details.*

See also [Software Anti-Patterns](anti-patterns).

| Architectural patterns  | Choice: How is the software system (as a whole) organized?  |
| ----------------------- | ----------------------------------------------------------- |
| Layers                                         | Separation of the system in layers, each layer knowing only of the layer above and under itself |
| `<uml>`
[View] -down-> [Controller]
[Controller] -down-> [Model]
[Model] -> [View]
`</uml>` MVC   | Separation of the view (user interface) from the model (underlying data) and the controller (user interaction) |
 | `<uml>`
 | -----
[View] `<-down->` [Presenter]
[Presenter] `<-down->` [Model]
`</uml>` [MVP](https://en.wikipedia.org/wiki/Model–view–presenter)    | Model View Presenter: all presentation logic is pushed to the presenter, mainly used for GUI development |
| `<uml>`
| -----
[View] `<-down->` [Data Binding]
[Data Binding] `<-down->` [ViewModel]
[ViewModel] `<-down->` [Model]
`</uml>` [MVVM](https://en.wikipedia.org/wiki/Model_View_ViewModel)      | Model View ViewModel: The view model handles the view's display logic, is responsible for exposing the data objects from the model in such a way that the objects are easily managed and consumed |
| Multitier architecture                         | The presentation, the application processing, and the data management are logically separate processes |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------
| Pipeline                                       | Chain of processing elements |
| Implicit invocation                            | Event broadcasting, the caller doesn't know who is called |
| Blackboard system                              | A common knowledge base, is iteratively updated by a diverse subsystems |
| Peer-to-peer                                   | No central server, each peer is supplier and consumer |
| Service-oriented architecture                  | Loose coupling of services within the system |
| Naked objects                                  | Objects and their representation are not biased by adapters or proxys |

| Creational patterns | Choice: How to create the objects?  |
| -------------------- | -------------------------------------------- |
| Abstract factory                               | Interface for creating families of related or dependent objects without specifying their concrete classes |
| Factory method                                 | Creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses |
| Builder                                        | Separate the construction of a complex object from its representation. The same construction process can create different representations |
| Lazy initialization                            | Tactic of delaying the creation of an object, the calculation of a value, or some other expensive process until the first time it is needed |
| Object pool                                    | Avoid expensive acquisition and release of resources by recycling objects that are no longer in use |
| Prototype                                      | Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype. (Cloning) |
| Singleton                                      | Ensure a class has only one instance, and provide a global point of access to it |
| Multiton                                       | Ensure a class has only named instances, and provide global point of access to them |
| Resource acquisition is initialization         | Ensure that resources are properly released by tying them to the lifespan of suitable objects |


| Structural patterns  | Choice: What relationship have the objects?  |
| -------------------- | -------------------------------------------- |
| Adapter or Wrapper                             | Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces. |
| Bridge                                         | Decouple an abstraction from its implementation so that the two can vary independently |
| Composite                                      | Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly |
| Decorator                                      | Attach additional responsibilities to an object dynamically keeping the same interface. Decorators provide a flexible alternative to subclassing for extending functionality |
| Facade                                         | Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use |
| Flyweight                                      | Use sharing to support large numbers of fine-grained objects efficiently |
| Proxy                                          | Provide a surrogate or placeholder for another object to control access to it |

| Behavioral patterns  | Choice: How are the objects communicating?  |
| -------------------- | -------------------------------------------- |
| Chain of responsibility                        | Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it |
| Command                                        | Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations |
| Interpreter                                    | Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language |
| Iterator                                       | Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation |
| Mediator                                       | Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently |
| Restorer                                       | An alternative to the existing Memento pattern |
| Memento                                        | Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later |
| Null Object                                    | Designed to act as a default value of an object, usually to avoid special treatment for null pointers || Observer or Publish/subscribe                  | Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically |
| Blackboard                                     | Generalized observer, which allows multiple readers and writers. Communicates information system-wide |
| State                                          | Allow an object to alter its behavior when its internal state changes. The object will appear to change its class |
| Strategy                                       | Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it |
| Specification                                  | Recombinable business logic in a boolean fashion |
| Template method                                | Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure |
| Visitor                                        | Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates |

| Concurrency patterns | Choice: How to synchronize concurrent access to the object? |
| -------------------- | -------------------------------------------- |
| Active Object                                  | Decouples method execution from method invocation that reside in their own thread of control. The goal is to introduce concurrency, by using asynchronous method invocation and a scheduler for handling requests |
| Binding Properties                             | Combining multiple observers to force properties in different objects to be synchronized or coordinated in some way |
| Event-Based Asynchronous                       | Addresses problems with the Asynchronous Pattern that occur in multithreaded programs |
| Balking                                        | Executes an action on an object only when the object is in a particular state |
| Guarded suspension                             | In concurrent programming, managing operations that require both a lock to be acquired and a precondition to be satisfied before the operation can be executed |
| Monitor object                                 | Approach to synchronize two or more computer tasks that use a shared resource, usually a hardware device or a set of variables |
| Scheduler                                      | Explicitly control when threads may execute single-threaded code |
| Thread pool                                    | A number of threads are created to perform a number of tasks, which are usually organized in a queue. Typically, there are many more tasks than threads |
| Thread-specific storage                        | Thread-local storage (TLS) is a computer programming method that uses static or global memory local to a thread |
| Reactor                                        | Handling service requests delivered concurrently to a service handler by one or more inputs. The service handler then demultiplexes the incoming requests and dispatches them synchronously to the associated request handlers |
| Lock                                           | One thread puts a "lock" on a resource, preventing other threads from accessing or modifying it |
| Double checked locking                         | "double-checked locking optimization". Reduce the overhead of acquiring a lock by first testing the locking criterion (the 'lock hint') in an unsafe manner; only if that succeeds does the actual lock proceed((In some language/hardware combinations, can be unsafe. It can therefore sometimes be considered an anti-pattern)) |
| Read write lock                                | Allows concurrent read access to an object but requires exclusive access for write operations |
