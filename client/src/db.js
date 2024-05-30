const dbName = "chattering";
const userStoreName = "users";
const chatStoreName = "chatlist";

export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(userStoreName)) {
                const userStore = db.createObjectStore(userStoreName, { keyPath: "id", autoIncrement: true });
                userStore.createIndex("username", "username", { unique: true });
            }

            if (!db.objectStoreNames.contains(chatStoreName)) {
                const chatStore = db.createObjectStore(chatStoreName, { keyPath: "id", autoIncrement: true });
                chatStore.createIndex("name", "name", { unique: true });
            }
        };

        request.onsuccess = (event) => {
            console.log("Database opened successfully");
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            console.error("Error opening DB: " + event.target.errorCode);
            reject("Error opening DB: " + event.target.errorCode);
        };
    });
}

export function addUser(db, user) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([userStoreName], "readwrite");
        const store = transaction.objectStore(userStoreName);
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
        const transaction = db.transaction([userStoreName], "readonly");
        const store = transaction.objectStore(userStoreName);
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

export function addChatRoom(db, chatRoom) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([chatStoreName], "readwrite");
        const store = transaction.objectStore(chatStoreName);
        const request = store.add(chatRoom);

        request.onsuccess = () => {
            resolve("Chat room added");
        };

        request.onerror = (event) => {
            reject("Error adding chat room: " + event.target.errorCode);
        };
    });
}

export function getChatRoom(db, chatRoomName) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([chatStoreName], "readonly");
        const store = transaction.objectStore(chatStoreName);
        const index = store.index("name");
        const request = index.get(chatRoomName);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject("Error fetching chat room: " + event.target.errorCode);
        };
    });
}
