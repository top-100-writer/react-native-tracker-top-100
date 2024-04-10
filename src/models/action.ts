import type { TrackerTop100EcommAction as ActionType } from '../NativeTrackerTop100';

export class TrackerTop100EcommActionBuilder implements ActionType {
  id: string;
  coupon: string | null = null;
  revenue: string | null = null;
  affiliation: string | null = null;
  tax: string | null = null;
  shipping: string | null = null;
  list: string | null = null;
  step: string | null = null;
  option: string | null = null;

  constructor(id: string) {
    this.id = id;
  }

  setCoupon(coupon: string): this {
    this.coupon = coupon;
    return this;
  }

  setRevenue(revenue: string): this {
    this.revenue = revenue;
    return this;
  }

  setAffiliation(affiliation: string): this {
    this.affiliation = affiliation;
    return this;
  }

  setTax(tax: string): this {
    this.tax = tax;
    return this;
  }

  setShipping(shipping: string): this {
    this.shipping = shipping;
    return this;
  }

  setList(list: string): this {
    this.list = list;
    return this;
  }

  setStep(step: string): this {
    this.step = step;
    return this;
  }

  setOption(option: string): this {
    this.option = option;
    return this;
  }

  build(): ActionType {
    return { ...this };
  }
}
