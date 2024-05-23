import bcrypt from 'bcrypt';
import config from 'config';
import { getModelForClass, pre, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface HookNextFunction {
  (error?: Error): any;
}

@pre<UserClass>('save', async function (next: HookNextFunction) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  return next();
})
export class UserClass extends TimeStamps {
  @prop({ unique: true, type: () => String })
  public email!: string;

  @prop({ type: () => String })
  public name!: string;

  @prop({ type: () => String })
  public password!: string;

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt
      .compare(candidatePassword, this.password)
      .catch((_e) => false);
  }
}

const UserModel = getModelForClass(UserClass);

export default UserModel;
