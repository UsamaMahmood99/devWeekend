# Project Explanation

## How to Run

### Requirements

Install the following on a fresh machine:

* Node.js (v18 or newer recommended)
* npm (comes with Node.js)
* Git

---

## Clone Repository

```bash
git clone https://github.com/UsamaMahmood99/devWeekend.git
```

---

## Navigate Into Project

```bash
cd devWeekend
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

The app will run locally at:

```txt
http://localhost:5173
```

---

## Production Build

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---

## Live Deployment

The project is deployed using GitHub Actions + GitHub Pages.

Live URL:

```txt
https://usamamahmood99.github.io/devWeekend/
```

---

# Stack & Design Choices

## Frontend Stack Choice


I specifically chose React because the project requirements were centered around lightweight setup, and simple deployment rather than routing, SSR, or large-scale architecture.

The app is highly state-driven:

* bill amount changes
* tip percentage changes
* people count changes
* calculations update instantly

I also chose React because i was familiar with its ecosystem, debugging tools, and deployment workflow, which helped me focus on interaction quality instead of framework configuration.
Using Angular,Next would significantly increase setup and boilerplate compared to the actual needs of the project.

### Why Not Vanilla JavaScript

As state management becomes harder to scale cleanly once:

* validation logic
* live calculations
* responsive UI updates
* conditional rendering

are added together.

React allowed me to organize the UI with ease instead of manually querying and updating DOM elements.

---




## Design Decision 1 

On larger screens, I separated the app into:

* an input panel on the left
* a results panel on the right

I used a split layout because users frequently look back and forth between entered values and calculated results. Keeping both visible simultaneously reduces and avoids scrolling during interaction.

---

## Design Decision 2 

I intentionally designed the “Each person pays” card as the dominant visual element.

The main amount uses:

* larger typography
* dark background
* high-contrast accent color

while secondary information such as subtotal and total tip is visually quieter.

The reasoning was to prioritize the single value users care about most during bill splitting instead of giving all numbers equal visual weight.

---
## Decision 3 Why I Used `useMemo`

I used the `useMemo` hook for both `tipPct` and `computed` values to avoid recalculating derived values on every render.

The calculator updates in real time as users type, which means the component re-renders frequently. Without memoization, calculations and parsing logic would execute on every render even when unrelated state changed.

For `tipPct`, `useMemo` ensures the effective tip percentage is recalculated only when:

* preset tip changes
* custom tip input changes

For `computed`, the hook recalculates totals only when:

* bill changes
* people count changes
* tip percentage changes
* validation state changes

This keeps the logic predictable and prevents unnecessary recalculation work during rapid input updates.

---

## Why I Used the `fmt()` Function

I created the `fmt()` helper function for formatting and keep numeric output consistent throughout the app.

```js "
function fmt(n) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
```

This function ensures:

* all monetary values always display exactly two decimal places
* large numbers are formatted with commas automatically
* formatting logic is not repeated throughout the JSX

---

## Calculations

I also intentionally converted calculations into integer cents before division:

```js 
const billCents = Math.round(b * 100);
```

instead of directly using floating point math.

This reduces floating point precision issues that commonly appear in currency calculations such as:

```js 
0.1 + 0.2 !== 0.3
```

By working in cents first and converting back afterward, the app produces more reliable financial results.

## Input Validation & Error Handling 

One issue I explicitly handled was invalid keyboard input prevention and clear validation feedback.

Examples include:

* preventing invalid numeric characters (`e`, `+`, `-`) so user cannot enter negative values, whole number for people field
* displaying inline validation messages i.e number of people is zero
* made sure user is only able to enter valid values by implementing regex 

This reduces accidental invalid calculations and improves usability for users.

---

# Responsive Behavior

## On a Mobile Screen

* The layout switches from horizontal to vertical.
* Input and result sections stack vertically.
* Additional bottom spacing prevents the mobile keyboard from covering results.
* The page becomes scrollable when the keyboard opens.

This behavior is handled mainly through the mobile media queries.

---

## On a 1440px Laptop

* Inputs and results appear side-by-side.
* Both panels stay visible simultaneously without scrolling.
* The layout remains centered with a max-width to avoid overly stretched content.
---

# AI Usage

## AI Tools Used

I used ChatGPT during development for:

1. GitHub Actions deployment troubleshooting
    I used AI to debug why the app was not deploying correctly to GitHub Pages and to identify issues with the workflow, branch setup, and deployment configuration as gh-pages branch was not being made so i figured it out it needed different config as i was using vite. this was also my first time creating a yml file so i used config from chatgpt.
2. GitHub Pages + Vite configuration
    then i correctly configured the Vite base path, homepage URL as i was using github.com instead of github.io, and deployment settings required for GitHub Pages hosting such as deploying from gh-pages branch instead of main branch.
3. README drafting
    I used AI to help structure and format the project README, i knew setup instructions, deployment details, and technical explanations but was not familiar with formatting a readme file so asked chatgpt to convert my text into a reaadme format.

---


