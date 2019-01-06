---
published: true
path: "/funani/picture-rating"
date: "2018-12-27"
title: "Funani: Rating"
tags: ["funani", "picture", "rating", "TODO_cleanup"]
---
# Rating

## Rationale

The rating module enables users to rate an object in the Funani database: picture, video or just anything else. The rating enables a prioritization of the media being shown to users. Each user can modify his own rating and get feedback from ratings from other users.

## Implementation

A table records the ratings. A rating is a combination of:

* Content being rated (object id)
* User (user id)
* Rating (integer 1-1000)

The rating of one object is then a combined score either:

* the mean value of all ratings on that object
* the own rating if defined or the mean value of all ratings otherwise

This behavior can be defined in the user settings.

## View

The display of ratings can be a 5 stars system overlaid by a progress bar.
