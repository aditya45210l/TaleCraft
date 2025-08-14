import { Heading1, Heading2, Heading3, Bold, Italic, Strikethrough, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Highlighter, Code, Quote, Link, Undo, Redo, Subscript, Superscript, SeparatorHorizontal } from 'lucide-react';
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const Options = [
    // Existing Heading options
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    // Existing Bold, Italic, Strikethrough
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    // New features for Code, Blockquote, Link, Subscript, Superscript, and Horizontal Rule
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      pressed: editor.isActive("code"),
    },
    {
      icon: <Quote className="size-4" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive("blockquote"),
    },
    {
      icon: <Link className="size-4" />,
      onClick: () => {
        // A more robust way to handle the link command
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL:', previousUrl);

        // If the user cancels the prompt
        if (url === null) {
          return;
        }

        // If the user clears the URL, unset the link
        if (url === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink().run();
          return;
        }

        // Otherwise, set the link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      },
      pressed: editor.isActive("link"),
    },
    {
      icon: <Subscript className="size-4" />,
      onClick: () => editor.chain().focus().toggleSubscript().run(),
      pressed: editor.isActive("subscript"),
    },
    {
      icon: <Superscript className="size-4" />,
      onClick: () => editor.chain().focus().toggleSuperscript().run(),
      pressed: editor.isActive("superscript"),
    },
    {
      icon: <SeparatorHorizontal className="size-4" />,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      pressed: editor.isActive("horizontalRule"),
    },
    // Existing alignment and list options
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    // Undo/Redo options
    {
      icon: <Undo className="size-4" />,
      onClick: () => editor.chain().focus().undo().run(),
      pressed: editor.can().undo(),
    },
    {
      icon: <Redo className="size-4" />,
      onClick: () => editor.chain().focus().redo().run(),
      pressed: editor.can().redo(),
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 space-x-2 z-50">
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}