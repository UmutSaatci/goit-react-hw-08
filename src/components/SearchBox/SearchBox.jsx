import { useSelector, useDispatch } from "react-redux";
import css from "./SearchBox.module.css";
import { setContactsFilter } from "../../redux/filters/slice";
import { selectFilterName } from "../../redux/filters/selectors";

export const SearchBox = () => {
  const dispatch = useDispatch();

  const filterValue = useSelector(selectFilterName);

  const onFilter = (event) => {
    const inputValue = event.target.value;

    dispatch(setContactsFilter(inputValue));
  };

  return (
    <div className={css.searchWrapper}>
      <p className={css.label}>İsim ya da numara arayın</p>
      <input
        type="text"
        className={css.searchInput}
        value={filterValue || ""}
        onChange={onFilter}
      />
    </div>
  );
};
