import React, { useId } from "react";
import { IListingItemsProps } from "../@types/components/ListingItems";
import * as uuid from "uuid";
import { FieldsItems, Items, ListContainer } from "./styles/listingItems-style";

function ListingItems<T, C>({
  data,
  ItemComponent,
  fields,
  w,
  itemProps,
}: IListingItemsProps<T, C>) {
  const itemProp = itemProps;
  return (
    <ListContainer w={w}>
      <Items>
        {React.Children.toArray(
          fields.map((item, i) => (
            <>
              {item.isShow && (
                <FieldsItems
                  isShow={item.isShow}
                  w={item.w}
                  key={`${useId()}-${i}`}
                >
                  <span>{item.name}</span>
                </FieldsItems>
              )}
            </>
          ))
        )}
      </Items>
      {data.map((item) => (
        <ItemComponent
          key={uuid.v4()}
          fields={fields}
          data={item}
          itemProps={itemProp}
        />
      ))}
    </ListContainer>
  );
}

export default ListingItems;
