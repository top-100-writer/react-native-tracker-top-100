import type { TrackerTop100EcommParams as ParamsType } from '../NativeTrackerTop100';

import { TrackerTop100EcommActionBuilder } from './action';

import { TrackerTop100ECommProductBuilder } from './product';

import { TrackerTop100ECommPromoBuilder } from './promo';

export class TrackerTop100EcommParamsBuilder implements ParamsType {
  currencyCode: string;
  action: TrackerTop100EcommActionBuilder | null = null;
  products: TrackerTop100ECommProductBuilder[] | null = null;
  impressions: TrackerTop100ECommProductBuilder[] | null = null;
  promotions: TrackerTop100ECommPromoBuilder[] | null = null;

  constructor(currencyCode: string) {
    this.currencyCode = currencyCode;
  }

  setAction(action: TrackerTop100EcommActionBuilder): this {
    this.action = action;
    return this;
  }

  setProducts(products: TrackerTop100ECommProductBuilder[]): this {
    this.products = products;
    return this;
  }

  setImpressions(impressions: TrackerTop100ECommProductBuilder[]): this {
    this.impressions = impressions;
    return this;
  }

  setPromotions(promotions: TrackerTop100ECommPromoBuilder[]): this {
    this.promotions = promotions;
    return this;
  }

  build(): ParamsType {
    return {
      currencyCode: this.currencyCode,
      action: this.action?.build() || null,
      products: this.products?.map((p) => p.build()) || null,
      impressions: this.impressions?.map((i) => i.build()) || null,
      promotions: this.promotions?.map((p) => p.build()) || null,
    };
  }
}
