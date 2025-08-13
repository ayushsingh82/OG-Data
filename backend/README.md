# AgentForge Backend

This backend implements two main tracks for the AgentForge project:

1. **Orchestration Track**: Decentralized AI medical research with federated learning
2. **Autonomous Research Track**: DeFi analysis and risk assessment using CARV D.A.T.A. Framework

## 🏗️ Project Structure

```
backend/
├── README.md                    # This file
├── requirements.txt             # Python dependencies
├── env.example                  # Environment variables template
├── main.py                      # Main runner script
├── orchestration/               # Orchestration track
│   ├── orchestrator.py         # Main orchestration logic
│   └── ai_agent.py             # Federated learning functions
├── autonomous_research/         # Autonomous research track
│   └── defi_agent.py           # DeFi analysis agent
└── utils/                       # Utility functions
    └── data_provider.py        # Sample data generation
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
# Copy the example environment file
cp env.example .env

# Edit .env with your actual values
nano .env
```

Required environment variables:
- `SEPOLIA_RPC_URL`: Your Sepolia testnet RPC URL
- `PRIVATE_KEY`: Your wallet private key for transactions
- `AGENT_ADDRESS_PRIVATE_KEY`: Separate private key for AI agent wallet
- `CARV_DATA_API_KEY`: Your CARV D.A.T.A. Framework API key
- `CARV_ID_NFT_ADDRESS`: Deployed CARV ID NFT contract address
- `MEDICAL_RESEARCH_RESULTS_ADDRESS`: Deployed medical research results contract address

### 3. Run the Backend

```bash
# Run both tracks
python main.py

# Run only orchestration track
python main.py --track orchestration

# Run only autonomous research track
python main.py --track autonomous
```

## 📋 Track Details

### 🎯 Orchestration Track

**Purpose**: Demonstrates decentralized AI medical research using federated learning and blockchain-based access control.

**Features**:
- CARV ID NFT-based access control
- Federated learning simulation with multiple AI agents
- Privacy-preserving model aggregation
- On-chain result submission

**Workflow**:
1. Patient registration and CARV ID minting
2. Access permission granting to AI agents
3. Distributed data processing across multiple agents
4. Federated learning model training
5. Model aggregation and evaluation
6. On-chain result submission

**Files**:
- `orchestration/orchestrator.py`: Main orchestration logic
- `orchestration/ai_agent.py`: Federated learning functions
- `utils/data_provider.py`: Sample medical data generation

### 🔍 Autonomous Research Track

**Purpose**: Demonstrates autonomous DeFi research and risk assessment using CARV D.A.T.A. Framework.

**Features**:
- Real-time blockchain data analysis
- DeFi risk assessment
- Token transfer analysis
- Network activity monitoring

**Workflow**:
1. Query CARV D.A.T.A. Framework API
2. Analyze Ethereum network activity
3. Identify top active addresses
4. Monitor token transfers
5. Generate risk alerts and insights

**Files**:
- `autonomous_research/defi_agent.py`: DeFi analysis agent

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `env.example`:

```env
# Web3 Configuration
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=your_private_key_here
AGENT_ADDRESS_PRIVATE_KEY=your_agent_private_key_here

# CARV D.A.T.A. Framework API
CARV_DATA_API_KEY=your_carv_api_key_here

# Contract Addresses
CARV_ID_NFT_ADDRESS=your_carv_id_nft_contract_address
MEDICAL_RESEARCH_RESULTS_ADDRESS=your_medical_research_results_contract_address
```

### Contract ABIs

The orchestration track requires contract ABIs. Place these files in the backend directory:
- `CarvIdNFT.json`: CARV ID NFT contract ABI
- `MedicalResearchResults.json`: Medical research results contract ABI

## 📊 Sample Data

The orchestration track uses synthetic medical data for demonstration. The data includes:
- Patient demographics (age groups)
- Diagnosis codes (ICD-10)
- Treatment outcomes
- Clinical metrics

To generate new sample data:
```bash
python utils/data_provider.py
```

## 🔒 Security Notes

- **Never commit private keys or API keys to version control**
- Use environment variables for sensitive configuration
- The sample data is synthetic and should not be used for real medical research
- Always test on testnets before mainnet deployment

## 🐛 Troubleshooting

### Common Issues

1. **Import Errors**: Make sure all dependencies are installed
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Variables**: Check that your `.env` file is properly configured

3. **Contract ABIs**: Ensure contract ABI files are present and valid

4. **Network Connection**: Verify your RPC URL is accessible

### Debug Mode

For detailed logging, you can modify the scripts to include debug output or use Python's logging module.

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include docstrings for new functions
4. Test both tracks before submitting changes

## 📄 License

This project is part of the AgentForge ecosystem. See the main project license for details. 