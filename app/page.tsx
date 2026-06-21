import AccountConsole from "./accounts/account-console";
import LoginPanel from "./accounts/login-panel";
import { accounts, publicUser, users } from "./lib/data";
import { currentUser } from "./lib/session";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="shell">
      <section className="masthead" aria-labelledby="title">
        <div>
          <p className="eyebrow">BoLD fixture / App 2</p>
          <h1 id="title">Nested owner signal</h1>
          <p className="lede">
            A compact account console where ownership is hidden in a renamed nested field:
            <code> data.account.holderId</code>.
          </p>
        </div>
        <div className="contract">
          <span>GET</span>
          <code>/api/accounts/[id]</code>
        </div>
      </section>

      <section className="grid">
        <LoginPanel initialUser={user ? publicUser(user) : null} demoUsers={users.map(publicUser)} />
        <AccountConsole accounts={accounts} />
      </section>
    </main>
  );
}
