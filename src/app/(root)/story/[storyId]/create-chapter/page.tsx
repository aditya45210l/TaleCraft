"use client";
import { useParams } from "next/navigation";
import Editor from "../../../../../../components/rich-text-editor/Editor";


const Page = ({}) => {
  const { storyId } = useParams(); // { storyId: "123" }
  console.log("story id from createChapter: ", storyId);

  return <Editor mode="chapter" />;
};
export default Page;
