"use client";

import { useState } from "react";
import type { Account } from "../lib/data";

export default function AccountConsole({ accounts }: { accounts: Account[] }) {
  const [accountId, setAccountId] = useState(accounts[0]?.id || "");
  const [result, setResult] = useState("No request sent yet.");
  const [status, setStatus] = useState("idle");

  async function fetchAccount(id = accountId) {
    setAccountId(id);
    setStatus("loading");
    const response = await fetch(`/api/accounts/${encodeURIComponent(id)}`);
    const text = await response.text();

    try {
      setResult(JSON.stringify(JSON.parse(text), null, 2));
    } catch {
      setResult(text);
    }

    setStatus(`${response.status} ${response.statusText}`);
  }

  return (
    <section className="panel wide">
      <div className="panelHeader row">
        <div>
          <p className="kicker">Probe</p>
          <h2>Account lookup</h2>
        </div>
        <span className="status">{status}</span>
      </div>

      <div className="lookup">
        <label>
          Account ID
          <input value={accountId} onChange={(event) => setAccountId(event.target.value)} />
        </label>
        <button className="button" onClick={() => fetchAccount()} type="button">
          Fetch account
        </button>
      </div>

      <div className="chips" aria-label="Seed accounts">
        {accounts.map((account) => (
          <button key={account.id} type="button" onClick={() => fetchAccount(account.id)}>
            {account.id} · {account.holderId}
          </button>
        ))}
      </div>

      <pre className="response">{result}</pre>
    </section>
  );
}
