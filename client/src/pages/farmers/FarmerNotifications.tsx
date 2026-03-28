import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { useState } from "react";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: "order" | "message" | "system";
  read: boolean;
  time: string;
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Order Received",
    message: "You received an order for Fresh Tomatoes (10kg).",
    type: "order",
    read: false,
    time: "2 mins ago",
  },
  {
    id: "2",
    title: "New Message",
    message: "Buyer A asked about Maize availability.",
    type: "message",
    read: false,
    time: "10 mins ago",
  },
  {
    id: "3",
    title: "System Update",
    message: "Your profile was successfully verified.",
    type: "system",
    read: true,
    time: "1 day ago",
  },
];

export default function FarmerNotifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Bell size={20} />
            Notifications
          </h1>
          <p className="text-sm text-muted-foreground">
            Updates from orders, messages, and system alerts
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border hover:bg-muted"
        >
          <CheckCheck size={16} />
          Mark all read
        </button>
      </div>

      {/* LIST */}
      <div className="grid gap-3">
        {notifications.length === 0 && (
          <div className="p-6 text-center text-muted-foreground border rounded-lg bg-card">
            No notifications yet
          </div>
        )}

        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex items-start justify-between p-4 border rounded-lg bg-card transition ${
              !n.read ? "border-primary/40" : "opacity-70"
            }`}
          >
            <div className="space-y-1">
              <p className="font-medium flex items-center gap-2">
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
                {n.title}
              </p>

              <p className="text-sm text-muted-foreground">
                {n.message}
              </p>

              <p className="text-xs text-muted-foreground">
                {n.time}
              </p>
            </div>

            <button
              onClick={() => deleteNotification(n.id)}
              className="p-2 hover:bg-muted rounded-md"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}