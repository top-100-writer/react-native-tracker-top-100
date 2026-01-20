import { TurboModuleRegistry, type TurboModule } from 'react-native';

export type Params = { [key: string]: string };

// Codegen-compatible types for Turbo Module
export type TrackerTop100EcommParams = {
  currencyCode: string;
  action?: TrackerTop100EcommAction | null;
  products?: TrackerTop100EcommProduct[] | null;
  impressions?: TrackerTop100EcommProduct[] | null;
  promotions?: TrackerTop100EcommPromo[] | null;
};

export type TrackerTop100EcommAction = {
  id: string;
  coupon?: string | null;
  revenue?: string | null;
  affiliation?: string | null;
  tax?: string | null;
  shipping?: string | null;
  list?: string | null;
  step?: string | null;
  option?: string | null;
};

export type TrackerTop100EcommProduct = {
  id: string;
  name: string;
  category?: string | null;
  brand?: string | null;
  variant?: string | null;
  price?: string | null;
  quantity?: number | null;
  coupon?: string | null;
  list?: string | null;
  position?: string | null;
};

export type TrackerTop100EcommPromo = {
  id: string;
  name: string;
  creative?: string | null;
  position?: string | null;
};

export type TrackerTop100Settings = {
  projectId: string;
  authUserId?: string | null;
  email?: string | null;
  phone?: string | null;
  publisherId?: string | null;
  publisherScope?: string | null;
  sberId?: string | null;
  sberSubId?: string | null;
  ramblerId?: string | null;
  locationTracking?: boolean;
};

export interface Spec extends TurboModule {
  /**
   * The method for sending a screen display event.
   * @param {string} className - Page class name.
   * @param {string | null} [url] - Page path (optional).
   * @param {string | null} [title] - Page title (optional).
   */
  trackPageView(
    className: string,
    url?: string | null,
    title?: string | null
  ): void;

  /**
   * The method for sending a custom event.
   * @param {string} eventName - Custom event name.
   * @param {Params | null} [values] - Page path (optional).
   */
  trackEvent(eventName: string, values?: Params | null): void;

  /**
   * A method for transmitting e-commerce events.
   * @param {string} eventName - E-commerce event name.
   * @param {TrackerTop100EcommParams | null} [params] - E-commerce parameters (optional).
   */
  trackEcomm(eventName: string, params?: TrackerTop100EcommParams | null): void;

  /**
   * The method returns a script for transferring data to the webview to link events sent from the SDK with JS counter events.
   */
  getWebViewScript(): string;

  /**
   * The method returns string data to be transmitted to the webview to associate events sent from the SDK with JS counter events.
   */
  getWebViewData(): string;

  /**
   * The method for activating a tracker for setting up with a single ID.
   * @param {TrackerTop100Settings} settings - Tracker settings.
   */
  activateSettings(settings: TrackerTop100Settings): void;

  /**
   * The method for activating multiple trackers.
   * @param {TrackerTop100Settings[]} multipleSettings - Array of tracker settings.
   */
  activateMultipleSettings(multipleSettings: TrackerTop100Settings[]): void;

  /**
   * The method of sending a deeplink click event.
   * @param {string} deeplink - Deeplink string.
   */
  trackDeeplink(deeplink: string): void;

  /**
   * Method for switching the debug mode.
   * @param {boolean} isActive - Debug mode flag.
   */
  setupDebugActive(isActive: boolean): void;

  /**
   * Method for updating the user ID.
   * @param {string} projectId - A unique project ID.
   * @param {string | null} [userId] - The ID of the authorized user (optional). If empty - removes old one.
   */
  syncUserId(userId: string | null, projectId: string): void;

  /**
   * Method for updating some parameters corresponding to the specified [projectId].
   * @param {string} projectId - A unique project ID.
   * @param {string | null} [publisherId] - The user ID that should be generated and installed by the site (optional).
   * @param {string | null} [publisherScope] - The scope of the user ID passed to the publisher ID (optional).
   * @param {string | null} [phone] - The user's phone number in the 79999999999 format (it will be encrypted during data transfer) (optional).
   * @param {string | null} [email] - User's email address (it will be encrypted when transferring data) (optional).
   */
  updateOptions(
    projectId: string,
    publisherId?: string | null,
    publisherScope?: string | null,
    phone?: string | null,
    email?: string | null
  ): void;

  /**
   * Method for tracking recommendation system events.
   * @param {string} eventName - Recommendation system event name.
   * @param {Params | null} [meta] - Additional metadata (optional).
   * @param {string | null} [url] - URL associated with the event (optional).
   */
  trackRecSysEvent(
    eventName: string,
    meta?: Params | null,
    url?: string | null
  ): void;

  /**
   * Method for updating the Sber ID.
   * @param {string | null} sberId - New Sber ID. If null - removes old one.
   * @param {string} projectId - A unique project ID.
   */
  updateSberId(sberId: string | null, projectId: string): void;

  /**
   * Method for updating the Sber Sub ID.
   * @param {string | null} sberSubId - New Sber Sub ID. If null - removes old one.
   * @param {string} projectId - A unique project ID.
   */
  updateSberSubId(sberSubId: string | null, projectId: string): void;

  /**
   * Method for updating the Rambler ID.
   * @param {string | null} ramblerId - New Rambler ID. If null - removes old one.
   * @param {string} projectId - A unique project ID.
   */
  updateRamblerId(ramblerId: string | null, projectId: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TrackerTop100');
