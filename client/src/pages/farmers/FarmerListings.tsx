import { useState } from "react";
import { MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const initialListings = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: "$2.50/kg",
    stock: 120,
  },
  {
    id: 2,
    name: "Fresh Maize",
    price: "$1.80/kg",
    stock: 30,
  },
  {
    id: 3,
    name: "Potatoes",
    price: "$1.20/kg",
    stock: 0,
  },
  {
    id: 3,
    name: "Potatoes",
    price: "$1.20/kg",
    stock: 0,
  },
  {
    id: 3,
    name: "Potatoes",
    price: "$1.20/kg",
    stock: 0,
  },
  {
    id: 3,
    name: "Potatoes",
    price: "$1.20/kg",
    stock: 0,
  },
];

export default function FarmerListings() {
  const [listings, setListings] = useState(initialListings);

  const handleDelete = (id: number) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  const getStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of stock", variant: "destructive" };
    if (stock < 50) return { label: "Low stock", variant: "secondary" };
    return { label: "Active", variant: "default" };
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Listings</h1>

        <Button className="gap-2">
          <Plus size={16} />
          Add Listing
        </Button>
      </div>

      {/* EMPTY STATE */}
      {listings.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center space-y-4">
            <p className="text-muted-foreground">
              You don’t have any listings yet
            </p>
            <Button>Add Your First Listing</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((item) => {
            const status = getStatus(item.stock);

            return (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4 space-y-3">

                  {/* IMAGE */}
                  <div className="h-32 bg-muted rounded-lg" />

                  {/* TOP ROW */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.stock}kg available
                      </p>
                    </div>

                    {/* DROPDOWN MENU */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-muted rounded">
                          <MoreVertical size={18} />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* STATUS */}
                  <Badge variant={status.variant as any}>
                    {status.label}
                  </Badge>

                  {/* PRICE */}
                  <p className="font-bold text-lg">{item.price}</p>

                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}