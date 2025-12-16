import { BlockType, NoteBlock, SlashCommandOption } from "../types";

const uuid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const createBlock = (type: BlockType = "paragraph"): NoteBlock => {
  if (type === "bullet" || type === "numbered") {
    return { id: uuid(), type, text: "", items: [""] };
  }

  return { id: uuid(), type, text: "", items: undefined };
};

export const normalizeBlocksFromBody = (body: string): NoteBlock[] => {
  if (!body?.trim()) return [createBlock()];
  const segments = body.split("\n").filter((line) => line.trim().length);
  if (segments.length === 0) return [createBlock()];
  return segments.map((line, index) => ({
    id: `${Date.now()}-${index}`,
    type: index === 0 ? "heading" : "paragraph",
    text: line.trim(),
  }));
};

export const blocksToPlainText = (blocks: NoteBlock[]): string =>
  blocks
    .map((block) => {
      if (block.type === "bullet" || block.type === "numbered") {
        return (block.items || [])
          .filter(Boolean)
          .map((item) => `• ${item}`)
          .join(" ");
      }
      return block.text;
    })
    .join(" ")
    .trim();

export const SLASH_COMMANDS: SlashCommandOption[] = [
  {
    id: "heading",
    label: "Heading",
    description: "Large title block",
    type: "heading",
  },
  {
    id: "paragraph",
    label: "Paragraph",
    description: "Default text block",
    type: "paragraph",
  },
  {
    id: "bullet",
    label: "Bulleted list",
    description: "Create a list with bullets",
    type: "bullet",
  },
  {
    id: "numbered",
    label: "Numbered list",
    description: "Ordered list with numbers",
    type: "numbered",
  },
  {
    id: "code",
    label: "Code",
    description: "Create a code block",
    type: "code",
  },
];
