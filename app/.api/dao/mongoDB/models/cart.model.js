import mongoose from 'mongoose';

const cartCollection = 'cart';

const cartSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			default: () => new mongoose.Types.ObjectId().toString()
		},
		products: {
			type: [
				{
					product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
					quantity: Number
				}
			],
			default: []
		}
	},
	{ timestamps: true }
);

cartSchema.pre('find', function () {
	this.populate('products.product');
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
