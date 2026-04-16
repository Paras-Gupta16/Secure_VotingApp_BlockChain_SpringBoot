const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Voter Smart Contract", function () {
  let Voter, voter, accounts;

  beforeEach(async function () {
    Voter = await ethers.getContractFactory("voter");
    voter = await Voter.deploy();
    accounts = await ethers.getSigners();
  });

  describe("Candidate Registration", function () {

    it("should register a new candidate", async function () {
      await voter.addCandidate("Paras", 1);

      const [names, ids] = await voter.showCandidateList();

      expect(names[0]).to.equal("Paras");
      expect(Number(ids[0])).to.equal(1);
    });

    it("should revert on duplicate candidate ID", async function () {
      await voter.addCandidate("Paras", 1);

      await expect(
        voter.addCandidate("Alice", 1)
      ).to.be.revertedWith("Candidate already exists");
    });

    it("should register multiple candidates", async function () {

      await voter.addCandidate("Paras", 1);
      await voter.addCandidate("Alice", 2);
      await voter.addCandidate("Bob", 3);

      const [names, ids] = await voter.showCandidateList();

      expect(names).to.deep.equal(["Paras", "Alice", "Bob"]);
      expect(ids.map(Number)).to.deep.equal([1, 2, 3]);
    });

  });


  describe("Poll Booth Management", function () {

    it("should create a poll booth", async function () {

      await voter.createPollBooth("Election 2025", 10);

      const [names, ids] = await voter.showPollBooths();

      expect(names[0]).to.equal("Election 2025");
      expect(Number(ids[0])).to.equal(10);

    });

    it("should revert duplicate poll booth", async function () {

      await voter.createPollBooth("Poll 1", 1);

      await expect(
        voter.createPollBooth("Poll 2", 1)
      ).to.be.revertedWith("Poll booth already exists");

    });

  });


  describe("Voting Process", function () {

    beforeEach(async function () {

      await voter.createPollBooth("Election 2025", 10);
      await voter.registerVoter(accounts[1].address);
      await voter.registerVoter(accounts[2].address);
      await voter.registerVoter(accounts[3].address);

    });

    it("should allow registered voters to vote", async function () {

      await voter.connect(accounts[1]).vote(10);
      await voter.connect(accounts[2]).vote(10);

      const count = await voter.voteCount_Particular(10);

      expect(count).to.equal(2);

    });

    it("should revert if voter is not registered", async function () {

      await expect(
        voter.connect(accounts[4]).vote(10)
      ).to.be.revertedWith("Not a registered voter");

    });

    it("should revert if voter votes twice in same poll", async function () {

      await voter.connect(accounts[1]).vote(10);

      await expect(
        voter.connect(accounts[1]).vote(10)
      ).to.be.revertedWith("Already voted in this poll");

    });

  });

  describe("Integrated Flow", function () {

    it("should complete full process", async function () {

      await voter.createPollBooth("Election 2025", 10);
      await voter.registerVoter(accounts[1].address);
      await voter.registerVoter(accounts[2].address);
      await voter.registerVoter(accounts[3].address);
      await voter.connect(accounts[1]).vote(10);
      await voter.connect(accounts[2]).vote(10);
      await voter.connect(accounts[3]).vote(10);

      const count = await voter.voteCount_Particular(10);

      expect(count).to.equal(3);

    });

    it("should revert if poll does not exist", async function () {

      await voter.registerVoter(accounts[1].address);

      await expect(
        voter.connect(accounts[1]).vote(99)
      ).to.be.revertedWith("Poll booth does not exist");

    });

  });

});