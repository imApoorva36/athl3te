// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Athl3te is ERC721  {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Events
    event UserRegistered(address indexed userAddress, string metadata);
    event ActivityAdded(address indexed userAddress, string activityId);
    event GoalAdded(address indexed userAddress, string goalId, string goalType);
    event BotPurchased(address indexed userAddress, string botName, uint16 messagesId);
    event CommunityRoomCreated(string indexed communityName, address indexed creator, string botName, uint16 messagesId);
    event CommunityRoomJoined(address indexed userAddress, string communityName);
    event BotCreated(string indexed botName, string deploymentURL, uint16 unlockCostInGWei);

    struct Bot {
        string botName;
        string systemPrompt;
        string botDescription;
        string deploymentURL;
        uint16 unlockCostInGWei;
    }

    struct PersonalAssistant {
        string botName;
        uint16 messagesId;
    }

    struct User {
        string metadata;
        string[] activityIds;
        string[] sportGoalIds;
        string[] nutritionGoalIds;
        PersonalAssistant[] purchasedAssistants;
        string injuriesDescriptionId;
        uint256[] nftTokenIds;
        bool isRegistered;
        string[] joinedCommunities;
    }

    struct CommunityRoom {
        string communityName;
        string botName;
        address createdBy;
        uint16 messagesId;
        string[] communitySportGoalIds;
        address[] members;
    }

    string private baseURI;

    constructor(string memory name, string memory symbol, string memory _baseURL) ERC721(name, symbol) {
        baseURI = _baseURL;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    uint16 private messageIdGenerator = 0;
    
    mapping(address => User) private users;
    mapping(string => Bot) private bots;
    mapping(string => CommunityRoom) private communityRooms;

    mapping(uint256 => string) public _tokenURIs;

    string[] private allBotNames;
    address[] private allUsers;
    string[] private allCommunityNames;

    modifier onlyRegistered() {
        require(users[msg.sender].isRegistered, "Not registered");
        _;
    }

    function mintNftWithUri(string memory uri) onlyRegistered external returns (uint) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(msg.sender, tokenId);
        _tokenURIs[tokenId] = uri;
        users[msg.sender].nftTokenIds.push(tokenId);
        return tokenId;
    }

    function registerUser(string calldata _metadata) external {
        require(!users[msg.sender].isRegistered, "User already registered!");

        User storage newUser = users[msg.sender];
        newUser.isRegistered = true;
        newUser.metadata = _metadata;
        newUser.activityIds = new string[](0);
        newUser.sportGoalIds = new string[](0);
        newUser.nutritionGoalIds = new string[](0);
        newUser.nftTokenIds = new uint256[](0);

        allUsers.push(msg.sender);

        emit UserRegistered(msg.sender, _metadata);
    }

    function addActivity(string calldata _activityId) external onlyRegistered {
        users[msg.sender].activityIds.push(_activityId);
        emit ActivityAdded(msg.sender, _activityId);
    }

    function addGoal(string memory _goalId, string calldata goalType) external onlyRegistered {
         bytes32 goalTypeHash = keccak256(abi.encodePacked(goalType));
    
        if(goalTypeHash == keccak256(abi.encodePacked("nutrition"))) {
            users[msg.sender].nutritionGoalIds.push(_goalId);
        } else if(goalTypeHash == keccak256(abi.encodePacked("sport"))) {
            users[msg.sender].sportGoalIds.push(_goalId);
        } else {
            revert("Invalid goal type");
        }
        emit GoalAdded(msg.sender, _goalId, goalType);
    }

    function buyBot(string calldata _botName) external payable onlyRegistered {
        require(bytes(bots[_botName].botName).length > 0, "Bot does not exist!");
        require(msg.value >= bots[_botName].unlockCostInGWei * 1 gwei, "Insufficient payment");


        users[msg.sender].purchasedAssistants.push(PersonalAssistant({botName: _botName, messagesId: ++messageIdGenerator}));
        emit BotPurchased(msg.sender, _botName, messageIdGenerator);
    }

    function updateInjury(string calldata _injuryId) external onlyRegistered {
        users[msg.sender].injuriesDescriptionId = _injuryId;
    }

    function getUserDetails() external view onlyRegistered returns (User memory) {
        return users[msg.sender];
    }

    function createCommunityRoom(
        string calldata _communityName,
        string calldata _botName
    ) external onlyRegistered {
        require(bytes(bots[_botName].botName).length > 0, "Bot does not exist!");
        require(bytes(communityRooms[_communityName].communityName).length == 0, "Community already exists!");

        CommunityRoom storage room = communityRooms[_communityName];

        room.communityName = _communityName;
        room.botName = _botName;
        room.messagesId = ++messageIdGenerator;
        room.createdBy = msg.sender;
        room.members.push(msg.sender);
        allCommunityNames.push(_communityName);

        users[msg.sender].joinedCommunities.push(_communityName);
        emit CommunityRoomCreated(_communityName, msg.sender, _botName, messageIdGenerator);
    }

    function joinCommunityRoom(string calldata _communityName) external onlyRegistered {
        CommunityRoom storage room = communityRooms[_communityName];
        require(bytes(room.communityName).length > 0, "Community room does not exist!");

        for (uint256 i = 0; i < room.members.length; i++) {
            if (room.members[i] == msg.sender) revert("Already a member!");
        }

        room.members.push(msg.sender);
        users[msg.sender].joinedCommunities.push(_communityName);
        emit CommunityRoomJoined(msg.sender, _communityName);
    }

    function getCommunityRoomDetails(string calldata _communityName) external view returns (CommunityRoom memory) {
        require(bytes(communityRooms[_communityName].communityName).length > 0, "Community does not exist!");
        return communityRooms[_communityName];
    }

    function getBotDetails(string calldata _botName) external view returns (Bot memory) {
        require(bytes(bots[_botName].botName).length > 0, "Bot does not exist!");
        return bots[_botName];
    }

    function getAllBotNames() external view returns (string[] memory) {
        return allBotNames;
    }

    function getAllUsers() external view returns (address[] memory) {
        return allUsers;
    }

    function getAllCommunityNames() external view returns (string[] memory) {
        return allCommunityNames;
    }

    function createBot(
        string calldata _botName,
        string calldata _systemPrompt,
        string calldata _botDescription,
        string calldata _deploymentURL,
        uint16 _unlockCostInGWei
    ) external {
        require(bytes(_botName).length > 0, "Bot name cannot be empty!");
        require(bytes(bots[_botName].botName).length == 0, "Bot already exists!");

        bots[_botName] = Bot({
            botName: _botName,
            systemPrompt: _systemPrompt,
            botDescription: _botDescription,
            deploymentURL: _deploymentURL,
            unlockCostInGWei: _unlockCostInGWei
        });

        allBotNames.push(_botName);
        emit BotCreated(_botName, _deploymentURL, _unlockCostInGWei);
    }
}
