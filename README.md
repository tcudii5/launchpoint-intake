# Launch Point — New Project Intake

A one-page intake form for new app-build clients. Static HTML/CSS/JS,
submissions handled by Netlify's built-in Forms feature — no backend to run.

Responses show up in the Netlify dashboard under **Forms**, and email
notifications go to tcudii5@gmail.com on every submission (set under
Site configuration → Forms → Notifications).

## Local preview

```bash
npx serve .
```

Form submission only works once deployed to Netlify (it needs Netlify's
form-detection at build time); locally the button will just navigate to
`/thank-you/` without actually recording anything.
