import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  consentStorageKey,
  getStoredConsent,
  hasDoNotTrack,
  initialConsentState,
  isAnalyticsAllowed,
  storeConsent,
} from "./consent";

describe("consent state", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("denies analytics and ad storage by default", () => {
    expect(initialConsentState()).toEqual({
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  });

  it("reads stored consent and defaults unset fields to denied", () => {
    window.localStorage.setItem(
      consentStorageKey(),
      JSON.stringify({
        state: { analytics_storage: "granted", ad_storage: "denied" },
        expiresAt: Date.now() + 60_000,
      }),
    );
    expect(getStoredConsent()).toEqual({
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  });

  it("falls back to denied when stored payload is malformed", () => {
    window.localStorage.setItem(consentStorageKey(), "not-json");
    expect(getStoredConsent().analytics_storage).toBe("denied");
  });

  it("writes consent to localStorage on grant", () => {
    storeConsent({ analytics_storage: "granted" });
    const stored = JSON.parse(
      window.localStorage.getItem(consentStorageKey()) ?? "{}",
    );
    expect(stored.state.analytics_storage).toBe("granted");
    expect(typeof stored.expiresAt).toBe("number");
  });

  it("isAnalyticsAllowed returns true only when analytics_storage is granted", () => {
    expect(isAnalyticsAllowed(initialConsentState())).toBe(false);
    expect(
      isAnalyticsAllowed({
        ...initialConsentState(),
        analytics_storage: "granted",
      }),
    ).toBe(true);
  });
});

describe("Do Not Track detection", () => {
  let originalSignal: PropertyDescriptor | undefined;
  let originalWindowSignal: PropertyDescriptor | undefined;
  let originalMsSignal: PropertyDescriptor | undefined;

  beforeEach(() => {
    originalSignal = Object.getOwnPropertyDescriptor(navigator, "doNotTrack");
    originalWindowSignal = Object.getOwnPropertyDescriptor(
      window,
      "doNotTrack",
    );
    originalMsSignal = Object.getOwnPropertyDescriptor(
      navigator,
      "msDoNotTrack",
    );
  });

  afterEach(() => {
    // Restore the original descriptors so each test starts from a clean slate.
    for (const [target, key, descriptor] of [
      [navigator, "doNotTrack", originalSignal],
      [window, "doNotTrack", originalWindowSignal],
      [navigator, "msDoNotTrack", originalMsSignal],
    ] as const) {
      if (descriptor) {
        Object.defineProperty(target, key, descriptor);
      } else {
        try {
          delete (target as unknown as Record<string, unknown>)[key];
        } catch {
          // Non-configurable; leave as-is.
        }
      }
    }
  });

  function setSignal(target: object, key: string, value: string | null) {
    Object.defineProperty(target, key, {
      value,
      configurable: true,
      writable: true,
    });
  }

  it("returns true when navigator.doNotTrack=1", () => {
    setSignal(navigator, "doNotTrack", "1");
    setSignal(window, "doNotTrack", null);
    setSignal(navigator, "msDoNotTrack", null);
    expect(hasDoNotTrack()).toBe(true);
  });

  it("returns true when window.doNotTrack=1", () => {
    setSignal(navigator, "doNotTrack", null);
    setSignal(window, "doNotTrack", "1");
    setSignal(navigator, "msDoNotTrack", null);
    expect(hasDoNotTrack()).toBe(true);
  });

  it("returns true when msDoNotTrack=1 (legacy IE / Edge)", () => {
    setSignal(navigator, "doNotTrack", null);
    setSignal(window, "doNotTrack", null);
    setSignal(navigator, "msDoNotTrack", "1");
    expect(hasDoNotTrack()).toBe(true);
  });

  it("returns true when doNotTrack=yes (Firefox legacy)", () => {
    setSignal(navigator, "doNotTrack", "yes");
    setSignal(window, "doNotTrack", null);
    setSignal(navigator, "msDoNotTrack", null);
    expect(hasDoNotTrack()).toBe(true);
  });

  it("returns false when no DNT signal is set", () => {
    setSignal(navigator, "doNotTrack", null);
    setSignal(window, "doNotTrack", null);
    setSignal(navigator, "msDoNotTrack", null);
    expect(hasDoNotTrack()).toBe(false);
  });
});
