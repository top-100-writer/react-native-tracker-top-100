# react-native-tracker-top-100

React Native Turbo Module for integration with TrackerTop100SDK - analytics platform for tracking user events in mobile applications.

## Features

- 📊 **Event Tracking** - sending user events and page views
- 🛒 **E-commerce Analytics** - detailed tracking of purchases and products
- 🔗 **Deeplink Tracking** - tracking deep link transitions
- 🎯 **Recommendation System** - events for recommendation systems
- 🐛 **Debug Mode** - debugging and testing
- ⚡ **Turbo Module** - high performance on React Native 0.81.0+
- 🏗️ **Builder Pattern** - convenient creation of complex configuration objects

## Installation

```sh
npm install react-native-tracker-top-100
# or
yarn add react-native-tracker-top-100
```

### iOS

#### 1. Installing pods
```sh
cd ios && bundle install && bundle exec pod install
```

#### 2. Add XCFramework to your project
1. Open your app's *.xcodeproj.
2. Go to Targets section and select your target.
3. Go to **Frameworks, Libraries, and Embedded Content** and push **+ (Add Items)** button.
4. Select TrackerTop100SDK.xcframework from **Workspace - Pods** section and push **Add** button.

### Android

The library is automatically linked via autolinking.

## Quick Start

### 1. Initialization

```typescript
import { NativeTrackerTop100, SettingsBuilder } from 'react-native-tracker-top-100';

// Creating settings using Builder
const settings = new SettingsBuilder('your-project-id')
  .setEmail('user@example.com')
  .setPhone('+79999999999')
  .setPublisherId('your-publisher-id')
  .setPublisherScope('your-scope')
  .setAuthUserId('user123')
  .build();

// Activating tracker
NativeTrackerTop100.activateSettings(settings);
```

### 2. Event Tracking

```typescript
// Page view
NativeTrackerTop100.trackPageView(
  'HomeScreen',
  'https://yourapp.com/home',
  'Home Page'
);

// Custom event
NativeTrackerTop100.trackEvent('button_click', {
  button_name: 'subscribe',
  section: 'header'
});

// Deeplink event
NativeTrackerTop100.trackDeeplink('myapp://product/123');
```

### 3. E-commerce Analytics

```typescript
import { 
  EcommParamsBuilder, 
  EcommProductBuilder, 
  EcommActionBuilder 
} from 'react-native-tracker-top-100';

// Creating purchase action
const action = new EcommActionBuilder('purchase')
  .setCoupon('SAVE10')
  .setRevenue('99.99')
  .setAffiliation('store')
  .build();

// Creating product
const product = new EcommProductBuilder('prod123', 'iPhone 15')
  .setCategory('Electronics')
  .setBrand('Apple')
  .setPrice('999.99')
  .setQuantity(1)
  .build();

// Creating e-commerce parameters
const ecommParams = new EcommParamsBuilder('USD')
  .setAction(action)
  .setProducts([product])
  .build();

// Sending event
NativeTrackerTop100.trackEcomm('purchase', ecommParams);
```

## API Reference

### Main Methods

#### `activateSettings(settings: TrackerTop100Settings)`
Activates tracker with settings for a single project.

#### `activateMultipleSettings(settings: TrackerTop100Settings[])`
Activates tracker for multiple projects simultaneously.

#### `trackPageView(className: string, url?: string, title?: string)`
Sends page view event.

#### `trackEvent(eventName: string, values?: Params)`
Sends custom event.

#### `trackEcomm(eventName: string, params?: TrackerTop100EcommParams)`
Sends e-commerce event.

#### `trackDeeplink(deeplink: string)`
Tracks deep link transition.

#### `trackRecSysEvent(eventName: string, meta?: Params, url?: string)`
Sends recommendation system event.

### Utilities

#### `getWebViewScript(): string`
Returns script for WebView integration.

#### `getWebViewData(): string`
Returns data for WebView transmission.

#### `setupDebugActive(isActive: boolean)`
Enables/disables debug mode.

#### `syncUserId(userId: string, projectId: string)`
Synchronizes user ID.

#### `updateOptions(projectId: string, publisherId?: string, publisherScope?: string, phone?: string, email?: string)`
Updates tracker parameters.

### Builder Classes

#### `SettingsBuilder`
Creating tracker settings:

```typescript
const settings = new SettingsBuilder('project-id')
  .setEmail('user@example.com')
  .setPhone('+79999999999')
  .setPublisherId('publisher-id')
  .setPublisherScope('scope')
  .setSberId('sber-id')
  .setSberSubId('sber-sub-id')
  .setRamblerId('rambler-id')
  .setAuthUserId('user123')
  .setLocationTracking(true)
  .build();
```

#### `EcommParamsBuilder`
Creating e-commerce event parameters:

```typescript
const params = new EcommParamsBuilder('USD')
  .setAction(action)
  .setProducts([product1, product2])
  .setImpressions([impression])
  .setPromotions([promotion])
  .build();
```

#### `EcommProductBuilder`
Creating product for e-commerce:

```typescript
const product = new EcommProductBuilder('prod123', 'iPhone 15')
  .setCategory('Electronics')
  .setBrand('Apple')
  .setVariant('128GB Blue')
  .setPrice('999.99')
  .setQuantity(1)
  .setCoupon('NEWUSER10')
  .setList('featured_products')
  .setPosition('1')
  .build();
```

#### `EcommActionBuilder`
Creating action for e-commerce:

```typescript
const action = new EcommActionBuilder('purchase')
  .setCoupon('SAVE10')
  .setRevenue('99.99')
  .setAffiliation('store')
  .setTax('8.99')
  .setShipping('5.99')
  .setList('electronics')
  .setStep('1')
  .setOption('express')
  .build();
```

#### `EcommPromoBuilder`
Creating promotion:

```typescript
const promotion = new EcommPromoBuilder('promo1', 'Black Friday Sale')
  .setCreative('banner.jpg')
  .setPosition('top')
  .build();
```

## Data Types

### `TrackerTop100Settings`
```typescript
type TrackerTop100Settings = {
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
```

### `Params`
```typescript
type Params = { [key: string]: string };
```

## Usage Example

See full example in `example/` folder - React Native application demonstrating all library capabilities.

## Requirements

- React Native 0.81.0+
- iOS 15.0+
- Android API 24+
- Java 17+ (for Android)

## Support

- [Issues](https://github.com/top-100-writer/react-native-tracker-top-100/issues)
- [Documentation](https://github.com/top-100-writer/react-native-tracker-top-100#readme)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
