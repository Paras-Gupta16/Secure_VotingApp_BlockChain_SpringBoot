package com.example.VotingApp.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

@Configuration
public class WebServer {

    @Value("${ethereum.node.url}")
    private String serverUrl;
    @Bean
    public Web3j web3j(){
        return Web3j.build(new HttpService(serverUrl));
    }
}
