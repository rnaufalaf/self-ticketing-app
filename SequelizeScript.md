## Sequelize Script

npx sequelize-cli model:generate --name Destination --attributes name:string,type:string,image:string,price:integer,description:string

npx sequelize-cli model:generate --name Ticket --attributes DestinationId:integer,visit_date:string,qty:integer,grossAmount:integer

npx sequelize-cli model:generate --name Tourist --attributes name:string,age:integer,id_card_number:string,phone_number:string,nationality:string,photo:string

npx sequelize-cli model:generate --name Summary --attributes TicketId:integer,TouristId:integer
