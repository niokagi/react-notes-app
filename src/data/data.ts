import { NoteModel } from "../types";
import { normalizeBlocksFromBody } from "../utils/blocks";

const seedNotes = [
  {
    id: 1,
    title: "Babel",
    body: "Babel is an open-source tool used to convert ECMAScript 2015+ syntax into a backward-compatible version of JavaScript supported by older JavaScript engines. It's often used when working with the latest syntax, including JSX.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: 2,
    title: "Functional Component",
    body: "A Functional Component is a React component created using a JavaScript function. For a function to be considered a React component, it must return a React element and be invoked like one.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: 3,
    title: "Modularization",
    body: "In the context of JavaScript programming, modularization is the technique of splitting or organizing code into separate files based on their respective responsibilities.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: 4,
    title: "Lifecycle",
    body: "In the context of React components, the lifecycle refers to a series of methods that are invoked at different stages of a component's existence, such as creation (constructor), rendering (render), and after mounting (componentDidMount).",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: 5,
    title: "ESM",
    body: "ESM (ECMAScript Module) is the standard module format for JavaScript.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
  {
    id: 6,
    title: "Module Bundler",
    body: "In the context of JavaScript programming, a module bundler is a tool used to combine all of an application's JavaScript modules into a single file.",
    createdAt: "2022-04-14T04:27:34.572Z",
    archived: false,
  },
];

const getInitialData = (): NoteModel[] =>
  seedNotes.map((note) => ({
    id: note.id,
    title: note.title,
    archived: note.archived,
    createdAt: note.createdAt,
    blocks: normalizeBlocksFromBody(note.body),
  }));

const showFormattedDate = (date: string) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export { getInitialData, showFormattedDate };
