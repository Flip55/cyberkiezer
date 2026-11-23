# Cyberkiezer

Demo of a cybersecurity check for Flemish SMEs ("cybersecurity voor kmo").

A visitor answers ten questions in a chat, including a free-text question about the tools they use. The page shows a score out of 100, the gaps, an estimate of the VLAIO subsidy and a form to request proposals from specialists.

## What this demo does and does not do

- Single static page (`index.html`), no build step, works on GitHub Pages.
- The chat is scripted. Tool names in the free-text answer are recognised with keyword rules, not with an AI model.
- Nothing is stored or sent. The lead form only shows a demo message.
- The score is an indication based on eight basic measures. It is not an official CyberFundamentals assessment.

## To make it a real product

- A backend to receive leads, with consent logging and deletion of raw answers.
- An AI model behind the free-text question, called from the backend so the API key stays private.
- A provider database and matching rules.
- Final name, domain, contact address and privacy policy.

## Publish on GitHub Pages

Settings > Pages > Deploy from a branch > `main` / root.
