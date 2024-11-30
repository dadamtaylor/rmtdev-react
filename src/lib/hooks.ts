import { useEffect, useState } from "react";
import { JobItem, JobItemDetails } from "./types";
import { BASE_API_URL } from "./constants";

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const windowId = +window.location.hash.slice(1);
      setActiveId(windowId);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return activeId;
}

export function useJobItem(activeId: number | null) {
  const [jobItem, setJobItem] = useState<JobItemDetails | null>(null);

  useEffect(() => {
    if (!activeId) return;

    const fetchData = async () => {
      const response = await fetch(`${BASE_API_URL}/${activeId}`);
      const data = await response.json();
      setJobItem(data.jobItem);
    };
    fetchData();
  }, [activeId]);
  return jobItem;
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsCurrentPage = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchText]);

  return [jobItemsCurrentPage, isLoading] as const;
}
