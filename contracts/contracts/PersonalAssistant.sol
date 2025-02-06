// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PersonalAssistant {
    struct Message {
        string text;
        address userAddress; //set address(0) for AI responses
        string ipfsImageUrl;
        uint256 timestamp;
    }

    address public owner;
    string public communityName;
    string public communityLogo;
    string private systemPrompt;
    Message[] private messages;

    event MessageSent(address indexed user, string text, string ipfsImageUrl, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can interact with the assistant.");
        _;
    }

    constructor(address _owner, string memory _systemPrompt, string memory _communityName, string memory _communityLogo) {
        owner = _owner;
        systemPrompt = _systemPrompt;
        communityName = _communityName;
        communityLogo = _communityLogo;
    }

    function sendMessage(string memory _text, string memory _imageUrl) public onlyOwner {
        Message memory newMessage = Message(_text, msg.sender, _imageUrl, block.timestamp);
        messages.push(newMessage);
        emit MessageSent(msg.sender, _text, _imageUrl, block.timestamp);
    }

    function aiSendMessage(string memory _text, string memory _imageUrl) public onlyOwner {
        Message memory newMessage = Message(_text, address(0), _imageUrl, block.timestamp);
        messages.push(newMessage);
        emit MessageSent(address(0), _text, _imageUrl, block.timestamp);
    }

    function getMessages() public view onlyOwner returns (Message[] memory) {
        return messages;
    }
}
