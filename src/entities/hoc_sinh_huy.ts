import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('hoc_sinh')
export class Hoc_sinh{
    @PrimaryGeneratedColumn()
    rowId!: number;

    @Column({type:'nvarchar', length:500})
    schoolId!:string;

    @Column({type:'int'})
    nam_hoc_id!:string;

    @Column({type:'nvarchar', length:500})
    ma_dinh_danh!: number;

    @Column({type:'nvarchar', length:500})
    ho_ten!: string;

    @Column({type:'date'})
    ngay_sinh!: string;

    @Column({type:'nvarchar', length:500})
    lop!: string;

    @Column({type:'nvarchar', length:500})
    sdt_ph!: string;

    @Column({type:'nvarchar', length:500})
    email_ph!: string;

    @Column({type:'nvarchar', length:500})
    userName!:string;

    @Column({type:'nvarchar', length:500})
    password!: string;

    @Column({type:'bit'})
    isActive!:boolean;

    @Column({type:'date'})
    created_date!: string
}

