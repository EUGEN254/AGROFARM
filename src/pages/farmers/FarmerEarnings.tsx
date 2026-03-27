import { Wallet } from "lucide-react";

type Earning = {
  id: string;
  source: string;
  amount: number;
};

const mockEarnings: Earning[] = [
  { id: "1", source: "Tomatoes", amount: 12000 },
  { id: "2", source: "Maize", amount: 8000 },
];

export default function FarmerEarnings() {
  const total = mockEarnings.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Wallet size={20} />
          Earnings
        </h1>
        <p className="text-sm text-muted-foreground">
          Revenue overview
        </p>
      </div>

      <div className="p-4 border rounded-lg bg-card">
        <p className="text-sm text-muted-foreground">Total Earnings</p>
        <p className="text-2xl font-bold">KSh {total}</p>
      </div>

      <div className="grid gap-3">
        {mockEarnings.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-card"
          >
            <p className="font-medium">{e.source}</p>
            <p className="font-semibold">KSh {e.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}