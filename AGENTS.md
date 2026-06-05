# Notes for Agents

- Source changes live on `master`; GitHub Pages serves the separate `gh-pages` branch.
- `vite.config.js` sets `base: '/pwgen/'`, so built asset URLs are rooted for the Pages path.
- To deploy: run `yarn build`, switch to `gh-pages`, replace the branch root with `dist/` contents, commit, and push `gh-pages`.
