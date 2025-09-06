# When Junior Developers Refuse to Give Up: How We Solved React SEO in 2021

*A story of late nights, creative problem-solving, and why sometimes the "wrong" way leads to the right solution*

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*xDOcqrRD9PZthMqG7SJYCw.png)
---

It was 2021. My coworker and I were fresh-faced junior developers, armed with nothing but enthusiasm, a decent understanding of React, and the dangerous confidence that comes with successfully deploying your first few projects.

We had just built what we thought was our masterpiece - a sleek React application with smooth animations, intuitive user flows, and components that would make any developer proud. We deployed it, shared it with friends, and waited for the world to discover our creation.

**Weeks passed. Our beautiful application remained invisible.**

## The Harsh Reality of Single Page Applications

Like many developers in 2021, we learned the hard way about React's SEO limitations. Our application was essentially delivering this to search engines:

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

Google would crawl our site and find... nothing. An empty div waiting for JavaScript to bring it to life.

"Just use Next.js," everyone said. "Try Gatsby," others suggested.

But here's the thing about junior developers - we're stubborn. We had spent months learning and rewriting app to adapt to these solutions. We understood our build process, our webpack configs, our deployment pipeline. The idea of learning an entirely new framework, with its conventions and constraints, felt like starting over. So we decided to solve it without modifying ReactJS codebase.


## Idea

After deep research through StackOverflow questions and GitHub issues we had an idea that seemed almost too simple:

*"What if we don't change our React app at all? What if we just... wrap it?"*

The concept was surprisingly straightforward:
1. Build our React app normally (static files)
2. Take the generated `index.html` and turn it into a server template
3. Let the server inject SEO data before sending it to browsers
4. Keep everything else exactly the same

It felt like we were breaking rules. It felt like we were doing things the "wrong" way.

## Our Scrappy Solution

We ended up building two versions of this approach, depending on what we were comfortable with at the time:

### The Express.js Version (When We Felt Fancy)

```javascript
// Our route configuration - simple but effective
var routes_list = [
  {
    "path": "/",
    "title": "Our Amazing App | Home",
    "description": "Built by junior devs who refused to give up",
    "keywords": "react, seo, junior developers",
    "url": "https://oursite.com",
    "type": "website",
    "img": "/static/images/og_home.png"
  },
  // ... more routes
];

// The function that made everything work
const get_page_data = (page_route_name = '') => {
  var seo_response = {
    "title": "Default Title",
    "description": "Default description",
    // ... defaults
  };

  routes_list.map((r) => {
    if (r["path"] === page_route_name.toString()) {
      seo_response["title"] = r["title"];
      seo_response["description"] = r["description"];
      // ... update all SEO fields
    }
  });
  
  return seo_response;
}
```

### The Flask Version

```python
@app.route("/<route>")
def route_handler(route):
    seo_data = get_seo_data(route)
    return render_template('index.html', seo_data=seo_data)
```

### The Template Tweaking

We converted our React build's `index.html` into this:

```html
<!-- EJS version -->
<title><%= seo_data.title %></title>
<meta name="description" content="<%= seo_data.description %>">
<meta property="og:title" content="<%= seo_data.title %>">

<!-- Or Jinja2 version -->
<title>{{ seo_data.title }}</title>
<meta name="description" content="{{ seo_data.description }}">
<meta property="og:title" content="{{ seo_data.title }}">
```

And after some time of tweaking and deploying we finally saw our pages appear in Google search results: our title, our description, our carefully crafted meta tags, all showing up exactly as we had designed them.

**Our React app was finally visible to the world.**

## Why This Worked (And Why It Mattered)

Looking back with more experience, I realize our solution worked because it solved the fundamental problem without overthinking it:

- **Search engines got server-rendered HTML** with all the meta tags they needed
- **Users still got the full React SPA experience** once the page loaded
- **We kept our existing workflow** without learning new frameworks
- **It was flexible and maintainable** for our growing applications

## The Professional Reality Check

Now, in 2024, would I recommend this approach for new projects? Probably not. Next.js has evolved tremendously. Remix provides excellent solutions. Modern React has Server Components. The ecosystem has matured in ways that make SEO much less of a headache.

But here's what I learned from our junior-developer stubbornness: **sometimes the "wrong" way teaches you more than the "right" way.**

By building our own solution, we understood:
- How server-side rendering actually works
- What search engines really need for SEO
- How to bridge client and server-side concerns
- The value of simple, maintainable solutions

## A messages for dev-newcomers:

If you're a beginner/junior developer right now, facing a problem that everyone says has an "obvious" solution, but that solution doesn't feel right to you - **trust that instinct sometimes and try to put ideas into reality.**

Yes, learn the established patterns. Yes, understand why the community recommends certain approaches. But also don't be afraid to experiment, to build your own solutions, to take the scenic route to understanding.
Some of my best learning experiences came from refusing to accept that there was only one way to solve a problem.

This article might be a motivation for someone, or someone might find themselves in the past, also trying to create their own solution.

Our 2021 SEO solution wasn't perfect. It wasn't the most elegant. It definitely wasn't what you'd find in a best practices guide.

**But it was ours.**

It solved our problem, taught us valuable lessons, and kept our React applications discoverable during those crucial early months. Sometimes, that's exactly what a solution needs to be.

---

*What creative solutions have you built as a beginner/junior developer? Share your stories in the comments below—let's celebrate the beautiful messiness of learning to code.*
