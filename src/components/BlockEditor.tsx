import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  Code2,
  Heading2,
  List,
  ListOrdered,
  Plus,
  Text as TextIcon,
  Trash2,
} from "lucide-react";
import { BlockType, NoteBlock } from "../types";
import { SLASH_COMMANDS, createBlock } from "../utils/blocks";

interface BlockEditorProps {
  blocks: NoteBlock[];
  onChange: (blocks: NoteBlock[]) => void;
}

interface SlashState {
  activeBlock: string | null;
  query: string;
  anchor: HTMLElement | null;
  visible: boolean;
}

const typeIconMap: Record<BlockType, JSX.Element> = {
  paragraph: <TextIcon size={14} />,
  heading: <Heading2 size={14} />,
  bullet: <List size={14} />,
  numbered: <ListOrdered size={14} />,
  code: <Code2 size={14} />,
};

const convertBlock = (block: NoteBlock, type: BlockType): NoteBlock => {
  if (type === block.type) return block;

  if (type === "bullet" || type === "numbered") {
    let seedItems: string[] = [""];
    if (block.items && block.items.length) {
      seedItems = block.items;
    } else if (block.text) {
      seedItems = [block.text];
    }

    return { id: block.id, type, text: "", items: seedItems };
  }

  const sanitizedText = block.text.replace(/\/[a-zA-Z0-9]*$/, "").trim();
  return {
    id: block.id,
    type,
    text: sanitizedText,
    items: undefined,
    language: block.language,
  };
};

const SlashMenu = ({
  query,
  onSelect,
  onClose,
  position,
}: {
  query: string;
  onSelect: (type: BlockType) => void;
  onClose: () => void;
  position: { top: number; left: number };
}) => {
  const filtered = useMemo(
    () =>
      SLASH_COMMANDS.filter((command) =>
        command.label.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div
      className="slash-menu shadow-soft rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] w-64 p-2 absolute z-20"
      style={{ top: position.top, left: position.left }}
      role="listbox"
    >
      <div className="flex items-center justify-between px-2 pb-2 text-xs text-[color:var(--color-text-muted)]">
        <span>Type to filter blocks</span>
        <button
          onClick={onClose}
          className="text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
        >
          esc
        </button>
      </div>
      <div className="space-y-1">
        {filtered.map((command) => (
          <button
            key={command.id}
            onClick={() => onSelect(command.type)}
            className="w-full flex items-start gap-2 px-2 py-2 rounded-lg hover:bg-[color:var(--color-surface-subtle)] text-left"
            role="option"
          >
            <span className="text-[color:var(--color-text-muted)]">
              {typeIconMap[command.type]}
            </span>
            <span className="flex-1">
              <span className="block text-sm text-[color:var(--color-text)]">
                {command.label}
              </span>
              <span className="block text-xs text-[color:var(--color-text-muted)]">
                {command.description}
              </span>
            </span>
          </button>
        ))}
      </div>
      {!filtered.length && (
        <div className="text-xs text-[color:var(--color-text-muted)] px-2 py-1">
          No block types match &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
};

const BlockHeader = ({
  type,
  onRemove,
}: {
  type: BlockType;
  onRemove: () => void;
}) => (
  <div className="flex items-center justify-between text-xs text-[color:var(--color-text-muted)] mb-2">
    <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-[color:var(--color-surface-subtle)] border border-[color:var(--color-border)]">
      {typeIconMap[type]}
      <span className="capitalize">{type}</span>
    </div>
    <button
      onClick={onRemove}
      className="text-[color:var(--color-text-muted)] hover:text-[color:var(--color-danger)]"
      aria-label="Remove block"
    >
      <Trash2 size={14} />
    </button>
  </div>
);

const BlockNode = ({
  block,
  onTextChange,
  onItemsChange,
  onEnter,
  onFocus,
  onRemove,
}: {
  block: NoteBlock;
  onTextChange: (value: string, target: HTMLElement | null) => void;
  onItemsChange: (items: string[]) => void;
  onEnter: () => void;
  onFocus: (el: HTMLElement | null) => void;
  onRemove: () => void;
}) => {
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onEnter();
    }
  };

  const handleListKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const items = block.items ? [...block.items] : [];
      items.splice(index + 1, 0, "");
      onItemsChange(items);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  };

  if (block.type === "bullet" || block.type === "numbered") {
    return (
      <div className="editor-block">
        <BlockHeader type={block.type} onRemove={onRemove} />
        <div className="space-y-2">
          {(block.items || [""]).map((item, index) => (
            <div
              key={`${block.id}-item-${index}`}
              className="flex gap-3 items-center"
            >
              <span className="w-4 text-right text-sm text-[color:var(--color-text-muted)]">
                {block.type === "numbered" ? index + 1 : "•"}
              </span>
              <input
                ref={index === (block.items?.length || 1) - 1 ? inputRef : null}
                value={item}
                className="flex-1 bg-transparent focus:outline-none text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-muted)]"
                placeholder="List item"
                onFocus={(e) => onFocus(e.currentTarget)}
                onKeyDown={(e) => handleListKeyDown(e, index)}
                onChange={(e) => {
                  const nextItems = [...(block.items || [])];
                  nextItems[index] = e.target.value;
                  onItemsChange(nextItems);
                }}
              />
            </div>
          ))}
          <button
            onClick={() => onItemsChange([...(block.items || []), ""])}
            className="text-xs text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
          >
            Add item
          </button>
        </div>
      </div>
    );
  }

  if (block.type === "code") {
    return (
      <div className="editor-block">
        <BlockHeader type={block.type} onRemove={onRemove} />
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={block.text}
          onFocus={(e) => onFocus(e.currentTarget)}
          onKeyDown={handleKeyDown}
          onChange={(e) => onTextChange(e.target.value, e.currentTarget)}
          placeholder="Write code..."
          className="w-full bg-[color:var(--color-surface-strong)] text-white rounded-lg p-3 font-mono text-sm focus:outline-none border border-[color:var(--color-border-strong)]"
          rows={5}
        />
      </div>
    );
  }

  const isHeading = block.type === "heading";
  return (
    <div className="editor-block">
      <BlockHeader type={block.type} onRemove={onRemove} />
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={block.text}
        onFocus={(e) => onFocus(e.currentTarget)}
        onKeyDown={handleKeyDown}
        onChange={(e) => onTextChange(e.target.value, e.currentTarget)}
        placeholder={
          isHeading ? "Heading text. Press Enter for new block." : "Start typing..."
        }
        className={`w-full bg-transparent focus:outline-none resize-none min-h-[64px] leading-relaxed text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-muted)] ${
          isHeading ? "text-2xl font-semibold" : "text-base"
        }`}
      />
    </div>
  );
};

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [slashState, setSlashState] = useState<SlashState>({
    activeBlock: null,
    query: "",
    anchor: null,
    visible: false,
  });
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSlashState({ activeBlock: null, query: "", anchor: null, visible: false });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (
      slashState.visible &&
      slashState.anchor &&
      containerRef.current
    ) {
      const anchorRect = slashState.anchor.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setMenuPosition({
        top: anchorRect.bottom - containerRect.top + 8,
        left: anchorRect.left - containerRect.left,
      });
    }
  }, [slashState]);

  const updateBlockText = (
    id: string,
    value: string,
    target: HTMLElement | null
  ) => {
    onChange(
      blocks.map((block) => (block.id === id ? { ...block, text: value } : block))
    );

    const slashMatch = value.match(/\/([a-zA-Z0-9]*)$/);
    if (slashMatch) {
      setSlashState({
        activeBlock: id,
        query: slashMatch[1],
        anchor: target,
        visible: true,
      });
    } else if (slashState.visible) {
      setSlashState((prev) => ({ ...prev, visible: false, query: "" }));
    }
  };

  const updateBlockItems = (id: string, items: string[]) => {
    onChange(
      blocks.map((block) =>
        block.id === id ? { ...block, items, text: "" } : block
      )
    );
  };

  const insertBlockAfter = (id: string) => {
    const index = blocks.findIndex((block) => block.id === id);
    const newBlock = createBlock("paragraph");
    const nextBlocks = [...blocks];
    nextBlocks.splice(index + 1, 0, newBlock);
    onChange(nextBlocks);
  };

  const removeBlock = (id: string) => {
    if (blocks.length === 1) return;
    onChange(blocks.filter((block) => block.id !== id));
  };

  const applySlashCommand = (type: BlockType) => {
    if (!slashState.activeBlock) return;
    onChange(
      blocks.map((block) =>
        block.id === slashState.activeBlock ? convertBlock(block, type) : block
      )
    );
    setSlashState({ activeBlock: null, query: "", anchor: null, visible: false });
  };

  const addNewBlock = () => onChange([...blocks, createBlock("paragraph")]);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex flex-col gap-4">
        {blocks.map((block) => (
          <BlockNode
            key={block.id}
            block={block}
            onTextChange={(value, target) => updateBlockText(block.id, value, target)}
            onItemsChange={(items) => updateBlockItems(block.id, items)}
            onEnter={() => insertBlockAfter(block.id)}
            onFocus={(el) =>
              setSlashState((prev) => ({ ...prev, anchor: el, activeBlock: block.id }))
            }
            onRemove={() => removeBlock(block.id)}
          />
        ))}
        <button
          type="button"
          onClick={addNewBlock}
          className="inline-flex items-center gap-2 text-sm text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
        >
          <Plus size={16} /> Add block
        </button>
      </div>

      {slashState.visible && slashState.anchor && (
        <SlashMenu
          query={slashState.query}
          position={menuPosition}
          onSelect={applySlashCommand}
          onClose={() =>
            setSlashState({ activeBlock: null, query: "", anchor: null, visible: false })
          }
        />
      )}
    </div>
  );
}

export default BlockEditor;
