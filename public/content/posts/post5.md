## 1. Don’t scale linearly

If you just divide by 2 (e.g. `50px` → `25px`), your mobile text will look tiny. Typography should shrink gently, not drastically.

**Headings:**  
Large on desktop → medium on tablet → still readable but smaller on mobile.

**Body text:**  
Usually only slightly smaller, sometimes the same size across breakpoints.

---  

## 2. Typical ranges

* ### For headings (`h1`):

  - Wide screens (desktop): `~48–64px`
  - Tablet (768px): `~36–44px`
  - Mobile (375–480px): `~28–32px`

* ### For body text (`p`):

  - Desktop: `16–18px`
  - Tablet: `16–17px`
  - Mobile: `15–16px` (don’t go below `14px` — too small to read comfortably!)

---  

## 3. Scaling strategies
### Option A: Media queries

Classic and simple:
```css
h1 {
  font-size: 50px;
    @media screen and (width >=768px) {
      font-size: 40px;
    }
    @media screen and (width >=360px) {
      font-size: 30px;
    }
}

p {
  font-size: 17px;
    @media screen and (width >=360px) {
      font-size: 15px;
    }
}
```

### Option B: Fluid typography with `clamp()`

Modern & smooth — the font scales automatically between breakpoints:
```css
h1 {
  font-size: clamp(30px, 5vw, 50px);
}

p {
  font-size: clamp(15px, 2vw, 17px);
}
```
> `h1` will never be smaller than `30px`, never bigger than `50px`, > and in between it scales with the viewport width. 
> Same for `p` text, between `15px` and `17px`.

---  

## 4. Line-height

Don’t forget `line-height`. This helps readability, especially when text shrinks.

```css
h1, h2, h3, h4 {
  line-height: 1.2; /* ~ 1.2 – 1.3 */
}

p {
  line-height: 1.6; /* ~ 1.5 – 1.7 */
}
```

---  

*I'm going to talk about "What `5vw` / `2vw` means" in the next post.*

Stay tuned!

xoxo