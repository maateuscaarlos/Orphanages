import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne} from 'typeorm';
import Orphanage from './Orphanage'

@Entity('images')
export default class Images{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(()=>Orphanage, orphanage=>orphanage.images)
    @JoinColumn({name:'orphanage_id'})
    orphanageKeyForeign:Orphanage;
}
