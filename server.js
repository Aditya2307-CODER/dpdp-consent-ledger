import express from "express";
import { ethers } from "ethers";
import crypto from "crypto";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const RPC_URL = process.env.RPC_URL || "http://127.0.0.1:8545";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

if (!PRIVATE_KEY || !CONTRACT_ADDRESS) {
  console.warn("Missing PRIVATE_KEY or CONTRACT_ADDRESS. Configure environment variables before submitting blockchain transactions.");
}

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = PRIVATE_KEY ? new ethers.Wallet(PRIVATE_KEY, provider) : null;

const ABI = [
  "function updateConsent(bytes32 _userHash, string memory _purposeId, bool _status) public",
  "function checkConsent(bytes32 _userHash, string memory _purposeId) public view returns (bool)"
];

const contract = wallet && CONTRACT_ADDRESS
  ? new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet)
  : null;

app.post("/api/consent", async (req, res) => {
  try {
    const { userId, purpose, status } = req.body;

    if (!userId || !purpose) {
      return res.status(400).json({ error: "Missing required compliance attributes." });
    }

    if (!contract) {
      return res.status(503).json({ error: "Blockchain configuration is incomplete. Set PRIVATE_KEY and CONTRACT_ADDRESS." });
    }

    const userHash = "0x" + crypto.createHash("sha256").update(userId).digest("hex");
    const tx = await contract.updateConsent(userHash, purpose, Boolean(status));
    await tx.wait();

    res.json({
      success: true,
      anonymizedUserHash: userHash,
      transactionHash: tx.hash,
      message: "Consent choice successfully committed to blockchain ledger."
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("DPDP Privacy Engine API running on port 3000"));
