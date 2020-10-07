import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class FieldError {
  @Field(() => String)
  field: string;
  @Field(() => String)
  message: string;
}
