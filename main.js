const rpcUrl = "https://greatest-solitary-seed.quiknode.pro/624c1fa77a92f1db1549ba3246d4d06c4afd7e79/";
const walletAddress = "0x2a63E334e71Cb80B857D4b5821e673C73Ce18a68";

async function fetchBlockNumber() {
  const payload = {
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
    id: 1
  };

  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (data.result) {
    const block = parseInt(data.result, 16);
    document.getElementById("blockNumber").innerText = `⛓️ Block Number: ${block}`;
  } else {
    document.getElementById("blockNumber").innerText = "⛓️ Block Number: Error";
  }
}

async function fetchBalance() {
  const payload = {
    jsonrpc: "2.0",
    method: "eth_getBalance",
    params: [walletAddress, "latest"],
    id: 2
  };

  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (data.result) {
    const balanceEth = parseInt(data.result, 16) / 1e18;
    document.getElementById("balance").innerText = `💰 Balance: ${balanceEth.toFixed(4)} ETH`;
  } else {
    document.getElementById("balance").innerText = "💰 Balance: Error";
  }
}

async function fetchGasPrice() {
  const payload = {
    jsonrpc: "2.0",
    method: "eth_gasPrice",
    params: [],
    id: 3
  };

  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (data.result) {
    const gasGwei = parseInt(data.result, 16) / 1e9;
    document.getElementById("gasPrice").innerText = `⛽ Gas Price: ${gasGwei.toFixed(2)} Gwei`;
  } else {
    document.getElementById("gasPrice").innerText = "⛽ Gas Price: Error";
  }
}

async function initDashboard() {
  await fetchBlockNumber();
  await fetchBalance();
  await fetchGasPrice();
}

setInterval(initDashboard, 15000); // Update tiap 15 detik
window.onload = initDashboard;
