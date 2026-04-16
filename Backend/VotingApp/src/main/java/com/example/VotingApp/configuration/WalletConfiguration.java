package com.example.VotingApp.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.crypto.Credentials;

@Configuration
public class WalletConfiguration {

    @Value("${wallet.private.key}")
    private String privateKey;
    @Bean
    public Credentials credentials(){
        return Credentials.create(privateKey);
    }
}
