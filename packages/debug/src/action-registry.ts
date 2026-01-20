
/**
 * Registry to map stable IDs (or regular IDs) to human-readable action descriptions.
 * This allows decoupling the UI definition from the logging logic.
 */
class ActionRegistryService {
  private registry = new Map<string, string>();

  /**
   * Register a description for a specific ID.
   * @param id The stable ID or element ID
   * @param description Human-readable description of the action
   */
  register(id: string, description: string) {
    this.registry.set(id, description);
  }

  /**
   * Get the description for a specific ID.
   * @param id The stable ID or element ID
   */
  get(id: string): string | undefined {
    return this.registry.get(id);
  }

  /**
   * Unregister an ID (useful for cleanup if needed, though usually not strictly necessary for stable IDs)
   */
  unregister(id: string) {
    this.registry.delete(id);
  }
  
  /**
   * Clear all registrations
   */
  clear() {
    this.registry.clear();
  }
}

export const ActionRegistry = new ActionRegistryService();
