const dbName = "chattering";
const storeName = "users";

export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                const store = db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
                store.createIndex("username", "username", { unique: true });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject("Error opening DB: " + event.target.errorCode);
        };
    });
}

export function addUser(db, user) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.add(user);

        request.onsuccess = () => {
            resolve("User added");
        };

        request.onerror = (event) => {
            reject("Error adding user: " + event.target.errorCode);
        };
    });
}

export function getUser(db, username) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readonly");
        const store = transaction.objectStore(storeName);
        const index = store.index("username");
        const request = index.get(username);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject("Error fetching user: " + event.target.errorCode);
        };
    });
}
