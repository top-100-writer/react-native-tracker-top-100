package com.trackertop100

import android.app.Application
import android.content.Context
import android.content.SharedPreferences
import com.trackertop100.NativeTrackerTop100Spec
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.Arguments
import com.google.gson.FieldNamingPolicy.IDENTITY
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import ru.top100.tracker.kraken.data.model.KrakenSettings
import ru.top100.tracker.kraken.di.Kraken

class TrackerTop100Module(reactContext: ReactApplicationContext) : NativeTrackerTop100Spec(reactContext) {

  private val reactContext = reactContext
  private var kraken: Kraken? = null

  internal val gson: Gson by lazy { provideGson() }

  override fun getName() = NAME

  override fun activateSettings(settings: ReadableMap?) {
    val application : Application = reactContext.applicationContext as Application

    val settingsJson = Arguments.toBundle(settings)?.toString() ?: "{}"
    val settingsClass: ReactNativeTrackerTop100Settings = gson.fromJson(settingsJson, ReactNativeTrackerTop100Settings::class.java)

    val krakenSettings = KrakenSettings(
      projectId = settingsClass.projectId ?: EMPTY,
      userId = settingsClass.authUserId,
      publisherId = settingsClass.publisherId,
      publisherScope = settingsClass.publisherScope,
      phoneSha256Hash = settingsClass.phone,
      emailSha256Hash = settingsClass.email,
    )

    val listKrakenSettings: List<KrakenSettings> = listOf(element = krakenSettings)

    // return Kraken
    kraken = Kraken.activate(
      application = application,
      listKrakenSettings = listKrakenSettings,
    )

    val sberId = settingsClass.sberId
    val sberSubId = settingsClass.sberSubId
    val ramblerId = settingsClass.ramblerId

    sberId?.let { kraken = kraken?.sberId(sberId = sberId) }
    sberSubId?.let { kraken = kraken?.sberSubId(sberSubId = sberSubId) }
    ramblerId?.let { kraken = kraken?.ramblerId(ramblerId = ramblerId) }
  }

  override fun activateMultipleSettings(multipleSettings: ReadableArray?) {
    val application : Application = reactContext.applicationContext as Application

    val settingsList = mutableListOf<ReactNativeTrackerTop100Settings>()
    if (multipleSettings != null) {
      for (i in 0 until multipleSettings.size()) {
        val settingsMap = multipleSettings.getMap(i)
        val settingsJson = Arguments.toBundle(settingsMap)?.toString() ?: "{}"
        val settingsClass = gson.fromJson(settingsJson, ReactNativeTrackerTop100Settings::class.java)
        settingsList.add(settingsClass)
      }
    }
    val settingsClasses: List<ReactNativeTrackerTop100Settings> = settingsList

    val listKrakenSettings: MutableList<KrakenSettings> = mutableListOf()
    settingsClasses.forEach { settingsClass ->
      listKrakenSettings.add(
        KrakenSettings(
          projectId = settingsClass.projectId ?: EMPTY,
          userId = settingsClass.authUserId,
          publisherId = settingsClass.publisherId,
          publisherScope = settingsClass.publisherScope,
          phoneSha256Hash = settingsClass.phone,
          emailSha256Hash = settingsClass.email,
        )
      )

      val sberId = settingsClass.sberId
      val sberSubId = settingsClass.sberSubId
      val ramblerId = settingsClass.ramblerId

      sberId?.let { kraken = kraken?.sberId(sberId = sberId) }
      sberSubId?.let { kraken = kraken?.sberSubId(sberSubId = sberSubId) }
      ramblerId?.let { kraken = kraken?.ramblerId(ramblerId = ramblerId) }
    }

    // return Kraken
    kraken = Kraken.activate(
      application = application,
      listKrakenSettings = listKrakenSettings,
    )
  }

  override fun trackRecSysEvent(eventName: String?, meta: ReadableMap?, url: String?) {
    val params = mutableMapOf<String, String>()
    if (meta != null) {
      val iterator = meta.keySetIterator()
      while (iterator.hasNextKey()) {
        val key = iterator.nextKey()
        val value = meta.getString(key) ?: ""
        params[key] = value
      }
    }

    // return Unit
    kraken?.trackRecEvent(
      url = url ?: "",
      eventName = eventName ?: "",
      params = params,
    )
  }

  override fun trackPageView(
    className: String,
    url: String?,
    title: String?,
  ) {
    // return Unit
    kraken?.trackPageView(
      activityName = className,
      url = url,
      title = title,
    )
  }

  override fun trackEvent(eventName: String?, values: ReadableMap?) {
    val params = mutableMapOf<String, String>()
    if (values != null) {
      val iterator = values.keySetIterator()
      while (iterator.hasNextKey()) {
        val key = iterator.nextKey()
        val value = values.getString(key) ?: ""
        params[key] = value
      }
    }

    // return Unit
    kraken?.trackEvent(
      eventName = eventName ?: "",
      params = params,
    )
  }

  override fun trackDeeplink(
    link: String,
  ) {
    // return Unit
    kraken?.trackDeepLink(
      link = link,
    )
  }

  override fun updateOptions(
    projectId: String,
    publisherId: String?,
    publisherScope: String?,
    phone: String?,
    email: String?,
  ) {
    // return Unit
    kraken?.updateOptions(
      phone = phone,
      email = email,
      publisherId = publisherId,
      publisherScope = publisherScope,
      projectId = projectId,
    )
  }

  override fun syncUserId(
    userId: String?,
    projectId: String,
  ) {
    // return Kraken
    kraken = kraken?.syncUserId(
      userId = userId,
      projectId = projectId,
    )
  }

  override fun setupDebugActive(
    flag: Boolean,
  ) {
    // return Kraken
    kraken = kraken?.debug(
      flag = flag,
    )
  }

  override fun trackEcomm(eventName: String?, params: ReadableMap?) {
    val paramsJson = if (params != null) {
      Arguments.toBundle(params)?.toString() ?: "{}"
    } else {
      "{}"
    }
    // return Unit
    kraken?.trackEcom(
      eventName = eventName ?: "",
      params = paramsJson,
    )
  }

  override fun getWebViewScript(): String? {
    return CURRENTLY_NOT_SUPPORTED
  }

  override fun getWebViewData(): String? {
    return kraken?.getData()
  }

  fun activate() {
    val application : Application = reactContext.applicationContext as Application

    // return Kraken
    kraken = Kraken.activate(
      application = application,
    )
  }

  fun firstLaunch() {
    // return Unit
    kraken?.firstLaunch()
  }

  fun enableActivityAutoTracking() {
    // return Kraken
    kraken = kraken?.enableActivityAutoTracking()
  }

  fun disableActivityAutoTracking() {
    // return Kraken
    kraken = kraken?.disableActivityAutoTracking()
  }

  fun handleCrash(
    flag: Boolean,
  ) {
    // return Kraken
    kraken = kraken?.handleCrash(
      flag = flag,
    )
  }

  fun sberId(
    sberId: String,
  ) {
    // return Kraken
    kraken = kraken?.sberId(
      sberId = sberId,
    )
  }

  fun sberSubId(
    sberSubId: String,
  ) {
    // return Kraken
    kraken = kraken?.sberSubId(
      sberSubId = sberSubId,
    )
  }

  fun ramblerId(
    ramblerId: String,
  ) {
    // return Kraken
    kraken = kraken?.ramblerId(
      ramblerId = ramblerId,
    )
  }

  // private

  private fun provideGson(): Gson {
    return GsonBuilder()
      .setLenient()
      .setPrettyPrinting()
      .setFieldNamingPolicy(IDENTITY)
      .create()
  }

  private data class ReactNativeTrackerTop100Settings(
    val authUserId: String? = null,
    val email: String? = null,
    val phone: String? = null,
    val publisherId: String? = null,
    val publisherScope: String? = null,
    val sberId: String? = null,
    val sberSubId: String? = null,
    val ramblerId: String? = null,
    val locationTracking: Boolean? = null,
    val projectId: String? = null,
  )

  companion object {
    const val NAME = "TrackerTop100"
    const val EMPTY = ""
    const val CURRENTLY_NOT_SUPPORTED = "Currently not supported"
  }
}
