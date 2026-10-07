# The selection exercise story

## An interview exercise with a practical lesson

This repository is a solution to a frontend item-selection exercise. It is intentionally small: a generated list, independent toggles, a selection summary, and a responsive colorful grid. No proprietary interview prompt is reproduced here, and there is no invented SaaS origin, business, customer history, or production deployment.

Its beneficiaries are the author practicing frontend reasoning, reviewers assessing React fundamentals, and learners exploring how UI state and accessibility reinforce each other. The goal is to make a small interaction correct and explainable.

## A hypothetical review scenario

Imagine a fictional reviewer, Taylor, exploring the page. Taylor selects two tiles with a mouse, then uses Tab and Space to add another. Enter toggles it off again. The visual outline, selection summary, and pressed-state semantics agree.

Before examining the implementation, a reviewer may see only a click demo. After tracing the code, the useful questions become concrete: Does state survive rapid independent toggles? Are old state objects mutated? Can keyboard users perform the same action? Does memoization actually receive stable props? Those questions are the value of the exercise; no commercial adoption is implied.

## What the code demonstrates

[app.jsx](../app.jsx) uses a Set of names and a functional state updater to avoid lost selections. A memoized tile receives a stable toggle callback. Native buttons sit inside real list items, and `aria-pressed` matches the selected state. [styles.css](../styles.css) retains the original varied palette while improving label readability and narrow-screen wrapping. [browser tests](../tests/selection.spec.mjs) exercise the interaction on all 800 generated controls and a 320-pixel viewport.

This is not a full product. It has no saved selections, login, backend, business workflow, or offline guarantee for the CDN entrypoint. Reloading clears state. Memoization does not virtualize the 800-button DOM. These limits keep the scope honest and make sensible extension discussions possible.

## 60–90 second demo narration

“This is my frontend item-selection exercise. It generates eight hundred combinations of sizes, colors, and fruits. I can select more than one item, and the summary shows the names in the order I selected them.

“I'll select one item with the mouse, then focus another and press Space. Both stay selected. Enter toggles the focused item off. The buttons expose their state with aria-pressed, and the selection outline gives a cue beyond color. On a narrow screen the grid reflows and longer names can wrap.

“In the code, selection is a Set. Each update clones the previous Set so React sees a new state value. The toggle callback uses a functional updater, so it can stay stable without capturing stale selection. That also helps the memoized item components skip renders when their props stay the same.

“The exercise is deliberately limited: selection resets on reload, there is no backend, and all eight hundred controls remain mounted. The protected generated-data section stays unchanged. The browser tests cover the behavior, while the manual explains where a larger production list would need different identity, persistence, and accessibility decisions.”

See the [technical manual](technical-manual.md) for exact setup, component contracts, debugging labs, and extension solutions.
