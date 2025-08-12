"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { createPost } from "@/lib/actions";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import RichTextEditor from "../../../../components/rich-text-editor";
import Container from "../../../../components/layout/Container";
import UploadComp from "../../../../components/layout/UploadComp";

export default function CreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { userId, isLoaded, isSignedIn } = useAuth();

  // useEffect(() => {
  //   if (isLoaded && !isSignedIn) {
  //     router.push("/");
  //   }
  // }, [isLoaded, isSignedIn, router]);

  // if (!isLoaded) {
  //   return <div>Loading...</div>;
  // }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // try {
    //   if (!userId) {
    //     throw new Error("User is not authenticated");
    //   }

    //   const result = await createPost({ title, content });
    //   if (result.success) {
    //     toast("Post created successfully");
    //     router.push("/");
    //   } else {
    //     toast("Failed to create post");
    //   }
    // } catch (error) {
    //   console.error("Failed to create post:", error);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  useEffect(() =>{
    console.log("Content changed:", content);
  }, [content]);

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <div className=" flex flex-row justify-between">
          <Link href={`/`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "wait..." : "Publish"}
          </Button>
        </div>
        <h1 className="text-3xl font-bold">Create New Story</h1>
        <div>
          <UploadComp />
        </div>
        <form className="max-w-4xl flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            {/* <Label className="pt-6" htmlFor="title">Title</Label> */}
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className=""
              required
            />
          </div>

          <div className="space-y-2">
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </form>
      </div>
    </Container>
  );
}
