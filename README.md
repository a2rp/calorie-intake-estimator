![Project screenshot](./screenshot.png)

# Fuelwise: Calorie Intake Estimator

Fuelwise estimates resting energy, maintenance energy, and one goal-adjusted daily target from age, height, weight, activity, and the equation setting. Use it as a starting point for learning about personal energy needs, not as a medical or nutrition prescription.

**Project repository:** https://github.com/a2rp/calorie-intake-estimator
**Deployed site:** https://a2rp.github.io/calorie-intake-estimator/

## What is included

- Enter age, height, weight, and a sex value used by the selected equation.
- Choose an activity level and a goal to see a refreshed daily estimate.
- Compare estimated resting needs, maintenance calories, and the goal-adjusted target.
- Review an illustrative protein, carbohydrate, and fat split.
- Read a plain-language explanation of the estimator and its limits.

## How to use it

Change the measurements and selections in the form. The result updates as you make changes. Switch between maintain, reduce, and gain to compare target estimates. The macro amounts are planning examples derived from the entered weight and estimated energy target.

## Calculation and data

Resting energy uses the Mifflin-St Jeor equation. The original study derived it from 498 healthy adults aged 19–78 ([Mifflin et al., 1990](https://pubmed.ncbi.nlm.nih.gov/2305711/)). The app multiplies that estimate by a selected activity factor, then applies a fixed planning adjustment of −300 kcal for Reduce or +250 kcal for Gain. Maintain applies no adjustment.

The example macro split targets up to 1.6 g of protein per kilogram and 28% of the energy target from fat, then assigns the remaining target to carbohydrates. The amounts are capped so their energy does not exceed the displayed target. These are illustrative calculations, not individualized nutrition recommendations.

The app does not collect or save profile measurements. The equation is a population estimate and may not reflect an individual's needs. This tool is for general education only and does not provide medical advice, diagnosis, or a prescribed diet. It is not intended for people outside the study's adult age range, during pregnancy, or for people with medical conditions; seek qualified professional guidance for individual needs.

## Run and check locally

Requires Node.js 20.19 or later.

Install dependencies with `npm install`, then start Vite with `npm run dev`. Run `npm run lint` for ESLint and `npm run build` for the production build. Run `npm run deploy` to build and publish `dist` to the `gh-pages` branch.

## Future improvements

Ideas only. These are not implemented yet:

- Add metric and imperial unit switching.
- Offer goal adjustments as a range that can be tuned.
- Add an optional saved profile that remains only on the device.

## Links

- Portfolio: [https://www.ashishranjan.net](https://www.ashishranjan.net)
- GitHub: [https://github.com/a2rp](https://github.com/a2rp)
- CodePen: [https://codepen.io/ash1198](https://codepen.io/ash1198)
- LinkedIn: [https://www.linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)
- Facebook: [https://www.facebook.com/theash.ashish/](https://www.facebook.com/theash.ashish/)
- YouTube: [https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)
- Email: [mailto:ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)

## Support

- Support: [https://a2rp-donation-page.netlify.app/](https://a2rp-donation-page.netlify.app/)
- Buy Me a Coffee: [https://buymeacoffee.com/ashishranjan](https://buymeacoffee.com/ashishranjan)
- Patreon: [https://www.patreon.com/ashishranjan](https://www.patreon.com/ashishranjan)
