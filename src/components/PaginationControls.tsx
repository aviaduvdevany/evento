import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type props = {
  page: number;
  totalCount: number;
};

const btnStyle =
  "text-white flex px-5 py-3 items-center gap-x-2 bg-white/5 rounded-md opacity-75 hover:opacity-100 transition text-sm";

export default function PaginationControls({ page, totalCount }: props) {
  return (
    <section className="flex justify-between w-full">
      {page > 1 ? (
        <Link href={`?page=${page - 1}`} className={btnStyle}>
          <ArrowLeftIcon />
          Previous
        </Link>
      ) : (
        <div />
      )}

      {totalCount > 6 * page && (
        <Link href={`?page=${page + 1}`} className={btnStyle}>
          <ArrowRightIcon />
          Next
        </Link>
      )}
    </section>
  );
}
