import Web3 from 'web3';

export class Athl3teContractUtils {
  constructor(contractAddress, abi, web3Instance = null) {
    this.web3 = web3Instance || new Web3(Web3.givenProvider);
    this.contract = new this.web3.eth.Contract(abi, contractAddress);
  }

  async getAccount() {
    const accounts = await this.web3.eth.requestAccounts();
    return accounts[0];
  }

  async mintNFT(uri) {
    const account = await this.getAccount();
    return this.contract.methods.mintNftWithUri(uri)
      .send({ from: account });
  }

  async registerUser(metadata) {
    const account = await this.getAccount();
    return this.contract.methods.registerUser(metadata)
      .send({ from: account });
  }

  async addActivity(activityId) {
    const account = await this.getAccount();
    return this.contract.methods.addActivity(activityId)
      .send({ from: account });
  }

  async addGoal(goalId, goalType) {
    if (!['nutrition', 'sport'].includes(goalType)) {
      throw new Error('Goal type must be either "nutrition" or "sport"');
    }
    const account = await this.getAccount();
    return this.contract.methods.addGoal(goalId, goalType)
      .send({ from: account });
  }

  async addCommunityGoal(communityName, goalId) {
    const account = await this.getAccount();
    return this.contract.methods.addCommunityGoal(communityName, goalId)
      .send({ from: account });
  }

  async buyBot(botName) {
    const account = await this.getAccount();
    // Get bot details first to know the cost
    const botDetails = await this.contract.methods.getBotDetails(botName).call();
    const costInWei = this.web3.utils.toWei(
      this.web3.utils.fromWei(botDetails.unlockCostInGWei.toString(), 'gwei'),
      'wei'
    );
    
    return this.contract.methods.buyBot(botName)
      .send({ 
        from: account,
        value: costInWei
      });
  }

  async updateInjury(injuryId) {
    const account = await this.getAccount();
    return this.contract.methods.updateInjury(injuryId)
      .send({ from: account });
  }

  async createCommunityRoom(communityName, botName) {
    const account = await this.getAccount();
    return this.contract.methods.createCommunityRoom(communityName, botName)
      .send({ from: account });
  }

  async joinCommunityRoom(communityName) {
    const account = await this.getAccount();
    return this.contract.methods.joinCommunityRoom(communityName)
      .send({ from: account });
  }

//   async createBot(
//     botName,
//     systemPrompt,
//     botDescription,
//     deploymentURL,
//     unlockCostInGWei
//   ) {
//     const account = await this.getAccount();
//     return this.contract.methods.createBot(
//       botName,
//       systemPrompt,
//       botDescription,
//       deploymentURL,
//       unlockCostInGWei
//     ).send({ from: account });
//   }
}

// Example usage:
/*
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = [...]; // Your contract ABI

// Initialize with Web3 instance from MetaMask
const web3 = new Web3(window.ethereum);
const athl3teUtils = new Athl3teContractUtils(contractAddress, contractABI, web3);

// Register a new user
try {
  const metadata = JSON.stringify({ name: "John Doe", email: "john@example.com" });
  const result = await athl3teUtils.registerUser(metadata);
  console.log("User registered:", result.transactionHash);
} catch (error) {
  console.error("Error registering user:", error);
}

// Subscribe to events
athl3teUtils.subscribeToUserRegistered((data) => {
  console.log('New user registered:', data);
});
*/