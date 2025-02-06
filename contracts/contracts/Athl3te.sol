// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Athl3te {
    struct nft {
        string nftName;
        string nftImage;
        string description;
    }

    struct Bot {
        string botName;
        string botImage;
        string systemPrompt;
        string botDescription;
        string deploymentURL;
        uint256 unlockCostInGWei;
    }

    struct User {
        string metadata; // Nillion - age, gender, name, weight, height
        string[] activityIds; //Nillion
        string[] sportGoalIds; //Nillion
        string[] nutritionGoalIds; //Nillion
        PeronsalAssistant[] purchasedAssistants;
        string injuriesDescriptionId; //Nillion
        nft[] nfts;
        bool isRegistered;
        string[] joinedCommunities; // Array of community names the user has joined
    }

    struct CommunityRoom {
        string communityName;
        string communityImage;
        Bot bot;
        address createdBy;
        string[] messageIds; // Messages are stored on Nillion
        string[] communitySportGoalIds; //Nillion
        address[] members; // Array of member addresses
    }

    struct PeronsalAssistant {
        Bot bot;
        string[] messageIds; // Messages are stored on Nillion
    }

    mapping(address => User) private users;
    mapping(string => Bot) private bots;
    mapping(string => CommunityRoom) private communityRooms;

    User[] private allUsers;
    Bot[] private allBots;
    CommunityRoom[] private allCommunityRooms;

    function registerUser(string memory _metadata) public {
        require(!users[msg.sender].isRegistered, "User already registered!");
        require(bytes(_metadata).length > 0, "Metadata cannot be empty!");

        User storage newUser = users[msg.sender];
        newUser.isRegistered = true;
        newUser.metadata = _metadata;
        newUser.activityIds = new string[](0);
        newUser.sportGoalIds = new string[](0);
        newUser.nutritionGoalIds = new string[](0);
        newUser.injuriesDescriptionId = "";

        allUsers.push(newUser);
    }

    function addActivity(string memory _activityId) public {
        require(users[msg.sender].isRegistered, "User not registered!");
        require(bytes(_activityId).length > 0, "Activity ID cannot be empty!");

        users[msg.sender].activityIds.push(_activityId);
    }

    function addSportGoal(string memory _goalId) public {
        require(users[msg.sender].isRegistered, "User not registered!");
        require(bytes(_goalId).length > 0, "Goal ID cannot be empty!");

        users[msg.sender].sportGoalIds.push(_goalId);
    }

    function addNutritionGoal(string memory _goalId) public {
        require(users[msg.sender].isRegistered, "User not registered!");
        require(bytes(_goalId).length > 0, "Goal ID cannot be empty!");

        users[msg.sender].nutritionGoalIds.push(_goalId);
    }

    function getUserActivities() public view returns (string[] memory) {
        require(users[msg.sender].isRegistered, "User not registered!");
        return users[msg.sender].activityIds;
    }

    function getUserSportGoals() public view returns (string[] memory) {
        require(users[msg.sender].isRegistered, "User not registered!");
        return users[msg.sender].sportGoalIds;
    }

    function getUserNutritionGoals() public view returns (string[] memory) {
        require(users[msg.sender].isRegistered, "User not registered!");
        return users[msg.sender].nutritionGoalIds;
    }

    function buyBot(string memory _botName) public payable {
        require(users[msg.sender].isRegistered, "User not registered!");
        require(bytes(_botName).length > 0, "Bot name cannot be empty!");

        Bot storage bot = bots[_botName];
        require(bytes(bot.botName).length > 0, "Bot does not exist!");
        require(
            msg.value >= bot.unlockCostInGWei * 1 gwei,
            "Insufficient payment"
        );

        PeronsalAssistant memory newAssistant = PeronsalAssistant({
            bot: bot,
            messageIds: new string[](0)
        });

        users[msg.sender].purchasedAssistants.push(newAssistant);
    }

    function updateInjury(string memory _injuryId) public {
        require(users[msg.sender].isRegistered, "User not registered!");
        require(bytes(_injuryId).length > 0, "Injury ID cannot be empty!");

        users[msg.sender].injuriesDescriptionId = _injuryId;
    }

    function getUserMetadata() public view returns (string memory) {
        require(users[msg.sender].isRegistered, "User not registered!");
        return users[msg.sender].metadata;
    }

    function getInjuryDescription() public view returns (string memory) {
        require(users[msg.sender].isRegistered, "User not registered!");
        return users[msg.sender].injuriesDescriptionId;
    }

    function getUserNfts() public view returns (nft[] memory) {
        require(users[msg.sender].isRegistered, "User not registered!");
        return users[msg.sender].nfts;
    }

    function getUserDetails()
        public
        view
        returns (
            string memory metadata,
            string[] memory activityIds,
            string[] memory sportGoalIds,
            string[] memory nutritionGoalIds,
            string memory injuriesDescriptionId,
            uint256 nftCount,
            uint256 assistantCount
        )
    {
        require(users[msg.sender].isRegistered, "User not registered!");

        User storage user = users[msg.sender];
        return (
            user.metadata,
            user.activityIds,
            user.sportGoalIds,
            user.nutritionGoalIds,
            user.injuriesDescriptionId,
            user.nfts.length,
            user.purchasedAssistants.length
        );
    }

    function createCommunityRoom(
        string memory _communityName,
        string memory _communityImage,
        string memory _botName
    ) public {
        require(bytes(_communityName).length > 0, "Community name cannot be empty!");
        require(bytes(_communityImage).length > 0, "Community image cannot be empty!");
        require(bytes(_botName).length > 0, "Bot name cannot be empty!");

        Bot storage bot = bots[_botName];
        require(bytes(bot.botName).length > 0, "Bot does not exist!");

        CommunityRoom storage newRoom = communityRooms[_communityName];
        newRoom.communityName = _communityName;
        newRoom.communityImage = _communityImage;
        newRoom.bot = bot;
        newRoom.createdBy = msg.sender;
        newRoom.messageIds = new string[](0);
        newRoom.members = new address[](0);
        newRoom.communitySportGoalIds = new string[](0);

        // Add creator as first member
        newRoom.members.push(msg.sender);
        users[msg.sender].joinedCommunities.push(_communityName);

        allCommunityRooms.push(newRoom);
    }

    function joinCommunityRoom(string memory _communityName) public {
        require(users[msg.sender].isRegistered, "User not registered!");
        
        CommunityRoom storage room = communityRooms[_communityName];
        require(bytes(room.communityName).length > 0, "Community room does not exist!");
        
        for (uint i = 0; i < room.members.length; i++) {
            require(room.members[i] != msg.sender, "Already a member of this community!");
        }

        room.members.push(msg.sender);
        
        users[msg.sender].joinedCommunities.push(_communityName);
    }

    function getCommunityMembers(string memory _communityName) public view returns (address[] memory) {
        CommunityRoom storage room = communityRooms[_communityName];
        require(bytes(room.communityName).length > 0, "Community room does not exist!");
        
        return room.members;
    }

    function getUserCommunities() public view returns (string[] memory) {
        require(users[msg.sender].isRegistered, "User not registered!");
        return users[msg.sender].joinedCommunities;
    }

    function getDeployedCommunityRooms()
        public
        view
        returns (CommunityRoom[] memory)
    {
        return allCommunityRooms;
    }

    function getCommunityCreator(
        string memory _communityName
    ) public view returns (address) {
        CommunityRoom storage room = communityRooms[_communityName];
        require(
            bytes(room.communityName).length > 0,
            "Community room does not exist!"
        );

        return room.createdBy;
    }

    function getCommunityRoomDetails(
        string memory _communityName
    )
        public
        view
        returns (
            string memory communityName,
            string memory communityImage,
            Bot memory bot,
            address createdBy,
            uint256 messageCount
        )
    {
        CommunityRoom storage room = communityRooms[_communityName];
        require(
            bytes(room.communityName).length > 0,
            "Community room does not exist!"
        );

        return (
            room.communityName,
            room.communityImage,
            room.bot,
            room.createdBy,
            room.messageIds.length
        );
    }
}
