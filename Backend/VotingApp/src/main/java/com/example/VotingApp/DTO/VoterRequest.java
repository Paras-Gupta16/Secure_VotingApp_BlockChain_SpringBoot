package com.example.VotingApp.DTO;

public class VoterRequest {

    public String getVoterWalletAddress() {
        return voterWalletAddress;
    }

    public void setVoterWalletAddress(String voterWalletAddress) {
        this.voterWalletAddress = voterWalletAddress;
    }

    private String voterWalletAddress;
}
