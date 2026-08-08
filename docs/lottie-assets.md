# dotLottie asset record

Both animations are original geometric interface animations created for this portfolio. They contain no third-party artwork, fonts, images, or personal data.

| File | Purpose | Playback | Fallback |
| --- | --- | --- | --- |
| `public/lottie/process-route.lottie` | Draws the route connecting Understand, Shape, Build, and Refine | Once when the Process visual enters view | `public/lottie/process-poster.svg` |
| `public/lottie/contact-success.lottie` | Confirms that the demo form passed local validation | Once after a successful local preview | `public/lottie/contact-poster.svg` |

The source manifests and animation JSON live under `lottie-src/`. Offscreen, hidden-tab, reduced-motion, and load-error behavior is controlled by the reusable `LottieVisual` client component.
