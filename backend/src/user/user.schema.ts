import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LoggedEvent } from 'src/types';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered.'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  log: LoggedEvent[];
}

export const UserSchema = SchemaFactory.createForClass(User);
