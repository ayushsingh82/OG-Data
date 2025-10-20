// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";

/**
 * @title CommunityCuration
 * @dev Community-driven curation system for ranking, reviewing, and validating datasets and agents
 * @notice Implements Wave 3: Community-driven curation tools for ranking, reviewing, and validating
 */
contract CommunityCuration is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _reviewIdCounter;
    Counters.Counter private _ratingIdCounter;
    
    // Review structure
    struct Review {
        uint256 reviewId;
        uint256 itemId;
        string itemType; // "agent" or "dataset"
        address reviewer;
        uint256 carvId;
        uint256 rating; // 1-5 stars
        string title;
        string content;
        string[] tags;
        bool isVerified;
        uint256 helpfulVotes;
        uint256 unhelpfulVotes;
        uint256 createdAt;
        bool isActive;
    }
    
    // Rating structure for aggregated ratings
    struct Rating {
        uint256 itemId;
        string itemType;
        uint256 totalRatings;
        uint256 totalScore;
        uint256 averageRating;
        uint256 verifiedRatings;
        uint256 verifiedScore;
        uint256 lastUpdated;
    }
    
    // Reviewer reputation system
    struct ReviewerProfile {
        address reviewer;
        uint256 carvId;
        uint256 totalReviews;
        uint256 helpfulReviews;
        uint256 reputationScore;
        bool isVerified;
        uint256 createdAt;
        uint256 lastActive;
    }
    
    // Mapping from review ID to review data
    mapping(uint256 => Review) public reviews;
    
    // Mapping from item ID to aggregated rating
    mapping(string => mapping(uint256 => Rating)) public itemRatings; // itemType => itemId => Rating
    
    // Mapping from reviewer address to profile
    mapping(address => ReviewerProfile) public reviewerProfiles;
    
    // Mapping from item ID to review IDs
    mapping(string => mapping(uint256 => uint256[])) public itemReviews; // itemType => itemId => reviewIds[]
    
    // Mapping from reviewer to their review IDs
    mapping(address => uint256[]) public reviewerReviews;
    
    // Review verification system
    struct VerificationRequest {
        uint256 reviewId;
        address requester;
        string verificationType; // "expert", "community", "automated"
        bool isApproved;
        address[] verifiers;
        mapping(address => bool) verifierVotes;
        uint256 approvalThreshold;
        uint256 createdAt;
    }
    
    mapping(uint256 => VerificationRequest) public verificationRequests;
    Counters.Counter private _verificationIdCounter;
    
    // Community governance for curation rules
    struct CurationRule {
        uint256 ruleId;
        string ruleType; // "minimum_rating", "review_threshold", "verification_required"
        string description;
        uint256 threshold;
        bool isActive;
        uint256 createdAt;
        address createdBy;
    }
    
    mapping(uint256 => CurationRule) public curationRules;
    Counters.Counter private _ruleIdCounter;
    
    // Events
    event ReviewCreated(uint256 indexed reviewId, uint256 indexed itemId, string itemType, address indexed reviewer);
    event ReviewUpdated(uint256 indexed reviewId, string content);
    event ReviewDeleted(uint256 indexed reviewId);
    event RatingUpdated(uint256 indexed itemId, string itemType, uint256 averageRating, uint256 totalRatings);
    event ReviewVoted(uint256 indexed reviewId, address indexed voter, bool helpful);
    event ReviewerReputationUpdated(address indexed reviewer, uint256 reputationScore);
    event VerificationRequested(uint256 indexed reviewId, string verificationType);
    event VerificationApproved(uint256 indexed reviewId, address indexed verifier);
    event CurationRuleCreated(uint256 indexed ruleId, string ruleType, uint256 threshold);
    
    constructor() Ownable() {}
    
    /**
     * @dev Create a new review
     */
    function createReview(
        uint256 itemId,
        string memory itemType,
        uint256 carvId,
        uint256 rating,
        string memory title,
        string memory content,
        string[] memory tags
    ) public returns (uint256) {
        require(bytes(itemType).length > 0, "Curation: Item type cannot be empty");
        require(bytes(title).length > 0, "Curation: Title cannot be empty");
        require(bytes(content).length > 0, "Curation: Content cannot be empty");
        require(rating >= 1 && rating <= 5, "Curation: Rating must be between 1 and 5");
        require(carvId > 0, "Curation: CARV ID must be greater than 0");
        
        _reviewIdCounter.increment();
        uint256 newReviewId = _reviewIdCounter.current();
        
        reviews[newReviewId] = Review({
            reviewId: newReviewId,
            itemId: itemId,
            itemType: itemType,
            reviewer: msg.sender,
            carvId: carvId,
            rating: rating,
            title: title,
            content: content,
            tags: tags,
            isVerified: false,
            helpfulVotes: 0,
            unhelpfulVotes: 0,
            createdAt: block.timestamp,
            isActive: true
        });
        
        // Update item reviews mapping
        itemReviews[itemType][itemId].push(newReviewId);
        
        // Update reviewer reviews mapping
        reviewerReviews[msg.sender].push(newReviewId);
        
        // Update reviewer profile
        ReviewerProfile storage profile = reviewerProfiles[msg.sender];
        if (profile.reviewer == address(0)) {
            profile.reviewer = msg.sender;
            profile.carvId = carvId;
            profile.totalReviews = 0;
            profile.helpfulReviews = 0;
            profile.reputationScore = 0;
            profile.isVerified = false;
            profile.createdAt = block.timestamp;
        }
        profile.totalReviews = profile.totalReviews + 1;
        profile.lastActive = block.timestamp;
        
        // Update aggregated rating
        _updateItemRating(itemId, itemType, rating, false);
        
        emit ReviewCreated(newReviewId, itemId, itemType, msg.sender);
        
        return newReviewId;
    }
    
    /**
     * @dev Update an existing review
     */
    function updateReview(
        uint256 reviewId,
        string memory title,
        string memory content,
        string[] memory tags
    ) public {
        require(reviews[reviewId].reviewer == msg.sender, "Curation: Only reviewer can update");
        require(reviews[reviewId].reviewId != 0, "Curation: Review does not exist");
        require(reviews[reviewId].isActive, "Curation: Review is not active");
        require(bytes(title).length > 0, "Curation: Title cannot be empty");
        require(bytes(content).length > 0, "Curation: Content cannot be empty");
        
        reviews[reviewId].title = title;
        reviews[reviewId].content = content;
        reviews[reviewId].tags = tags;
        
        emit ReviewUpdated(reviewId, content);
    }
    
    /**
     * @dev Vote on a review (helpful/unhelpful)
     */
    function voteOnReview(uint256 reviewId, bool helpful) public {
        require(reviews[reviewId].reviewId != 0, "Curation: Review does not exist");
        require(reviews[reviewId].isActive, "Curation: Review is not active");
        require(reviews[reviewId].reviewer != msg.sender, "Curation: Cannot vote on own review");
        
        if (helpful) {
            reviews[reviewId].helpfulVotes = reviews[reviewId].helpfulVotes + 1;
        } else {
            reviews[reviewId].unhelpfulVotes = reviews[reviewId].unhelpfulVotes + 1;
        }
        
        // Update reviewer reputation
        _updateReviewerReputation(reviews[reviewId].reviewer);
        
        emit ReviewVoted(reviewId, msg.sender, helpful);
    }
    
    /**
     * @dev Request verification for a review
     */
    function requestVerification(
        uint256 reviewId,
        string memory verificationType,
        address[] memory verifiers,
        uint256 approvalThreshold
    ) public {
        require(reviews[reviewId].reviewId != 0, "Curation: Review does not exist");
        require(reviews[reviewId].isActive, "Curation: Review is not active");
        require(bytes(verificationType).length > 0, "Curation: Verification type cannot be empty");
        require(verifiers.length > 0, "Curation: At least one verifier required");
        require(approvalThreshold > 0 && approvalThreshold <= verifiers.length, "Curation: Invalid approval threshold");
        
        _verificationIdCounter.increment();
        uint256 verificationId = _verificationIdCounter.current();
        
        VerificationRequest storage request = verificationRequests[verificationId];
        request.reviewId = reviewId;
        request.requester = msg.sender;
        request.verificationType = verificationType;
        request.isApproved = false;
        request.verifiers = verifiers;
        request.approvalThreshold = approvalThreshold;
        request.createdAt = block.timestamp;
        
        // Initialize verifier votes
        for (uint256 i = 0; i < verifiers.length; i++) {
            request.verifierVotes[verifiers[i]] = false;
        }
        
        emit VerificationRequested(reviewId, verificationType);
    }
    
    /**
     * @dev Approve verification for a review
     */
    function approveVerification(uint256 verificationId) public {
        VerificationRequest storage request = verificationRequests[verificationId];
        require(request.reviewId != 0, "Curation: Verification request does not exist");
        require(!request.isApproved, "Curation: Already approved");
        
        // Check if sender is a verifier
        bool isVerifier = false;
        for (uint256 i = 0; i < request.verifiers.length; i++) {
            if (request.verifiers[i] == msg.sender) {
                isVerifier = true;
                break;
            }
        }
        require(isVerifier, "Curation: Not authorized to verify");
        require(!request.verifierVotes[msg.sender], "Curation: Already voted");
        
        request.verifierVotes[msg.sender] = true;
        
        // Count approvals
        uint256 approvals = 0;
        for (uint256 i = 0; i < request.verifiers.length; i++) {
            if (request.verifierVotes[request.verifiers[i]]) {
                approvals++;
            }
        }
        
        if (approvals >= request.approvalThreshold) {
            request.isApproved = true;
            reviews[request.reviewId].isVerified = true;
            
            // Update aggregated rating with verified status
            _updateItemRating(
                reviews[request.reviewId].itemId,
                reviews[request.reviewId].itemType,
                reviews[request.reviewId].rating,
                true
            );
        }
        
        emit VerificationApproved(request.reviewId, msg.sender);
    }
    
    /**
     * @dev Create a curation rule
     */
    function createCurationRule(
        string memory ruleType,
        string memory description,
        uint256 threshold
    ) public onlyOwner returns (uint256) {
        require(bytes(ruleType).length > 0, "Curation: Rule type cannot be empty");
        require(bytes(description).length > 0, "Curation: Description cannot be empty");
        
        _ruleIdCounter.increment();
        uint256 newRuleId = _ruleIdCounter.current();
        
        curationRules[newRuleId] = CurationRule({
            ruleId: newRuleId,
            ruleType: ruleType,
            description: description,
            threshold: threshold,
            isActive: true,
            createdAt: block.timestamp,
            createdBy: msg.sender
        });
        
        emit CurationRuleCreated(newRuleId, ruleType, threshold);
        
        return newRuleId;
    }
    
    /**
     * @dev Get item rating
     */
    function getItemRating(uint256 itemId, string memory itemType) public view returns (Rating memory) {
        return itemRatings[itemType][itemId];
    }
    
    /**
     * @dev Get reviews for an item
     */
    function getItemReviews(uint256 itemId, string memory itemType) public view returns (uint256[] memory) {
        return itemReviews[itemType][itemId];
    }
    
    /**
     * @dev Get reviewer profile
     */
    function getReviewerProfile(address reviewer) public view returns (ReviewerProfile memory) {
        return reviewerProfiles[reviewer];
    }
    
    /**
     * @dev Get review by ID
     */
    function getReview(uint256 reviewId) public view returns (Review memory) {
        return reviews[reviewId];
    }
    
    /**
     * @dev Get total number of reviews
     */
    function getTotalReviews() public view returns (uint256) {
        return _reviewIdCounter.current();
    }
    
    /**
     * @dev Get total number of verification requests
     */
    function getTotalVerifications() public view returns (uint256) {
        return _verificationIdCounter.current();
    }
    
    /**
     * @dev Internal function to update item rating
     */
    function _updateItemRating(
        uint256 itemId,
        string memory itemType,
        uint256 rating,
        bool isVerified
    ) internal {
        Rating storage itemRating = itemRatings[itemType][itemId];
        
        if (itemRating.itemId == 0) {
            // First rating for this item
            itemRating.itemId = itemId;
            itemRating.itemType = itemType;
            itemRating.totalRatings = 0;
            itemRating.totalScore = 0;
            itemRating.averageRating = 0;
            itemRating.verifiedRatings = 0;
            itemRating.verifiedScore = 0;
        }
        
        itemRating.totalRatings = itemRating.totalRatings + 1;
        itemRating.totalScore = itemRating.totalScore + rating;
        itemRating.averageRating = itemRating.totalScore / itemRating.totalRatings;
        
        if (isVerified) {
            itemRating.verifiedRatings = itemRating.verifiedRatings + 1;
            itemRating.verifiedScore = itemRating.verifiedScore + rating;
        }
        
        itemRating.lastUpdated = block.timestamp;
        
        emit RatingUpdated(itemId, itemType, itemRating.averageRating, itemRating.totalRatings);
    }
    
    /**
     * @dev Internal function to update reviewer reputation
     */
    function _updateReviewerReputation(address reviewer) internal {
        ReviewerProfile storage profile = reviewerProfiles[reviewer];
        
        if (profile.reviewer == address(0)) return;
        
        // Calculate reputation based on helpful votes
        uint256 totalVotes = 0;
        uint256 helpfulVotes = 0;
        
        for (uint256 i = 0; i < profile.totalReviews; i++) {
            uint256 reviewId = reviewerReviews[reviewer][i];
            if (reviews[reviewId].isActive) {
                totalVotes += reviews[reviewId].helpfulVotes + reviews[reviewId].unhelpfulVotes;
                helpfulVotes += reviews[reviewId].helpfulVotes;
            }
        }
        
        if (totalVotes > 0) {
            profile.reputationScore = (helpfulVotes * 100) / totalVotes;
        }
        
        // Update helpful reviews count
        profile.helpfulReviews = helpfulVotes;
        
        emit ReviewerReputationUpdated(reviewer, profile.reputationScore);
    }
}

