package com.example.VotingApp.utility;

import java.math.BigInteger;

import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;

public class GasProvider {

    public static final BigInteger GAS_PRICE =
            BigInteger.valueOf(2_000_000_000L);

    public static final BigInteger GAS_LIMIT =
            BigInteger.valueOf(3_000_000L);

    public static ContractGasProvider get(){
        return new StaticGasProvider(GAS_PRICE, GAS_LIMIT);
    }
}
