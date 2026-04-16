package com.example.VotingApp.DTO;

import java.math.BigInteger;

public record PollBoothRequest(String pollName,
                               BigInteger pollId) {
}
