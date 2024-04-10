#import <Foundation/Foundation.h>
#import <TrackerTop100Spec/TrackerTop100Spec.h>
#import <TrackerTop100SDK/TrackerTop100SDK-Swift.h>

@interface TrackerTop100TurboModule : NSObject <NativeTrackerTop100Spec>
@end

@implementation TrackerTop100TurboModule

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeTrackerTop100SpecJSI>(params);
}

+ (NSString *)moduleName
{
  return @"TrackerTop100";
}

- (void)trackPageView:(NSString *)className
                  url:(NSString * _Nullable)url
                title:(NSString * _Nullable)title
{
  [TrackerTop100 trackPageViewWithClassName:className url:url title:title];
}

- (void)trackEvent:(NSString *)eventName
            values:(NSDictionary * _Nullable)values
{
  NSDictionary<NSString *, NSString *> *stringValues = nil;
  if (values) {
    NSMutableDictionary<NSString *, NSString *> *mutableValues = [NSMutableDictionary dictionary];
    for (NSString *key in values) {
      id value = values[key];
      if ([value isKindOfClass:[NSString class]]) {
        mutableValues[key] = value;
      } else {
        mutableValues[key] = [value description];
      }
    }
    stringValues = [mutableValues copy];
  }

  [TrackerTop100 trackEventWithEventName:eventName eventValues:stringValues];
}

- (void)trackEcomm:(NSString *)eventName
            params:(JS::NativeTrackerTop100::TrackerTop100EcommParams &)params
{

  TrackerTop100ECommAction *sdkAction = nil;
  NSMutableArray<TrackerTop100ECommProduct *> *sdkProducts = [NSMutableArray array];
  NSMutableArray<TrackerTop100ECommPromo *> *sdkPromotions = [NSMutableArray array];
  NSMutableArray<TrackerTop100ECommProduct *> *sdkImpressions = [NSMutableArray array];

  if (params.currencyCode()) {

    // Set action if present
    if (params.action().has_value()) {
      auto action = params.action().value();

      sdkAction = [[TrackerTop100ECommAction alloc] initWithId:action.id_()
                                                        coupon:action.coupon()
                                                       revenue:action.revenue()
                                                   affiliation:action.affiliation()
                                                           tax:action.tax()
                                                      shipping:action.shipping()
                                                          list:action.list()
                                                          step:action.step()
                                                        option:action.option()];

    }

    // Set products if present
    if (params.products().has_value()) {
      auto products = params.products().value();
      sdkProducts = [NSMutableArray array];
      for (int i = 0; i < products.size(); i++) {
        auto product = products[i];
        TrackerTop100ECommProduct *sdkProduct = [[TrackerTop100ECommProduct alloc] initWithId:product.id_()
                                                                                         name:product.name()
                                                                                         list:product.list()
                                                                                        brand:product.brand()
                                                                                     category:product.category()
                                                                                       coupon:product.coupon()
                                                                                     position:product.position()
                                                                                        price:product.price()
                                                                                     quantity:[NSString stringWithFormat:@"%f", product.quantity().value()]
                                                                                      variant:product.variant()];

        [sdkProducts addObject:sdkProduct];
      }
    }

    // Set impressions if present
    if (params.impressions().has_value()) {
      auto impressions = params.impressions().value();

      for (int i = 0; i < impressions.size(); i++) {
        auto impression = impressions[i];
        TrackerTop100ECommProduct *sdkImpression = [[TrackerTop100ECommProduct alloc] initWithId:impression.id_()
                                                                                            name:impression.name()
                                                                                            list:impression.list()
                                                                                           brand:impression.brand()
                                                                                        category:impression.category()
                                                                                          coupon:impression.coupon()
                                                                                        position:impression.position()
                                                                                           price:impression.price()
                                                                                        quantity:[NSString stringWithFormat:@"%f", impression.quantity().value()]
                                                                                         variant:impression.variant()];

        [sdkImpressions addObject:sdkImpression];
      }
    }

    // Set promotions if present
    if (params.promotions().has_value()) {
      auto promotions = params.promotions().value();

      for (int i = 0; i < promotions.size(); i++) {
        auto promo = promotions[i];
        TrackerTop100ECommPromo *sdkPromo = [[TrackerTop100ECommPromo alloc] initWithId:promo.id_()
                                                                                   name:promo.name()
                                                                               creative:promo.creative()
                                                                               position:promo.position()];

        [sdkPromotions addObject:sdkPromo];
      }
    }
  }

  // Convert Turbo Module params to SDK params
  TrackerTop100ECommerce *ecommParams = [[TrackerTop100ECommerce alloc] initWithCurrencyCode:params.currencyCode()
                                                                                      action:sdkAction
                                                                                    products:[sdkProducts copy]
                                                                                 impressions:[sdkImpressions copy]
                                                                                  promotions:[sdkPromotions copy]];

  [TrackerTop100 trackEcommWithEventName:eventName ecommParams:ecommParams];
}

- (NSString *)getWebViewScript
{
  return [TrackerTop100 getDataToWebView];
}

- (NSString *)getWebViewData
{
  return [TrackerTop100 getData];
}

- (void)activateSettings:(JS::NativeTrackerTop100::TrackerTop100Settings &)settings
{
  TrackerTop100Settings *builder = [[TrackerTop100Settings alloc] initWithProjectId:settings.projectId()];
  builder = [builder setAuthUserIdWithAuthUserId:settings.authUserId()];
  builder = [builder setEmailWithEmail:settings.email()];
  builder = [builder setPhoneWithPhone:settings.phone()];
  builder = [builder setPublisherIdWithPublisherId:settings.publisherId()];
  builder = [builder setPublisherScopeWithPublisherScope:settings.publisherScope()];
  builder = [builder setSberIdWithSberId:settings.sberId()];
  builder = [builder setRamblerIdWithRamblerId:settings.ramblerId()];
  builder = [builder setLocationTrackingWithValue:settings.locationTracking().value_or(NO)];

  [TrackerTop100 activateWithSettings:[builder build]];
}

- (void)activateMultipleSettings:(NSArray *)multipleSettings
{
  NSMutableArray<TrackerTop100Settings *> *sdkSettingsArray = [NSMutableArray array];

  // Cast each object to the C++ type
  for (id settingsObj in multipleSettings) {
    // Assuming you're passing NSValue wrappers or custom wrapper objects
    // You'll need to adapt this based on how you're storing the C++ objects in the NSArray
    JS::NativeTrackerTop100::TrackerTop100Settings *settings = (__bridge JS::NativeTrackerTop100::TrackerTop100Settings *)settingsObj;

    TrackerTop100Settings *builder = [[TrackerTop100Settings alloc] initWithProjectId:settings->projectId()];
    builder = [builder setAuthUserIdWithAuthUserId:settings->authUserId()];
    builder = [builder setEmailWithEmail:settings->email()];
    builder = [builder setPhoneWithPhone:settings->phone()];
    builder = [builder setPublisherIdWithPublisherId:settings->publisherId()];
    builder = [builder setPublisherScopeWithPublisherScope:settings->publisherScope()];
    builder = [builder setSberIdWithSberId:settings->sberId()];
    builder = [builder setRamblerIdWithRamblerId:settings->ramblerId()];
    builder = [builder setLocationTrackingWithValue:settings->locationTracking().value_or(NO)];

    [sdkSettingsArray addObject:builder];
  }

  [TrackerTop100 activateWithMultipleSettings:[sdkSettingsArray copy]];
}

- (void)trackDeeplink:(NSString *)deeplink
{
  [TrackerTop100 trackDeeplinkWithLink:deeplink];
}

- (void)setupDebugActive:(BOOL)isActive
{
  [TrackerTop100 setupDebugActive:isActive];
}

- (void)syncUserId:(NSString *)userId
         projectId:(NSString *)projectId
{
  [TrackerTop100 syncUserId:userId projectId:projectId];
}

- (void)updateOptions:(NSString *)projectId
          publisherId:(NSString * _Nullable)publisherId
       publisherScope:(NSString * _Nullable)publisherScope
                phone:(NSString * _Nullable)phone
                email:(NSString * _Nullable)email
{
  TrackerTop100Settings *builder = [[TrackerTop100Settings alloc] initWithProjectId:projectId];
  builder = [builder setEmailWithEmail:email];
  builder = [builder setPhoneWithPhone:phone];
  builder = [builder setPublisherIdWithPublisherId:publisherId];
  builder = [builder setPublisherScopeWithPublisherScope:publisherScope];
  [TrackerTop100 updateOptions:[builder build]];
}

- (void)trackRecSysEvent:(NSString *)eventName
                    meta:(NSDictionary * _Nullable)meta
                     url:(NSString * _Nullable)url
{
  NSDictionary<NSString *, NSString *> *stringMeta = nil;
  if (meta) {
    NSMutableDictionary<NSString *, NSString *> *mutableMeta = [NSMutableDictionary dictionary];
    for (NSString *key in meta) {
      id value = meta[key];
      if ([value isKindOfClass:[NSString class]]) {
        mutableMeta[key] = value;
      } else {
        mutableMeta[key] = [value description];
      }
    }
    stringMeta = [mutableMeta copy];
  }

  [TrackerTop100 trackRecSysEventWithEventName:eventName meta:stringMeta url:url];
}

@end
