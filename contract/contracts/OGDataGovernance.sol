// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";
import "lib/openzeppelin-contracts/contracts/governance/Governor.sol";
import "lib/openzeppelin-contracts/contracts/governance/extensions/GovernorSettings.sol";
import "lib/openzeppelin-contracts/contracts/governance/extensions/GovernorCountingSimple.sol";
import "lib/openzeppelin-contracts/contracts/governance/extensions/GovernorVotes.sol";
import "lib/openzeppelin-contracts/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "lib/openzeppelin-contracts/contracts/governance/extensions/GovernorTimelockControl.sol";
import "lib/openzeppelin-contracts/contracts/governance/TimelockController.sol";

/**
 * @title OGDataGovernance
 * @dev DAO governance module for community-driven marketplace policies and curation rules
 * @notice Implements Wave 4: Governance Module (DAO) for community-driven marketplace policies
 */
contract OGDataGovernance is 
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    using Counters for Counters.Counter;
    
    Counters.Counter private _proposalIdCounter;
    
    // Governance categories
    enum ProposalCategory {
        MARKETPLACE_POLICY,
        CURATION_RULES,
        TOKENOMICS,
        TECHNICAL_UPGRADE,
        COMMUNITY_INITIATIVE,
        EMERGENCY
    }
    
    // Proposal structure
    struct MarketplaceProposal {
        uint256 proposalId;
        ProposalCategory category;
        string title;
        string description;
        string[] parameters;
        uint256[] values;
        address proposer;
        uint256 createdAt;
        bool isExecuted;
        uint256 executionTime;
    }
    
    // Mapping from proposal ID to proposal data
    mapping(uint256 => MarketplaceProposal) public marketplaceProposals;
    
    // Governance parameters
    struct GovernanceParameters {
        uint256 votingDelay;
        uint256 votingPeriod;
        uint256 proposalThreshold;
        uint256 quorumThreshold;
        uint256 executionDelay;
    }
    
    GovernanceParameters public governanceParams;
    
    // Marketplace policy storage
    struct MarketplacePolicy {
        string policyType;
        string description;
        uint256[] parameters;
        bool isActive;
        uint256 createdAt;
        uint256 lastUpdated;
    }
    
    mapping(string => MarketplacePolicy) public marketplacePolicies;
    
    // Curation rules storage
    struct CurationRule {
        string ruleType;
        string description;
        uint256 threshold;
        bool isActive;
        uint256 createdAt;
        uint256 lastUpdated;
    }
    
    mapping(string => CurationRule) public curationRules;
    
    // Tokenomics parameters
    struct TokenomicsParams {
        uint256 stakingRewardRate;
        uint256 slashingThreshold;
        uint256 minimumStakeAmount;
        uint256 maximumStakeAmount;
        uint256 marketplaceFee;
        uint256 curationReward;
    }
    
    TokenomicsParams public tokenomicsParams;
    
    // Events
    event MarketplaceProposalCreated(uint256 indexed proposalId, ProposalCategory category, string title);
    event MarketplaceProposalExecuted(uint256 indexed proposalId, ProposalCategory category);
    event MarketplacePolicyUpdated(string indexed policyType, bool isActive);
    event CurationRuleUpdated(string indexed ruleType, uint256 threshold);
    event TokenomicsUpdated(uint256 stakingRewardRate, uint256 marketplaceFee);
    event EmergencyActionExecuted(string action, address executor);
    
    constructor(
        IVotes _token,
        TimelockController _timelock,
        uint256 _quorumPercentage,
        uint256 _votingDelay,
        uint256 _votingPeriod,
        uint256 _proposalThreshold
    )
        Governor("OGDataGovernance")
        GovernorSettings(_votingDelay, _votingPeriod, _proposalThreshold)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(_quorumPercentage)
        GovernorTimelockControl(_timelock)
    {
        // Initialize governance parameters
        governanceParams = GovernanceParameters({
            votingDelay: _votingDelay,
            votingPeriod: _votingPeriod,
            proposalThreshold: _proposalThreshold,
            quorumThreshold: _quorumPercentage,
            executionDelay: 1 days
        });
        
        // Initialize tokenomics parameters
        tokenomicsParams = TokenomicsParams({
            stakingRewardRate: 500, // 5% APY
            slashingThreshold: 30, // 30%
            minimumStakeAmount: 1000 * 10**18, // 1000 OG tokens
            maximumStakeAmount: 1000000 * 10**18, // 1M OG tokens
            marketplaceFee: 250, // 2.5%
            curationReward: 100 // 1%
        });
    }
    
    /**
     * @dev Create a marketplace proposal
     */
    function createMarketplaceProposal(
        ProposalCategory category,
        string memory title,
        string memory description,
        string[] memory parameters,
        uint256[] memory values,
        bytes memory calldata
    ) public returns (uint256) {
        require(bytes(title).length > 0, "Governance: Title cannot be empty");
        require(bytes(description).length > 0, "Governance: Description cannot be empty");
        require(parameters.length == values.length, "Governance: Parameters and values length mismatch");
        
        // Create the proposal
        uint256 proposalId = propose(
            getTargets(),
            getValues(),
            new string[](0),
            description
        );
        
        _proposalIdCounter.increment();
        
        marketplaceProposals[proposalId] = MarketplaceProposal({
            proposalId: proposalId,
            category: category,
            title: title,
            description: description,
            parameters: parameters,
            values: values,
            proposer: msg.sender,
            createdAt: block.timestamp,
            isExecuted: false,
            executionTime: 0
        });
        
        emit MarketplaceProposalCreated(proposalId, category, title);
        
        return proposalId;
    }
    
    /**
     * @dev Execute a marketplace proposal
     */
    function executeMarketplaceProposal(uint256 proposalId) public {
        require(state(proposalId) == ProposalState.Succeeded, "Governance: Proposal not succeeded");
        require(marketplaceProposals[proposalId].proposalId != 0, "Governance: Proposal does not exist");
        require(!marketplaceProposals[proposalId].isExecuted, "Governance: Proposal already executed");
        
        MarketplaceProposal storage proposal = marketplaceProposals[proposalId];
        
        // Execute based on category
        if (proposal.category == ProposalCategory.MARKETPLACE_POLICY) {
            _executeMarketplacePolicy(proposal);
        } else if (proposal.category == ProposalCategory.CURATION_RULES) {
            _executeCurationRule(proposal);
        } else if (proposal.category == ProposalCategory.TOKENOMICS) {
            _executeTokenomicsUpdate(proposal);
        } else if (proposal.category == ProposalCategory.TECHNICAL_UPGRADE) {
            _executeTechnicalUpgrade(proposal);
        } else if (proposal.category == ProposalCategory.COMMUNITY_INITIATIVE) {
            _executeCommunityInitiative(proposal);
        }
        
        proposal.isExecuted = true;
        proposal.executionTime = block.timestamp;
        
        emit MarketplaceProposalExecuted(proposalId, proposal.category);
    }
    
    /**
     * @dev Execute marketplace policy update
     */
    function _executeMarketplacePolicy(MarketplaceProposal storage proposal) internal {
        require(proposal.parameters.length > 0, "Governance: Policy parameters required");
        
        string memory policyType = proposal.parameters[0];
        bool isActive = proposal.values[0] > 0;
        
        marketplacePolicies[policyType] = MarketplacePolicy({
            policyType: policyType,
            description: proposal.description,
            parameters: proposal.values,
            isActive: isActive,
            createdAt: block.timestamp,
            lastUpdated: block.timestamp
        });
        
        emit MarketplacePolicyUpdated(policyType, isActive);
    }
    
    /**
     * @dev Execute curation rule update
     */
    function _executeCurationRule(MarketplaceProposal storage proposal) internal {
        require(proposal.parameters.length > 0, "Governance: Rule parameters required");
        
        string memory ruleType = proposal.parameters[0];
        uint256 threshold = proposal.values[0];
        
        curationRules[ruleType] = CurationRule({
            ruleType: ruleType,
            description: proposal.description,
            threshold: threshold,
            isActive: true,
            createdAt: block.timestamp,
            lastUpdated: block.timestamp
        });
        
        emit CurationRuleUpdated(ruleType, threshold);
    }
    
    /**
     * @dev Execute tokenomics update
     */
    function _executeTokenomicsUpdate(MarketplaceProposal storage proposal) internal {
        require(proposal.values.length >= 6, "Governance: All tokenomics parameters required");
        
        tokenomicsParams.stakingRewardRate = proposal.values[0];
        tokenomicsParams.slashingThreshold = proposal.values[1];
        tokenomicsParams.minimumStakeAmount = proposal.values[2];
        tokenomicsParams.maximumStakeAmount = proposal.values[3];
        tokenomicsParams.marketplaceFee = proposal.values[4];
        tokenomicsParams.curationReward = proposal.values[5];
        
        emit TokenomicsUpdated(proposal.values[0], proposal.values[4]);
    }
    
    /**
     * @dev Execute technical upgrade
     */
    function _executeTechnicalUpgrade(MarketplaceProposal storage proposal) internal {
        // This would typically involve upgrading contracts or changing technical parameters
        // Implementation depends on specific upgrade requirements
    }
    
    /**
     * @dev Execute community initiative
     */
    function _executeCommunityInitiative(MarketplaceProposal storage proposal) internal {
        // This would typically involve funding community initiatives or changing community parameters
        // Implementation depends on specific initiative requirements
    }
    
    /**
     * @dev Emergency action execution (only by timelock)
     */
    function executeEmergencyAction(
        string memory action,
        address target,
        uint256 value,
        bytes memory data
    ) public {
        require(hasRole(TIMELOCK_CONTROLLER_ROLE, msg.sender), "Governance: Only timelock can execute emergency actions");
        
        // Execute emergency action
        (bool success, ) = target.call{value: value}(data);
        require(success, "Governance: Emergency action failed");
        
        emit EmergencyActionExecuted(action, msg.sender);
    }
    
    /**
     * @dev Get marketplace policy
     */
    function getMarketplacePolicy(string memory policyType) public view returns (MarketplacePolicy memory) {
        return marketplacePolicies[policyType];
    }
    
    /**
     * @dev Get curation rule
     */
    function getCurationRule(string memory ruleType) public view returns (CurationRule memory) {
        return curationRules[ruleType];
    }
    
    /**
     * @dev Get tokenomics parameters
     */
    function getTokenomicsParams() public view returns (TokenomicsParams memory) {
        return tokenomicsParams;
    }
    
    /**
     * @dev Get marketplace proposal
     */
    function getMarketplaceProposal(uint256 proposalId) public view returns (MarketplaceProposal memory) {
        return marketplaceProposals[proposalId];
    }
    
    /**
     * @dev Get governance parameters
     */
    function getGovernanceParams() public view returns (GovernanceParameters memory) {
        return governanceParams;
    }
    
    /**
     * @dev Update governance parameters (only by timelock)
     */
    function updateGovernanceParams(
        uint256 _votingDelay,
        uint256 _votingPeriod,
        uint256 _proposalThreshold,
        uint256 _quorumThreshold,
        uint256 _executionDelay
    ) public {
        require(hasRole(TIMELOCK_CONTROLLER_ROLE, msg.sender), "Governance: Only timelock can update parameters");
        
        governanceParams.votingDelay = _votingDelay;
        governanceParams.votingPeriod = _votingPeriod;
        governanceParams.proposalThreshold = _proposalThreshold;
        governanceParams.quorumThreshold = _quorumThreshold;
        governanceParams.executionDelay = _executionDelay;
    }
    
    /**
     * @dev Get proposal state
     */
    function getProposalState(uint256 proposalId) public view returns (ProposalState) {
        return state(proposalId);
    }
    
    /**
     * @dev Get total proposals count
     */
    function getTotalProposals() public view returns (uint256) {
        return _proposalIdCounter.current();
    }
    
    /**
     * @dev Check if a policy is active
     */
    function isPolicyActive(string memory policyType) public view returns (bool) {
        return marketplacePolicies[policyType].isActive;
    }
    
    /**
     * @dev Check if a rule is active
     */
    function isRuleActive(string memory ruleType) public view returns (bool) {
        return curationRules[ruleType].isActive;
    }
    
    /**
     * @dev Get proposal targets (required by Governor)
     */
    function getTargets() internal pure returns (address[] memory) {
        address[] memory targets = new address[](1);
        targets[0] = address(0); // Placeholder
        return targets;
    }
    
    /**
     * @dev Get proposal values (required by Governor)
     */
    function getValues() internal pure returns (uint256[] memory) {
        uint256[] memory values = new uint256[](1);
        values[0] = 0; // Placeholder
        return values;
    }
    
    /**
     * @dev Get proposal calldata (required by Governor)
     */
    function getCalldata() internal pure returns (bytes[] memory) {
        bytes[] memory calldata = new bytes[](1);
        calldata[0] = ""; // Placeholder
        return calldata;
    }
}
