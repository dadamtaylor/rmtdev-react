import { createContext, useState } from "react";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { TSortBy, PageDirection, JobItem } from "../lib/types";

export type JobItemsContext = {
  jobItems: JobItem[] | undefined;
  jobItemsCurrentPage: JobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: TSortBy;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (sortBy: TSortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dependent on other contexts
  const { debouncedSearchText } = useSearchTextContext();

  // State for this context
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TSortBy>("relevant");

  // Don't mutate the jobItems array, sort into a new array
  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    }
    return a.daysAgo - b.daysAgo;
  });
  const totalNumberOfResults = jobItems ? jobItems.length : 0;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);
  const jobItemsCurrentPage = jobItemsSorted.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const handleChangePage = (direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "back") {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleChangeSortBy = (sortBy: TSortBy) => {
    setCurrentPage(1);
    setSortBy(sortBy);
  };

  return (
    <JobItemsContext.Provider
      value={{
        jobItems,
        jobItemsCurrentPage,
        isLoading,
        totalNumberOfResults,
        totalNumberOfPages,
        currentPage,
        sortBy,
        handleChangePage,
        handleChangeSortBy,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
