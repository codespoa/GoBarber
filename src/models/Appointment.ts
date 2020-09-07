import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'

import User from './User';

@Entity('appointments')
class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    provider_id: string

    @Column('time with time zone')
    date: Date

    @CreateDateColumn()
    created_at: Date
    
    @UpdateDateColumn()
    updated_at: Date

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User

}

export default Appointment