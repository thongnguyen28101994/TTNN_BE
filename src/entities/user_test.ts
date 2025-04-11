import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('usertest')
export class User_test{
    @PrimaryGeneratedColumn()
    userId_test!: number;  // Đánh dấu là definitely assigned

    @Column({type:'nvarchar', length:500})
    fullName_test!: string;

    @Column({type:'int'})
    roleId_test!: number;

    @Column({type:'nvarchar', length:500})
    userName_test!: string;

    @Column({type:'nvarchar', length:500})
    password_test!: string;

    @Column({type:'nvarchar', length:500})
    active_password!: string;

    @Column({type:'nvarchar', length:500})
    donviId_test!: string;

    @Column({type:'date'})
    created_date_test!: string;


}

