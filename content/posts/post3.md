I wanted this blog to feel like a typical messenger channel. 

### My initial goals were:

- Infinite scroll
- Reactions
- Shareable posts

And here’s how I made them:

#### Infinite scroll

Instead of showing all posts at once, I load them in small batches (3 at a time). As you scroll near the bottom, JavaScript fetches and renders the next set, just like an instagram feed that never ends.

#### Reactions

Each post has buttons for `👍 ❤️ 🔥`.
When you click one, it updates instantly and saves your reaction in `localStorage`, so your choice sticks even after refreshing.

#### Share Links

Every post **gets a unique URL** (thanks to hash navigation).
You can copy it, or on mobile, share it directly with the native share dialog.
If copying fails, there’s even a fallback input box you can copy from.

The link takes you straight to that post, highlights it, and scrolls it into view smoothly.
<br>
<br>
<details>
    <summary>Spoiler</summary>
    <ul>
      <li>The view counts at the end of each post aren’t real. They are random numbers from <code>JSON</code> file.</li>
      <li>The “blog readers” count at the top isn’t real either. 
      It's just a <code>< p >< /p ></code> with a number I liked.</li>
    </ul>
</details>
<br>
<br>

In the next post, I'll share [design features](../blog/#post-blog-features-part-2-design) of this blog.

*Stay tuned!*