create database chattering;
use chattering;

create table users (
	id int auto_increment primary key,
	userId varchar(255) not null unique,
    password varchar(255) not null,
    created_at timestamp default current_timestamp
);

CREATE TABLE chatrooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table messages (
    id int auto_increment primary key,
    chatroom_id int,
    user_id int,
    message text,
    created_at timestamp default current_timestamp,
    foreign key (chatroom_id) references chatrooms(id),
    foreign key (user_id) references users(id)
);