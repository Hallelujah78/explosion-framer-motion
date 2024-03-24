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
  - to move a box in a particular direction the x and y translates will
    need to have different but related durations
