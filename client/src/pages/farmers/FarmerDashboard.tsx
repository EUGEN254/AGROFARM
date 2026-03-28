import { Package, ShoppingCart, DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Total Listings", value: 12, icon: Package },
  { label: "Active Orders", value: 5, icon: ShoppingCart },
  { label: "Revenue", value: "KES 1,240", icon: DollarSign },
];

const recentListings = [
  { name: "Organic Tomatoes", price: "KES 2.50/kg", stock: 120 },
  { name: "Fresh Maize", price: "KES 1.80/kg", stock: 30 },
  { name: "Potatoes", price: "KES 1.20/kg", stock: 0 },
  { name: "Potatoes", price: "KES 1.20/kg", stock: 0 },
  { name: "Potatoes", price: "KES 1.20/kg", stock: 0 },
  { name: "Potatoes", price: "KES 1.20/kg", stock: 0 },
];

export default function FarmerDashboard() {
  const getStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of stock", variant: "destructive" };
    if (stock < 50) return { label: "Low stock", variant: "secondary" };
    return { label: "Active", variant: "default" };
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <Button className="gap-2">
          <Plus size={16} />
          Add Listing
        </Button>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <s.icon className="text-primary" size={20} />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* RECENT LISTINGS */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Recent Listings</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentListings.map((item, i) => {
            const status = getStatus(item.stock);

            return (
              <Card key={i}>
                <CardContent className="p-4 space-y-3">

                  {/* IMAGE */}
                  <div className="h-24 bg-muted rounded-lg" />

                  {/* INFO */}
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.stock}kg available
                    </p>
                  </div>

                  {/* STATUS */}
                  <Badge variant={status.variant as any}>
                    {status.label}
                  </Badge>

                  {/* PRICE */}
                  <p className="font-bold">{item.price}</p>

                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

    </div>
  );
}