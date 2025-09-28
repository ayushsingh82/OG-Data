// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title DatasetAgentNFTs
 * @dev NFT tokenization system for datasets and AI agents to enable secondary trading and composable use-cases
 * @notice Implements Wave 4: Dataset & Agent NFTs for secondary trading and composable use-cases
 */
contract DatasetAgentNFTs is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;
    
    Counters.Counter private _tokenIdCounter;
    
    // NFT types
    enum NFTType {
        DATASET,
        AGENT
    }
    
    // NFT structure
    struct NFTMetadata {
        uint256 tokenId;
        NFTType nftType;
        uint256 itemId; // Original dataset/agent ID
        string name;
        string description;
        string category;
        string[] tags;
        uint256 originalPrice;
        uint256 currentPrice;
        address creator;
        uint256 createdAt;
        uint256 lastUpdated;
        bool isActive;
        string metadataURI;
        string[] dependencies; // Dependencies on other NFTs
        uint256[] royalties; // Royalty percentages for different recipients
        address[] royaltyRecipients;
    }
    
    // Mapping from token ID to NFT metadata
    mapping(uint256 => NFTMetadata) public nftMetadata;
    
    // Mapping from item ID to NFT token ID
    mapping(NFTType => mapping(uint256 => uint256)) public itemToNFT;
    
    // Mapping from creator to their NFT token IDs
    mapping(address => uint256[]) public creatorNFTs;
    
    // Secondary market
    struct Listing {
        uint256 tokenId;
        address seller;
        uint256 price;
        bool isActive;
        uint256 createdAt;
        uint256 expiresAt;
    }
    
    mapping(uint256 => Listing) public listings;
    Counters.Counter private _listingIdCounter;
    
    // Royalty system
    struct RoyaltyInfo {
        address recipient;
        uint256 percentage; // basis points (100 = 1%)
    }
    
    mapping(uint256 => RoyaltyInfo[]) public tokenRoyalties;
    
    // Composability system
    struct Composition {
        uint256 compositionId;
        uint256[] componentNFTs;
        address composer;
        string compositionType;
        bool isActive;
        uint256 createdAt;
    }
    
    mapping(uint256 => Composition) public compositions;
    Counters.Counter private _compositionIdCounter;
    
    // Events
    event NFTMinted(uint256 indexed tokenId, NFTType nftType, uint256 itemId, address indexed creator);
    event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);
    event NFTComposed(uint256 indexed compositionId, uint256[] componentNFTs, address indexed composer);
    event RoyaltyPaid(uint256 indexed tokenId, address indexed recipient, uint256 amount);
    event NFTUpdated(uint256 indexed tokenId, string metadataURI);
    
    // OG Token for payments
    IERC20 public ogToken;
    
    // Marketplace fee
    uint256 public marketplaceFee = 250; // 2.5% in basis points
    
    constructor(address _ogToken) ERC721("OGDataNFTs", "OGNFT") {
        ogToken = IERC20(_ogToken);
    }
    
    /**
     * @dev Mint an NFT for a dataset or agent
     */
    function mintNFT(
        NFTType nftType,
        uint256 itemId,
        string memory name,
        string memory description,
        string memory category,
        string[] memory tags,
        uint256 originalPrice,
        string memory metadataURI,
        string[] memory dependencies,
        uint256[] memory royalties,
        address[] memory royaltyRecipients
    ) public returns (uint256) {
        require(bytes(name).length > 0, "NFT: Name cannot be empty");
        require(bytes(description).length > 0, "NFT: Description cannot be empty");
        require(bytes(category).length > 0, "NFT: Category cannot be empty");
        require(tags.length > 0, "NFT: At least one tag required");
        require(originalPrice > 0, "NFT: Original price must be greater than 0");
        require(bytes(metadataURI).length > 0, "NFT: Metadata URI cannot be empty");
        require(royalties.length == royaltyRecipients.length, "NFT: Royalties and recipients length mismatch");
        
        // Check if NFT already exists for this item
        require(itemToNFT[nftType][itemId] == 0, "NFT: NFT already exists for this item");
        
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        
        // Mint the NFT
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, metadataURI);
        
        // Store NFT metadata
        nftMetadata[newTokenId] = NFTMetadata({
            tokenId: newTokenId,
            nftType: nftType,
            itemId: itemId,
            name: name,
            description: description,
            category: category,
            tags: tags,
            originalPrice: originalPrice,
            currentPrice: originalPrice,
            creator: msg.sender,
            createdAt: block.timestamp,
            lastUpdated: block.timestamp,
            isActive: true,
            metadataURI: metadataURI,
            dependencies: dependencies,
            royalties: royalties,
            royaltyRecipients: royaltyRecipients
        });
        
        // Update mappings
        itemToNFT[nftType][itemId] = newTokenId;
        creatorNFTs[msg.sender].push(newTokenId);
        
        // Set up royalties
        for (uint256 i = 0; i < royalties.length; i++) {
            tokenRoyalties[newTokenId].push(RoyaltyInfo({
                recipient: royaltyRecipients[i],
                percentage: royalties[i]
            }));
        }
        
        emit NFTMinted(newTokenId, nftType, itemId, msg.sender);
        
        return newTokenId;
    }
    
    /**
     * @dev List an NFT for sale
     */
    function listNFT(uint256 tokenId, uint256 price, uint256 duration) public {
        require(_exists(tokenId), "NFT: Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "NFT: Not the owner");
        require(price > 0, "NFT: Price must be greater than 0");
        require(duration > 0, "NFT: Duration must be greater than 0");
        require(nftMetadata[tokenId].isActive, "NFT: NFT is not active");
        
        _listingIdCounter.increment();
        uint256 listingId = _listingIdCounter.current();
        
        listings[listingId] = Listing({
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            isActive: true,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + duration
        });
        
        emit NFTListed(tokenId, msg.sender, price);
    }
    
    /**
     * @dev Buy an NFT from a listing
     */
    function buyNFT(uint256 listingId) public nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.isActive, "NFT: Listing not active");
        require(block.timestamp <= listing.expiresAt, "NFT: Listing expired");
        require(msg.sender != listing.seller, "NFT: Cannot buy own NFT");
        
        uint256 tokenId = listing.tokenId;
        uint256 price = listing.price;
        
        // Calculate marketplace fee
        uint256 fee = (price * marketplaceFee) / 10000;
        uint256 sellerAmount = price - fee;
        
        // Transfer OG tokens from buyer to seller
        ogToken.safeTransferFrom(msg.sender, listing.seller, sellerAmount);
        
        // Transfer marketplace fee to contract
        if (fee > 0) {
            ogToken.safeTransferFrom(msg.sender, address(this), fee);
        }
        
        // Transfer NFT to buyer
        _transfer(listing.seller, msg.sender, tokenId);
        
        // Update listing
        listing.isActive = false;
        
        // Update NFT metadata
        nftMetadata[tokenId].currentPrice = price;
        nftMetadata[tokenId].lastUpdated = block.timestamp;
        
        emit NFTSold(tokenId, listing.seller, msg.sender, price);
    }
    
    /**
     * @dev Create a composition of multiple NFTs
     */
    function createComposition(
        uint256[] memory componentNFTs,
        string memory compositionType
    ) public returns (uint256) {
        require(componentNFTs.length > 1, "NFT: At least 2 NFTs required for composition");
        require(bytes(compositionType).length > 0, "NFT: Composition type cannot be empty");
        
        // Verify ownership of all component NFTs
        for (uint256 i = 0; i < componentNFTs.length; i++) {
            require(_exists(componentNFTs[i]), "NFT: Component NFT does not exist");
            require(ownerOf(componentNFTs[i]) == msg.sender, "NFT: Not owner of component NFT");
            require(nftMetadata[componentNFTs[i]].isActive, "NFT: Component NFT is not active");
        }
        
        _compositionIdCounter.increment();
        uint256 compositionId = _compositionIdCounter.current();
        
        compositions[compositionId] = Composition({
            compositionId: compositionId,
            componentNFTs: componentNFTs,
            composer: msg.sender,
            compositionType: compositionType,
            isActive: true,
            createdAt: block.timestamp
        });
        
        emit NFTComposed(compositionId, componentNFTs, msg.sender);
        
        return compositionId;
    }
    
    /**
     * @dev Update NFT metadata
     */
    function updateNFTMetadata(
        uint256 tokenId,
        string memory name,
        string memory description,
        string memory metadataURI
    ) public {
        require(_exists(tokenId), "NFT: Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "NFT: Not the owner");
        require(nftMetadata[tokenId].isActive, "NFT: NFT is not active");
        require(bytes(name).length > 0, "NFT: Name cannot be empty");
        require(bytes(description).length > 0, "NFT: Description cannot be empty");
        require(bytes(metadataURI).length > 0, "NFT: Metadata URI cannot be empty");
        
        // Update metadata
        nftMetadata[tokenId].name = name;
        nftMetadata[tokenId].description = description;
        nftMetadata[tokenId].metadataURI = metadataURI;
        nftMetadata[tokenId].lastUpdated = block.timestamp;
        
        // Update token URI
        _setTokenURI(tokenId, metadataURI);
        
        emit NFTUpdated(tokenId, metadataURI);
    }
    
    /**
     * @dev Get NFT metadata
     */
    function getNFTMetadata(uint256 tokenId) public view returns (NFTMetadata memory) {
        return nftMetadata[tokenId];
    }
    
    /**
     * @dev Get NFT by item ID
     */
    function getNFTByItemId(NFTType nftType, uint256 itemId) public view returns (uint256) {
        return itemToNFT[nftType][itemId];
    }
    
    /**
     * @dev Get creator's NFTs
     */
    function getCreatorNFTs(address creator) public view returns (uint256[] memory) {
        return creatorNFTs[creator];
    }
    
    /**
     * @dev Get active listings
     */
    function getActiveListings() public view returns (uint256[] memory) {
        uint256[] memory activeListings = new uint256[](_listingIdCounter.current());
        uint256 count = 0;
        
        for (uint256 i = 1; i <= _listingIdCounter.current(); i++) {
            if (listings[i].isActive && block.timestamp <= listings[i].expiresAt) {
                activeListings[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = activeListings[i];
        }
        
        return result;
    }
    
    /**
     * @dev Get composition by ID
     */
    function getComposition(uint256 compositionId) public view returns (Composition memory) {
        return compositions[compositionId];
    }
    
    /**
     * @dev Get token royalties
     */
    function getTokenRoyalties(uint256 tokenId) public view returns (RoyaltyInfo[] memory) {
        return tokenRoyalties[tokenId];
    }
    
    /**
     * @dev Calculate royalties for a sale
     */
    function calculateRoyalties(uint256 tokenId, uint256 salePrice) public view returns (
        address[] memory recipients,
        uint256[] memory amounts
    ) {
        RoyaltyInfo[] memory royalties = tokenRoyalties[tokenId];
        recipients = new address[](royalties.length);
        amounts = new uint256[](royalties.length);
        
        for (uint256 i = 0; i < royalties.length; i++) {
            recipients[i] = royalties[i].recipient;
            amounts[i] = (salePrice * royalties[i].percentage) / 10000;
        }
    }
    
    /**
     * @dev Deactivate an NFT
     */
    function deactivateNFT(uint256 tokenId) public {
        require(_exists(tokenId), "NFT: Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "NFT: Not the owner");
        
        nftMetadata[tokenId].isActive = false;
        nftMetadata[tokenId].lastUpdated = block.timestamp;
    }
    
    /**
     * @dev Activate an NFT
     */
    function activateNFT(uint256 tokenId) public {
        require(_exists(tokenId), "NFT: Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "NFT: Not the owner");
        
        nftMetadata[tokenId].isActive = true;
        nftMetadata[tokenId].lastUpdated = block.timestamp;
    }
    
    /**
     * @dev Update marketplace fee
     */
    function updateMarketplaceFee(uint256 newFee) public onlyOwner {
        require(newFee <= 1000, "NFT: Fee cannot exceed 10%");
        marketplaceFee = newFee;
    }
    
    /**
     * @dev Withdraw marketplace fees
     */
    function withdrawFees() public onlyOwner {
        uint256 balance = ogToken.balanceOf(address(this));
        ogToken.safeTransfer(owner(), balance);
    }
    
    /**
     * @dev Get total NFTs minted
     */
    function getTotalNFTs() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    /**
     * @dev Get total listings
     */
    function getTotalListings() public view returns (uint256) {
        return _listingIdCounter.current();
    }
    
    /**
     * @dev Get total compositions
     */
    function getTotalCompositions() public view returns (uint256) {
        return _compositionIdCounter.current();
    }
    
    // Required overrides for multiple inheritance
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
    
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
