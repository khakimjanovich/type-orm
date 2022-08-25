import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, UpdateDateColumn} from "typeorm";
import {Person} from "./utils/Person";
import {Client} from "./Client";

@Entity('bankers')
export class Banker extends Person {
    @Column({
        unique: true,
        length: 10
    })
    employee_number: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @ManyToMany((type) => Client, {
        cascade: true,
    })
    @JoinTable({
        name: 'banker_client',
        joinColumn: {
            name: 'banker_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'client_id',
            referencedColumnName: 'id',
        },
    })
    clients: Client[];
}
