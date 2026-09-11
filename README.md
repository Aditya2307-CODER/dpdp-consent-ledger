# DPDP Consent Ledger

A blockchain-backed consent management prototype inspired by India's Digital Personal Data Protection (DPDP) framework. The application hashes a user's identifier with SHA-256 before sending consent data to a smart contract through a local Hardhat network.

## Features

- Consent preference capture through a web dashboard
- SHA-256 hashing before blockchain submission
- Express REST API
- Ethers.js blockchain integration
- Solidity consent ledger contract
- Local Hardhat deployment workflow
- Environment-based configuration for sensitive values

## Project Structure

```text
.
├── contracts/
│   └── ConsentLedger.sol
├── scripts/
│   └── deploy.js
├── index.html
├── server.js
├── hardhat.config.js
├── package.json
├── .env.example
└── .gitignore
```

## Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start Hardhat

```bash
npx hardhat node
```

Keep this terminal running.

### 3. Deploy the contract

In a second terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address printed in the terminal.

### 4. Configure the API

Create a `.env` file from `.env.example` and set:

```text
RPC_URL=http://127.0.0.1:8545
PRIVATE_KEY=your_local_hardhat_private_key
CONTRACT_ADDRESS=your_deployed_contract_address
```

Use a development-only local account key when running the local Hardhat network. Never commit a real private key.

### 5. Start the API

```bash
npm start
```

The API runs on port `3000`.

### 6. Open the dashboard

Open `index.html` in a browser and submit a consent preference.

## Architecture

```text
Browser Dashboard
       |
       v
Express REST API
       |
       | SHA-256 identifier
       v
Ethers.js Relayer
       |
       v
Hardhat Network
       |
       v
ConsentLedger.sol
```

## API

`POST /api/consent`

Example body:

```json
{
  "userId": "example-user",
  "purpose": "marketing_analytics",
  "status": true
}
```

The API hashes the identifier and stores the consent state against the hash and purpose.

## Privacy Note

This is an educational prototype, not a production compliance system. Hashing an identifier does not automatically make data anonymous or guarantee DPDP compliance. Production systems require appropriate privacy, security, access-control, key-management, consent-versioning, audit, retention, and governance controls.

## Tech Stack

JavaScript · Node.js · Express · Ethers.js · Hardhat · Solidity · HTML/CSS

## License

ISC
