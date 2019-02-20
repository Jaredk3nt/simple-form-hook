# use-simple-form

`use-simple-form` is a React hook for handling state in simple form applications. It supports nested object and field validation right out of the box.

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
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={updateForm()}
      />
      <input
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={updateForm()}
      />
      <input
        name="line1"
        placeholder="Street"
        value={form.address.street.line1}
        onChange={updateForm({ parent: "address.street" })}
      />
      <input
        name="line2"
        placeholder="Apt/Unit Number"
        value={form.address.street.line2}
        onChange={updateForm({ parent: "address.street" })}
      />
      <input
        name="state"
        placeholder="State"
        value={form.address.state}
        onChange={updateForm({ parent: "address" })}
      />
      <input
        name="zipCode"
        placeholder="Zip Code"
        value={form.address.zipCode}
        onChange={updateForm({ validator: zipValidator, parent: "address" })}
      />
    </form>
  );
}
```

> Only `input`'s are used in this example but the hook works fine with any element that will return a value from `event.target.value` during onChange, like `select` or `textarea`.

## API

### Hook Definition

To use the hook simple give the intitial state object to the `useSimpleForm` hook function. Make sure you define all of the nested objects you want to use in the form in your intial state!

```js
useSimpleForm({
  /*Initial State Object*/
});
```

`useSimpleForm` returns a 'tuple' containing the current form state in the `0th` position and an updator function in the `1st` position.

```js
const [form, formUpdator] = useSimpleForm({});
```

### Form Updator

The `formUpdator` is a function that returns the updator function so that you can inject configuration into the updator.

```js
const formFieldUpdator = formUpdator({
  validator: value => {}, // Input validation function that runs before onChange
  parent: "path.to.parent.object" // Object path separated by '.' used to set nested values
});
```

The formUpdator function that is returned only expects the `event` object passed by onChange and uses `event.target.name` to find the field in the form state object and `event.target.value` to set the field in the state object. Because of this you **must supply a name to your input components**.

#### Validator

The `validator` expects a function that takes in the value input by the user and returns a boolean (valid = true / invalid = false). The validator then sets an addiditional value in your form state equivalent to the `name + '_valid'`.

```js
// Heres an example from the usage section where we set an 'invalid' class based on this value
const zipValidator = zip => /^\d+$/.test(zip.trim());

<input
  name="zipCode"
  placeholder="Zip Code"
  value={form.address.zipCode}
  className={!form.address.zipCode_valid && 'invalid' }
  onChange={updateForm({
    validator: zipValidator,
    parent: "address"
  })}
/>;
```

#### Parent

The `parent` configuration variable must be a string of keys in the form state object separated by `.` periods.

```js
const parent = 'x.y.z';
const obj = {
  x: {
    y: {
      z: {
        a: 'value'
      }
    }
  }
}
```

In this example the object defined by the parent string would be: `{ a: 'value' }`.