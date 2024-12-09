class HashMap {
  #capacity = 16;
  #loadFactor = 0.75;
  #buckets = [];

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.#capacity;
  }

  #grow() {
    this.#capacity *= 2;

    const newBuckets = [];

    this.#buckets.forEach((bucket) => {
      if (bucket && Object.keys(bucket).length > 0) {
        const key = Object.keys(bucket)[0];
        const value = bucket[key];
        const hashCode = this.#hash(key);

        newBuckets[hashCode] = { [key]: value };
      }
    });

    this.#buckets = newBuckets;
  }

  set(key, value) {
    if (this.length() >= this.#capacity * this.#loadFactor) {
      this.#grow();
    }

    const hashCode = this.#hash(key);
    this.#buckets[hashCode] = this.#buckets[hashCode] || {};
    this.#buckets[hashCode][key] = value;
  }

  get(key) {
    const hashCode = this.#hash(key);
    return this.#buckets[hashCode]?.[key] ?? null;
  }

  has(key) {
    const hashCode = this.#hash(key);
    return Boolean(this.#buckets[hashCode]?.[key]);
  }

  remove(key) {
    const hashCode = this.#hash(key);
    if (this.#buckets[hashCode]?.[key]) {
      delete this.#buckets[hashCode][key];
      return true;
    }
    return false;
  }

  length() {
    return this.#buckets.reduce(
      (count, bucket) => count + (bucket ? Object.keys(bucket).length : 0),
      0
    );
  }

  clear() {
    this.#capacity = 16;
    this.#buckets = [];
  }

  keys() {
    return this.#buckets.flatMap((bucket) =>
      bucket ? Object.keys(bucket) : []
    );
  }

  values() {
    return this.#buckets.flatMap((bucket) =>
      bucket ? Object.values(bucket) : []
    );
  }

  entries() {
    return this.#buckets.flatMap((bucket) =>
      bucket
        ? Object.entries(bucket).map(([key, value]) => ({ [key]: value }))
        : []
    );
  }
}

export default HashMap;
