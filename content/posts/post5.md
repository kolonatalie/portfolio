### 1. Don’t scale linearly

If you just divide by 2 (e.g. 50px → 25px), your mobile text will look tiny. Typography should shrink gently, not drastically.

**Headings:**
Large on desktop → medium on tablet → still readable but smaller on mobile.

**Body text:**
Usually only slightly smaller, sometimes the same size across breakpoints.

### 2. Typical ranges

#### 👉 For headings (h1):

- Wide screens (desktop): ~48–64px

- Tablet (~768px): ~36–44px

- Mobile (~375–480px): ~28–32px

#### 👉 For body text (p):

- Desktop: 16–18px

- Tablet: 16–17px

- Mobile: 15–16px (don’t go below 14px — too small to read comfortably!)

### 3. Scaling strategies
🟣 **Option A: Media queries**

Classic and simple:
```bash
h1 {
  font-size: 50px;

  @include screen(tablet) {
    font-size: 40px;
  }

  @include screen(mobile) {
    font-size: 30px;
  }
}

p {
  font-size: 17px;

  @include screen(mobile) {
    font-size: 15px;
  }
}
```
<br>
<br>

🟣 **Option B: Fluid typography with `clamp()`**

Modern & smooth — the font scales automatically between breakpoints:
```bash
    h1 {
    font-size: clamp(30px, 5vw, 50px);
    }

    p {
    font-size: clamp(15px, 2vw, 17px);
    }
```
<br>
<br>

👉 This means:

> h1 will never be smaller than 30px, never bigger than 50px, > and in between it scales with the viewport width. 
> Same for p text, between 15px and 17px.

### 4. Line-height

Don’t forget line-height!

- Headings: ~1.2–1.3

- Paragraphs: ~1.5–1.7

This helps readability, especially when text shrinks.