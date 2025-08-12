import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollText } from "lucide-react";
import Link from "next/link";

const WriteStoryButton = () => {
  return (
    <Link href={"/editor"}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>
            {" "}
            <ScrollText />
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
