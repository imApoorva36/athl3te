// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./PersonalAssistant.sol";

contract CommunityRoom {

    struct Message {
        string text;
        address userAddress;
        string ipfsImageUrl;
        uint256 timestamp;
    }

    address public createdBy;
    mapping(address => bool) private members;
    mapping(address => bool) private membersWithPersonalAssistants;
    uint256 public assistantUnlockCostInEth;

    Message[] private messages;
    
    string public communityName;
    string public communityLogo;
    string public systemPrompt;

    address[] private deployedPersonalAssistants;

    event MessageSent(address indexed user, string text, string ipfsImageUrl, uint256 timestamp);
    event MemberJoined(address indexed user);
    event MemberLeft(address indexed user);

    event PersonalAssistantUnlocked(address indexed user, address indexed assistantAddress);

    modifier onlyMembers() {
        require(members[msg.sender], "Only members can send messages");
        _;
    }

    constructor(address _creator, string memory _communityName, string memory _communityLogo, string memory _systemPrompt, uint256 _assistantUnlockCost) {
        createdBy = _creator;
        communityName = _communityName;
        communityLogo = _communityLogo;
        systemPrompt = _systemPrompt;
        members[_creator] = true; 
        assistantUnlockCostInEth = _assistantUnlockCost;
    }

    function joinCommunity() public {
        require(!members[msg.sender], "User is already a member");
        members[msg.sender] = true;
        emit MemberJoined(msg.sender);
    }

    function leaveCommunity() public {
        require(members[msg.sender], "User is not a member");
        members[msg.sender] = false;
        emit MemberLeft(msg.sender);
    }

    function userSendMessage(string memory _text, string memory _ipfsImageUrl) public onlyMembers {
        messages.push(Message(_text, msg.sender, _ipfsImageUrl, block.timestamp));
        emit MessageSent(msg.sender, _text, _ipfsImageUrl, block.timestamp);
    }

    function aiSendMessage(string memory _text, string memory _ipfsImageUrl) public {
        messages.push(Message(_text, address(0), _ipfsImageUrl, block.timestamp));
        emit MessageSent(address(0), _text, _ipfsImageUrl, block.timestamp);
    }

    function getMessages() public view returns (Message[] memory) {
        return messages;
    }

    function getMemberStatus(address _user) public view returns (bool) {
        return members[_user];
    }

    function unlockPersonalAssistant() public payable {
        require(!members[msg.sender], "User is not a member of the community.");
        require(!membersWithPersonalAssistants[msg.sender], "User already has a personal assistant.");
        require(msg.value == assistantUnlockCostInEth, "Incorrect payment amount.");


        // amount received would u sent over to the creator of the community room
        payable(createdBy).transfer(msg.value);

        PersonalAssistant newAssistant = new PersonalAssistant(msg.sender, systemPrompt, communityName, communityLogo);    
        deployedPersonalAssistants.push(address(newAssistant));
        membersWithPersonalAssistants[msg.sender] = true;

        emit PersonalAssistantUnlocked(msg.sender, address(newAssistant));
    }

    function getDeployedPersonalAssistants() public view returns (address[] memory) {
        return deployedPersonalAssistants;
    }
}