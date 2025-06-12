import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("T_DM_MonHoc")
export class T_dmmonhoc {
    @PrimaryGeneratedColumn()
    MonId: number=0
    @Column()
    TenMon:string=""
}