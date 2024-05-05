import * as amplitude from "@amplitude/analytics-browser";

export const initAmplitude = () => {
  if (import.meta.env.MODE === "development") {
    return;
  }
  amplitude.init(import.meta.env.VITE_AMPLITUDE_KEY);
};

export const callAnalytics = (eventName: string, eventProperties?: any) => {
  if (import.meta.env.MODE === "development") {
    console.log("Analytics event: ", eventName, eventProperties);
    return;
  }
  amplitude.track(eventName, eventProperties);
};
