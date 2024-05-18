// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();
// const privateKeys = process.env.PRIVATE_KEYS || "";
// const goerliApiKey = process.env.GOERLI_API_KEY;
// const mumbaiApiKey = process.env.MUMBAI_API_KEY;
// module.exports = {
//   solidity: "0.8.18",
//   networks: {
//     localhost: {},
//     goerli: {
//       url: goerliApiKey,
//       accounts: privateKeys.split(","),
//     },
//     mumbai: {
//       url: mumbaiApiKey,
//       accounts: privateKeys.split(","),
//     },
//   },
// };

// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.24",
// };
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { sepolia_url, private_key } = process.env;

module.exports = {
  solidity: "0.8.11",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: sepolia_url,
      accounts: [`0x${private_key}`]
    }
  },
}
