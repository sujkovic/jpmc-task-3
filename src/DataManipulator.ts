import { ServerRespond } from './DataStreamer';

export interface Row {
      price_abc: number,
      price_def: number,
      ratio: number,
      timestamp: Date,
      upper_bound: number,
      lower_bound: number,
      trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) : Row {
      const abc = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
      const def = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
      const ratio = abc / def;
      const upperBound = 1.05;
      const lowerBound = 0.95;
      return {
        price_abc: abc,
        price_def: def,
        ratio,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
            serverResponds[0].timestamp : serverResponds[1].timestamp,
        upper_bound: upperBound,
        lower_bound: lowerBound,
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
      };
  }
}
