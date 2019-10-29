import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Story {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100})
    title: string;

    @Column({length: 50})
    author: string;

    @Column()
    message: string;
}
