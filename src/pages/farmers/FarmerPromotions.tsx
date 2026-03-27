import { Tag, Percent } from "lucide-react";

type Promotion = {
  id: string;
  title: string;
  discount: number;
  active: boolean;
};

const mockPromotions: Promotion[] = [
  { id: "1", title: "Harvest Sale", discount: 10, active: true },
  { id: "2", title: "Bulk Buyers Offer", discount: 15, active: false },
];

export default function FarmerPromotions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Tag size={20} />
          Promotions
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage discounts and offers
        </p>
      </div>

      <div className="grid gap-3">
        {mockPromotions.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-card"
          >
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Percent size={12} /> {p.discount}% discount
              </p>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded-full ${
                p.active
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {p.active ? "Active" : "Inactive"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}