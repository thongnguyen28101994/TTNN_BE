import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity('mon_an')
export class Mon_an{
    @PrimaryGeneratedColumn()
    mon_an_id!: number;

    @Column({type:'date'})
    ngay!: Date;

    @Column({type:'nvarchar', length:500})
    buoi!: string;

    @Column({type:'nvarchar', length:500})
    ten_mon_an!: string;

    @Column({type:'date'})
    ngay_het_han!: string;

    @Column({type:'int'})
    created_userId!: number;

    @Column({type:'nvarchar', length:500})
    schoolId!: string;

    @Column({type:'nvarchar', length:500})
    imageName?: string;

    @Column({type:'nvarchar', length:500})
    imageId?: string;

    @Column({type:'nvarchar', length:500})
    imageFile?:string
}