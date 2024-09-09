import ListingItems from "../../components/ListingItems";
import IncomeList from "./IncomeList";
import { IncomeContainer } from "./styles";
import { fields } from "./utils/fields";

const Incomes = () => {
  return (
    <IncomeContainer>
      <h1>Entradas</h1>
      <ListingItems data={[]} fields={fields} ItemComponent={IncomeList} />
    </IncomeContainer>
  );
};

export default Incomes;
