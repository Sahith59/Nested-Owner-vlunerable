export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
};

export type Account = {
  id: string;
  holderId: string;
  label: string;
  tier: "starter" | "growth" | "enterprise";
  balance: number;
  currency: "USD";
  openedAt: string;
  riskState: "clear" | "watch" | "review";
  region: string;
  contacts: Array<{
    name: string;
    email: string;
    kind: "billing" | "technical" | "security";
  }>;
  privateNote: string;
};

export const users: User[] = [
  {
    id: "usr_101",
    email: "maya@bold.test",
    password: "demo1234",
    name: "Maya Chen",
    role: "Account Owner"
  },
  {
    id: "usr_202",
    email: "liam@bold.test",
    password: "demo1234",
    name: "Liam Brooks",
    role: "Finance Lead"
  },
  {
    id: "usr_303",
    email: "sofia@bold.test",
    password: "demo1234",
    name: "Sofia Rivera",
    role: "Support Manager"
  }
];

export const accounts: Account[] = [
  {
    id: "acct_northstar_001",
    holderId: "usr_101",
    label: "Northstar Launch Account",
    tier: "growth",
    balance: 4820.4,
    currency: "USD",
    openedAt: "2026-05-18T13:24:00.000Z",
    riskState: "clear",
    region: "US Central",
    contacts: [
      { name: "Maya Chen", email: "maya@bold.test", kind: "billing" },
      { name: "Priya Shah", email: "priya.ops@northstar.example", kind: "technical" }
    ],
    privateNote: "Renewal is tied to the launch program budget. Keep account details owner-scoped."
  },
  {
    id: "acct_ledger_202",
    holderId: "usr_202",
    label: "Ledger Review Account",
    tier: "enterprise",
    balance: 18750,
    currency: "USD",
    openedAt: "2026-04-02T09:10:00.000Z",
    riskState: "watch",
    region: "US Midwest",
    contacts: [
      { name: "Liam Brooks", email: "liam@bold.test", kind: "billing" },
      { name: "Avery Morgan", email: "security@ledger.example", kind: "security" }
    ],
    privateNote: "Contains procurement and security review context. Cross-account access must be blocked in real systems."
  },
  {
    id: "acct_summit_303",
    holderId: "usr_303",
    label: "Summit Support Account",
    tier: "starter",
    balance: 315.75,
    currency: "USD",
    openedAt: "2026-06-03T17:45:00.000Z",
    riskState: "review",
    region: "US Mountain",
    contacts: [
      { name: "Sofia Rivera", email: "sofia@bold.test", kind: "technical" }
    ],
    privateNote: "Manual review pending after contact update."
  }
];

export function findUserByEmail(email: string) {
  return users.find((user) => user.email === email.toLowerCase());
}

export function findUserById(id: string) {
  return users.find((user) => user.id === id);
}

export function findAccountById(id: string) {
  return accounts.find((account) => account.id === id);
}

export function publicUser(user: User) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };
}
