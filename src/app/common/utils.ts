export const filterProducts = (filterValue: string) =>
    (item: any) => filterValue === '' || [item.stores.city, item.products.brand, item.products.name, item.price]
      .includes(filterValue) || (new RegExp(filterValue, 'i')).test(item.products.brand) ||
      (new RegExp(filterValue, 'i')).test(item.products.name);
