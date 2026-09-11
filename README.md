# DPDP Consent Ledger

A blockchain-backed consent management prototype inspired by India's Digital Personal Data Protection (DPDP) framework. The application hashes a user's identifier with SHA-256 before sending consent data to a smart-contract interface through a local Hardhat node.

## Features

- Consent preference capture through a lightweight web dashboard
- SHA-256 hashing of the user identifier before blockchain submission
- REST API built with Express
- Ethers.js integration with a local Hardhat JSON-RPC node
- Smart-contract interface for updating and checking consent status
- CORS-enabled frontend/backend communication

## Project Files

- `index.html` — consent dashboard and frontend interaction
- `server.js` — Express API and blockchain relayer logic
- `hardhat.config.js` — Hardhat configuration using Solidity 0.8.24
- `package.json` / `package-lock.json` — Node.js dependencies

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start a local Hardhat node

```bash
npx hardhat node
```

### 3. Configure the deployed contract

Deploy the compatible consent smart contract to the local Hardhat network and replace `PASTE_YOUR_DEPLOYED_ADDRESS_HERE` in `server.js` with the deployed contract address.

> The uploaded source set contains the application/backend files but does not include the Solidity contract or deployment script, so those components must be added before the complete blockchain flow can run end-to-end.

### 4. Start the API

```bash
node server.js
```

The API listens on `http://localhost:3000`.

### 5. Open the dashboard

Open `index.html` in a browser while the API and local Hardhat node are running.

## Architecture

```text
Browser Dashboard
       |
       v
Express REST API
       |
       | SHA-256 user identifier
       v
Ethers.js Relayer
       |
       v
Local Hardhat Network
       |
       v
Consent Smart Contract
```

## Privacy Note

This is a prototype. Hashing an identifier does not automatically make data anonymous or guarantee DPDP compliance. Production deployments should use appropriate privacy, key-management, access-control, consent-versioning, audit, retention, and security controls.

## Tech Stack

- JavaScript / Node.js
- Express
- Ethers.js
- Hardhat
- Solidity 0.8.24
- HTML/CSS/JavaScript

## License

ISC
