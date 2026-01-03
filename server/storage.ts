import { type Order } from "@shared/schema";

export interface IStorage {
  createOrder(order: Order): Promise<Order>;
  getOrderBySessionId(sessionId: string): Promise<Order | undefined>;
  updateOrderStatus(sessionId: string, status: "completed" | "failed"): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private orders: Map<string, Order>;

  constructor() {
    this.orders = new Map();
  }

  async createOrder(order: Order): Promise<Order> {
    this.orders.set(order.stripeSessionId, order);
    return order;
  }

  async getOrderBySessionId(sessionId: string): Promise<Order | undefined> {
    return this.orders.get(sessionId);
  }

  async updateOrderStatus(sessionId: string, status: "completed" | "failed"): Promise<Order | undefined> {
    const order = this.orders.get(sessionId);
    if (!order) return undefined;
    const updatedOrder = { ...order, status };
    this.orders.set(sessionId, updatedOrder);
    return updatedOrder;
  }
}

export const storage = new MemStorage();
