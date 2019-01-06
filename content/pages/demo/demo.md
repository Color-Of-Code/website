---
published: true
path: "/demo/test"
date: "2019-01-03"
title: "Test"
tags: ["demo", "test"]
---

# Test

## remark-draw

### dot

Examples taken from the [DOT pocket reference](http://graphs.grevian.org/example)

#### Example 1: Simple Graph

```dot-svg
graph {
    a -- b;
    b -- c;
    a -- c;
    d -- c;
    e -- c;
    e -- a;
}
```

#### Example 2: K6

```dot-svg  
graph {
    a -- b;
    b -- c;
    c -- d;
    d -- e;
    e -- f;
    a -- f;
    a -- c;
    a -- d;
    a -- e;
    b -- d;
    b -- e;
    b -- f;
    c -- e;
    c -- f;
    d -- f;
}
```

#### Example 3: Simple Digraph

```dot-svg
digraph {
    a -> b;
    b -> c;
    c -> d;
    d -> a;
}
```

#### Example 4: Full Digraph

```dot-svg
digraph {
    a -> b[label="0.2",weight="0.2"];
    a -> c[label="0.4",weight="0.4"];
    c -> b[label="0.6",weight="0.6"];
    c -> e[label="0.6",weight="0.6"];
    e -> e[label="0.1",weight="0.1"];
    e -> b[label="0.7",weight="0.7"];
}
```

#### Example 5: Showing A Path

```dot-svg 
graph {
    a -- b[color=red,penwidth=3.0];
    b -- c;
    c -- d[color=red,penwidth=3.0];
    d -- e;
    e -- f;
    a -- d;
    b -- d[color=red,penwidth=3.0];
    c -- f[color=red,penwidth=3.0];
}
```

**Note that there's also a shorthand method as follows:**

```dot-svg
graph {
    a -- b -- d -- c -- f[color=red,penwidth=3.0];
    b -- c;
    d -- e;
    e -- f;
    a -- d;
}
```

#### Example 6: Subgraphs

Please note there are some quirks here, First the name of the subgraphs are important, to be visually separated they must be prefixed with cluster_ as shown below, and second only the DOT and FDP layout methods seem to support subgraphs (See the graph generation page for more information on the layout methods)

```dot-svg                            
digraph {
    subgraph cluster_0 {
        label="Subgraph A";
        a -> b;
        b -> c;
        c -> d;
    }

    subgraph cluster_1 {
        label="Subgraph B";
        a -> f;
        f -> c;
    }
}
```

Another Example of a Subgraph, In this example I group nodes together seperately from their edges, And also uses the graph attribute splines=line; to specify that edges should be drawn only as straight lines, no curves allowed.

```dot-svg
graph {
    splines=line;
    subgraph cluster_0 {
        label="Subgraph A";
        a; b; c
    }

    subgraph cluster_1 {
        label="Subgraph B";
        d; e;
    }

    a -- e;
    a -- d;
    b -- d;
    b -- e;
    c -- d;
    c -- e;
}
```

#### Example 7: Large Graphs

To make it easier to input large graph descriptions, One may group edges together with a set of braces, It may also help to lay the graph out left to right instead of top to bottom.

```dot-svg 
graph {
    rankdir=LR; // Left to Right, instead of Top to Bottom
    a -- { b c d };
    b -- { c e };
    c -- { e f };
    d -- { f g };
    e -- h;
    f -- { h i j g };
    g -- k;
    h -- { o l };
    i -- { l m j };
    j -- { m n k };
    k -- { n r };
    l -- { o m };
    m -- { o p n };
    n -- { q r };
    o -- { s p };
    p -- { s t q };
    q -- { t r };
    r -- t;
    s -- z;
    t -- z;
}
```

Another feature that can make large graphs manageable is to group nodes together at the same rank, the graph above for example is copied from a specific assignment, but doesn't look the same because of how the nodes are shifted around to fit in a more space optimal, but less visually simple way. We can make it look much more similar by grouping the nodes together for display as is done in the assignment with rank, as follows

```dot-svg
graph {
    rankdir=LR;
    a -- { b c d }; b -- { c e }; c -- { e f }; d -- { f g }; e -- h;
    f -- { h i j g }; g -- k; h -- { o l }; i -- { l m j }; j -- { m n k };
    k -- { n r }; l -- { o m }; m -- { o p n }; n -- { q r };
    o -- { s p }; p -- { s t q }; q -- { t r }; r -- t; s -- z; t -- z;
    { rank=same; b, c, d }
    { rank=same; e, f, g }
    { rank=same; h, i, j, k }
    { rank=same; l, m, n }
    { rank=same; o, p, q, r }
    { rank=same; s, t }
}
```

### mermaid

#### Gantt

```mermaid-svg
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram to mermaid

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2              :         des4, after des3, 5d
```

#### sequenceDiagram

```mermaid-svg
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail...
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

#### classDiagram

```mermaid-svg
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
```

#### gitGraph

```mermaid-svg
gitGraph:
options
{
    "nodeSpacing": 150,
    "nodeRadius": 10
}
end
commit
branch newbranch
checkout newbranch
commit
commit
checkout master
commit
commit
merge newbranch
```

## remark-flowchart

```flowchart
st=>start: Start:>http://www.google.com[blank]
e=>end:>http://www.google.com
op1=>operation: My Operation
sub1=>subroutine: My Subroutine
cond=>condition: Yes
or No?:>http://www.google.com
io=>inputoutput: catch something...

st->op1->cond
cond(yes)->io->e
cond(no)->sub1(right)->op1
```

## END
