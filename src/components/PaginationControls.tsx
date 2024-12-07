import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../lib/types";
import { useJobItemsContext } from "../lib/hooks";

type PaginationButtonProps = {
  direction: PageDirection;
  currentPage: number;
  onClick: () => void;
};

export default function PaginationControls() {
  const { currentPage, totalNumberOfPages, handleChangePage } =
    useJobItemsContext();
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="back"
          currentPage={currentPage}
          onClick={() => handleChangePage("back")}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onClick={() => handleChangePage("next")}
        />
      )}
    </section>
  );
}

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(event) => {
        onClick();
        event.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "back" ? (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      ) : (
        <>
          <ArrowRightIcon />
          Page {currentPage + 1}
        </>
      )}
    </button>
  );
}
