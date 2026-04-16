package com.example.VotingApp.service;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.VotingApp.configuration.WalletConfiguration;
import com.example.VotingApp.utility.GasProvider;
import com.example.contract.Voter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple2;

@Service
public class VoterService {

    @Value("${contract.address}")
    private String contractAddress;

    @Autowired
    private Web3j web3j;

    @Autowired
    private WalletConfiguration walletConfiguration;

    private Voter loadContract() {
        return Voter.load(
                contractAddress,
                web3j,
                walletConfiguration.credentials(),
                GasProvider.get()
        );
    }

    // Register Voter
    public String registerVoter(String voterAddress) throws Exception {
        loadContract().registerVoter(voterAddress).send();
        return "Voter Registered Successfully";
    }

    // Add Candidate
    public String addCandidate(String candidateName, BigInteger candidateId) throws Exception {
        loadContract().addCandidate(candidateName, candidateId).send();
        return "Candidate Added Successfully";
    }

    // Show Candidates
    public Map<String, Object> showListOfCandidates() throws Exception {

        Tuple2<List<String>, List<BigInteger>> result =
                loadContract().showCandidateList().send();

        Map<String, Object> response = new HashMap<>();
        response.put("names", result.getValue1());
        response.put("ids", result.getValue2());

        return response;
    }

    // Add Poll Booth
    public String addPollBooth(String pollName, BigInteger pollId) throws Exception {
        loadContract().createPollBooth(pollName, pollId).send();
        return "Poll Booth Added Successfully";
    }

    // Show Poll Booths
    public Map<String, Object> showListOfPollBooth() throws Exception {

        Tuple2<List<String>, List<BigInteger>> result =
                loadContract().showPollBooths().send();

        Map<String, Object> response = new HashMap<>();
        response.put("names", result.getValue1());
        response.put("ids", result.getValue2());

        return response;
    }

    // Cast Vote
    public String doVote(BigInteger pollId, BigInteger candidateId) throws Exception {

        TransactionReceipt receipt =
                loadContract().vote(pollId, candidateId).send();

        return "Vote Cast Successfully. Tx Hash: " + receipt.getTransactionHash();
    }

    // Count Votes in Poll Booth
    public BigInteger countVoteOfPollId(BigInteger pollId) throws Exception {
        return loadContract().voteCount_Particular(pollId).send();
    }

    // Count Votes of Candidate
    public BigInteger countVoteOfCandidate(BigInteger candidateId) throws Exception {
        return loadContract().getCandidateVotes(candidateId).send();
    }
}