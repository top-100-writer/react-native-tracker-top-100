import type { TrackerTop100EcommProduct as ProductType } from '../NativeTrackerTop100';

export class TrackerTop100ECommProductBuilder implements ProductType {
  id: string;
  name: string;
  category: string | null = null;
  brand: string | null = null;
  variant: string | null = null;
  price: string | null = null;
  quantity: number | null = null;
  coupon: string | null = null;
  list: string | null = null;
  position: string | null = null;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  setCategory(category: string): this {
    this.category = category;
    return this;
  }

  setBrand(brand: string): this {
    this.brand = brand;
    return this;
  }

  setVariant(variant: string): this {
    this.variant = variant;
    return this;
  }

  setPrice(price: string): this {
    this.price = price;
    return this;
  }

  setQuantity(quantity: number): this {
    this.quantity = quantity;
    return this;
  }

  setCoupon(coupon: string): this {
    this.coupon = coupon;
    return this;
  }

  setList(list: string): this {
    this.list = list;
    return this;
  }

  setPosition(position: string): this {
    this.position = position;
    return this;
  }

  build(): ProductType {
    return { ...this };
  }
}
