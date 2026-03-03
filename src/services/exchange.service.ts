import { http } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

export class ExchangeService {
  static async getBalances() {
    return http(endpoints.exchange.balances, "GET");
  }

  static async updateBalances(data: any) {
    return http(endpoints.exchange.balances, "PUT", data);
  }

  static async getRates() {
    return http(endpoints.exchange.rates, "GET");
  }

  static async updateRates(data: any) {
    return http(endpoints.exchange.rates, "PUT", data);
  }

  static async createIntervention(data: any) {
    return http(endpoints.exchangeOps.intervention, "POST", data);
  }

  static async createRetail(data: any) {
    return http(endpoints.exchangeOps.retail, "POST", data);
  }

  static async createDesk(data: any) {
    return http(endpoints.exchangeOps.desk, "POST", data);
  }

  static async getOrders() {
    return http(endpoints.exchangeOps.orders, "GET");
  }
}
