# pwgen

Try it out: https://tallpants.github.io/pwgen

## Why

https://passwordsgenerator.net disappeared, and every password generator site I found online was clunky and slow and annoying for what I wanted to do, so I made this for myself.

Uses the web crypto API under the hood so the random seed used to create the passwords is secure.

## Features

- Syncs the state with the URL so if you pick the length and password type you want, you can bookmark it and clicking it will generate a new one with the same settings.
- Generates on page start so you don't have to click a button to generate, just open a new tab, click the bookmark, and hit copy.

## Non-Features

- No styling
- Not an ad for a password manager
- No cool UI
- No ads or analytics
- About a 100 lines of code
- Just a way to generate passwords and copy them to your clipboard fast
