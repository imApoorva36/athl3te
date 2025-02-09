// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Athl3te is ERC721  {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    event UserRegistered(
        address userAddress,
        string metadata,
        uint256 timestamp
    );

    event ActivityAdded(
        address userAddress,
        string activityId,
        uint256 timestamp,      
        uint256 totalActivities 
    );

    event GoalAdded(
        address userAddress,
        string goalId,
        string goalType,
        uint256 timestamp,        
        uint256 totalGoalsOfType 
    );
    
    event CommunityGoalAdded(
        address userAddress,
        string communityName,
        string goalId,
        uint256 timestamp,        
        uint256 totalGoalsOfCommunity 
    );

    event BotPurchased(
        address userAddress,
        string botName,
        uint16 messagesId,
        uint256 costPaid,          
        uint256 timestamp,         
        uint256 totalBotsPurchased 
    );

    event CommunityRoomCreated(
        string communityName,
        address creator,
        string botName,
        uint16 messagesId,
        uint256 timestamp
    );

    event CommunityRoomJoined(
        address userAddress,
        string communityName,
        uint256 timestamp,   
        uint256 totalMembers 
    );

    event BotCreated(
        string botName,
        string systemPrompt,
        string botDescription,  
        string deploymentURL,
        uint16 unlockCostInGWei,
        uint256 timestamp 
    );

    event InjuryUpdated(
        address userAddress,
        string oldInjuryId,
        string newInjuryId,
        uint256 timestamp
    );

    event NFTMinted(
        address owner,
        uint256 tokenId,
        string uri,
        uint256 timestamp
    );

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

    modifier onlyRegistered() {
        require(users[msg.sender].isRegistered, "Not registered");
        _;
    }

     function mintNftWithUri(string memory uri) onlyRegistered external returns (uint) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(msg.sender, tokenId);
        _tokenURIs[tokenId] = uri;
        
        emit NFTMinted(
            msg.sender,
            tokenId,
            uri,
            block.timestamp
        );
        
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


        emit UserRegistered(
            msg.sender,
            _metadata,
            block.timestamp
        );
    }

    function addActivity(string calldata _activityId) external onlyRegistered {
        users[msg.sender].activityIds.push(_activityId);
        emit ActivityAdded(
            msg.sender,
            _activityId,
            block.timestamp,
            users[msg.sender].activityIds.length
        );
    }

    function addGoal(string calldata _goalId, string calldata goalType) external onlyRegistered {
        bytes32 goalTypeHash = keccak256(abi.encodePacked(goalType));
        uint256 totalGoals;
    
        if(goalTypeHash == keccak256(abi.encodePacked("nutrition"))) {
            users[msg.sender].nutritionGoalIds.push(_goalId);
            totalGoals = users[msg.sender].nutritionGoalIds.length;
        } else if(goalTypeHash == keccak256(abi.encodePacked("sport"))) {
            users[msg.sender].sportGoalIds.push(_goalId);
            totalGoals = users[msg.sender].sportGoalIds.length;
        } else {
            revert("Invalid goal type");
        }
        
        emit GoalAdded(
            msg.sender,
            _goalId,
            goalType,
            block.timestamp,
            totalGoals
        );
    }

    function addCommunityGoal(string calldata communityName, string calldata goalId) external {
        communityRooms[communityName].communitySportGoalIds.push(goalId);
        uint256 totalCommunityGoals = communityRooms[communityName].communitySportGoalIds.length;

        emit CommunityGoalAdded(
            msg.sender,
            communityName,
            goalId,
            block.timestamp,        
            totalCommunityGoals 
        );
    }

    function buyBot(string calldata _botName) external payable onlyRegistered {
        Bot storage bot = bots[_botName]; // Caching `bots[_botName]` in storage
        require(bytes(bot.botName).length > 0, "Bot does not exist!");
        require(msg.value >= bot.unlockCostInGWei, "Insufficient payment");

        User storage user = users[msg.sender]; // Caching `users[msg.sender]` in storage
        uint16 newMessageId = ++messageIdGenerator; // Increment outside struct assignment

        user.purchasedAssistants.push(PersonalAssistant({botName: _botName, messagesId: newMessageId}));

        emit BotPurchased(
            msg.sender,        
            _botName,         
            newMessageId,     
            msg.value,        
            block.timestamp,  
            user.purchasedAssistants.length  
        );
    }

    function updateInjury(string calldata _injuryId) external onlyRegistered {
        string memory oldInjuryId = users[msg.sender].injuriesDescriptionId;
        users[msg.sender].injuriesDescriptionId = _injuryId;
        
        emit InjuryUpdated(
            msg.sender,
            oldInjuryId,
            _injuryId,
            block.timestamp
        );
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

        users[msg.sender].joinedCommunities.push(_communityName);

        emit CommunityRoomCreated(
            _communityName,     
            msg.sender,         
            _botName,           
            messageIdGenerator, 
            block.timestamp 
        );
    }

    function joinCommunityRoom(string calldata _communityName) external onlyRegistered {
        CommunityRoom storage room = communityRooms[_communityName];
        require(bytes(room.communityName).length > 0, "Community room does not exist!");

        for (uint256 i = 0; i < room.members.length; i++) {
            if (room.members[i] == msg.sender) revert("Already a member!");
        }

        room.members.push(msg.sender);
        users[msg.sender].joinedCommunities.push(_communityName);
        emit CommunityRoomJoined(
            msg.sender,           
            _communityName,       
            block.timestamp,      
            room.members.length   
        );
    }

    function getCommunityRoomDetails(string calldata _communityName) external view returns (CommunityRoom memory) {
        require(bytes(communityRooms[_communityName].communityName).length > 0, "Community does not exist!");
        return communityRooms[_communityName];
    }

    function getBotDetails(string calldata _botName) external view returns (Bot memory) {
        require(bytes(bots[_botName].botName).length > 0, "Bot does not exist!");
        return bots[_botName];
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

        emit BotCreated(
            _botName,       
            _systemPrompt,
            _botDescription,     
            _deploymentURL,     
            _unlockCostInGWei,  
            block.timestamp    
        );
    }
}
