## Creating An Explosion Effect

- the idea is that each Box will fly off in a different direction, with different rates of rotations in the different axes, at different speeds and the effect will look as if the movement and rotation was created by an explosion

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
- assuming we have a grid with rows , - assuming we have a grid with rows of boxes
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

# The reason this isn't working as intended

- The y value increases in the downward direction!
  - I thought changing the sign of the slope would correct this but nope
  - changing all values of y to be negative seems to correct, but need to confirm
  - have tested on the first element only and it appears to be moving in the desired direction

# Do we calculate the new x coord or the new y coord?

- when moving the element, our Box, we want to calculate new coords to move it to so that it is offscreen
- since we have the equation of the line, we can pick a new x or y value and calculate the other coordinate
- if our Box is in the top left of our container, the slope will be larger than if our Box is in the middle of our container
  - For a box in the top left, we would be best to pick a y value and calculate the x value
  - for a box in the middle of our container, we should pick an x value and calculate the y value
- intuitively this makes sense. Imagine our top left Box
  - this box wants to move upwards more than it wants to move leftwards
    - the slope will be greater than 1
    - if we pick an x value here and calculate y, our calculated y value might be relatively enormous
    - if we pick a y value, we can pick a value, in fact we can calculate a y value (minus y coord minus height of Box?) that will move the box offscreen

# Y increasing in downward direction

- this is confusing
- need to get clear on how to work around this
- not sure we can use equation of the line with Y increasing in downward direction - too mind melting, probably makes code unreadable/unmaintainable

## Movement of Elements

- at the moment, we are calculating a new x value and then calculating the new y value using the equation of a line formula.
- the result is that the elements move different distances when being translated
- given the animations have a fixed duration, this means the elements move at different velocities
- a solution that uses fixed distance so that each element moves at the same speed is probably better?
- something like:
  - if width > height => use width, else use height

## What about using vector math?

- point P is (483, 212)
- point Q (for qlick) is (515, 374)
- we want QP = (483-515, 212-374) = (-32, -162)
- since we have a slope, m, the direction vector is (1, m)
  - it moves m pixels in y for every 1 pixel in x
- we need to find the magnitude of the direction vector:
- I think the slope for our example is -5.1934
- formula for mag of direction vector is:
  (x^2 + y^2)^1/2
  - (note ^1/2 is square root)
- so:
  (1^2 + -5.1934^2)^1/2 = (27.97140356)^1/2 = 5.288799822 (magnitude)

- next, we normalize the direction vector to be unit length so you divide the direction vector by the magnitude:
- N = (1, m) / magnitude = (1, -5.1934) / 5.288799822 =
  (1/5.288799822, -5.1934/5.288799822 )
- now we can write the equation of the line in parameterized format:

f(t) = A + t\*N

- where t is a unit of distance and N is our direction vector divided by the magnitude. A is our original point (483, 212) we want to translate
- let's say we use the viewport width as our value for t:
  new point = (483, 212) + 1030*(1/5.288799822, -5.1934/5.288799822)
  = (483, 212) + (195, -1011)
  (t*N has been rounded)
  = (678, -799)
  => this doesn't seem correct since x must decrease, not increase
  => remember, we have reversed the sign of our slope, so it is actually 5.1934

## Convert screen coordinates to a different origin (center of screen)

screenX = cartX + screenWidth/2
screenY = screenHeight/2 - cartY

=> -cartX = screenWidth/2 - screenX
=> cartX = screenX - screenWidth/2 // this!

=> cartY = screenHiehgt/2 - screenY

- note, this sets 0,0 in cartesian coords to center of screen!

## Using our vector calc with our coord conversion

- get the screen coords
- convert screen coords to center screen is origin coords
- run that through vectorCalc
- convert back to screen coords
- set moveTo with the new coords

## There is an issue with the center point of our element

- clicking to the bottom right hand side of our element actually causes it to go directly upwards

screenX = cartX + screen_width/2
=> cartX = screenX - screenWidth/2
=> cartX = screenX - screenWidth/2

screenY = screen_height/2 - cartY
=> cartY = screenHeight/2 - screenY

## Troubleshooting vector calculation woes

- logging the center of an element's screen coords before conversion to cartesian and then after it is converted from cartesian to screen coords shows that the conversion is occurring correctly
  - converting from Cartesian (or more properly where the origin is the center of the screen) perfectly reverses the conversion to Cartesian
- vector calculation was fine
- the issue was the original issue I identified when using slope of a line to do the same thing
  - the coordinates you move to are relative to the starting position of the element

## To be fixed

- ~~the further away from our grid of tiles we click, the less they move~~
  - ~~this isn't what I wanted~~
- ~~all elements are moving different distances~~
  - ~~the finish position appears to describe the circumference of a circle relative to where we clicked (being the center point of the circle)~~
  - ~~this might be okay, but we need to make our parameterized equation for line t value dynamic and link it to the width or height of the screen. This will ensure elements are transitioned offscreen. The value t can be thought of as distance.~~ DONE
  - ~~remember: f(t) = A + t(N)~~
- ~~elements should not rotate when first loaded~~ DONE
- ~~resizing the window - update coords and window height & width~~
- ~~if window height is greater than width, the height should be used as the value t in our parametrized line equation~~
- ~~device rotation - handle changes for coords & width & height~~ DONE
- clicking when the elements are already in motion should do one of the following:
  - queue up another animation after the previous one finishes - harder
  - reset the state to the start state and commence the new animation - easy
  - ~~warn the user that an animation is already in progress - easy~~ DONE
- ~~rotating the device or resizing the window while the animation is in motion causes the following problems:~~
  - ~~new clicks are not used as the position from which to translate the elements, the old click position is used~~

## To be Added

- we could add controls to allow a user to use the different methods
  - change the t value
  - change the number of elements and the grid structure
  - border radius, rotation, etc
- look at canvas, set portions of an image to the background of each element, then we have an exploding picture
