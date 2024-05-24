import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { UserClass } from './user.model';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export class ProductClass extends TimeStamps {
  @prop({
    unique: true,
    type: () => String,
    default: () => `product_${nanoid()}`,
  })
  public productId!: string;

  @prop({ ref: () => UserClass })
  public user?: Ref<UserClass>;

  @prop({ type: () => String })
  public title!: string;

  @prop({ type: () => String })
  public description!: string;

  @prop({ type: () => Number })
  public price!: number;

  @prop({ type: () => String })
  public image!: string;
}

const ProductModel = getModelForClass(ProductClass);

export default ProductModel;
