import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('user')
export class User{
    @PrimaryGeneratedColumn()
    userId!: number;  // Đánh dấu là definitely assigned

    @Column({type:'nvarchar', length:500})
    fullName!: string;

    @Column({type:'int'})
    roleId!: number;

    @Column({type:'nvarchar', length:500})
    userName!: string;

    @Column({type:'nvarchar', length:500})
    password!: string;

    @Column({type:'nvarchar', length:500})
    donviId!: string;

    @Column({type:'date'})
    created_date!: string;

}

