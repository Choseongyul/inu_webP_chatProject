create database chattering;
use chattering;

create table users (
	id int auto_increment primary key,
	userId varchar(255) not null unique,
    password varchar(255) not null,
    created_at timestamp default current_timestamp
);