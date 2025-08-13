'use client'
import { useParams, useSearchParams } from "next/navigation";

const Page = ({}) => {
const {storyId} = useParams(); // { storyId: "123" }
const searchParams = useSearchParams();
// const storyId = searchParams.get('story'); // "456"
const chapter = searchParams.get('chapter'); // "456"
  return (
    <div>page</div>
  )
}
export default Page