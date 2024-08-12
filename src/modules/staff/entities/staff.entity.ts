import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('staff')
export class StaffEntity {
    @PrimaryGeneratedColumn()
    idStaff: number;

    @Column({ type: String, nullable: false })
    firstName: String;

    @Column({ type: String, nullable: false })
    lastName: String;

    @Column({ type: String, nullable: false })
    photo: String;

    @Column({ type: String, nullable: false, unique: true })
    email: String;

    @Column({ type: String, nullable: false })
    password: String;

    @Column({ type: String, nullable: false })
    address: String;

    @Column({ type: String, nullable: false })
    phone: String;

    @Column({ type: String, nullable: false })
    status: String;
}
