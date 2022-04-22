## Sequelize Script

npx sequelize-cli model:generate --name Ticket --attributes ticket_number:string,destination:string,type:string,visit_date:date,price:integer,qty:integer

npx sequelize-cli model:generate --name Tourist --attributes name:string,age:integer,id_card_number:string,phone_number:string,nationality:string

npx sequelize-cli model:generate --name Summary --attributes TicketId:integer,TouristId:integer
