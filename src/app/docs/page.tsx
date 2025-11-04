'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const codeStructures = {
    overview: {
      title: 'Code Structure Overview',
      description: 'Complete architecture of the AgentForge platform',
      structure: `
AgentForge/
├── contract/
│   ├── contracts/
│   │   ├── Wave 3 Contracts (Versioning & Curation)
│   │   │   ├── VersionedAgent.sol          # AI agent version management
│   │   │   ├── VersionedDataset.sol         # Dataset version tracking
│   │   │   ├── CommunityCuration.sol       # Community-driven curation
│   │   │   └── VerificationTrustLayer.sol   # Cryptographic verification
│   │   │
│   │   ├── Wave 4 Contracts (Tokenomics & Governance)
│   │   │   ├── PaymentSettlementLayer.sol   # Native tokenomics
│   │   │   ├── OGDataGovernance.sol        # DAO governance
│   │   │   ├── DatasetAgentNFTs.sol        # NFT tokenization
│   │   │   ├── CrossMarketplaceInteroperability.sol # Cross-protocol bridges
│   │   │   └── DeveloperSDKs.sol           # Developer tools
│   │   │
│   │   └── Wave 5 Contracts (Advanced Features)
│   │       ├── ZeroKnowledgeQueries.sol     # Privacy-preserving queries
│   │       ├── ReputationIdentityLayer.sol  # DID + reputation
│   │       ├── AutonomousAIAgentsMarketplace.sol # Self-improving agents
│   │       ├── AIAgentComposability.sol     # Agent pipelines
│   │       ├── DataDAOs.sol                 # Community governance
│   │       ├── EnterpriseIntegrationLayer.sol # Enterprise APIs
│   │       ├── OnchainComputeFederatedLearning.sol # ML training
│   │       ├── PredictionMarketLayer.sol    # Prediction markets
│   │       ├── DynamicPricingYield.sol      # Dynamic pricing
│   │       └── Wave5IntegrationHub.sol     # Integration hub
│   │
│   ├── test/                                # Contract tests
│   ├── scripts/                            # Deployment scripts
│   └── hardhat.config.ts                   # Hardhat configuration
│
├── src/
│   └── app/
│       ├── components/
│       │   ├── Navbar.jsx                   # Navigation bar
│       │   ├── Footer.jsx                   # Footer component
│       │   ├── WalletProvider.tsx           # Wallet connection
│       │   ├── ContractInteraction.tsx      # Contract interaction UI
│       │   ├── storage.tsx                  # 0G Storage SDK integration
│       │   ├── interferance.tsx            # AI Inference SDK
│       │   ├── finetuning.tsx               # Fine-tuning interface
│       │   └── PaymentModal.tsx             # Payment handling
│       │
│       ├── page.tsx                          # Landing page
│       ├── dashboard/                       # User dashboard
│       ├── platform/                        # Platform features
│       ├── storage/                         # Storage & Inference
│       ├── marketplace/                     # AI Agents marketplace
│       ├── contract-testing/                # Contract testing
│       ├── list-agent/                      # Agent listing
│       └── docs/                            # Documentation
│
└── backend/
    ├── orchestration/                       # AI agent orchestration
    ├── autonomous_research/                 # Research agents
    ├── utils/                               # Utility functions
    └── demo_agents/                         # Demo configurations
`
    },
    smartContracts: {
      title: 'Smart Contracts Structure',
      description: 'Detailed structure of all smart contracts',
      structure: `
// Wave 3: Versioning & Curation
VersionedAgent.sol
├── Version Management
│   ├── createVersion()
│   ├── updateVersion()
│   └── rollbackVersion()
├── Version Tracking
│   ├── getVersionHistory()
│   └── getCurrentVersion()
└── Access Control
    └── Ownable

VersionedDataset.sol
├── Dataset Versioning
│   ├── createDatasetVersion()
│   ├── updateDataset()
│   └── rollbackDataset()
├── Metadata Management
│   └── updateMetadata()
└── Access Control

CommunityCuration.sol
├── Review System
│   ├── submitReview()
│   └── getReviews()
├── Rating System
│   └── rateDataset()
└── Validation
    └── validateDataset()

VerificationTrustLayer.sol
├── Proof Generation
│   ├── generateProof()
│   └── verifyProof()
└── Trust Scoring
    └── calculateTrustScore()

// Wave 4: Tokenomics & Governance
PaymentSettlementLayer.sol
├── Staking
│   ├── stake()
│   ├── unstake()
│   └── getStake()
├── Licensing
│   ├── createLicense()
│   └── transferLicense()
├── Royalties
│   └── distributeRoyalties()
└── Slashing
    └── slashStake()

OGDataGovernance.sol
├── DAO Functions
│   ├── propose()
│   ├── vote()
│   └── execute()
├── Governance Settings
│   └── updateSettings()
└── Voting Power
    └── getVotingPower()

DatasetAgentNFTs.sol
├── NFT Minting
│   ├── mintDatasetNFT()
│   └── mintAgentNFT()
├── NFT Trading
│   └── transferNFT()
└── Metadata
    └── updateNFTMetadata()

// Wave 5: Advanced Features
ZeroKnowledgeQueries.sol
├── ZK Query Creation
│   └── createZKQuery()
├── Proof Verification
│   └── verifyZKProof()
└── Query Management
    └── executeZKQuery()

ReputationIdentityLayer.sol
├── DID Management
│   ├── registerDID()
│   └── updateDID()
├── Reputation Scoring
│   ├── updateReputation()
│   └── getReputation()
└── Attestation
    └── createAttestation()

AutonomousAIAgentsMarketplace.sol
├── Agent Registration
│   └── registerAgent()
├── Staking
│   └── stakeForAgent()
├── Task Execution
│   └── executeTask()
└── Self-Improvement
    └── improveAgent()

AIAgentComposability.sol
├── Pipeline Creation
│   └── createPipeline()
├── Compatibility Check
│   └── checkCompatibility()
└── Pipeline Execution
    └── executePipeline()

DynamicPricingYield.sol
├── Price Calculation
│   └── calculatePrice()
├── Staking Rewards
│   └── calculateYield()
└── Dynamic Pricing
    └── updatePrice()
`
    },
    frontend: {
      title: 'Frontend Structure',
      description: 'React/Next.js component architecture',
      structure: `
// Component Hierarchy
App Layout
├── WalletProvider (Wagmi + RainbowKit)
│   └── Root Layout
│       ├── Navbar
│       │   ├── Navigation Links
│       │   └── ConnectButton
│       │
│       ├── Page Components
│       │   ├── Landing Page (/)
│       │   │   ├── Hero Section
│       │   │   ├── Features Showcase
│       │   │   └── Smart Contracts Section
│       │   │
│       │   ├── Dashboard (/dashboard)
│       │   │   ├── User Stats
│       │   │   ├── Agent List
│       │   │   └── Dataset List
│       │   │
│       │   ├── Platform Features (/platform)
│       │   │   ├── Tab Navigation
│       │   │   ├── Feature Cards
│       │   │   └── Interactive Forms
│       │   │
│       │   ├── Storage & Inference (/storage)
│       │   │   ├── Storage Tab
│       │   │   │   └── StorageClient
│       │   │   │       ├── File Upload
│       │   │   │       └── Key-Value Storage
│       │   │   ├── Inference Tab
│       │   │   │   └── InferenceClient
│       │   │   │       ├── Service Discovery
│       │   │   │       └── AI Query Interface
│       │   │   └── Fine-Tuning Tab
│       │   │       └── FineTuningClient
│       │   │           ├── Setup Task
│       │   │           ├── Task Management
│       │   │           └── Model Selection
│       │   │
│       │   ├── Contract Testing (/contract-testing)
│       │   │   └── ContractInteraction
│       │   │       ├── Contract Selection
│       │   │       ├── Function List
│       │   │       └── Parameter Input
│       │   │
│       │   └── Docs (/docs)
│       │       ├── Code Structure
│       │       ├── API Reference
│       │       └── Usage Examples
│       │
│       └── Footer
│
// State Management
├── React Hooks
│   ├── useState (Local State)
│   ├── useEffect (Side Effects)
│   └── useContext (Global State)
│
└── Wagmi Hooks
    ├── useAccount (Wallet Connection)
    ├── useContractRead (Read Contracts)
    └── useContractWrite (Write Contracts)

// Key Components
StorageClient
├── File Upload
│   └── uploadFile()
├── Key-Value Operations
│   ├── uploadToKV()
│   └── downloadFromKV()
└── 0G SDK Integration
    └── @0glabs/0g-ts-sdk

InferenceClient
├── Service Discovery
│   └── listService()
├── Account Management
│   └── ledger.getLedger()
└── AI Query Execution
    └── ask()

FineTuningClient
├── Provider Selection
│   └── listProviders()
├── Model Selection
│   └── listModels()
├── Dataset Upload
│   └── uploadDataset()
├── Task Creation
│   └── createTask()
├── Task Monitoring
│   └── getTask()
└── Staking & Yield
    ├── stakeForModelSafety()
    └── getYield()
`
    },
    backend: {
      title: 'Backend Structure',
      description: 'Python backend architecture',
      structure: `
backend/
├── orchestration/
│   ├── orchestrator.py
│   │   ├── Task Orchestration
│   │   ├── Agent Coordination
│   │   └── Resource Management
│   │
│   └── ai_agent.py
│       ├── Agent Execution
│       ├── Model Integration
│       └── Response Processing
│
├── autonomous_research/
│   └── defi_agent.py
│       ├── Research Execution
│       ├── Data Collection
│       └── Analysis Generation
│
├── utils/
│   └── data_provider.py
│       ├── Data Fetching
│       ├── Data Processing
│       └── Data Validation
│
└── demo_agents/
    ├── dataagent_pro_config.json
    ├── dataagent_pro_execution.json
    ├── socialinsight_bot_config.json
    └── socialinsight_bot_execution.json

// Key Functions
Orchestrator
├── executeTask()
│   ├── Parse Task
│   ├── Select Agent
│   ├── Execute Agent
│   └── Return Result
│
└── manageAgents()
    ├── Register Agent
    ├── Update Agent
    └── Monitor Agent

AI Agent
├── processRequest()
│   ├── Validate Input
│   ├── Call Model
│   └── Format Response
│
└── handleError()
    └── Error Recovery
`
    },
    apis: {
      title: 'API Structure',
      description: 'API endpoints and integration points',
      structure: `
// Smart Contract APIs
Contract Functions
├── Read Functions (view/pure)
│   ├── getVersion()
│   ├── getBalance()
│   ├── getReputation()
│   └── getStake()
│
└── Write Functions (payable/non-payable)
    ├── createVersion()
    ├── stake()
    ├── updateReputation()
    └── executeTask()

// 0G Network APIs
Storage SDK (@0glabs/0g-ts-sdk)
├── File Storage
│   ├── uploadFile()
│   ├── downloadFile()
│   └── getFileHash()
│
└── Key-Value Storage
    ├── setValue()
    ├── getValue()
    └── batchOperations()

Inference SDK (@0glabs/0g-serving-broker)
├── Service Management
│   ├── listService()
│   └── getServiceMetadata()
│
├── Ledger Management
│   ├── getLedger()
│   └── addLedger()
│
└── Inference Execution
    ├── acknowledgeProviderSigner()
    ├── getRequestHeaders()
    └── executeQuery()

// REST API Endpoints (Future)
/api/v1/
├── /agents
│   ├── GET /agents           # List agents
│   ├── POST /agents          # Create agent
│   └── GET /agents/:id       # Get agent
│
├── /datasets
│   ├── GET /datasets         # List datasets
│   ├── POST /datasets        # Upload dataset
│   └── GET /datasets/:id     # Get dataset
│
└── /tasks
    ├── GET /tasks            # List tasks
    ├── POST /tasks           # Create task
    └── GET /tasks/:id        # Get task status
`
    }
  };

  const sections = [
    { id: 'overview', name: 'Overview', icon: '📋' },
    { id: 'smartContracts', name: 'Smart Contracts', icon: '📜' },
    { id: 'frontend', name: 'Frontend', icon: '⚛️' },
    { id: 'backend', name: 'Backend', icon: '🐍' },
    { id: 'apis', name: 'APIs', icon: '🔌' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium mb-6">
              📚 Documentation
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Code Structure & Architecture
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete documentation of the AgentForge platform architecture, code structure, and implementation details
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Sections</h2>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                        activeSection === section.id
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <span className="mr-2">{section.icon}</span>
                      {section.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">
                    {codeStructures[activeSection as keyof typeof codeStructures].title}
                  </h2>
                  <p className="text-gray-300">
                    {codeStructures[activeSection as keyof typeof codeStructures].description}
                  </p>
                </div>

                <div className="bg-black/50 rounded-lg p-6 border border-gray-700 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                    {codeStructures[activeSection as keyof typeof codeStructures].structure.trim()}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

