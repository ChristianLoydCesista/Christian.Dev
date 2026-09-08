# Christian — Portfolio (Live Refined Build)

This folder is ready for static hosting. There is no build step and no framework dependency.

## 1. Add your real profile photo

Place your photo beside `index.html` and name it exactly:

`profile-picture2.png`

If the photo is missing, the page shows a clean `CL` fallback instead of a broken image.

## 2. Configure your links

Open `index.html`, search for `const PORTFOLIO =`, and fill in only the links you have:

```js
const PORTFOLIO = {
  github: "https://github.com/YOUR_USERNAME",
  linkedin: "https://www.linkedin.com/in/YOUR_PROFILE",
  email: "you@example.com",
  resume: "resume.pdf",
  projects: {
    bcis: "",
    projectManager: "",
    inventory: ""
  }
};
```

Blank values automatically hide their buttons, so the live site never shows dead `#` links.

If you use `resume.pdf`, put the PDF beside `index.html`.

## 3. Recommended deployment — GitHub Pages

1. Create or open a GitHub repository for the portfolio.
2. Upload the contents of this folder to the repository root.
3. Make sure the homepage file is named `index.html`.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select your main branch and `/(root)`, then save.
7. GitHub will publish the site and show its public URL in the Pages settings.

## 4. Fast alternative — Netlify Drop

You can drag this entire folder into Netlify's deploy dropzone to publish it as a static site.

## Production improvements included

- Real mobile viewport (`width=device-width`)
- Clean consolidated CSS instead of stacked override blocks
- Responsive hero, selected work, project cards, skills, journey, and contact sections
- Dark/light mode with system-theme fallback
- Accessible mobile navigation and keyboard focus states
- Reduced-motion support
- Scroll reveal and active navigation state
- SEO/social metadata and Person structured data
- Dynamic year
- 404 page
- Favicon
- Broken-link prevention through a small configuration object
- Graceful profile-photo fallback

## Before sharing publicly

Replace mock project visuals with real screenshots when available. The current embedded visuals are presentation mockups inherited from the prototype.
