# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
# 🏎️ Fin1

> **What if learning about money felt less like studying and more like racing?**

**Fin1** is a gamified financial-literacy platform that turns real-world financial decision-making into a competitive racing experience.

Built for students and anyone looking to become more financially confident, Fin1 combines **financial education, realistic scenarios, progression, and friendly competition** to make learning how to manage money more engaging.

Instead of simply telling users how to budget, save, or plan for the future, Fin1 puts them behind the wheel and lets them **experience the consequences of their financial decisions.**

---

## 💡 The Problem

Financial literacy is one of the most important skills people can develop, yet it is often taught in ways that are difficult to engage with.

Knowing what a budget is isn't necessarily the same as knowing how to make one.

Knowing that saving is important isn't necessarily the same as knowing how to prioritize saving when unexpected expenses appear.

And knowing financial concepts from a textbook doesn't necessarily prepare someone for the situations they may eventually face in real life.

Students and young adults can encounter decisions involving:

* 💰 Saving and budgeting
* 🏠 Housing and recurring expenses
* 🎓 Education costs
* 🚗 Transportation
* 💳 Credit and debt
* 🛒 Large purchases
* 🚨 Unexpected expenses
* 📈 Long-term financial goals
* 💼 Changes in income

**Fin1 aims to bridge that gap between knowing financial concepts and actually practicing financial decision-making.**

---

# 🏁 Our Solution

Fin1 turns financial education into a **race.**

Users progress through a series of financial situations and make decisions that influence their journey.

Their financial progress is represented through a racing experience, while leaderboards allow users to compete with their friends.

The result is a simple gameplay loop:

```text
Learn
  ↓
Make a Financial Decision
  ↓
Experience the Outcome
  ↓
Improve Your Strategy
  ↓
Progress
  ↓
Compete
  ↓
Come Back and Improve
```

Rather than treating financial literacy as something users *have to learn*, Fin1 tries to make it something they **want to keep coming back to.**

---

# 🏆 Why Competition?

One of the core ideas behind Fin1 is that **competition can be a powerful motivator for learning.**

Traditional financial education often relies on motivation like:

> "I should probably learn how to manage my money."

Fin1 tries to turn that into:

> **"I want to be a better better than my companions!!"**

A leaderboard gives users a reason to return, improve their performance, and continue engaging with financial concepts.

The racing metaphor reinforces this:

**Better financial decisions → better progress → higher position on the leaderboard.**

The goal isn't to shame users for having less financial knowledge or experience. Instead, competition creates a social environment where friends can challenge each other, learn together, and celebrate improvement.

---

# 🌎 Finance for Different Life Paths

There isn't one universal financial journey.

Everyone has different circumstances, goals, responsibilities, opportunities, and unexpected events.

That's why Fin1 is designed around **possible situations rather than one "correct" financial life.**

A user might encounter scenarios involving:

* Building their first budget
* Deciding how much to save
* Handling an unexpected expense
* Balancing wants versus needs
* Managing recurring expenses
* Paying for education
* Making a major purchase
* Understanding credit
* Managing debt
* Building an emergency fund
* Adjusting to a change in income
* Planning toward a long-term goal

Fin1 doesn't try to predict exactly what someone's future will look like.

Instead, it gives users a place to **practice making decisions before those decisions become real-world problems.**

---

# 🚗 Why Racing?

The racing theme represents the financial journey itself.

Every race has:

* 🏁 A starting point
* 🎯 A destination
* 🛣️ Different routes
* ⚠️ Unexpected obstacles
* 🧠 Strategic decisions
* 🏎️ Different ways to approach the race
* 🏆 Competition

Financial life works in a surprisingly similar way.

There isn't always one perfect route.

Sometimes you have to slow down and save.

Sometimes an unexpected event forces you to change direction.

Sometimes taking a short-term opportunity can affect your long-term progress.

Fin1 uses racing as a visual and interactive metaphor for those decisions.

---

# 🎮 Core Experience

### 1. Onboarding

Users begin with an onboarding experience through `unburden.tsx`.

This allows Fin1 to understand what financial topics users are interested in learning about and helps establish the foundation for a more personalized experience.

### 2. Financial Scenarios

Users encounter realistic situations and must make financial decisions.

These decisions are designed to encourage users to think about tradeoffs rather than simply select memorized answers.

### 3. Progression

Users progress through their financial journey based on their decisions and performance.

### 4. Competition

Users can compare their progress through the leaderboard and compete with friends.

### 5. Improvement

The goal is to encourage users to return, learn from previous decisions, and improve their financial strategy.

---

# 🧩 Technical Architecture

Fin1 uses a React Native frontend with Supabase providing the backend data layer.

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   unburden.tsx   │
                    │    Onboarding    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Supabase     │
                    │     Database     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Leaderboard   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Competitive    │
                    │    Experience    │
                    └──────────────────┘
```

### Frontend

* React Native
* TypeScript / TSX
* Game-inspired interface
* Racing-themed progression
* Leaderboard experience

### Backend

* Supabase
* Persistent database
* User onboarding data
* Data retrieval for leaderboard functionality

The onboarding information collected through `unburden.tsx` is stored in Supabase and can then be fetched by the application for features such as the leaderboard.

---

# 🔥 What Makes Fin1 Different?

Fin1 isn't simply a financial-information app with game-like visuals.

The **game is the learning mechanism.**

Instead of:

> Read → Memorize → Quiz

Fin1 aims for:

> **Experience → Decide → See the Result → Adapt → Improve**

That difference is important.

Financial decisions are rarely isolated facts. They involve tradeoffs, uncertainty, and consequences.

By putting users into simulated situations, Fin1 can help them develop **decision-making skills**, rather than simply remembering definitions.

---

# 🧠 The Bigger Vision

The long-term goal for Fin1 is to create a financial-learning environment where users can explore an increasingly complex financial journey.

Future possibilities include:

* 🏆 Achievements and badges
* 👥 Private friend-group competitions
* ⚔️ Head-to-head challenges
* 🗺️ A larger financial journey map
* 🎲 Randomized life events
* 🏎️ Car customization
* 🔥 Daily and weekly challenges
* 📊 Personal progress analytics
* 🧠 Adaptive scenarios
* 📚 Progressively harder financial concepts
* 🌐 Larger competitive events

Eventually, a user's financial journey could feel less like completing lessons and more like progressing through an entire **financial career mode.**

---

# 🎯 Our Goal

Fin1 is built around a simple idea:

> **People shouldn't have to wait until they're facing a real financial problem to learn how to handle it.**

We want to give people a safe environment to practice.

We want financial literacy to be approachable for someone learning their first budgeting concepts, while still being engaging enough for someone who wants to challenge their friends.

Most importantly, we want users to leave Fin1 with something more valuable than a high score:

**better financial decision-making skills for the future.**

---

# 🛠️ Built With

**Frontend**

React Native · TypeScript · TSX

**Backend**

Supabase

**Core Concepts**

Financial Literacy · Gamification · Competitive Learning · Realistic Scenarios · Social Motivation

---

# 🏎️ Built for the Hackathon

Fin1 brings together:

**Finance × Racing × Gamification × Competition × Real-World Decision Making**

We're taking something that can feel intimidating and turning it into something people already understand:

**a game.**

Start the engine.
Make the decision.
Learn from the outcome.
**Race your way to financial confidence.**

## 🏁 Fin1

**Learn finance. Make decisions. Beat your friends.**