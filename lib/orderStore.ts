// TODO: Replace with Supabase realtime / Firebase for production.
// Current implementation uses localStorage for the demo only.
// Payment status is recorded here but no real money moves —
// hook in Swish for Merchants API + Stripe PaymentIntents in production.

export type OrderStatus = "pending" | "preparing" | "ready" | "served";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  note?: string;
};

export type Order = {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  note?: string;
  status: OrderStatus;
  createdAt: number;
  paid: boolean;
  paymentMethod?: "swish" | "card";
  total: number;
};

const KEY = "ohhi_orders_v2";

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(orders));
  // Notify any listeners (admin dashboard) via storage event.
  window.dispatchEvent(new Event("ohhi_orders_changed"));
}

export function addOrder(order: Omit<Order, "id" | "createdAt" | "status">): Order {
  const newOrder: Order = {
    ...order,
    id: `ord_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
    status: "pending",
  };
  const orders = loadOrders();
  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  const orders = loadOrders().map((o) => (o.id === id ? { ...o, status } : o));
  saveOrders(orders);
}
