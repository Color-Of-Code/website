# Moving away from the old fashioned source code metrics

Thanks to modern source code management, we are now able to collect not only **spatial** metrics on source code, but also **temporal** metrics. By **spatial** metrics, I mean the metrics measuring the software constitution at given date. These metrics include the traditional number of lines of code, comments, the complexity metrics, the cohesion metrics and so on. They quantify what the system is like but not how it evolved. With modern configuration management we are also able to compute metrics about the development steps over time themselves, what I call **temporal** metrics. Example of such metrics are the frequency of modifications for a file, number of modified lines of code per week, ...

# Spatial metrics

## Size metrics

The number of comments, lines of code per file, per method can be used to roughly identify places in the code that are worth breaking down in smaller manageable parts. These metrics are not very useful by themselves but become more interesting by taking into account the dynamic/time variable, see "Temporal metrics"

## Complexity metrics

The complexity of code is the same as the amount of decisions taken by that piece of source code. The more ifs, switches or loops you have the more you'll have to test. Linear portions of code are less prone to errors. Reducing complexity leads to software that is easier and less costly to maintain.

## Design metrics

Highly coupled classes hinder re-usability. Having loosely connected objects in a software project eases testing and provides reusable components. These kinds of metrics are analyzing code interactions at a higher level. Modern tools (like Sotograph) are even able to validate an implementation against a design by making the interactions visible. Thus any by-passing of the design can be detected.

# Temporal metrics

## Activity metrics

The size metrics above are easy to collect. By computing the amount of changes within a given timespan, you'll be able to visualize and monitor the development activity. If big changes occur at some places where no change is expected, you'll be able to catch problems such as bad merges or source code that was integrated too early in a given software release.

## Hot spots

When small portions of code are modified around the same place over and over again, there is a high chance that this portion of code has to be reworked. Detecting these hot spots can help also to steer code review processes. These hot spots are generally worth an in-depth review.
