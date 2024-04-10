import type { TrackerTop100Settings as SettingsType } from '../NativeTrackerTop100';

export class TrackerTop100SettingsBuilder implements SettingsType {
  projectId: string;
  authUserId: string | null = null;
  email: string | null = null;
  phone: string | null = null;
  publisherId: string | null = null;
  publisherScope: string | null = null;
  sberId: string | null = null;
  sberSubId: string | null = null;
  ramblerId: string | null = null;
  locationTracking: boolean = false;

  constructor(projectId: string) {
    this.projectId = projectId;
  }

  setAuthUserId(authUserId: string): this {
    this.authUserId = authUserId;
    return this;
  }

  setEmail(email: string): this {
    this.email = email;
    return this;
  }

  setPhone(phone: string): this {
    this.phone = phone;
    return this;
  }

  setPublisherId(publisherId: string): this {
    this.publisherId = publisherId;
    return this;
  }

  setPublisherScope(publisherScope: string): this {
    this.publisherScope = publisherScope;
    return this;
  }

  setSberId(sberId: string): this {
    this.sberId = sberId;
    return this;
  }

  setSberSubId(sberSubId: string): this {
    this.sberSubId = sberSubId;
    return this;
  }

  setRamblerId(ramblerId: string): this {
    this.ramblerId = ramblerId;
    return this;
  }

  setLocationTracking(locationTracking: boolean): this {
    this.locationTracking = locationTracking;
    return this;
  }

  build(): SettingsType {
    return { ...this };
  }
}
