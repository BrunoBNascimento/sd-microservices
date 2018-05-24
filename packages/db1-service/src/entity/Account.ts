import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class Account {
        
    @PrimaryColumn()
    cc_codigo: number;

    @Column()
    cc_conta_corrente: string;

    @Column()
    cc_total_reais: number;

}
