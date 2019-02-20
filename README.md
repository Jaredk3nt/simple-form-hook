# useSimpleForm React Hook

## Usage

```js
import React from "react";
import useSimpleForm from "use-simple-form";

function FormComponent() {
  const [form, updateForm] = useSimpleForm({
    name: "",
    email: "",
    address: {
      street: {
        line1: "",
        line2: ""
      },
      state: "",
      zipCode: ""
    }
  });

  const zipValidator = zip => /^\d+$/.test(zip.trim());

  return (
    <form>
      <input name="name" placeholder="Name" onChange={updateForm()} />
      <input name="email" placeholder="Email Address" onChange={updateForm()} />
      <input
        name="line1"
        placeholder="Street"
        onChange={updateForm({ parent: "address.street" })}
      />
      <input
        name="line2"
        placeholder="Apt/Unit Number"
        onChange={updateForm({ parent: "address.street" })}
      />
      <input
        name="state"
        placeholder="State"
        onChange={updateForm({ parent: "address" })}
      />
      <input
        name="zipCode"
        placeholder="Zip Code"
        onChange={updateForm({ validator: zipValidator, parent: "address" })}
      />
    </form>
  );
}
```
