// Database configuration
const dbName = "chattering";
const userStoreName = "users";
const chatStoreName = "chatlist";
const messageStoreName = "messages";

export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Create the user store if it doesn't exist
            if (!db.objectStoreNames.contains(userStoreName)) {
                const userStore = db.createObjectStore(userStoreName, { keyPath: "id", autoIncrement: true });
                userStore.createIndex("username", "username", { unique: true });
            }

            // Create the chat store if it doesn't exist
            if (!db.objectStoreNames.contains(chatStoreName)) {
                const chatStore = db.createObjectStore(chatStoreName, { keyPath: "id", autoIncrement: true });
                chatStore.createIndex("name", "name", { unique: true });
            }

            // Create the message store if it doesn't exist
            if (!db.objectStoreNames.contains(messageStoreName)) {
                const messageStore = db.createObjectStore(messageStoreName, { keyPath: "id", autoIncrement: true });
                messageStore.createIndex("roomName", "roomName", { unique: false });
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

export function addMessage(db, message) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([messageStoreName], "readwrite");
        const store = transaction.objectStore(messageStoreName);
        const request = store.add(message);

        request.onsuccess = () => {
            resolve("Message added");
        };

        request.onerror = (event) => {
            reject("Error adding message: " + event.target.errorCode);
        };
    });
}

export function getMessages(db, roomName) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([messageStoreName], "readonly");
        const store = transaction.objectStore(messageStoreName);
        const index = store.index("roomName");
        const request = index.getAll(roomName);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject("Error fetching messages: " + event.target.errorCode);
        };
    });
}