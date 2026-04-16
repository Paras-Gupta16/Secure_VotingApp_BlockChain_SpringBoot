package com.example.VotingApp.DTO;

import java.math.BigInteger;

public record CandidateRequest(String candidateName,
                               BigInteger candidateId) {
}
