// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "lib/openzeppelin-contracts/contracts/utils/Counters.sol";
import "lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title DeveloperSDKs
 * @dev Developer SDKs & APIs for seamless agent onboarding and third-party integrations
 * @notice Implements Wave 4: Developer SDKs & APIs for seamless agent onboarding and third-party integrations
 */
contract DeveloperSDKs is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;
    
    Counters.Counter private _sdkIdCounter;
    Counters.Counter private _integrationIdCounter;
    Counters.Counter private _apiKeyIdCounter;
    
    // SDK structure
    struct SDK {
        uint256 sdkId;
        string name;
        string version;
        string description;
        string[] supportedLanguages;
        string[] supportedFrameworks;
        string repositoryUrl;
        string documentationUrl;
        address developer;
        bool isActive;
        uint256 downloads;
        uint256 rating;
        uint256 createdAt;
        uint256 lastUpdated;
    }
    
    // API Integration
    struct APIIntegration {
        uint256 integrationId;
        string name;
        string description;
        string endpoint;
        string[] supportedMethods;
        string[] supportedFormats;
        uint256 rateLimit;
        uint256 costPerCall;
        address developer;
        bool isActive;
        uint256 totalCalls;
        uint256 totalRevenue;
        uint256 createdAt;
    }
    
    // API Key management
    struct APIKey {
        uint256 keyId;
        address owner;
        string keyHash;
        string[] permissions;
        uint256 rateLimit;
        uint256 callsUsed;
        uint256 callsLimit;
        bool isActive;
        uint256 createdAt;
        uint256 expiresAt;
    }
    
    // Developer profile
    struct DeveloperProfile {
        address developer;
        string name;
        string email;
        string website;
        string[] specializations;
        uint256 totalSDKs;
        uint256 totalIntegrations;
        uint256 totalDownloads;
        uint256 reputation;
        bool isVerified;
        uint256 createdAt;
        uint256 lastActive;
    }
    
    // Mapping from SDK ID to SDK data
    mapping(uint256 => SDK) public sdks;
    
    // Mapping from integration ID to integration data
    mapping(uint256 => APIIntegration) public integrations;
    
    // Mapping from API key ID to API key data
    mapping(uint256 => APIKey) public apiKeys;
    
    // Mapping from developer address to profile
    mapping(address => DeveloperProfile) public developerProfiles;
    
    // Mapping from developer to their SDK IDs
    mapping(address => uint256[]) public developerSDKs;
    
    // Mapping from developer to their integration IDs
    mapping(address => uint256[]) public developerIntegrations;
    
    // Mapping from API key hash to key ID
    mapping(string => uint256) public apiKeyHashes;
    
    // SDK categories
    enum SDKCategory {
        AI_AGENT,
        DATA_PROCESSING,
        BLOCKCHAIN,
        MARKETPLACE,
        ANALYTICS,
        VISUALIZATION,
        OTHER
    }
    
    // Integration types
    enum IntegrationType {
        REST_API,
        GRAPHQL,
        WEBSOCKET,
        GRPC,
        WEBHOOK,
        CUSTOM
    }
    
    // Events
    event SDKRegistered(uint256 indexed sdkId, string name, string version, address indexed developer);
    event SDKUpdated(uint256 indexed sdkId, string version);
    event APIIntegrationCreated(uint256 indexed integrationId, string name, address indexed developer);
    event APIKeyGenerated(uint256 indexed keyId, address indexed owner);
    event DeveloperProfileCreated(address indexed developer, string name);
    event SDKDownloaded(uint256 indexed sdkId, address indexed downloader);
    event APICallMade(uint256 indexed integrationId, address indexed caller, uint256 cost);
    
    // OG Token for payments
    IERC20 public ogToken;
    
    // SDK registration fee
    uint256 public sdkRegistrationFee = 100 * 10**18; // 100 OG tokens
    
    // API call fees
    uint256 public apiCallFee = 1 * 10**18; // 1 OG token per call
    
    constructor(address _ogToken) {
        ogToken = IERC20(_ogToken);
    }
    
    /**
     * @dev Create developer profile
     */
    function createDeveloperProfile(
        string memory name,
        string memory email,
        string memory website,
        string[] memory specializations
    ) public returns (bool) {
        require(bytes(name).length > 0, "SDK: Name cannot be empty");
        require(bytes(email).length > 0, "SDK: Email cannot be empty");
        require(specializations.length > 0, "SDK: At least one specialization required");
        
        developerProfiles[msg.sender] = DeveloperProfile({
            developer: msg.sender,
            name: name,
            email: email,
            website: website,
            specializations: specializations,
            totalSDKs: 0,
            totalIntegrations: 0,
            totalDownloads: 0,
            reputation: 50, // Initial reputation
            isVerified: false,
            createdAt: block.timestamp,
            lastActive: block.timestamp
        });
        
        emit DeveloperProfileCreated(msg.sender, name);
        
        return true;
    }
    
    /**
     * @dev Register an SDK
     */
    function registerSDK(
        string memory name,
        string memory version,
        string memory description,
        string[] memory supportedLanguages,
        string[] memory supportedFrameworks,
        string memory repositoryUrl,
        string memory documentationUrl
    ) public nonReentrant returns (uint256) {
        require(bytes(name).length > 0, "SDK: Name cannot be empty");
        require(bytes(version).length > 0, "SDK: Version cannot be empty");
        require(bytes(description).length > 0, "SDK: Description cannot be empty");
        require(supportedLanguages.length > 0, "SDK: At least one supported language required");
        require(bytes(repositoryUrl).length > 0, "SDK: Repository URL cannot be empty");
        require(bytes(documentationUrl).length > 0, "SDK: Documentation URL cannot be empty");
        
        // Pay registration fee
        ogToken.safeTransferFrom(msg.sender, address(this), sdkRegistrationFee);
        
        _sdkIdCounter.increment();
        uint256 newSDKId = _sdkIdCounter.current();
        
        sdks[newSDKId] = SDK({
            sdkId: newSDKId,
            name: name,
            version: version,
            description: description,
            supportedLanguages: supportedLanguages,
            supportedFrameworks: supportedFrameworks,
            repositoryUrl: repositoryUrl,
            documentationUrl: documentationUrl,
            developer: msg.sender,
            isActive: true,
            downloads: 0,
            rating: 0,
            createdAt: block.timestamp,
            lastUpdated: block.timestamp
        });
        
        // Update developer profile
        developerSDKs[msg.sender].push(newSDKId);
        developerProfiles[msg.sender].totalSDKs = developerProfiles[msg.sender].totalSDKs + 1;
        developerProfiles[msg.sender].lastActive = block.timestamp;
        
        emit SDKRegistered(newSDKId, name, version, msg.sender);
        
        return newSDKId;
    }
    
    /**
     * @dev Update SDK
     */
    function updateSDK(
        uint256 sdkId,
        string memory version,
        string memory description,
        string[] memory supportedLanguages,
        string[] memory supportedFrameworks,
        string memory repositoryUrl,
        string memory documentationUrl
    ) public {
        require(sdks[sdkId].developer == msg.sender, "SDK: Not the developer");
        require(sdks[sdkId].sdkId != 0, "SDK: SDK does not exist");
        require(sdks[sdkId].isActive, "SDK: SDK is not active");
        require(bytes(version).length > 0, "SDK: Version cannot be empty");
        require(bytes(description).length > 0, "SDK: Description cannot be empty");
        require(supportedLanguages.length > 0, "SDK: At least one supported language required");
        require(bytes(repositoryUrl).length > 0, "SDK: Repository URL cannot be empty");
        require(bytes(documentationUrl).length > 0, "SDK: Documentation URL cannot be empty");
        
        sdks[sdkId].version = version;
        sdks[sdkId].description = description;
        sdks[sdkId].supportedLanguages = supportedLanguages;
        sdks[sdkId].supportedFrameworks = supportedFrameworks;
        sdks[sdkId].repositoryUrl = repositoryUrl;
        sdks[sdkId].documentationUrl = documentationUrl;
        sdks[sdkId].lastUpdated = block.timestamp;
        
        emit SDKUpdated(sdkId, version);
    }
    
    /**
     * @dev Download SDK
     */
    function downloadSDK(uint256 sdkId) public {
        require(sdks[sdkId].sdkId != 0, "SDK: SDK does not exist");
        require(sdks[sdkId].isActive, "SDK: SDK is not active");
        
        sdks[sdkId].downloads = sdks[sdkId].downloads + 1;
        developerProfiles[sdks[sdkId].developer].totalDownloads = developerProfiles[sdks[sdkId].developer].totalDownloads + 1;
        
        emit SDKDownloaded(sdkId, msg.sender);
    }
    
    /**
     * @dev Create API integration
     */
    function createAPIIntegration(
        string memory name,
        string memory description,
        string memory endpoint,
        string[] memory supportedMethods,
        string[] memory supportedFormats,
        uint256 rateLimit,
        uint256 costPerCall
    ) public returns (uint256) {
        require(bytes(name).length > 0, "SDK: Name cannot be empty");
        require(bytes(description).length > 0, "SDK: Description cannot be empty");
        require(bytes(endpoint).length > 0, "SDK: Endpoint cannot be empty");
        require(supportedMethods.length > 0, "SDK: At least one supported method required");
        require(supportedFormats.length > 0, "SDK: At least one supported format required");
        require(rateLimit > 0, "SDK: Rate limit must be greater than 0");
        require(costPerCall > 0, "SDK: Cost per call must be greater than 0");
        
        _integrationIdCounter.increment();
        uint256 newIntegrationId = _integrationIdCounter.current();
        
        integrations[newIntegrationId] = APIIntegration({
            integrationId: newIntegrationId,
            name: name,
            description: description,
            endpoint: endpoint,
            supportedMethods: supportedMethods,
            supportedFormats: supportedFormats,
            rateLimit: rateLimit,
            costPerCall: costPerCall,
            developer: msg.sender,
            isActive: true,
            totalCalls: 0,
            totalRevenue: 0,
            createdAt: block.timestamp
        });
        
        // Update developer profile
        developerIntegrations[msg.sender].push(newIntegrationId);
        developerProfiles[msg.sender].totalIntegrations = developerProfiles[msg.sender].totalIntegrations + 1;
        developerProfiles[msg.sender].lastActive = block.timestamp;
        
        emit APIIntegrationCreated(newIntegrationId, name, msg.sender);
        
        return newIntegrationId;
    }
    
    /**
     * @dev Generate API key
     */
    function generateAPIKey(
        string[] memory permissions,
        uint256 rateLimit,
        uint256 callsLimit,
        uint256 expiresAt
    ) public returns (uint256) {
        require(permissions.length > 0, "SDK: At least one permission required");
        require(rateLimit > 0, "SDK: Rate limit must be greater than 0");
        require(callsLimit > 0, "SDK: Calls limit must be greater than 0");
        require(expiresAt > block.timestamp, "SDK: Expiration must be in the future");
        
        _apiKeyIdCounter.increment();
        uint256 newKeyId = _apiKeyIdCounter.current();
        
        // Generate key hash (in real implementation, this would be more secure)
        string memory keyHash = string(abi.encodePacked("key_", _toString(newKeyId), "_", _toString(block.timestamp)));
        
        apiKeys[newKeyId] = APIKey({
            keyId: newKeyId,
            owner: msg.sender,
            keyHash: keyHash,
            permissions: permissions,
            rateLimit: rateLimit,
            callsUsed: 0,
            callsLimit: callsLimit,
            isActive: true,
            createdAt: block.timestamp,
            expiresAt: expiresAt
        });
        
        apiKeyHashes[keyHash] = newKeyId;
        
        emit APIKeyGenerated(newKeyId, msg.sender);
        
        return newKeyId;
    }
    
    /**
     * @dev Make API call
     */
    function makeAPICall(
        uint256 integrationId,
        string memory method,
        string memory data
    ) public nonReentrant returns (bool) {
        APIIntegration storage integration = integrations[integrationId];
        require(integration.integrationId != 0, "SDK: Integration does not exist");
        require(integration.isActive, "SDK: Integration not active");
        require(bytes(method).length > 0, "SDK: Method cannot be empty");
        
        // Check if method is supported
        bool methodSupported = false;
        for (uint256 i = 0; i < integration.supportedMethods.length; i++) {
            if (keccak256(bytes(integration.supportedMethods[i])) == keccak256(bytes(method))) {
                methodSupported = true;
                break;
            }
        }
        require(methodSupported, "SDK: Method not supported");
        
        // Pay API call fee
        ogToken.safeTransferFrom(msg.sender, address(this), integration.costPerCall);
        
        // Update integration statistics
        integration.totalCalls = integration.totalCalls + 1;
        integration.totalRevenue = integration.totalRevenue + integration.costPerCall;
        
        // Update developer revenue
        developerProfiles[integration.developer].reputation = developerProfiles[integration.developer].reputation + 1;
        
        emit APICallMade(integrationId, msg.sender, integration.costPerCall);
        
        return true;
    }
    
    /**
     * @dev Get SDK information
     */
    function getSDK(uint256 sdkId) public view returns (SDK memory) {
        return sdks[sdkId];
    }
    
    /**
     * @dev Get API integration information
     */
    function getAPIIntegration(uint256 integrationId) public view returns (APIIntegration memory) {
        return integrations[integrationId];
    }
    
    /**
     * @dev Get API key information
     */
    function getAPIKey(uint256 keyId) public view returns (APIKey memory) {
        return apiKeys[keyId];
    }
    
    /**
     * @dev Get developer profile
     */
    function getDeveloperProfile(address developer) public view returns (DeveloperProfile memory) {
        return developerProfiles[developer];
    }
    
    /**
     * @dev Get developer's SDKs
     */
    function getDeveloperSDKs(address developer) public view returns (uint256[] memory) {
        return developerSDKs[developer];
    }
    
    /**
     * @dev Get developer's integrations
     */
    function getDeveloperIntegrations(address developer) public view returns (uint256[] memory) {
        return developerIntegrations[developer];
    }
    
    /**
     * @dev Get total SDKs
     */
    function getTotalSDKs() public view returns (uint256) {
        return _sdkIdCounter.current();
    }
    
    /**
     * @dev Get total integrations
     */
    function getTotalIntegrations() public view returns (uint256) {
        return _integrationIdCounter.current();
    }
    
    /**
     * @dev Get total API keys
     */
    function getTotalAPIKeys() public view returns (uint256) {
        return _apiKeyIdCounter.current();
    }
    
    /**
     * @dev Update SDK registration fee
     */
    function updateSDKRegistrationFee(uint256 newFee) public onlyOwner {
        sdkRegistrationFee = newFee;
    }
    
    /**
     * @dev Update API call fee
     */
    function updateAPICallFee(uint256 newFee) public onlyOwner {
        apiCallFee = newFee;
    }
    
    /**
     * @dev Withdraw fees
     */
    function withdrawFees() public onlyOwner {
        uint256 balance = ogToken.balanceOf(address(this));
        ogToken.safeTransfer(owner(), balance);
    }
    
    /**
     * @dev Verify developer
     */
    function verifyDeveloper(address developer) public onlyOwner {
        require(developerProfiles[developer].developer != address(0), "SDK: Developer profile does not exist");
        developerProfiles[developer].isVerified = true;
    }
    
    /**
     * @dev Internal function to convert uint256 to string
     */
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}


