import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';

import { getUsername } from '../user/userSlice';
import { getCart, clearCart, getTotalCartPrice } from '../cart/cartSlice';
import { createOrder } from '../../services/apiRestaurant';

import store from '../../store';
import { formatCurrency } from '../../utils/helpers';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const username = useSelector(getUsername);

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0; // 20%
  const totalPrice = totalCartPrice + priorityPrice;

  const isSubmitting = navigation.state === 'submitting';

  // get errors
  const formErrors = useActionData();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      {/* also works */}
      {/* <Form method="POST" action="order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {/* display errors */}
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/*can't use selector in action function -> use hidden input trick*/}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          <Button variant="primary" disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing order'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  // get all the data from the form
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // format data
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  // validate data
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // everything is ok -> submit with POST request
  const newOrder = await createOrder(order);

  /* can't use the dispatch hook outside components -> 
  directly import the redux store and dispatch on it 
  (DON'T OVERUSE - deactivates a couple of redux performance optimizations)
  */
  store.dispatch(clearCart());

  // display the placed order
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
