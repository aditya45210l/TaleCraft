import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NotebookPen } from "lucide-react";
import Link from "next/link";

const WriteStoryButton = () => {
  return (
    <Link href={"/create-story"}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={'outline'}>
            <NotebookPen strokeWidth={2} size={24} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>new Story</p>
        </TooltipContent>
      </Tooltip>
    </Link>
  );
};
export default WriteStoryButton;
