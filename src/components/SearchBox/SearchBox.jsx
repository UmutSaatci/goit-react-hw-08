import { useSelector, useDispatch } from "react-redux";
import css from "./SearchBox.module.css";
import { setContactsFilter } from "../../redux/filtersSlice";
import { selectFilterName } from "../../redux/selectors";

export const SearchBox = () => {
  const dispatch = useDispatch();

  const filterValue = useSelector(selectFilterName);

  const onFilter = (event) => {
    const inputValue = event.target.value;

    dispatch(setContactsFilter(inputValue));
  };

  return (
    <div className={css.searchWrapper}>
      <p className={css.label}>Find contacts by name</p>
      <input
        type="text"
        className={css.searchInput}
        value={filterValue || ""}
        onChange={onFilter}
      />
    </div>
  );
};
