import type { TrackerTop100EcommPromo as PromoType } from '../NativeTrackerTop100';

export class TrackerTop100ECommPromoBuilder implements PromoType {
  id: string;
  name: string;
  creative: string | null = null;
  position: string | null = null;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  setCreative(creative: string): this {
    this.creative = creative;
    return this;
  }

  setPosition(position: string): this {
    this.position = position;
    return this;
  }

  build(): PromoType {
    return { ...this };
  }
}
