## Creating An Explosion Effect

- the idea is that each Box will fly off in a different direction, with a different rate of rotations in the different axes, at different speeds and the effect will look as if the movement and rotation was created by an explosion

- To achieve this we'll need:
  rotate: 360,
  rotateX: 360,
  rotateY: 360,
  rotateZ: 180,
  scale: 1.5,
  x: "-100vw",
  y: "-100vw",

- each attribute will have its own duration
- each box will need to be 'aware' of its own position relative to the other boxes
  - boxes nearer the edge may rotate slower, for example
  - boxes nearer the top left will move towards the top left
- issue with this
  - ~~to move a box in a particular direction the x and y translates will
    need to have different but related durations~~
  - X and Y can be px values
- assuming we have a grid with rows , - assuming we have a grid with rows of boxesof boxes
  - each row has the same y value but an increasing x value
  - when y is not equal, then you have a new row
    [[{x, y}, {x, y}], [{x, y}, {x, y}], [{x, y}, {x, y}] ]
  - the above might be 2 items per row, with 3 rows

# Using the center point of the container for our boxes

- if we have the x, y coord of the center point of the container - call it c-x and c-y
- we get the center point of each box, call it b-x and b-y
- we say that c-x and c-y are 0,0 in a cartesian grid
- we translate each b-x, b-y coord to our 0,0 grid
- now we can calculate the x, y coords that we might want to translate the center of our box to, to move it offscreen
- we have some scenarios
  - the x value is less than 0 => the box moves to the left
  - the y value is less than 0 => the box moves upwards
  - the x value is more than 0 => the box moves to the right
  - the y value is more than 0 => the box moves downwards
- of course, we don't have to use 0, 0 but it might make it easier to think about

- slope of line = (y2 - y1)/(x2-x1) = m
- equation of a line: y = mx + b
- rearrange: y - mx = b
- b is where x is zero or where the line intercepts the y axis
  (-5, 10) and (-3, 4)
  slope = -6/-8 = 0.75

10 = 0.75 x -5 + b
10 --3.75 = b
b = 13.75
y = 0.75x + 13.75

if x=2100

y = 0.75(2100) + 13.75
y = 1588.75

finding y for a value of x
y = mx + b
=> mx + b = y
