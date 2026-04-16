#  Blockchain-Based Secure Voting System

###  Spring Boot + Ethereum + Smart Contracts

A **secure, transparent, and tamper-proof online voting system** built using **Spring Boot** and **Blockchain (Ethereum)**. This project ensures **trust, immutability, and decentralization** in the voting process.

---

#  Project Overview

Traditional voting systems face issues like:

* ❌ Lack of transparency
* ❌ Possibility of tampering
* ❌ Centralized control

This project solves these using **Blockchain technology**, where:

* Votes are stored on-chain 🔗
* Data is immutable 🔒
* System is transparent and verifiable 👁️

---

#  Key Features

* 🗳️ Secure voter registration
* 🔐 Blockchain-based vote storage
* 📊 Real-time vote tracking
* 🧾 Smart contract-driven logic
* ⚡ REST APIs with Spring Boot
* 🔗 Ethereum integration via Web3j

---

# 🏗️ System Architecture

```
                        ┌──────────────────────────┐
                        │        Frontend          │
                        │   (UI / Postman / App)   │
                        └────────────┬─────────────┘
                                     │
                                     ▼
                        ┌──────────────────────────┐
                        │   Spring Boot Backend    │
                        │  (REST API Layer)        │
                        │                          │
                        │ - Controller             │
                        │ - Service Layer          │
                        │ - DTOs                   │
                        └────────────┬─────────────┘
                                     │
                                     ▼
                        ┌──────────────────────────┐
                        │ Blockchain Integration   │
                        │ (Web3j / Wallet Config)  │
                        │                          │
                        │ - Gas Provider           │
                        │ - Wallet Management      │
                        └────────────┬─────────────┘
                                     │
                                     ▼
                        ┌──────────────────────────┐
                        │   Smart Contract Layer   │
                        │     (Solidity - Voter)   │
                        │                          │
                        │ - Vote Recording         │
                        │ - Candidate Storage      │
                        │ - Immutable Ledger       │
                        └────────────┬─────────────┘
                                     │
                                     ▼
                        ┌──────────────────────────┐
                        │      Ethereum Network    │
                        │  (Hardhat / Local Node)  │
                        └──────────────────────────┘
```

---

# 📁 Project Structure

```
VotingApp_SpringBoot/
│
├── Backend/
│   ├── VotingApp/                 # Spring Boot App
│   │   ├── controller/            # REST APIs
│   │   ├── service/               # Business logic
│   │   ├── DTO/                   # Request models
│   │   ├── configuration/         # Wallet & server config
│   │   ├── utility/               # Gas provider
│   │   └── contract/              # Smart contract wrapper
│   │
│   └── votingapp_backend_blockchain/
│       ├── contracts/             # Solidity contracts
│       ├── artifacts/             # Compiled contracts
│       ├── hardhat.config.js      # Blockchain config
│       └── scripts/               # Deployment scripts
│
├── resources/
│   ├── application.properties     # Config file
│   └── abi/                       # Contract ABI
│
└── pom.xml                        # Maven dependencies
```

---

# ⚙️ Tech Stack

### Backend

* ☕ Java (Spring Boot)
* 🌐 REST APIs

### Blockchain

* ⛓️ Ethereum
* 🧾 Solidity
* 🛠️ Hardhat

### Integration

* 🔗 Web3j
* 🔐 Wallet Configuration

---

#  How It Works

1. 👤 User registers as a voter
2. 🗳️ User casts a vote via API
3. 🔗 Backend interacts with smart contract
4. ⛓️ Vote is stored on blockchain
5. 🔒 Data becomes immutable & transparent

---

# ⚙️ Setup Instructions

##  Prerequisites

* Java 8+
* Maven
* Node.js
* Hardhat
* Ganache

---

## 🔧 Backend Setup

```bash
cd Backend/VotingApp
mvn clean install
mvn spring-boot:run
```

---

## 🔗 Blockchain Setup

```bash
cd Backend/votingapp_backend_blockchain
npm install
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

---

# ▶️ API Endpoints (Sample)

* `POST /voter/register` → Register voter
* `POST /vote` → Cast vote
* `GET /results` → View results

---

# 🔐 Security Advantages

* ✅ Tamper-proof voting
* ✅ Transparent system
* ✅ No central authority
* ✅ Immutable records

---

# 💡 Use Cases

* 🗳️ Government elections
* 🏫 College voting systems
* 🏢 Corporate decision voting
* 🌐 Decentralized governance

---

# 🚀 Future Enhancements

* 🌐 React Frontend Integration
* 🔐 Biometric Authentication
* 📱 Mobile App
* 🧠 AI-based fraud detection

---

# 👨‍💻 Author

**Paras Gupta**
🚀 Backend Developer | Blockchain Enthusiast

---

# ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 🤝 Contribute

---

# 🏁 Conclusion

This project demonstrates how **Blockchain + Spring Boot** can create a **next-generation secure voting system**, ensuring:

✔ Transparency
✔ Trust
✔ Security

---

✨ Turning voting into a **trustless, decentralized, and secure process**.
