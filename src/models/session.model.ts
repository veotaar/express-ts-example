import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { UserClass } from './user.model';

export class SessionClass extends TimeStamps {
  @prop({ ref: () => UserClass })
  public user?: Ref<UserClass>;

  @prop({ type: () => Boolean, default: true })
  public valid?: boolean;

  @prop({ type: () => String })
  public userAgent?: string;
}

const SessionModel = getModelForClass(SessionClass);

export default SessionModel;
