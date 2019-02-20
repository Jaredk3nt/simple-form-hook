import { useState } from 'react';

// Utility for updating values with parent objects
function deepSetImm(obj, dest, path, updator) {
  if (!path || !path.length) {
    return { ...obj, ...updator };
  }
  if (typeof path === "string") {
    path = path.split(".");
  }
  if (!dest || Object.keys(dest).length === 0) {
    dest = { ...obj };
  }

  const current = path[0];
  dest[current] = deepSet(
    obj[current],
    dest[current],
    path.slice(1),
    updator
  );

  return dest;
}

function useSimpleForm(initialState) {
  // Set up state object
  const [form, update] = useState(initialState);
  // Return actual updater function for deep updates
  return [
    form,
    ({ validator, parent } = {}) => {
      return e => {
        const name = e.target.name;
        const value = e.target.value.trim();
        const updator = {
          [name]: value,
          ...(validator && { [`${name}_valid`]: validator(value) })
        };

        if (parent) {
          return update(deepSetImm(form, {}, parent, updator));
        }

        return update({ ...form, ...updator });
      };
    }
  ];
}


export default useSimpleForm;