/**
 * Check if experimental features are enabled by reading from localStorage
 * This is used in clientLoaders where we can't use React hooks
 */
export function isExperimentalFeaturesEnabled(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const stored = localStorage.getItem("edutools-experimental-features");
    if (!stored) {
      return false;
    }

    const parsed = JSON.parse(stored);
    // Zustand persist stores data in { state: { ... }, version: number } format
    return parsed?.state?.enabled === true;
  } catch {
    return false;
  }
}

