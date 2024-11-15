import { useDispatch } from 'react-redux';

import Button from '../../ui/Button';

import { decreaseItemsQuantity, increaseItemsQuantity } from './cartSlice';

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        variant="round"
        onClick={() => dispatch(decreaseItemsQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        variant="round"
        onClick={() => dispatch(increaseItemsQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
