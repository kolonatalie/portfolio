[![Pure CSS Shimmer Effect](../assets/images/post-images/image-hover-effect-demo.gif)](https://codepen.io/kolonatalie/pen/RNWxMBw)
[Codepen demo](https://codepen.io/kolonatalie/pen/RNWxMBw)
### Why Pure CSS for Animation?
As a developer with a background in Visual Engineering, my first rule is: **if CSS can handle the animation, use CSS**. The "shimmer" or "light swipe" effect is a perfect example. Relying on CSS Transitions and Transforms keeps the animation on the GPU, ensuring maximum performance and a smoother frame rate without blocking the main JavaScript thread. This technique is perfect for drawing attention to cards, buttons, or calls-to-action.
### The Essential HTML Foundation
We need one parent element, which acts as the canvas, to contain the image and the overlay. The shimmer will be created within this container.

```bash

<div class="shimmer-container">
  <img src="image.jpg" alt="Image with shimmer effect">
  <div class="image-overlay">
  </div>
</div>


```

The key rule for the parent is to establish a positioning context for the shimmer: `position: relative;`.
### Creating the Shimmer magic with `::after`
The shimmer is not an image. It's a simple, invisible, angled rectangle created using the `:after` pseudo-element. This element uses a gradient to simulate light.
#### The Initial CSS Setup
``` bash

.shimmer-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%; /* The width of the "shine" */
  height: 100%;
}


```

#### The Visual Tricks: Skew and Gradient

* **The Angled Look** `transform: skewX()`: To make the movement look more dynamic and less like a straight line, we tilt the element. `skewX(-25deg)` creates the illusion of a sweeping light ray.

* **The Soft Glow** `linear-gradient`: The gradient makes the light softly fade in and out. It transitions from transparent white to semi-opaque white.
```bash

.shimmer-container::after {
    /* ... (initial setup) */
    transform: skewX(-25deg) translateX(-200%);
    background: linear-gradient(to right, 
        hsla(0, 0%, 100%, 0) 0%,
        hsla(0, 0%, 100%, 0) 100%
    );
    transition: transform 0.6s ease;
}


```

### Animating with `:hover`
To trigger the effect, we use the `:hover` state combined with a `transform` transition.

**How it works:** When the user hovers, the `translateX` value changes from its initial off-screen position `-200%` to a position that pushes it completely across and off the right side `300%`. The browser handles this change smoothly over 0.6 seconds, leveraging the GPU.
```bash

.shimmer-container:hover::after {
  /* Swipe across and off-screen right */
  transform: skewX(-25deg) translateX(300%);
}


```

### Compounding Effects
In my original project, I layered other transitions on the same `:hover` state to create a rich, cohesive visual effect:
* **Image zoom**. Used `transform: scale(1.1);` on the `<img>` tag.
* **Image darkening**. Used `filter: brightness(0.6);` on the `<img>` to make the text overlay pop.
* **Text entrance**. Animated the overlay text using `transform: translateY()` and `opacity`.

All these effects trigger instantly and run smoothly in parallel due to the power of CSS.
### Your Turn
Pure CSS is a powerful tool for visual engineers. By understanding pseudo-elements and transitions, you can create dynamic effects with zero performance cost.

Feel free to drop a comment or start discussion in my [discord community.](https://discord.gg/prqvsDRdNk) 

💡 Find the complete source code for this project in this [GitHub
repo.](https://github.com/kolonatalie/frontend-practice-projects)
<br>
<br>
> P.S.: I’m currently seeking my first long-term Junior Frontend role where I can apply my 6+ years of AR / 3D and Visual design experience to build clean and visually engaging web apps.
<br> If you value a developer who blends design thinking with engineering discipline, <a href="../#contact" target="_blank">let's connect</a>.