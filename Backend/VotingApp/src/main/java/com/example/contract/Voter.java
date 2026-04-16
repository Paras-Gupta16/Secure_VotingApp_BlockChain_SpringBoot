package com.example.contract;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple2;
import org.web3j.tuples.generated.Tuple3;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 4.10.0.
 */
@SuppressWarnings("rawtypes")
public class Voter extends Contract {
    public static final String BINARY = "Bin file was not provided";

    public static final String FUNC_ADDCANDIDATE = "addCandidate";

    public static final String FUNC_CANDIDATELIST = "candidateList";

    public static final String FUNC_CANDIDATEREGISTERNAME = "candidateRegisterName";

    public static final String FUNC_CANDIDATEVOTECOUNT = "candidateVoteCount";

    public static final String FUNC_CREATEPOLLBOOTH = "createPollBooth";

    public static final String FUNC_GETCANDIDATEVOTES = "getCandidateVotes";

    public static final String FUNC_IDEXIST = "idExist";

    public static final String FUNC_POLLBOOTHS = "pollBooths";

    public static final String FUNC_POLLIDS = "pollIds";

    public static final String FUNC_POLLNAMES = "pollNames";

    public static final String FUNC_REGISTERVOTER = "registerVoter";

    public static final String FUNC_REGISTEREDVOTERS = "registeredVoters";

    public static final String FUNC_SHOWCANDIDATELIST = "showCandidateList";

    public static final String FUNC_SHOWPOLLBOOTHS = "showPollBooths";

    public static final String FUNC_VOTE = "vote";

    public static final String FUNC_VOTECOUNT = "voteCount";

    public static final String FUNC_VOTECOUNT_PARTICULAR = "voteCount_Particular";

    public static final String FUNC_VOTES = "votes";

    @Deprecated
    protected Voter(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Voter(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Voter(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Voter(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<TransactionReceipt> addCandidate(String nameCandidate, BigInteger candidateId) {
        final Function function = new Function(
                FUNC_ADDCANDIDATE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(nameCandidate), 
                new org.web3j.abi.datatypes.generated.Uint256(candidateId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> candidateList(String param0) {
        final Function function = new Function(FUNC_CANDIDATELIST, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> candidateRegisterName(BigInteger param0) {
        final Function function = new Function(FUNC_CANDIDATEREGISTERNAME, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> candidateVoteCount(BigInteger param0) {
        final Function function = new Function(FUNC_CANDIDATEVOTECOUNT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> createPollBooth(String pollName, BigInteger pollid) {
        final Function function = new Function(
                FUNC_CREATEPOLLBOOTH, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(pollName), 
                new org.web3j.abi.datatypes.generated.Uint256(pollid)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> getCandidateVotes(BigInteger candidateId) {
        final Function function = new Function(FUNC_GETCANDIDATEVOTES, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(candidateId)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Boolean> idExist(BigInteger param0) {
        final Function function = new Function(FUNC_IDEXIST, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<Tuple3<String, BigInteger, Boolean>> pollBooths(BigInteger param0) {
        final Function function = new Function(FUNC_POLLBOOTHS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}, new TypeReference<Bool>() {}));
        return new RemoteFunctionCall<Tuple3<String, BigInteger, Boolean>>(function,
                new Callable<Tuple3<String, BigInteger, Boolean>>() {
                    @Override
                    public Tuple3<String, BigInteger, Boolean> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple3<String, BigInteger, Boolean>(
                                (String) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue(), 
                                (Boolean) results.get(2).getValue());
                    }
                });
    }

    public RemoteFunctionCall<BigInteger> pollIds(BigInteger param0) {
        final Function function = new Function(FUNC_POLLIDS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> pollNames(BigInteger param0) {
        final Function function = new Function(FUNC_POLLNAMES, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> registerVoter(String voterAddress) {
        final Function function = new Function(
                FUNC_REGISTERVOTER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, voterAddress)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Boolean> registeredVoters(String param0) {
        final Function function = new Function(FUNC_REGISTEREDVOTERS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<Tuple2<List<String>, List<BigInteger>>> showCandidateList() {
        final Function function = new Function(FUNC_SHOWCANDIDATELIST, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<Utf8String>>() {}, new TypeReference<DynamicArray<Uint256>>() {}));
        return new RemoteFunctionCall<Tuple2<List<String>, List<BigInteger>>>(function,
                new Callable<Tuple2<List<String>, List<BigInteger>>>() {
                    @Override
                    public Tuple2<List<String>, List<BigInteger>> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple2<List<String>, List<BigInteger>>(
                                convertToNative((List<Utf8String>) results.get(0).getValue()), 
                                convertToNative((List<Uint256>) results.get(1).getValue()));
                    }
                });
    }

    public RemoteFunctionCall<Tuple2<List<String>, List<BigInteger>>> showPollBooths() {
        final Function function = new Function(FUNC_SHOWPOLLBOOTHS, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<Utf8String>>() {}, new TypeReference<DynamicArray<Uint256>>() {}));
        return new RemoteFunctionCall<Tuple2<List<String>, List<BigInteger>>>(function,
                new Callable<Tuple2<List<String>, List<BigInteger>>>() {
                    @Override
                    public Tuple2<List<String>, List<BigInteger>> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple2<List<String>, List<BigInteger>>(
                                convertToNative((List<Utf8String>) results.get(0).getValue()), 
                                convertToNative((List<Uint256>) results.get(1).getValue()));
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> vote(BigInteger pollId, BigInteger candidateId) {
        final Function function = new Function(
                FUNC_VOTE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(pollId), 
                new org.web3j.abi.datatypes.generated.Uint256(candidateId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> voteCount(BigInteger param0) {
        final Function function = new Function(FUNC_VOTECOUNT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> voteCount_Particular(BigInteger pollId) {
        final Function function = new Function(FUNC_VOTECOUNT_PARTICULAR, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(pollId)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Boolean> votes(String param0, BigInteger param1) {
        final Function function = new Function(FUNC_VOTES, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, param0), 
                new org.web3j.abi.datatypes.generated.Uint256(param1)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    @Deprecated
    public static Voter load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Voter(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Voter load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Voter(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Voter load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new Voter(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Voter load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new Voter(contractAddress, web3j, transactionManager, contractGasProvider);
    }
}
