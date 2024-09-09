export type IFields = {
  name: string;
  width: string;
  isShow?: boolean;
};

export interface IListingItemsProps<T, C> {
  data: T[];
  ItemComponent: (props: {
    data: T;
    fields: IFields[];
    itemProps?: C;
  }) => React.JSX.Element;
  fields: IFields[];
  width?: string;
  itemProps?: C;
}
