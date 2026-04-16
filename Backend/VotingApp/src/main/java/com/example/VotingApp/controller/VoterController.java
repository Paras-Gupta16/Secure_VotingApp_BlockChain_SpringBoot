package com.example.VotingApp.controller;

import java.math.BigInteger;

import com.example.VotingApp.DTO.CandidateRequest;
import com.example.VotingApp.DTO.PollBoothRequest;
import com.example.VotingApp.DTO.VoterRequest;
import com.example.VotingApp.service.VoterService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/voter")
public class VoterController {

    private final VoterService voterService;

    public VoterController(VoterService voterService) {
        this.voterService = voterService;
    }

    // Register Voter
    @PostMapping("/add/voter")
    public ResponseEntity<?> addVoter(@RequestBody VoterRequest voterRequest) {

        try {

            String voterWalletAddress = voterRequest.getVoterWalletAddress();

            if (voterWalletAddress == null || voterWalletAddress.isEmpty()) {
                return ResponseEntity.badRequest().body("Wallet address cannot be empty");
            }

            return ResponseEntity.ok(
                    voterService.registerVoter(voterWalletAddress)
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(e.getMessage());
        }
    }

    // Add Candidate
    @PostMapping("/add/candidate")
    public ResponseEntity<?> addCandidate(@RequestBody CandidateRequest candidateRequest) {

        try {

            return ResponseEntity.ok(
                    voterService.addCandidate(
                            candidateRequest.candidateName(),
                            candidateRequest.candidateId()
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(e.getMessage());
        }
    }

    // Show Candidate List
    @GetMapping("/show/candidate-list")
    public ResponseEntity<?> showCandidateList() {

        try {

            return ResponseEntity.ok(
                    voterService.showListOfCandidates()
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(e.getMessage());
        }
    }

    // Add Poll Booth
    @PostMapping("/add/poll/booth")
    public ResponseEntity<?> addPollBooth(@RequestBody PollBoothRequest pollBoothRequest) {

        try {

            return ResponseEntity.ok(
                    voterService.addPollBooth(
                            pollBoothRequest.pollName(),
                            pollBoothRequest.pollId()
                    )
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(e.getMessage());
        }
    }

    // Show Poll Booths
    @GetMapping("/show/poll-booth")
    public ResponseEntity<?> showAllPollBooth() {

        try {

            return ResponseEntity.ok(
                    voterService.showListOfPollBooth()
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(e.getMessage());
        }
    }

    // Cast Vote
    @PostMapping("/do/vote")
    public ResponseEntity<?> doVoteNow(
            @RequestParam BigInteger pollId,
            @RequestParam BigInteger candidateId) {

        try {

            return ResponseEntity.ok(
                    voterService.doVote(pollId, candidateId)
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(e.getMessage());
        }
    }

    // Count Votes by Poll Booth
    @GetMapping("/count/vote")
    public ResponseEntity<?> countVotes(@RequestParam BigInteger pollId) {

        try {

            return ResponseEntity.ok(
                    voterService.countVoteOfPollId(pollId)
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(e.getMessage());
        }
    }

    // Count Votes by Candidate
    @GetMapping("/get/candidate/count")
    public ResponseEntity<?> getCandidateVotes(@RequestParam BigInteger candidateId) {

        try {

            return ResponseEntity.ok(
                    voterService.countVoteOfCandidate(candidateId)
            );

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(e.getMessage());
        }
    }
}