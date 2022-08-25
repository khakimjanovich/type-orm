import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
import {PhotoMetadata} from "./PhotoMetadata";
import {User} from "./User";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column("text")
    description: string
    @Column()
    filename: string
    @Column("float")
    views: number
    @Column()
    isPublished: boolean

    @OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo)
    metadata: Relation<PhotoMetadata>

    @ManyToOne(() => User, (user) => user.photos)
    user: User
}