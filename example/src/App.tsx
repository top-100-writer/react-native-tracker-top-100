import * as React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Alert,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import { NativeTrackerTop100 } from 'react-native-tracker-top-100';
import {
  EcommParamsBuilder,
  EcommProductBuilder,
  EcommActionBuilder,
  EcommPromoBuilder,
  SettingsBuilder,
} from 'react-native-tracker-top-100';

const projectId = '7697187';
var debugMode = false;

function toggleDebugMode() {
  debugMode = !debugMode;
  NativeTrackerTop100.setupDebugActive(debugMode);
}

// Crash functions
function crashFreeze(seconds: number) {
  const startTime = Date.now();
  while (Date.now() - startTime < seconds * 1000) {
    // Block the main thread
  }
}

function crashMach() {
  // Division by zero will cause a crash
  const a: number = 1;
  const b: number = 0;
  console.log(a / b);
}

function crashNSException() {
  // This will cause a JavaScript error that can crash the app
  throw new Error('This is a test NSException raised from JavaScript!');
}

function crashSignal() {
  // This will cause a JavaScript error
  throw new Error('SIGABRT simulation from JavaScript');
}

function crashSystem(seconds: number) {
  // Simulate system crash by blocking with setTimeout
  setTimeout(() => {
    throw new Error('System crash simulation');
  }, seconds * 1000);
}

function showCrashAlert() {
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          'Cancel',
          'Freeze 3 сек.',
          'Crash Mach',
          'Crash NSException',
          'Crash Signal',
          'Crash System',
        ],
        destructiveButtonIndex: [1, 2, 3, 4, 5],
        cancelButtonIndex: 0,
        title: 'Choose a crash',
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 1:
            crashFreeze(3);
            break;
          case 2:
            crashMach();
            break;
          case 3:
            crashNSException();
            break;
          case 4:
            crashSignal();
            break;
          case 5:
            crashSystem(2);
            break;
        }
      }
    );
  } else {
    // For Android, show a simple alert with options
    Alert.alert('Choose a crash', 'Choose a crash type:', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Freeze 3 сек.',
        onPress: () => crashFreeze(3),
        style: 'destructive',
      },
      { text: 'Crash Mach', onPress: () => crashMach(), style: 'destructive' },
      {
        text: 'Crash NSException',
        onPress: () => crashNSException(),
        style: 'destructive',
      },
      {
        text: 'Crash Signal',
        onPress: () => crashSignal(),
        style: 'destructive',
      },
      {
        text: 'Crash System',
        onPress: () => crashSystem(2),
        style: 'destructive',
      },
    ]);
  }
}

export default function App() {
  React.useEffect(() => {
    const settings = new SettingsBuilder(projectId)
      .setEmail('test@test.com')
      .setPhone('88005553535')
      .setPublisherId('test-publisher-id')
      .setPublisherScope('react_app_kraken-test')
      .setSberId('test-sber-id')
      .setSberSubId('test-sber-sub-id')
      .setRamblerId('test-rambler-id')
      .setAuthUserId('testauthid')
      .build();
    NativeTrackerTop100.activateSettings(settings);
    toggleDebugMode();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Page View Event"
        onPress={() => {
          NativeTrackerTop100.trackPageView(
            'HomeScreen',
            'https:/react.native.top100.com',
            'Home Page'
          );
          Alert.alert('Wohoooo!', 'Page View Event Was Sent!');
        }}
      />
      <Button
        title="Custom Event"
        onPress={() => {
          NativeTrackerTop100.trackEvent('button_click', {
            button_name: 'test_button',
          });
          Alert.alert('Wohoooo!', 'Custom Event Was Sent!');
        }}
      />
      <Button
        title="Ecomm Event"
        onPress={() => {
          trackEcomm();
          Alert.alert('Wohoooo!', 'Ecomm Event Was Sent!');
        }}
      />
      <Button
        title="Show Script"
        onPress={() => {
          const script = NativeTrackerTop100.getWebViewScript();
          Alert.alert('WebView Script', script);
        }}
      />
      <Button
        title="Show Data"
        onPress={() => {
          const data = NativeTrackerTop100.getWebViewData();
          Alert.alert('WebView Data', data);
        }}
      />
      <Button
        title="Deeplink Event"
        onPress={() => {
          NativeTrackerTop100.trackDeeplink('myapp://product/123');
          Alert.alert('Wohoooo!', 'Deeplink Event Was Sent!');
        }}
      />
      <Button
        title="Toggle Debug"
        onPress={() => {
          toggleDebugMode();
          Alert.alert(
            'Wohoooo!',
            'Debug Mode Was Set To ' + debugMode.toString()
          );
        }}
      />
      <Button
        title="Sync User ID"
        onPress={() => {
          NativeTrackerTop100.syncUserId('user123', projectId);
          Alert.alert('Wohoooo!', 'Sync User ID Event Was Sent!');
        }}
      />
      <Button
        title="Update Options"
        onPress={() => {
          NativeTrackerTop100.updateOptions(
            projectId,
            'publisher123',
            'scope123',
            '+1234567890',
            'user@example.com'
          );
          Alert.alert('Wohoooo!', 'Update Options Event Was Sent!');
        }}
      />
      <Button
        title="Crash App"
        onPress={() => {
          showCrashAlert();
        }}
      />
      <Button
        title="RecSys Event"
        onPress={() => {
          NativeTrackerTop100.trackRecSysEvent(
            'recommendation_click',
            {
              item_id: 'item123',
              category: 'electronics',
              position: '1',
              algorithm: 'collaborative_filtering',
            },
            'https://example.com/product/item123'
          );
          Alert.alert('Wohoooo!', 'RecSys Event Was Sent!');
        }}
      />
    </View>
  );
}

function trackEcomm() {
  // Create action using Builder pattern
  const actionBuilder = new EcommActionBuilder('purchase')
    .setCoupon('SAVE10')
    .setRevenue('99.99')
    .setAffiliation('store')
    .setTax('8.99')
    .setShipping('5.99')
    .setList('electronics')
    .setStep('1')
    .setOption('express');

  // Create product using Builder pattern
  const productBuilder = new EcommProductBuilder('prod123', 'iPhone 15')
    .setCategory('Electronics')
    .setBrand('Apple')
    .setVariant('128GB Blue')
    .setPrice('999.99')
    .setQuantity(1)
    .setCoupon('NEWUSER10')
    .setList('featured_products')
    .setPosition('1');

  // Create impression using Builder pattern
  const impressionBuilder = new EcommProductBuilder('prod456', 'MacBook Pro')
    .setCategory('Electronics')
    .setBrand('Apple')
    .setVariant('M3 14-inch')
    .setPrice('1999.99')
    .setQuantity(1)
    .setList('recommended_products')
    .setPosition('2');

  // Create promotion using Builder pattern
  const promotionBuilder = new EcommPromoBuilder('promo1', 'Black Friday Sale')
    .setCreative('banner.jpg')
    .setPosition('top');

  // Create params using Builder pattern
  const params = new EcommParamsBuilder('USD')
    .setAction(actionBuilder)
    .setProducts([productBuilder])
    .setImpressions([impressionBuilder])
    .setPromotions([promotionBuilder])
    .build();

  // Track ecommerce event
  NativeTrackerTop100.trackEcomm('purchase', params);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
