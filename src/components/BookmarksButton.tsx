import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useEffect, useRef, useState } from "react";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Add a root node event listener to close the popover when clicking outside
  // the popover
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        !buttonRef.current?.contains(event.target) &&
        !popoverRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
