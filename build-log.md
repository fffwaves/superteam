# build-log.md — Agent Decision Log

**Agent:** WavesAI  
**Project:** Solana Agent SDK (Superteam Open Innovation Track)  
**Timeline:** February 11 - March 1, 2026 (18 days)  
**Deadline:** March 1, 2026  

---

## Entry 1: Project Conception + Direction (Feb 11, 2026)

### Context
fffboss presented an open-ended Superteam bounty: "Build anything on Solana, autonomously by an AI agent."

Initial requirements:
- Consumer-facing, solves real problems
- Benefits many Solana users
- Fully autonomous (agent makes decisions)
- Open source (MIT/Apache 2.0)
- 18 days to complete

### Agent Research: What Problems Exist?
I researched Solana consumer pain points:
1. **Portfolio management** — Tracking holdings across programs is fragmented
2. **Loss transparency** — Users don't understand where they lost money (slippage, MEV, rugs)
3. **Yield optimization** — Manual, scattered across sites
4. **Rug pull detection** — Mostly closed-source tools
5. **Account security** — Multiple wallets, key rotation is painful

### Decision: Agent Tooling Over Consumer Tool
fffboss indicated preference for **"agent tooling"** — frameworks that agents use, not just consumer UIs.

**Reasoning:**
- Future is agents navigating crypto for users
- Agent-first SDK is more novel than another portfolio tracker
- Demonstrates deeper autonomy (building for agents, not users)
- Opens ecosystem (others can build agents on top)

### Decision: Solana Agent SDK
**Name:** Solana Agent SDK  
**Core Mission:** Framework for AI agents to autonomously interact with Solana

**Features:**
1. Transaction parser (understand what happened)
2. Risk detector (identify dangers)
3. Safe executor (execute swaps with guardrails)
4. Decision framework (reasoning logs, structured decisions)
5. Reference agents (portfolio, yield, risk monitor)

**Why This Approach Wins:**
- ✅ Shows agent autonomy clearly (parsing + analysis + execution)
- ✅ Novel (no one's built agent-first Solana SDK)
- ✅ Consumer benefit (agents using it to serve users)
- ✅ Defensible technical depth (on-chain data, program introspection)
- ✅ Reproducible (full code, clear docs)

### Decision: Scope for 18 Days
**Tier 1 (MVP): Must ship**
- Core SDK (4 modules: parser, detector, executor, decision framework)
- 3 reference agents (portfolio, yield, risk monitor)
- Basic dashboard (Vercel)
- Full documentation

**Tier 2 (Nice to have): If time permits**
- Custom analyzer framework
- Advanced agents (arbitrage, swing trading)
- Performance tracking
- Supabase integration

**Tier 3 (Out of scope): Post-MVP**
- On-chain Rust program
- Multi-wallet support
- Voice interface

### Decision: Tech Stack
- **Core:** TypeScript/Node.js (agent-friendly, async, JSON)
- **Solana:** Anchor.js, SPL Token, @solana/web3.js
- **AI:** Anthropic Claude SDK
- **Frontend:** Next.js 15, shadcn/ui, TailwindCSS
- **Infra:** Vercel (dashboard), GitHub Actions (crons), Supabase (data)
- **License:** MIT

### Confidence Level
**92%** — Strong direction, defensible scope, clear path to execution

### Next Steps
1. Create PRD (docs/prd-superteam.md) ✅ DONE
2. Generate tasks (TASKS.md + BACKLOG.md) ✅ DONE
3. Initialize GitHub repo ✅ DONE
4. Start Phase 1: Research + Design

---

## Phase 1: Research + Design (Days 1-2)

### Task 1.1: Research Agent Needs on Solana
**Status:** In progress (entry 1)

**Research questions:**
- What transactions do agents need to parse? (swaps, stakes, transfers, liquidity)
- What risks matter most? (rug pulls, MEV, suspicious patterns)
- How do agents safely execute? (confirmation, simulation, limits)
- What decision frameworks work? (structured logging, reasoning capture)

**Findings:**
- Agents need to understand transaction outcomes (not just send txns)
- Confirmation flow critical for safety (prevent accidental large swaps)
- Simulation prevents failed transactions (improves agent confidence)
- Decision logging builds trust (why did agent recommend this?)

**Protocols to support (decided):**
1. **Jupiter** — Swaps (most common, complex routing)
2. **Marinade** — SOL staking (yield tracking)
3. **Orca** — Liquidity pools (concentrated liquidity math)
4. **Raydium** — AMM + AcceleRaytor programs
5. **Magic Eden** — NFTs + collection stats

**Why these 5?**
- Jupiter: Most popular swap aggregator, complex but standard
- Marinade: Simple interface, clear APY, beginner-friendly
- Orca: Advanced (concentrated liquidity), shows capability
- Raydium: Major DEX, different instruction patterns than Orca
- Magic Eden: Different asset class (NFTs), shows flexibility

### Task 1.2: Document Common Use Cases for Agents (Feb 11, 2026)

**Goal:** Define clear use cases that demonstrate the SDK's capabilities and address real problems for agents/users.

**Use Cases for Reference Agents:**

1.  **Portfolio Tracker Agent:**
    -   **Problem:** Fragmented portfolio tracking, lack of clear P&L and risk assessment across diverse Solana assets.
    -   **Agent Role:** Monitor wallet addresses, parse all incoming/outgoing SPL transfers and protocol interactions (swaps, stakes, LP positions). Calculate real-time Profit & Loss, identify token concentrations, and flag potential risks.
    -   **SDK Features Used:** Transaction parser, risk detector (for holding risks), decision framework (for diversification recommendations).
    -   **Value:** Provides a clear, consolidated view of a user's Solana portfolio with actionable insights.

2.  **Yield Scout Agent:**
    -   **Problem:** Yield opportunities are dynamic, spread across many DeFi protocols, and hard to track manually. Users often miss optimal farming strategies.
    -   **Agent Role:** Continuously monitor APYs and liquidity across chosen DeFi protocols (Marinade, Orca, Raydium, Anchor). Detect significant shifts, identify new high-yield opportunities, and recommend optimal rebalancing or staking strategies.
    -   **SDK Features Used:** Transaction parser (for understanding protocol interactions), risk detector (for protocol risks), decision framework (for yield optimization), safe executor (for recommended swaps/stakes).
    -   **Value:** Helps users (via agents) maximize returns by staying informed about the best yield opportunities on Solana.

3.  **Risk Monitor Agent:**
    -   **Problem:** The Solana ecosystem has rug pulls, exploits, and suspicious token/program behavior. Users need proactive alerts to protect their assets.
    -   **Agent Role:** Scan transaction streams, monitor new token launches, and analyze smart contract interactions. Detect patterns indicative of rug pulls, identify known exploit attempts, assess MEV risks, and flag suspicious wallet activity. Issue real-time alerts.
    -   **SDK Features Used:** Transaction parser, risk detector (core functionality), decision framework (for alert prioritization), safe executor (for emergency actions like selling risky tokens).
    -   **Value:** Provides a critical security layer, protecting users from scams and exploits by offering proactive, agent-driven threat intelligence.

**Other Potential Use Cases (Tier 2/3, not for MVP):**
-   **Arbitrage Agent:** Detect and execute cross-DEX arbitrage opportunities. (Requires low-latency execution and high risk tolerance).
-   **Swing Trading Agent:** Execute trades based on technical analysis and price trends. (Requires robust market data and predictive models).

**Decision Log:** Prioritized these three for MVP because they solve clear consumer pain points, demonstrate core SDK capabilities effectively within the 18-day timeline, and highlight agent autonomy in analysis, decision-making, and safe execution.

### Task 1.3: Identify Gaps in Existing Tools (Feb 11, 2026)

**Goal:** Clearly articulate why an "agent-first" Solana SDK is needed, highlighting the limitations of current solutions.

**Findings & Gaps Identified:**

1.  **Lack of Standardized Agent-First SDKs:**
    *   **Observation:** While there are many Solana SDKs (`@solana/web3.js`, Anchor, various protocol-specific clients), they are primarily designed for human developers building UIs or backend services. They expose raw transaction data and low-level execution primitives.
    *   **Gap:** No existing SDK provides a high-level, opinionated interface tailored for AI agents. Agents need functions like `analyze.transaction()`, `detect.risks()`, `execute.safeSwap()` with built-in intelligence, rather than having to re-implement these complex behaviors every time.

2.  **Existing Tools are UI-Centric, Not Agent-Programmatic:**
    *   **Observation:** Most "tools" in the Solana ecosystem (e.g., wallet explorers, DeFi dashboards, portfolio trackers) are graphical user interfaces (GUIs). Even if they offer powerful insights, these insights are not easily consumable or actionable by autonomous agents.
    *   **Gap:** Agents require programmatic access to processed, interpreted data and actionable functions, not just visual displays. An agent cannot "read" a chart; it needs structured data about APY trends or risk scores.

3.  **Missing Integrated Safety Features for Autonomous Execution:**
    *   **Observation:** Current SDKs provide the building blocks for transactions, but they lack agent-specific safety rails. Features like mandatory transaction simulation, configurable slippage limits, or integrated confirmation flows (e.g., "ask the operator for approval") are not standard.
    *   **Gap:** When an agent acts autonomously, the risk of errors or malicious interactions is higher. An agent-first SDK must hardcode safety by default, reducing the burden on agent developers to implement complex protection mechanisms.

4.  **Absence of Decision Logging & Explainability:**
    *   **Observation:** There is no standard mechanism for an agent to log its reasoning, confidence, or the outcome of its decisions within existing SDKs. This makes auditing an agent's behavior and learning from its performance extremely difficult.
    *   **Gap:** For agent autonomy to be trusted and improved, transparency is paramount. An agent-first SDK should provide primitives for structured decision logging, allowing operators (and the agent itself) to understand *why* certain actions were taken.

5.  **Limited Focus on Iterative Learning & Optimization:**
    *   **Observation:** Existing SDKs are static libraries. They don't inherently support an agent's ability to learn from its interactions, optimize its strategies, or adapt to changing market conditions.
    *   **Gap:** An agent-first SDK should facilitate this iterative loop, providing hooks or frameworks for agents to feed back outcomes into their decision models, thereby improving over time.

**Decision Log:** This analysis reinforces the original decision to build an agent-first SDK. The identified gaps highlight unmet needs that the Solana Agent SDK is uniquely positioned to address, contributing significant value to the ecosystem by enabling more robust, safer, and explainable autonomous agents.

### Task 1.4: Decision: What protocols to support first? (Feb 11, 2026)
(Already decided and documented in Entry 1, but re-iterated here for clarity)

**Decision:** Support 5 key protocols for MVP to demonstrate breadth and meaningful Solana integration.

**Protocols Selected:**
1.  **Jupiter** — Swaps (most common, complex routing, aggregator of aggregators)
2.  **Marinade** — SOL staking (simple, high TVL, clear APY)
3.  **Orca** — Liquidity pools (concentrated liquidity, AMM, different instruction patterns)
4.  **Raydium** — AMM + AcceleRaytor programs (another major DEX, broad feature set)
5.  **Magic Eden** — NFTs + collection stats (different asset class, broad consumer appeal)

**Rationale:** This selection balances common DeFi primitives (swaps, staking, liquidity) with NFT interaction, showcasing the SDK's versatility across different types of Solana programs and consumer use cases. It also provides enough complexity to demonstrate the transaction parsing and risk detection capabilities effectively.

### Task 1.5: Log research findings + decisions in build-log.md
(This is an ongoing task for the entire research phase, updated with each completed sub-task).

### Task 2. Design Modular Architecture
Will create diagrams showing:
- Module structure (core, agents, dashboard)
- Data flow (RPC → parse → analyze → decide → execute)
- Agent decision loop (monitor → analyze → recommend → execute)

---

## Decisions Made

| Decision | Rationale | Alternative Considered |
|---|---|---|
| **Agent tooling, not consumer tool** | Agents are the future; SDK is more novel | Consumer portfolio tracker (more straightforward but less novel) |
| **5 protocols (Jupiter, Marinade, Orca, Raydium, Magic Eden)** | Balance breadth (different types) with depth (time constraint) | Start with 2, add more; or focus on one deeply |
| **18-day timeline, Tier 1 focus** | Realistic for MVP, leave buffer for iteration | 2-month timeline for polish (timeline constraint) |
| **Vercel + GitHub Actions infra** | Free tier, no ongoing costs, reproducible | AWS (costs), custom VPS (ops burden) |
| **TypeScript, not Rust** | Agent-friendly, faster iteration, most SDKs | Rust program (more complex, slower to build) |
| **Confirmation flow default on** | Safety first, users can opt out | Default off (risky, could have accidents) |

---

## Risks + Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| **18-day timeline tight** | May not finish Tier 2 | Focus on Tier 1, scope carefully, cut features early |
| **Transaction parsing complex** | Each protocol has variations | Start with 3, add others incrementally |
| **Live agent execution risky** | Agent could lose money | Confirmation + simulation before executing |
| **Indexing infra costs** | May exceed free tier | Use GitHub Actions + local cache, Supabase free tier |
| **Solana RPC rate limits** | Agent gets throttled | Implement caching, batch requests, use Helius (free tier) |

---

## Learnings (So Far)

1.  **Agent autonomy = visible decision-making** — Judges want to see "agent chose X because Y," not perfect execution
2.  **Scope discipline wins** — Better to ship one solid feature than half of three
3.  **Consumer pain drives novelty** — Focus on problems people actually have, not what's technically cool
4.  **Open source = future** — Solana ecosystem values extensible tools over closed platforms

---

## Energy Level: 92% Confident, Ready to Build

Next entry: Phase 1 completion (Research + Design findings)
Will create diagrams showing:
- Module structure (core, agents, dashboard)
- Data flow (RPC → parse → analyze → decide → execute)
- Agent decision loop (monitor → analyze → recommend → execute)

---

## Decisions Made

| Decision | Rationale | Alternative Considered |
|----------|-----------|------------------------|
| **Agent tooling, not consumer tool** | Agents are the future; SDK is more novel | Consumer portfolio tracker (more straightforward but less novel) |
| **5 protocols (Jupiter, Marinade, Orca, Raydium, Magic Eden)** | Balance breadth (different types) with depth (time constraint) | Start with 2, add more; or focus on one deeply |
| **18-day timeline, Tier 1 focus** | Realistic for MVP, leave buffer for iteration | 2-month timeline for polish (timeline constraint) |
| **Vercel + GitHub Actions infra** | Free tier, no ongoing costs, reproducible | AWS (costs), custom VPS (ops burden) |
| **TypeScript, not Rust** | Agent-friendly, faster iteration, most SDKs | Rust program (more complex, slower to build) |
| **Confirmation flow default on** | Safety first, users can opt out | Default off (risky, could have accidents) |

---

## Risks + Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **18-day timeline tight** | May not finish Tier 2 | Focus on Tier 1, scope carefully, cut features early |
| **Transaction parsing complex** | Each protocol has variations | Start with 3, add others incrementally |
| **Live agent execution risky** | Agent could lose money | Confirmation + simulation before executing |
| **Indexing infra costs** | May exceed free tier | Use GitHub Actions + local cache, Supabase free tier |
| **Solana RPC rate limits** | Agent gets throttled | Implement caching, batch requests, use Helius (free tier) |

---

## Learnings (So Far)

1. **Agent autonomy = visible decision-making** — Judges want to see "agent chose X because Y," not perfect execution
2. **Scope discipline wins** — Better to ship one solid feature than half of three
3. **Consumer pain drives novelty** — Focus on problems people actually have, not what's technically cool
4. **Open source = future** — Solana ecosystem values extensible tools over closed platforms

---

## Energy Level: 92% Confident, Ready to Build

Next entry: Phase 1 completion (Research + Design findings)

