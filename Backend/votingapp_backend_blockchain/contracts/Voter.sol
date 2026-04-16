// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract voter {


    // ---------------- VOTER REGISTRATION ----------------

    mapping(address => bool) public registeredVoters;

    function registerVoter(address voterAddress) public {
        require(!registeredVoters[voterAddress], "Voter already registered");
        registeredVoters[voterAddress] = true;
    }

    // ---------------- CANDIDATE SECTION ----------------

    mapping(string => uint) public candidateList;
    string[] public candidateRegisterName;
    mapping(uint => bool) public idExist;

    function addCandidate(string memory nameCandidate, uint candidateId) public {
        require(!idExist[candidateId], "Candidate already exists");

        candidateList[nameCandidate] = candidateId;
        idExist[candidateId] = true;
        candidateRegisterName.push(nameCandidate);
    }

    function showCandidateList()
        public
        view
        returns (string[] memory, uint[] memory)
    {
        uint length = candidateRegisterName.length;
        uint[] memory idx = new uint[](length);

        for (uint i = 0; i < length; i++) {
            idx[i] = candidateList[candidateRegisterName[i]];
        }

        return (candidateRegisterName, idx);
    }

    

    // ---------------- POLL BOOTH SECTION ----------------

    struct PollBooth {
        string name;
        uint id;
        bool exists;
    }

    mapping(uint => PollBooth) public pollBooths;
    string[] public pollNames;
    uint[] public pollIds;

    function createPollBooth(string memory pollName, uint pollid) public {
        require(!pollBooths[pollid].exists, "Poll booth already exists");

        pollBooths[pollid] = PollBooth(pollName, pollid, true);
        pollNames.push(pollName);
        pollIds.push(pollid);
    }

    function showPollBooths()
        public
        view
        returns (string[] memory, uint[] memory)
    {
        return (pollNames, pollIds);
    }

    // ---------------- VOTING SECTION ----------------

    mapping(address => mapping(uint => bool)) public votes;
    mapping(uint => uint) public voteCount;
    mapping(uint => uint) public candidateVoteCount;

    function vote(uint pollId, uint candidateId) public {

    // require(registeredVoters[msg.sender], "Not a registered voter");
    require(pollBooths[pollId].exists, "Poll booth does not exist");
    require(idExist[candidateId], "Candidate does not exist");
    require(!votes[msg.sender][pollId], "Already voted in this poll");

    votes[msg.sender][pollId] = true;

    voteCount[pollId]++;
    candidateVoteCount[candidateId]++;
}

    function voteCount_Particular(uint pollId)
        public
        view
        returns (uint)
    {
        return voteCount[pollId];
    }
        
        // function to count the candidate votes 

    function getCandidateVotes(uint candidateId) public view returns(uint){
    require(idExist[candidateId], "Candidate does not exist");
    return candidateVoteCount[candidateId];
}
}