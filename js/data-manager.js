/* ============================================================
   DATA MANAGER — localStorage wrapper with versioning & migration
   ============================================================ */
const DataManager = {
  VERSION: 1,
  PREFIX: 'clariai_',

  // Save a single key-value pair
  saveData(key, value) {
    try {
      localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn('DataManager: save failed for', key, e);
    }
  },

  // Load a single key, returns defaultValue if not found
  loadData(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(this.PREFIX + key);
      return raw !== null ? JSON.parse(raw) : defaultValue;
    } catch (e) {
      console.warn('DataManager: load failed for', key, e);
      return defaultValue;
    }
  },

  // Remove a single key
  removeData(key) {
    localStorage.removeItem(this.PREFIX + key);
  },

  // Get all data as a plain object
  getAllData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.PREFIX)) {
        try {
          data[key.slice(this.PREFIX.length)] = JSON.parse(localStorage.getItem(key));
        } catch (e) {
          data[key.slice(this.PREFIX.length)] = localStorage.getItem(key);
        }
      }
    }
    data._version = this.VERSION;
    return data;
  },

  // Import data (for restore/sync)
  importData(dataObj) {
    const version = dataObj._version || 0;
    // Run migrations if needed
    const migrated = this.migrate(dataObj, version);
    Object.keys(migrated).forEach(key => {
      if (key !== '_version') {
        this.saveData(key, migrated[key]);
      }
    });
    this.saveData('_version', this.VERSION);
  },

  // Clear all app data
  clearAllData() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    // Also clear non-prefixed legacy keys
    ['clari-theme'].forEach(key => localStorage.removeItem(key));
  },

  // Migration system
  migrate(data, fromVersion) {
    let migrated = { ...data };
    // Example migration: version 0 -> 1
    // if (fromVersion < 1) { migrated.newField = migrated.oldField; delete migrated.oldField; }
    return migrated;
  },

  // Check version and run migrations on load
  init() {
    const storedVersion = this.loadData('_version', 0);
    if (storedVersion < this.VERSION) {
      const allData = this.getAllData();
      this.importData(allData);
    }
  }
};

/* ============================================================
   HEART MANAGER — heart regeneration system
   ============================================================ */
const HeartManager = {
  MAX_HEARTS: 5,
  REGEN_INTERVAL_MS: 30 * 60 * 1000, // 30 minutes

  // Calculate hearts based on time elapsed since last loss
  calculateHearts(currentHearts, lastLostTimestamp) {
    if (currentHearts >= this.MAX_HEARTS) return this.MAX_HEARTS;
    if (!lastLostTimestamp) return currentHearts;

    const now = Date.now();
    const elapsed = now - lastLostTimestamp;
    const regenerated = Math.floor(elapsed / this.REGEN_INTERVAL_MS);

    return Math.min(this.MAX_HEARTS, currentHearts + regenerated);
  },

  // Get the timestamp for when the next heart will regenerate
  getNextRegenTime(currentHearts, lastLostTimestamp) {
    if (currentHearts >= this.MAX_HEARTS || !lastLostTimestamp) return null;
    const elapsed = Date.now() - lastLostTimestamp;
    const msIntoCurrentRegen = elapsed % this.REGEN_INTERVAL_MS;
    return this.REGEN_INTERVAL_MS - msIntoCurrentRegen;
  }
};
