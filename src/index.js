// Utility for updating values with parent objects
function deepSetImm(obj, dest, path, field, value) {
  if (!path || !path.length) {
    return { ...obj, [field]: value };
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
    field,
    value
  );

  return dest;
}

function useSimpleForm(initialState) {
  // Set up state object
  const [form, update] = useState(initialState);
  // Return actual updater function for deep updates
  return [
    form,
    ({ validator, parent }) => {
      return e => {
        const name = e.target.name;
        const value = e.target.value.trim();
        const updator = {
          [name]: value,
          ...(validator && { [`${name}_valid`]: validator(value) })
        };

        if (parent) {
          return update(deepSetImm(form, {}, parent, name, value));
        }

        return update({ ...form, ...updator });
      };
    }
  ];
}
