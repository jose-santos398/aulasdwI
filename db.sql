create database fatec;
use fatec;

create table student(
id int auto_increment not null,
nome varchar(100) null,
email varchar(100) null,
primary key(id));

insert into student values
(1,'ringo','ringo@gmail.com'),
(2,'john', 'john@gmail.com'),
(3,'paul','paul@gmail.com');

select * from student;