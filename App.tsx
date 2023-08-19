import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import { useCallback, useEffect, useState } from "react";

import { FIREBASE_CONFIG, COLOR_THEME_PRIMARY } from "./consts";
import Title from "./components/Title";
import SearchBar from "./components/SearchBar";
import AddNoteModal from "./components/AddNoteModal";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  serverTimestamp,
  addDoc,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { INote } from "./Interfaces";
import Note from "./components/Note";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AddImage = require("./assets/add.png");

initializeApp(FIREBASE_CONFIG);
const app = getFirestore();
const notesCollection = collection(app, "note");

export default function App() {
  const [notes, setNotes] = useState<Array<any>>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [showAddNoteModal, setShowAddNoteModal] = useState<boolean>(false);
  const [noteBeingEdited, setNoteBeingEdited] = useState<INote | null>(null);

  useEffect(() => {
    onSnapshot(
      query(notesCollection, orderBy("timestamp", "desc")),
      (notes) => {
        const _notes: Array<INote> = [];
        notes.docs.forEach((doc) => {
          _notes.push({ ...(doc.data() as INote), id: doc.id });
        });
        setNotes(_notes);
      }
    );
  }, []);

  const submitNewNote = useCallback(
    (
      title: string,
      note: string,
      noteBeingEdited: INote | null
    ): Promise<boolean> => {
      const newNote: INote = {
        title,
        note,
        isActive: true,
        timestamp: serverTimestamp(),
      };

      const notePromise =
        noteBeingEdited && noteBeingEdited.id
          ? updateDoc(doc(app, "note", noteBeingEdited.id), { title, note })
          : addDoc(notesCollection, newNote);
      return new Promise((res, rej) => {
        notePromise.then(() => res(true));
        notePromise.catch((e) => {
          Alert.alert(e);
          res(false);
        });
      });
    },
    []
  );

  const notePressedEvent = useCallback((note: INote) => {
    setNoteBeingEdited(note);
  }, []);

  return (
    <GestureHandlerRootView style={styles.app}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Title>Notes</Title>
        <SearchBar searchText={searchFilter} setSearchText={setSearchFilter} />
        <View style={{ width: "100%", flex: 1 }}>
          <FlatList
            contentContainerStyle={styles.content}
            data={notes.filter((n: INote) =>
              searchFilter
                ? n.title.toLowerCase().includes(searchFilter.toLowerCase())
                : true
            )}
            renderItem={({ item }) => (
              <Note pressed={notePressedEvent} note={item as INote} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {notes ? notes.length : 0} Notes
          </Text>
          <Pressable
            style={styles.addIconPressable}
            onPress={() => setShowAddNoteModal(true)}
          >
            <Image style={styles.addIcon} source={AddImage} />
          </Pressable>
        </View>
      </View>
      <AddNoteModal
        closeModal={() => {
          setShowAddNoteModal(false);
          if (noteBeingEdited) setNoteBeingEdited(null);
        }}
        submit={submitNewNote}
        noteBeingEdited={noteBeingEdited}
        isVisible={showAddNoteModal || !!noteBeingEdited}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: COLOR_THEME_PRIMARY,
  },
  container: {
    flex: 1,
    marginTop: "13%",
    backgroundColor: COLOR_THEME_PRIMARY,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    alignItems: "center",
    marginTop: 20,
    borderTopColor: "black",
    borderTopWidth: 2,
  },
  footer: {
    borderTopWidth: 1,
    height: "10%",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    paddingBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  footerText: {
    color: "black",
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
  },
  addIconPressable: {
    position: "absolute",
    right: "5%",
    top: "25%",
  },
  addIcon: {
    height: 30,
    width: 30,
  },
});
