import { useJobItemsContext } from "../lib/hooks";
import JobList from "./JobList";

export default function JobListSearch() {
  const { jobItemsCurrentPage, isLoading } = useJobItemsContext();
  return <JobList jobItems={jobItemsCurrentPage} isLoading={isLoading} />;
}
