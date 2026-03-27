import { Truck } from "lucide-react";

type Delivery = {
  id: string;
  order: string;
  status: "pending" | "in-transit" | "delivered";
};

const mockDeliveries: Delivery[] = [
  { id: "1", order: "Order #101", status: "pending" },
  { id: "2", order: "Order #102", status: "in-transit" },
  { id: "3", order: "Order #103", status: "delivered" },
];

export default function FarmerDeliveries() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Truck size={20} />
          Deliveries
        </h1>
        <p className="text-sm text-muted-foreground">
          Track shipment progress
        </p>
      </div>

      <div className="grid gap-3">
        {mockDeliveries.map((d) => (
          <div
            key={d.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-card"
          >
            <p className="font-medium">{d.order}</p>

            <span
              className={`text-xs px-2 py-1 rounded-full ${
                d.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : d.status === "in-transit"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {d.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}