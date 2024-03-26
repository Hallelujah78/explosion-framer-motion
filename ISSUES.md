## Slope of a line with screen coordinates

- the value of Y increases in the downward direction
- I found that to use the equation of a line to translate elements:
  - reverse the sign of the slope of the line once you calculate it
  - to calculate the y intercept or b where you have a point:

```js
b = y + slope * x;
```

- compare this to the standard equation:

```js
b = y - slope * x;
```

- assuming you want to translate something on a line, and you calculate or pick a new value for y, to find the x coordinate:

```js
newX = (newY - yIntercept) / -slope;
```

## Using your calculated coordinates with framer motion:

- consider the following:

```js
<motion.article
  initial={{
    x: 0,
    y: 0,
  }}
  animate={{
    x: moveCoords?.x,
    y: moveCoords?.y,
    transition: { duration: 5 },
  }}
></motion.article>
```

- we calculate our new coords and plug them into our animate as above
- the x and y values are RELATIVE to the starting coords
  - meaning your element is not moved to these absolute coordinates
  - they are moved by x pixels and by y pixels
- before pluging in the calculated coords, you MUST subtract the original coord values from them
