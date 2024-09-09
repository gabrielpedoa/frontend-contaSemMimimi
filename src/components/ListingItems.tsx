import React, { useId } from "react";
import { IListingItemsProps } from "../@types/components/ListingItems";
import { FieldsItems, Items, ListContainer } from "./styles/ListingItems";
import * as uuid from "uuid";

function ListingItems<T, C>({
  data,
  ItemComponent,
  fields,
  width,
  itemProps,
}: IListingItemsProps<T, C>) {
  const itemProp = itemProps;
  return (
    <ListContainer width={width}>
      <Items>
        {React.Children.toArray(
          fields.map((item, i) => (
            <>
              {item.isShow && (
                <FieldsItems
                  isShow={item.isShow}
                  width={item.width}
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
