import { http } from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

const exchangeMap = {
  balances: endpoints.exchange.balances,
  rates: endpoints.exchange.rates,
  commissions: endpoints.exchange.commissions,
  channels: endpoints.exchange.channels,
  parameters: endpoints.exchange.parameters,
} as const;

export type ExchangeConfigView = keyof typeof exchangeMap;

export class ExchangeService {
  static getConfig(view: ExchangeConfigView) {
    return http<any>(exchangeMap[view], "GET");
  }

  static updateConfig(view: ExchangeConfigView, data: any) {
    return http<any>(exchangeMap[view], "PUT", data);
  }

  static getBalances() { return this.getConfig("balances"); }
  static updateBalances(data: any) { return this.updateConfig("balances", data); }
  static getRates() { return this.getConfig("rates"); }
  static updateRates(data: any) { return this.updateConfig("rates", data); }

}
