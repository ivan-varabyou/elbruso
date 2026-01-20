
type EventHandler = (payload?: any) => void;

/**
 * Global UI Event Service for managing modals and generic UI events.
 * This acts as a central bus for UI interactions that need to be logged or handled globally.
 */
class UIEventService {
  private listeners = new Map<string, Set<EventHandler>>();

  /**
   * Emit a global event
   */
  emit(event: string, payload?: any) {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(payload));
    }
  }

  /**
   * Subscribe to a global event
   */
  on(event: string, handler: EventHandler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(handler);

    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(handler);
    };
  }

  /**
   * Open a modal by ID
   */
  openModal(modalId: string, props?: any) {
    this.emit('open-modal', { modalId, props });
    this.logAction(`Open Modal: ${modalId}`, props);
  }

  /**
   * Close the currently active modal
   */
  closeModal() {
    this.emit('close-modal');
    this.logAction('Close Modal');
  }

  /**
   * Log an explicit action (useful for programmatic actions not tied to a direct click)
   */
  logAction(action: string, details?: any) {
    this.emit('log-action', { action, details });
  }
}

export const uiEvents = new UIEventService();
