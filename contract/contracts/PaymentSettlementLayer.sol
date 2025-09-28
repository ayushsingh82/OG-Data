// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title PaymentSettlementLayer
 * @dev Full payment & settlement layer with native tokenomics (staking, licensing, royalties, slashing)
 * @notice Implements Wave 4: Full Payment & Settlement Layer with native tokenomics
 */
contract PaymentSettlementLayer is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;
    
    Counters.Counter private _stakeIdCounter;
    Counters.Counter private _licenseIdCounter;
    Counters.Counter private _royaltyIdCounter;
    
    // OG Token contract
    IERC20 public ogToken;
    
    // Staking system
    struct Stake {
        uint256 stakeId;
        address staker;
        uint256 amount;
        uint256 itemId;
        string itemType; // "agent" or "dataset"
        uint256 lockPeriod;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        uint256 rewardsEarned;
        uint256 slashingRisk; // 0-100 risk score
    }
    
    // Licensing system
    struct License {
        uint256 licenseId;
        uint256 itemId;
        string itemType;
        address licensor;
        address licensee;
        uint256 price;
        uint256 duration; // in seconds
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        string licenseTerms;
        uint256[] royaltyIds;
    }
    
    // Royalty system
    struct Royalty {
        uint256 royaltyId;
        uint256 itemId;
        string itemType;
        address recipient;
        uint256 percentage; // basis points (100 = 1%)
        uint256 totalEarned;
        bool isActive;
        uint256 createdAt;
    }
    
    // Payment tracking
    struct PaymentRecord {
        uint256 paymentId;
        address payer;
        address recipient;
        uint256 amount;
        string paymentType; // "purchase", "license", "royalty", "staking_reward"
        uint256 itemId;
        string itemType;
        uint256 timestamp;
        bool isProcessed;
    }
    
    // Mapping from stake ID to stake data
    mapping(uint256 => Stake) public stakes;
    
    // Mapping from license ID to license data
    mapping(uint256 => License) public licenses;
    
    // Mapping from royalty ID to royalty data
    mapping(uint256 => Royalty) public royalties;
    
    // Mapping from payment ID to payment data
    mapping(uint256 => PaymentRecord) public payments;
    
    // User staking data
    mapping(address => uint256[]) public userStakes;
    mapping(address => uint256) public totalStaked;
    mapping(address => uint256) public totalRewards;
    
    // Item staking data
    mapping(string => mapping(uint256 => uint256)) public itemTotalStaked; // itemType => itemId => amount
    mapping(string => mapping(uint256 => uint256[])) public itemStakes; // itemType => itemId => stakeIds[]
    
    // Slashing system
    struct SlashingEvent {
        uint256 stakeId;
        address staker;
        uint256 slashedAmount;
        string reason;
        uint256 timestamp;
        address slashedBy;
    }
    
    mapping(uint256 => SlashingEvent) public slashingEvents;
    Counters.Counter private _slashingIdCounter;
    
    // Governance parameters
    uint256 public stakingRewardRate = 500; // 5% APY in basis points
    uint256 public slashingThreshold = 30; // 30% slashing threshold
    uint256 public minimumStakeAmount = 1000 * 10**18; // 1000 OG tokens
    uint256 public maximumStakeAmount = 1000000 * 10**18; // 1M OG tokens
    
    // Events
    event StakeCreated(uint256 indexed stakeId, address indexed staker, uint256 amount, uint256 itemId, string itemType);
    event StakeWithdrawn(uint256 indexed stakeId, address indexed staker, uint256 amount, uint256 rewards);
    event LicenseCreated(uint256 indexed licenseId, uint256 indexed itemId, string itemType, address indexed licensee);
    event RoyaltyCreated(uint256 indexed royaltyId, uint256 indexed itemId, string itemType, address indexed recipient);
    event PaymentProcessed(uint256 indexed paymentId, address indexed payer, address indexed recipient, uint256 amount);
    event StakeSlashed(uint256 indexed stakeId, address indexed staker, uint256 slashedAmount, string reason);
    event RewardsDistributed(address indexed staker, uint256 amount);
    
    constructor(address _ogToken) {
        ogToken = IERC20(_ogToken);
    }
    
    /**
     * @dev Create a stake for an item
     */
    function createStake(
        uint256 itemId,
        string memory itemType,
        uint256 amount,
        uint256 lockPeriod
    ) public nonReentrant returns (uint256) {
        require(bytes(itemType).length > 0, "Payment: Item type cannot be empty");
        require(amount >= minimumStakeAmount, "Payment: Amount below minimum stake");
        require(amount <= maximumStakeAmount, "Payment: Amount above maximum stake");
        require(lockPeriod > 0, "Payment: Lock period must be greater than 0");
        
        // Transfer OG tokens from staker
        ogToken.safeTransferFrom(msg.sender, address(this), amount);
        
        _stakeIdCounter.increment();
        uint256 newStakeId = _stakeIdCounter.current();
        
        stakes[newStakeId] = Stake({
            stakeId: newStakeId,
            staker: msg.sender,
            amount: amount,
            itemId: itemId,
            itemType: itemType,
            lockPeriod: lockPeriod,
            startTime: block.timestamp,
            endTime: block.timestamp + lockPeriod,
            isActive: true,
            rewardsEarned: 0,
            slashingRisk: 0
        });
        
        // Update user staking data
        userStakes[msg.sender].push(newStakeId);
        totalStaked[msg.sender] = totalStaked[msg.sender] + amount;
        
        // Update item staking data
        itemTotalStaked[itemType][itemId] = itemTotalStaked[itemType][itemId] + amount;
        itemStakes[itemType][itemId].push(newStakeId);
        
        emit StakeCreated(newStakeId, msg.sender, amount, itemId, itemType);
        
        return newStakeId;
    }
    
    /**
     * @dev Withdraw a stake and claim rewards
     */
    function withdrawStake(uint256 stakeId) public nonReentrant {
        Stake storage stake = stakes[stakeId];
        require(stake.staker == msg.sender, "Payment: Not the staker");
        require(stake.isActive, "Payment: Stake not active");
        require(block.timestamp >= stake.endTime, "Payment: Stake still locked");
        
        // Calculate rewards
        uint256 rewards = _calculateStakingRewards(stakeId);
        
        // Update stake
        stake.isActive = false;
        stake.rewardsEarned = stake.rewardsEarned + rewards;
        
        // Update user data
        totalStaked[msg.sender] = totalStaked[msg.sender] - stake.amount;
        totalRewards[msg.sender] = totalRewards[msg.sender] + rewards;
        
        // Update item data
        itemTotalStaked[stake.itemType][stake.itemId] = itemTotalStaked[stake.itemType][stake.itemId] - stake.amount;
        
        // Transfer tokens back to staker
        ogToken.safeTransfer(msg.sender, stake.amount + rewards);
        
        emit StakeWithdrawn(stakeId, msg.sender, stake.amount, rewards);
    }
    
    /**
     * @dev Create a license for an item
     */
    function createLicense(
        uint256 itemId,
        string memory itemType,
        address licensee,
        uint256 price,
        uint256 duration,
        string memory licenseTerms
    ) public returns (uint256) {
        require(bytes(itemType).length > 0, "Payment: Item type cannot be empty");
        require(licensee != address(0), "Payment: Licensee cannot be zero address");
        require(price > 0, "Payment: Price must be greater than 0");
        require(duration > 0, "Payment: Duration must be greater than 0");
        require(bytes(licenseTerms).length > 0, "Payment: License terms cannot be empty");
        
        _licenseIdCounter.increment();
        uint256 newLicenseId = _licenseIdCounter.current();
        
        licenses[newLicenseId] = License({
            licenseId: newLicenseId,
            itemId: itemId,
            itemType: itemType,
            licensor: msg.sender,
            licensee: licensee,
            price: price,
            duration: duration,
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            isActive: true,
            licenseTerms: licenseTerms,
            royaltyIds: new uint256[](0)
        });
        
        emit LicenseCreated(newLicenseId, itemId, itemType, licensee);
        
        return newLicenseId;
    }
    
    /**
     * @dev Purchase a license
     */
    function purchaseLicense(uint256 licenseId) public payable nonReentrant {
        License storage license = licenses[licenseId];
        require(license.licenseId != 0, "Payment: License does not exist");
        require(license.isActive, "Payment: License not active");
        require(msg.value >= license.price, "Payment: Insufficient payment");
        
        // Process payment
        _processPayment(
            msg.sender,
            license.licensor,
            license.price,
            "license",
            license.itemId,
            license.itemType
        );
        
        // Update license
        license.licensee = msg.sender;
        license.startTime = block.timestamp;
        license.endTime = block.timestamp + license.duration;
        
        emit LicenseCreated(licenseId, license.itemId, license.itemType, msg.sender);
    }
    
    /**
     * @dev Create a royalty for an item
     */
    function createRoyalty(
        uint256 itemId,
        string memory itemType,
        address recipient,
        uint256 percentage
    ) public returns (uint256) {
        require(bytes(itemType).length > 0, "Payment: Item type cannot be empty");
        require(recipient != address(0), "Payment: Recipient cannot be zero address");
        require(percentage > 0 && percentage <= 10000, "Payment: Percentage must be 0-10000 basis points");
        
        _royaltyIdCounter.increment();
        uint256 newRoyaltyId = _royaltyIdCounter.current();
        
        royalties[newRoyaltyId] = Royalty({
            royaltyId: newRoyaltyId,
            itemId: itemId,
            itemType: itemType,
            recipient: recipient,
            percentage: percentage,
            totalEarned: 0,
            isActive: true,
            createdAt: block.timestamp
        });
        
        emit RoyaltyCreated(newRoyaltyId, itemId, itemType, recipient);
        
        return newRoyaltyId;
    }
    
    /**
     * @dev Process a payment with royalties
     */
    function processPaymentWithRoyalties(
        address payer,
        address primaryRecipient,
        uint256 amount,
        string memory paymentType,
        uint256 itemId,
        string memory itemType
    ) public nonReentrant {
        require(amount > 0, "Payment: Amount must be greater than 0");
        
        // Calculate total royalties
        uint256 totalRoyaltyAmount = 0;
        uint256[] memory royaltyIds = _getItemRoyalties(itemId, itemType);
        
        for (uint256 i = 0; i < royaltyIds.length; i++) {
            Royalty storage royalty = royalties[royaltyIds[i]];
            if (royalty.isActive) {
                uint256 royaltyAmount = (amount * royalty.percentage) / 10000;
                totalRoyaltyAmount = totalRoyaltyAmount + royaltyAmount;
                
                // Process royalty payment
                _processPayment(
                    payer,
                    royalty.recipient,
                    royaltyAmount,
                    "royalty",
                    itemId,
                    itemType
                );
                
                // Update royalty earnings
                royalty.totalEarned = royalty.totalEarned + royaltyAmount;
            }
        }
        
        // Process primary payment
        uint256 primaryAmount = amount - totalRoyaltyAmount;
        _processPayment(
            payer,
            primaryRecipient,
            primaryAmount,
            paymentType,
            itemId,
            itemType
        );
    }
    
    /**
     * @dev Slash a stake for bad behavior
     */
    function slashStake(
        uint256 stakeId,
        uint256 slashedAmount,
        string memory reason
    ) public onlyOwner {
        Stake storage stake = stakes[stakeId];
        require(stake.isActive, "Payment: Stake not active");
        require(slashedAmount <= stake.amount, "Payment: Slash amount exceeds stake");
        
        _slashingIdCounter.increment();
        uint256 slashingId = _slashingIdCounter.current();
        
        slashingEvents[slashingId] = SlashingEvent({
            stakeId: stakeId,
            staker: stake.staker,
            slashedAmount: slashedAmount,
            reason: reason,
            timestamp: block.timestamp,
            slashedBy: msg.sender
        });
        
        // Update stake
        stake.amount = stake.amount - slashedAmount;
        stake.slashingRisk = stake.slashingRisk + 10; // Increase risk score
        
        // Update user data
        totalStaked[stake.staker] = totalStaked[stake.staker] - slashedAmount;
        
        // Update item data
        itemTotalStaked[stake.itemType][stake.itemId] = itemTotalStaked[stake.itemType][stake.itemId] - slashedAmount;
        
        // Transfer slashed tokens to contract (could be burned or redistributed)
        ogToken.safeTransfer(address(this), slashedAmount);
        
        emit StakeSlashed(stakeId, stake.staker, slashedAmount, reason);
    }
    
    /**
     * @dev Distribute staking rewards
     */
    function distributeRewards() public onlyOwner {
        uint256 totalStakedAmount = ogToken.balanceOf(address(this));
        uint256 rewardAmount = (totalStakedAmount * stakingRewardRate) / 10000; // 5% APY
        
        // Distribute rewards proportionally to all active stakers
        for (uint256 i = 1; i <= _stakeIdCounter.current(); i++) {
            Stake storage stake = stakes[i];
            if (stake.isActive) {
                uint256 stakeReward = (rewardAmount * stake.amount) / totalStakedAmount;
                stake.rewardsEarned = stake.rewardsEarned + stakeReward;
                totalRewards[stake.staker] = totalRewards[stake.staker] + stakeReward;
                
                emit RewardsDistributed(stake.staker, stakeReward);
            }
        }
    }
    
    /**
     * @dev Get user staking information
     */
    function getUserStakingInfo(address user) public view returns (
        uint256[] memory stakeIds,
        uint256 totalStakedAmount,
        uint256 totalRewardsAmount
    ) {
        return (
            userStakes[user],
            totalStaked[user],
            totalRewards[user]
        );
    }
    
    /**
     * @dev Get item staking information
     */
    function getItemStakingInfo(uint256 itemId, string memory itemType) public view returns (
        uint256[] memory stakeIds,
        uint256 totalStakedAmount
    ) {
        return (
            itemStakes[itemType][itemId],
            itemTotalStaked[itemType][itemId]
        );
    }
    
    /**
     * @dev Get item royalties
     */
    function getItemRoyalties(uint256 itemId, string memory itemType) public view returns (uint256[] memory) {
        return _getItemRoyalties(itemId, itemType);
    }
    
    /**
     * @dev Internal function to calculate staking rewards
     */
    function _calculateStakingRewards(uint256 stakeId) internal view returns (uint256) {
        Stake storage stake = stakes[stakeId];
        uint256 timeStaked = block.timestamp - stake.startTime;
        uint256 annualReward = (stake.amount * stakingRewardRate) / 10000;
        return (annualReward * timeStaked) / 365 days;
    }
    
    /**
     * @dev Internal function to process a payment
     */
    function _processPayment(
        address payer,
        address recipient,
        uint256 amount,
        string memory paymentType,
        uint256 itemId,
        string memory itemType
    ) internal {
        Counters.Counter storage paymentCounter = Counters.Counter(0);
        paymentCounter.increment();
        uint256 paymentId = paymentCounter.current();
        
        payments[paymentId] = PaymentRecord({
            paymentId: paymentId,
            payer: payer,
            recipient: recipient,
            amount: amount,
            paymentType: paymentType,
            itemId: itemId,
            itemType: itemType,
            timestamp: block.timestamp,
            isProcessed: true
        });
        
        // Transfer OG tokens
        ogToken.safeTransferFrom(payer, recipient, amount);
        
        emit PaymentProcessed(paymentId, payer, recipient, amount);
    }
    
    /**
     * @dev Internal function to get item royalties
     */
    function _getItemRoyalties(uint256 itemId, string memory itemType) internal view returns (uint256[] memory) {
        uint256[] memory royaltyIds = new uint256[](_royaltyIdCounter.current());
        uint256 count = 0;
        
        for (uint256 i = 1; i <= _royaltyIdCounter.current(); i++) {
            Royalty storage royalty = royalties[i];
            if (royalty.itemId == itemId && 
                keccak256(bytes(royalty.itemType)) == keccak256(bytes(itemType)) &&
                royalty.isActive) {
                royaltyIds[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = royaltyIds[i];
        }
        
        return result;
    }
    
    /**
     * @dev Update governance parameters
     */
    function updateGovernanceParameters(
        uint256 _stakingRewardRate,
        uint256 _slashingThreshold,
        uint256 _minimumStakeAmount,
        uint256 _maximumStakeAmount
    ) public onlyOwner {
        stakingRewardRate = _stakingRewardRate;
        slashingThreshold = _slashingThreshold;
        minimumStakeAmount = _minimumStakeAmount;
        maximumStakeAmount = _maximumStakeAmount;
    }
}
