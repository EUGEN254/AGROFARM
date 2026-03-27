import { Star } from "lucide-react";

type Review = {
  id: string;
  user: string;
  rating: number;
  comment: string;
};

const mockReviews: Review[] = [
  { id: "1", user: "Alice", rating: 5, comment: "Fresh and timely delivery!" },
  { id: "2", user: "Bob", rating: 4, comment: "Good quality produce." },
];

export default function FarmerReviews() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Star size={20} />
          Reviews
        </h1>
        <p className="text-sm text-muted-foreground">
          Customer feedback and ratings
        </p>
      </div>

      <div className="grid gap-3">
        {mockReviews.map((r) => (
          <div key={r.id} className="p-4 border rounded-lg bg-card">
            <div className="flex justify-between">
              <p className="font-medium">{r.user}</p>
              <span className="text-sm">⭐ {r.rating}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {r.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}