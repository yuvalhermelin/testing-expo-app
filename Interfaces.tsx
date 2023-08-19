import { FieldValue } from "firebase/firestore";

interface INoteProps {
  note: INote;
  pressed: (note: INote) => void;
}

interface INote {
  timestamp: FieldValue;
  note: string;
  title: string;
  isActive: boolean;
  id?: string;
}

interface IAddNoteProps {
  closeModal: () => void;
  submit: (
    title: string,
    note: string,
    noteBeingEdited: INote | null
  ) => Promise<boolean>;
  isVisible: boolean;
  noteBeingEdited: INote | null;
}

interface ISearchBarProps {
  searchText: string;
  setSearchText: Function;
}

export { INoteProps, INote, ISearchBarProps, IAddNoteProps };
