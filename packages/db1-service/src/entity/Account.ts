import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Account {
        
    @PrimaryGeneratedColumn()
    cc_codigo: number;

    @Column()
    cc_conta_corrente: string;

    @Column()
    cc_total_reais: number;

}
