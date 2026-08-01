export interface ToastMessage {
  id: number;
  text: string;
}

type Listener = (toast: ToastMessage) => void;

const listeners = new Set<Listener>();
let nextId = 0;

/** Subscribe to toasts. Returns an unsubscribe function. */
export function onToast(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function showToast(text: string) {
  const toast = { id: nextId++, text };
  listeners.forEach((listener) => listener(toast));
}

/**
 * Runs a file-open call, turning a rejection into a toast rather than an
 * unhandled error. Resolves to null when nothing was loaded.
 *
 * Cancelling the file picker rejects with an AbortError, which is not a
 * failure and stays silent.
 */
export async function loadOrToast<T>(load: () => Promise<T>): Promise<T | null> {
  try {
    return await load();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return null;
    }
    showToast(
      error instanceof Error ? error.message : "Could not open that file."
    );
    return null;
  }
}
