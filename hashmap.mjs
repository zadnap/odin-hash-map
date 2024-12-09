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
    if (this.length() + 1 >= this.#capacity * this.#loadFactor) {
      this.#grow();
    }

    const hashCode = this.#hash(key);

    if (this.#buckets[hashCode]) {
      if (this.#buckets[hashCode].hasOwnProperty(key)) {
        this.#buckets[hashCode] = { [key]: value };
      } else {
        this.#grow();
        this.set(key, value);
      }
    } else {
      this.#buckets[hashCode] = { [key]: value };
    }
  }

  get(key) {
    const hashCode = this.#hash(key);

    if (hashCode < 0 || hashCode >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (
      this.#buckets[hashCode] &&
      this.#buckets[hashCode].hasOwnProperty(key)
    ) {
      return this.#buckets[hashCode][key];
    } else {
      return null;
    }
  }

  has(key) {
    const hashCode = this.#hash(key);

    if (this.#buckets[hashCode] && this.#buckets[hashCode][key]) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    const hashCode = this.#hash(key);

    if (this.#buckets[hashCode] && this.#buckets[hashCode][key]) {
      this.#buckets[hashCode] = {};
      return true;
    } else {
      return false;
    }
  }

  length() {
    let countKeyStored = 0;
    this.#buckets.forEach((bucket) => {
      if (bucket && Object.keys(bucket).length > 0) {
        countKeyStored++;
      }
    });

    return countKeyStored;
  }

  clear() {
    this.#capacity = 16;
    this.#buckets = [];
  }

  keys() {
    const keyArray = [];

    this.#buckets.forEach((bucket) => {
      if (bucket && Object.keys(bucket).length > 0) {
        keyArray.push(Object.keys(bucket)[0]);
      }
    });

    return keyArray;
  }

  values() {
    const valueArray = [];

    this.#buckets.forEach((bucket) => {
      if (bucket && Object.keys(bucket).length > 0) {
        valueArray.push(bucket[Object.keys(bucket)[0]]);
      }
    });

    return valueArray;
  }

  entries() {
    const entryArray = [];

    this.#buckets.forEach((bucket) => {
      if (bucket && Object.keys(bucket).length > 0) {
        const key = Object.keys(bucket)[0];
        const value = bucket[Object.keys(bucket)[0]];

        entryArray.push({
          [key]: value,
        });
      }
    });

    return entryArray;
  }
}

export default HashMap;
