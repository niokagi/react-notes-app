export type BlockType = "paragraph" | "heading" | "bullet" | "numbered" | "code";

export interface NoteBlock {
  id: string;
  type: BlockType;
  text: string;
  items?: string[];
  language?: string;
}

export interface NoteModel {
  id: number;
  title: string;
  blocks: NoteBlock[];
  archived: boolean;
  createdAt: string;
}

export interface SlashCommandOption {
  id: BlockType;
  label: string;
  description: string;
  type: BlockType;
}
