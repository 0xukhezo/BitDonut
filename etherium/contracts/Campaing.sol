// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract CampaingFactory{
    Campaing[] public deployedCampaings;

    function createCampaing(uint minimal) public{
        Campaing newCampaing = new Campaing(minimal, msg.sender);
        deployedCampaings.push(newCampaing);
    }

    function getDeployedCampaing() public view returns(Campaing[] memory){
        return deployedCampaings;
    }
}

contract Campaing{
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        mapping (address => bool) approvals;
        uint approvalCount;
    }
    
    address public manager;
    uint public minimumContribution;
    uint public balance;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    uint numRequests;
    mapping (uint => Request) public requests;

    constructor(uint minimal, address creator){
        manager = creator;
        minimumContribution = minimal;
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function contribute() public payable{
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string calldata description, uint value, address payable recipient) public restricted {
       Request storage newRequest = requests[numRequests];

       numRequests ++;

       newRequest.description = description;
       newRequest.value = value;
       newRequest.recipient = recipient;
       newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public{
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary()public view returns(uint, uint, uint, address){
        return(
            approversCount,
            minimumContribution,
            numRequests,
            manager
        );
    }

     function getRequestCount()public view returns(uint){
        return(
            numRequests
        );
    }
}