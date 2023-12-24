import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @ApiProperty({
    example: "123",
    description: "The User Id (System Generated)"
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "John Doe", description: "The User full name" })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: "male", description: "The User gender" })
  @Column({ nullable: false })
  gender: string;

  @ApiProperty({
    example: "2023-03-12T14:32:55.346Z",
    description: "The User creation date"
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: "2023-03-12T14:32:55.346Z",
    description: "The update date"
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
