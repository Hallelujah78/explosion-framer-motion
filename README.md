<div align='center'>

 <h1>
    <br/>
    <br/>
    <br/>
    <br />
    Grid Animation
    <br />
    <br />
    <br />
    <br />
  </h1>
  <section>
  <header>
  <h1>What?</h1>
  </header>
  <p align="left">An iterative experiment in using Framer Motion with React, TypeScript, and Vite. Essentially, click on the screen to make an image of a kitten "explode" offscreen.<p>
  <h1>Why?</h1>
  <p align="left">When I created my Wordle clone, I thought it would be cool if the grid of tiles animated outwards, perhaps when the game was over, in a kind of explosion. Since my Wordle clone was my first time using Framer Motion, I thought it might be too ambitious to attempt to do that in that project, and so this is my experiment in making my tile explosion happen.</p>
  <p align="left">This was an iterative process. I started with the Box.tsx component and just crammed all of the state and logic into that file. This used slope of a line and equation of a line and a bunch of logic to animate a grid of elements offscreen from the center point of the grid container.</p>
  <p align="left">Next came Circle.tsx, where I extracted a lot of the logic out of the component to be animated and placed it in a helper function called animateGrid. I also fixed some bugs that were left in Box.tsx. A specfic bug occurred where the center point of the grid container, InitialContent.tsx, had the same x coordinate as a column of my elements. Since the line created in this case is vertical, the slope is undefined and so you can't pick a new y value and use the formula of a line to find the corresponding x value. The easiest way around that is to use some `Math.random` goodness.</p>
  <p align="left">The next iteration was CircleHook.tsx, where I extracted the state and logic into a hook and the user could start the animation using a click. This component no longer works as expected as I've since updated the useAnimateGridClick.ts hook.</p>

  <p align="left">Finally, we have TileHookClick.tsx, which uses the useAnimateGridClick.ts hook but also uses vector math to come up with the coordinates that each element should be translated to relative to where the user clicks. To use this, we have some helper functions to translate our origin to the center of the viewport and back to screen coordinates.</p>

  <p align="left">The nice thing about using vector math, which I had never encountered before this project, is that we don't have to use confusing else-if blocks to handle all of the different possibilities for the direction we want our element to be translated.</p>
  <p align="left">In addition to using vector math, I decided it would be cool if, instead of animating colored circles or squares, we could animate an image. I basically chop up an image of a cat, obviously, using canvas and pass the data URL to each element. We also handle window resizing, device orientation change, and the user attempting to trigger a new animation while an animation is currently playing.</p>
  
  </section>
</div>
<h1 align="center">Could This Be Useful to You?</h1>
<p>There's an ISSUES.md file that is a brain dump of most of the issues I encountered working on this project. There's also a DEVNOTES.md file that is a kind of a plan, todo, brain dump of my process. Dubious usefulness all round.</p>
<h1 align="center">Getting Started</h1>
- Bootstrapped with Vite so:
  
  - clone it
  - `npm i`
  - `npm run dev`

<h1 align="center">Help!</h1>
<p>Feel free to contact me with questions!</p>

<h1 align="center">Contributors</h1>
<p>Just lil old me.</p>
<h1 align="center">Learnings</h1>
<p>Learned enough vector math to make it work. Also learned a little about framer motion, how to start an animation with a click, the fact that animations are thenable so you can run more code after the animation is finished. How to convert coords such that your origin is the center of the screen. How to use the canvas element to chop up an image into a bunch of data URLs. Cemented some knowledge in using Framer Motion and TypeScript.</p>
