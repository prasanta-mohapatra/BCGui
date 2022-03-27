import Fuse from "fuse.js";

export default function fuzzySearch(value) {
  const customerData = [
    { name: "111", value: "111" },
    { name: "222", value: "222" },
    { name: "333", value: "333" },
    { name: "444", value: "444" },
  ];
  const fuse = new Fuse(customerData, {
    keys: ["name", "value"],
    threshold: 0.3,
  });

  return (value) => {
    if (!value.length) {
      return customerData;
    }

    return fuse.search(value);
  };
}
