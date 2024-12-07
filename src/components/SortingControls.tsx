import { useJobItemsContext } from "../lib/hooks";

export default function SortingControls() {
  const { sortBy, handleChangeSortBy } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        onClick={() => handleChangeSortBy("relevant")}
        className={`sorting__button sorting__button--relevant ${
          sortBy === "relevant" ? "sorting__button--active" : ""
        }`}
      >
        Relevant
      </button>

      <button
        onClick={() => handleChangeSortBy("recent")}
        className={`sorting__button sorting__button--relevant ${
          sortBy === "recent" ? "sorting__button--active" : ""
        }`}
      >
        Recent
      </button>
    </section>
  );
}
