# PlayGround

## Wrap test

`<WRAP center round tip 60%>`
Cool idea
`</WRAP>`



## MathJAX test

When $a != 0$, there are two solutions to $ax^2 + bx + c = 0$ and they are

$$
x = (-b +- sqrt(b^2-4ac))/(2a) .
$$

$$
\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}\tag{displayed}
$$

## PlantUML test

`<uml>`
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
`</uml>`
`<uml>`
abstract class AbstractList
abstract AbstractCollection
interface List
interface Collection

List <|-- AbstractList
Collection <|-- AbstractCollection

Collection <|- List
AbstractCollection <|- AbstractList
AbstractList <|-- ArrayList

class ArrayList {
    Object[] elementData
    size()
}

enum TimeUnit {
    DAYS
    HOURS
    MINUTES
}

annotation SuppressWarnings

`</uml>`
