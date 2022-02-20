---
published: true
path: "/math/doomsday"
date: "2020-03-17"
title: "Doomsday rule"
tags: ["math", "trick", "day of week", "doomsday"]
---

## Doomsday rule

It takes advantage of each year having a certain day of the week, called the doomsday, upon which certain easy-to-remember dates fall; for example, 4/4, 6/6, 8/8, 10/10, 12/12, and the last day of February all occur on the same day of the week in any year.

## Prerequisites

### Remembering the day numbers

|  Day of week  | Number  |  Mnemonic  |
| --- | --- | --- |
| Sunday  | 0 | Noneday or Sansday |
| Monday | 1 | Oneday |
| Tuesday | 2 | Twosday |
| Wednesday | 3 | Treblesday |
| Thursday | 4 | Foursday |
| Friday | 5 | Fiveday |
| Saturday | 6 | Six-a-day |

Depending on the method other values can be used. These are used here consistently.

### Remembering the month numbers

|  Month  | Number  |
| --- | --- |
| January  | 1 |
| February  | 2 |
| March  | 3 |
| April  | 4 |
| May  | 5 |
| June  | 6 |
| July  | 7 |
| August  | 8 |
| September  | 9 |
| October  | 10 |
| November  | 11 |
| December | 12 |

### Leap year

- divisible by 4 -> leap
- but excepted centuries -> not leap
- but centuries divisible by 4 -> leap (e.g. 1600, 2000)

### Dates landing on Doomsday

- Mnemonic 1: "the 3rd during 3 years in 4, and the 4th in the 4th year"
- Mnemonic 2: "last day of February"
- Mnemonic 3: "I work from 9 to 5 at the 7-11"
- Mnemonic 4: "4/4, 6/6, 8/8, 10/10, 12/12"

| Month  | Memorable date | Mnemonic | All days |
| --- | --- | --- | --- |
| January | 01-03 (common years) | 1 | 3, 10, 17, 24, 31 |
| January | 01-04 (leap years) | 1 | 4, 11, 18, 25 |
| February | 02-28 (common years) | 2 | 0, 7, 14, 21, 28 |
| February | 02-29 (leap years) | 2 | 1, 8, 15, 22, 29 |
| March | 03-00 | 2 | 0, 7, 14, 21, 28 |
| April | 04-04 | 4 | 4, 11, 18, 25 |
| May | 05-09 | 3 | 2, 9, 16, 23, 30 |
| June | 06-06 | 4 | 6, 13, 20, 27 |
| July | 07-11 | 3 | 4, 11, 18, 25 |
| August | 08-08 | 4 | 1, 8, 15, 22, 29 |
| September | 09-05 | 3 | 5, 12, 19, 26 |
| October | 10-10 | 4 | 3, 10, 17, 24, 31 |
| November | 11-07 | 3 | 0, 7, 14, 21, 28 |
| December | 12-12 | 4 | 5, 12, 19, 26 |

## Steps

Example:

$$Date:2020-03-17$$

$$Century = 2020/100 = 20$$

### 1 - anchor day for the century

Formula:

$$Anchor = 5 * (Century \mod 4) \mod 7 + 2$$

Example:

$Anchor = 5 * (20 \mod 4) \mod 7 + 2 = 2 = Tuesday$

### 2 - doomsday for the year

Method for finding the year's doomsday was discovered in 2010 by Chamberlain Fong and Michael K. Walters and described in their paper submitted to the 7th International Congress on Industrial and Applied Mathematics (2011). Called the "odd + 11" method, it is equivalent to computing:

$$\left(y + \left\lfloor \frac{y}{4} \right\rfloor\right) \bmod 7$$

Mnemonic: repeated use of the "odd + 11" rule.

Extending this to get the doomsday, the procedure is often described as accumulating a running total T in six steps, as follows:

- Let $T$ be the year's last two digits.
- If $T$ is odd, add 11.
- Now let $T = T/2$.
- If $T$ is odd, add 11.
- Now let $T = 7 − (T \bmod 7)$.
- $Doomsday = T + Anchor$

Example 2005:

- $T = 5$
- $T = 5 + 11 (odd) = 16$
- $T = 16/2 = 8$
- $T = 8 (even)$
- $T = 7 − (8 \bmod 7) = 7 − 1 = 6$
- $Doomsday = (6 + 2) \bmod 7 = 1 = Monday$

Example 2020:

- $T = 20$
- $T = 20 (even)$
- $T = 20/2 = 10$
- $T = 10 (even)$
- $T = 7 − (10 \bmod 7) = 7 − 3 = 4$
- $Doomsday = (4 + 2) \bmod 7 = 6 = Saturday$

### 3 - day of week from nearest doomsday

Find the nearest doomsday and count days.

$((Day - NearestDoomsday) \bmod 7 + Doomsday) \bmod 7$

Example:

$2020-03-17$

- $NearestDoomsday = 03-14 = 14$,
- $Doomsday(2020) = 6$
- $DayOfWeek = ((17-14) \bmod 7 + 6) \bmod 7 = 9 \bmod 7 = 2 = Tuesday$
