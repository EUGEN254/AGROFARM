import { useState } from "react";
import { Boxes, AlertTriangle, Plus, Search } from "lucide-react";

type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
};

const mockInventory: InventoryItem[] = [
  { id: "1", name: "Tomatoes", quantity: 25, unit: "kg", reorderLevel: 20 },
  { id: "2", name: "Maize", quantity: 120, unit: "kg", reorderLevel: 50 },
  { id: "3", name: "Green Peppers", quantity: 8, unit: "kg", reorderLevel: 15 },
];

export default function FarmerInventory() {
  const [search, setSearch] = useState("");

  const filtered = mockInventory.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Boxes size={20} />
            Inventory
          </h1>
          <p className="text-sm text-muted-foreground">
            Track stock levels and availability
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground">
          <Plus size={16} />
          Add Stock
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-card">
        <Search size={16} className="text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search inventory..."
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>

      {/* LIST */}
      <div className="grid gap-3">
        {filtered.map((item) => {
          const lowStock = item.quantity <= item.reorderLevel;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-card"
            >
              <div className="flex items-center gap-3">
                {lowStock && (
                  <AlertTriangle className="text-yellow-500" size={18} />
                )}

                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Reorder level: {item.reorderLevel} {item.unit}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  {item.quantity} {item.unit}
                </p>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    lowStock
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {lowStock ? "Low stock" : "OK"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}