import React from "react";
import "./navbar.css";
import healthReport from "../../assets/health-report.png";
import Blockies from "react-blockies";
import config from "../../config.json";

const Navbar = ({ provider, account, balance, chainId, loadAccount }) => {
  const connectHandler = async () => {
    await loadAccount(provider);
  };

  const networkHandler = async (e) => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: e.target.value }],
    });
  };

  return (
    <div className="Navbar">
      <div className="nav__name">
        <img src={healthReport} alt="" width="40" height="40" />
        <h2>MedVault</h2>
      </div>
      <div className="nav__networkSelector">
        <select
          name="network"
          id="network"
          onChange={networkHandler}
          value={config[chainId] ? `0x${chainId.toString(16)}` : `0`}
        >
          <option value="0" disabled>Select Network</option>
          <option value="31337">Localhost</option>
          <option value="11155111">Sepolia</option>
        </select>
      </div>
      <div className="nav__balance">
        {balance ? (
          <p className="nav__myBalance">
            <small>My Balance: </small>
            {Number(balance).toFixed(4)}
          </p>
        ) : (
          <p className="nav__myBalance">
            <small>My Balance: </small>
            0ETH
          </p>
        )}
        {account ? (
          <a className="nav__myAccount" href="#">
            {account.slice(0, 5) + "...." + account.slice(38, 42)}
            <Blockies
              seed={account}
              size={10}
              scale={3}
              color="#2187D0"
              bgColor="#F1F2F9"
              spotColor="#767F92"
              className="identicon"
            />
          </a>
        ) : (
          <button className="nav__balance-box" onClick={connectHandler}>
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
