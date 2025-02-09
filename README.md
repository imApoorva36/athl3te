# athl3te

> A submission for the ETHGlobal Agentic Hackathon by Team Higgs

## Overview

athl3te is a Web3-powered fitness application with AI-driven features that transforms how users track, manage, and improve their fitness journey through blockchain technology and AI assistance.

We're proud to be building with and applying for the following sponsor tracks:

- Autonome - AI Agent Ecosystem
- The Graph - Data Indexing & Queries
- Nillion - Secure Data Storage
- Base - Smart Contract Infrastructure


## System Architecture

![System Architecture](frontend/public/system_arch.png)

## Core Features

### Activity Management

- Import activities from Web2 apps (Strava integration)
- Support for key activities: Walking, Running, Cycling, Swimming
- Personal workout logging and tracking
- Goal tracking system for sports and nutrition

### AI-Powered Assistance

- Daily check-in system with personalized AI agents
- Injury prevention and management
- Nutrition guidance and recommendations
- AI-managed community interactions
- Sentiment analysis and motivational support

### Community Features

- Activity-based community groups
- Real-time progress tracking
- Community challenges and goals
- AI-driven community management
- Achievement NFTs for milestones
- Automated health monitoring and tips
- Regular motivational updates
- Injury prevention insights

## Automated Systems

Our platform implements several automated processes to enhance user experience:

### Periodic Health Checks

- Regular community-wide injury pattern analysis
- Proactive injury prevention recommendations
- Automated recovery guidance for common injuries

### Community Engagement

- Scheduled motivational messages
- Regular fitness tips and best practices
- Activity trend analysis and insights
- Periodic achievement celebrations

## Technology Stack

### Autonome Implementation

Inspired by CDP's Agentkit, we created a [custom framework](https://dev.autonome.fun/autonome/new?template=f4f58c1a-07e5-400a-bd9a-ecf415d30df9) called *lang-server*, that allows us to effectively multiplex between all our agents. In addition, leverage Autonome for our AI agent ecosystem's deployment:

- Goal Setting Agent: Converts user inputs to structured JSON
- Personal Check-in Agent: Daily monitoring and guidance
- Injury Management Agent: Health monitoring and advice
- Nutrition Agent: Dietary recommendations
- Community Agents: Group management and engagement
- NFT Minting Agent: Achievement recognition

### The Graph Integration

Our subgraph indexes and queries:

- Real-time activity tracking
- Community goal progress
- Injury pattern analysis
- Community analytics and insights

### Nillion Secure Storage

Private data storage for:

- Personal goals and schedules
- Daily fitness plans
- Injury records
- Nutrition plans
- Activity progress
- Community memberships
- Agent subscriptions

### Base

- [Link to basescan for our deployed contract with address 0x34058be1ec2F67eFD9Fa351dAaDe5bA81f397cD3](https://sepolia.basescan.org/address/0x34058be1ec2F67eFD9Fa351dAaDe5bA81f397cD3)
- Smart contract deployment and management
- Secure transaction handling
- Web3 wallet integration (MetaMask and Coinbase Wallet)

## Premium Features

- Exclusive AI agents access
- Advanced nutrition guidance
- Performance analysis
- Achievement NFTs

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/imApoorva36/athl3te.git
   ```
2. Navigate to the project directory:
   ```sh
   cd frontend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

## Contributing

We welcome contributions from the community! Feel free to fork the repo, open issues, and submit pull requests.

## License

This project is licensed under the Apache License.

---

### Join us in revolutionizing fitness with Web3 and AI!
