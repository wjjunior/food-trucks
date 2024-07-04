import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@ObjectType()
@Entity()
@Unique(['locationId'])
export class FoodTruck {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  locationId: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  latitude: string;

  @Field()
  @Column()
  longitude: string;
}
