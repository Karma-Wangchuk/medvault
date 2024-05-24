import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../App.css";
import Data from "./Data/Data";
import Form from "./Form/Form";
import Navbar from "./Navbar/Navbar";
import Option from "./Option/Option";
import Alert from "./Alert/Alert";
import config from "../config.json";
import { ethers } from "ethers";
import abi from "../abis/MedicalRecords.json";

function App() {
  const [state, setState] = useState({
    provider: null,
    account: null,
    contract: null,
    balance: null,
    chainId: null,


  })

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x80bd53D33586A2869Fb22B4506F3e7d9df86a4Ca";
      // const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI = abi.abi;

      //Metamask Connection
      //1. for transaction on sepolia testnets
      //2. consists of alchemy api which actually help in connecting to the blockchain network

      if (!window.ethereum) {
        alert("Install Metamask");
        return;
      }

      const { ethereum } = window;
      //3. Define provider and signer that will help connect with the blockchain
      //will be used to read from the blockchain
      const provider = new ethers.providers.Web3Provider(ethereum);

      //Define signer that will help in transaction to change the blockchain state
      // will be used to write to the blockchain

      const signer = provider.getSigner();

      //4. Create the instance of the contract communicate wiht the smart contract
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      console.log(contract);
      //invoke metamask wallet
      const account = await ethereum.request({
        method: "eth_requestAccounts",
      });

      window.ethereum.on("Account changed", () => {
        window.location.reload();
      });

      const network = await provider.getNetwork();
      const chainId = network.chainId;

        const accounts = await provider.send("eth_requestAccounts", []);
        // setAccount(accounts[0]);
    
        const balance = await provider.getBalance(accounts[0]);
        // setBalance(ethers.utils.formatEther(balance));

      setState({ provider, signer, contract, chainId, balance, account: accounts[0] });
      // await loadAccount(provider);
      // setAccount(account);
    };
    template();
  }, []);


  return (
    <div className="App">
      <div className="navbar">
        <Navbar
          provider={state.provider}
          account={state.account}
          balance={state.balance}
          chainId={state.chainId}
          // loadAccount={loadAccount}
        />
        <Option />
        <Routes>
          <Route path="/" exact element={<Form state={state}/>} />
          <Route path="/Data" element={<Data state={state} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
