
create database contagrama with owner "postgres" 
  encoding 'UTF8'
  lc_collate = 'en_US.UTF-8'
  lc_ctype = 'en_US.UTF-8'
  template template0;

create user contagrama;

alter user contagrama with encrypted password :passwd;
