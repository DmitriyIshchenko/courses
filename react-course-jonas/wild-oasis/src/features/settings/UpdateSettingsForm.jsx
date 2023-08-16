import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings = {}, // init value
  } = useSettings();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e) {
    const { name, value } = e.target;

    if (!value || +value === settings[name]) return;
    updateSetting({ [name]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          name="minBookingLength"
          onBlur={handleUpdate}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="max-nights"
          defaultValue={maxBookingLength}
          name="maxBookingLength"
          onBlur={handleUpdate}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          name="maxGuestsPerBooking"
          onBlur={handleUpdate}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          disabled={isUpdating}
          id="breakfast-price"
          defaultValue={breakfastPrice}
          name="breakfastPrice"
          onBlur={handleUpdate}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
