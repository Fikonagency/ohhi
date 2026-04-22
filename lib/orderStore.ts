// TODO: Replace with Supabase realtime / Firebase for production.
// This uses localStorage for demo purposes only.

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
};

const KEY = "ohhi_orders_v1";

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
