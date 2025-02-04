// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CommunityRoom.sol";

contract Athl3te {
    struct Activity {
        string activityDetails;
    }

    struct User {
        bool isRegistered;
        uint age;
        string gender;
        string name;
        uint weight;
        uint height;
        Activity[] activities;
    }

    mapping(address => User) private users;
    address[] public deployedCommunityRooms;

    event CommunityRoomCreated(address indexed roomAddress, address indexed createdBy);
    event ActivityAdded(address indexed user, string activityDetails);
    event UserRegistered(address indexed user, string name);

    function registerUser(string memory _name, uint256 _age, string memory _gender, uint256 _weight, uint256 _height) public {
        require(!users[msg.sender].isRegistered, "User already registered!");
        require(_age > 0, "Age must be greater than zero!");
        require(_weight > 0, "Weight must be greater than zero!");
        require(_height > 0, "Height must be greater than zero!");
        require(bytes(_name).length > 0, "Name cannot be empty!");
        require(bytes(_gender).length > 0, "Gender cannot be empty!");

        User storage newUser = users[msg.sender];
        newUser.isRegistered = true;
        newUser.age = _age;
        newUser.gender = _gender;
        newUser.name = _name;
        newUser.weight = _weight;
        newUser.height = _height;

        emit UserRegistered(msg.sender, _name);
    }

    function addActivity(string memory _activityDetails) public {
        require(users[msg.sender].isRegistered, "User not registered!");
        require(bytes(_activityDetails).length > 0, "Activity details cannot be empty!");

        users[msg.sender].activities.push(Activity(_activityDetails));
        emit ActivityAdded(msg.sender, _activityDetails);
    }

    function getUserDetails() public view returns (string memory, uint, string memory, uint, uint, string[] memory) {
        require(users[msg.sender].isRegistered, "User not registered!");
        
        User storage user = users[msg.sender];
        uint activityCount = user.activities.length;
        string[] memory activities = new string[](activityCount);

        for (uint i = 0; i < activityCount; i++) {
            activities[i] = user.activities[i].activityDetails;
        }

        return (user.name, user.age, user.gender, user.weight, user.height, activities);
    }

    function getUsername() public view returns (string memory) {
        require(users[msg.sender].isRegistered, "User not registered!");
        return users[msg.sender].name;
    }

    function getUserActivityCount() public view returns (uint) {
        require(users[msg.sender].isRegistered, "User not registered!");
        return users[msg.sender].activities.length;
    }

    function createCommunityRoom(string memory communityName, string memory communityLogo, string memory systemPrompt, uint256 assistantUnlockCost) public {
        require(bytes(communityName).length > 0, "Community name cannot be empty!");
        require(bytes(communityLogo).length > 0, "Community logo cannot be empty!");
        require(bytes(systemPrompt).length > 0, "System prompt cannot be empty!");

        CommunityRoom newRoom = new CommunityRoom(msg.sender, communityName, communityLogo, systemPrompt, assistantUnlockCost);
        deployedCommunityRooms.push(address(newRoom));

        emit CommunityRoomCreated(address(newRoom), msg.sender);
    }

    function getDeployedCommunityRooms() public view returns (address[] memory) {
        return deployedCommunityRooms;
    }
}
