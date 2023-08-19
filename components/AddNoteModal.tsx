import { ReactComponentElement, useEffect, useRef, useState } from "react";
import { Modal, TextInput, StyleSheet, TextInputComponent } from "react-native";
import { IAddNoteProps } from "../Interfaces";

export default function (props: IAddNoteProps) {
  const textAreaRef = useRef(null);
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    setTitle(props.noteBeingEdited?.title || "");
    setNote(props.noteBeingEdited?.note || "");
  }, [props.noteBeingEdited]);

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      style={styles.container}
      visible={props.isVisible}
      onRequestClose={() => {
        if (title && note)
          props.submit(title, note, props.noteBeingEdited).then(() => {
            setTitle("");
            setNote("");
          });
        props.closeModal();
      }}
    >
      <TextInput
        style={styles.headerText}
        placeholder="Title"
        multiline={false}
        autoFocus={true}
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={() => {
          if (textAreaRef.current) {
            (textAreaRef.current as TextInput).focus();
          }
        }}
      ></TextInput>
      <TextInput
        onChangeText={setNote}
        value={note}
        style={styles.textarea}
        multiline={true}
        autoFocus={false}
        ref={textAreaRef}
      ></TextInput>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerText: {
    fontSize: 30,
    fontWeight: "700",
    padding: 20,
    paddingBottom: 0,
  },
  textarea: {
    fontSize: 20,
    height: "50%",
    padding: 20,
    borderBottomColor: "whitesmoke",
    borderBottomWidth: 2,
  },
});
