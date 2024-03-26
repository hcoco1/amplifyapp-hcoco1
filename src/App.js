import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  Image,
  View,
  withAuthenticator,
  SelectField
} from "@aws-amplify/ui-react";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import { generateClient } from 'aws-amplify/api';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';

const client = generateClient();

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      // Attempt to fetch GraphQL data
      const apiData = await client.graphql({ query: listNotes });
      // Debugging log for inspecting the raw API data
      console.log('API Data:', apiData);

      if (!apiData.data || !apiData.data.listNotes || !apiData.data.listNotes.items) {
        // Log and handle cases where the GraphQL query does not return the expected structure
        console.error('GraphQL query did not return the expected data structure:', apiData);
        throw new Error('Invalid or no data returned from GraphQL query');
      }

      const notesFromAPI = apiData.data.listNotes.items;

      // Process each note, especially handling the image URL fetch
      await Promise.all(notesFromAPI.map(async (note) => {
        if (note.image) {
          try {
            const urlResponse = await getUrl({ key: note.username });
            if (!urlResponse || !urlResponse.url) {
              // Handle cases where URL is not fetched properly
              console.error(`URL fetch unsuccessful for note: ${note.id}`);
              throw new Error(`Failed to fetch URL for note ${note.id}`);
            }
            note.image = urlResponse.url;
          } catch (error) {
            // Log the error and optionally set a default image or handle the error specifically
            console.error('Error fetching image URL:', error);
            note.image = null; // You can choose to set this to a default image or leave it as null
          }
        }
        return note;
      }));

      // Update the state or handle the processed notes as needed
      setNotes(notesFromAPI);
    } catch (error) {
      // Catch and handle any error that occurred during the function execution
      console.error('Error during fetchNotes execution:', error);
      // Here, you might want to update your UI accordingly to indicate the error
    }
  }

  // Assumed existing implementations for client.graphql, getUrl, and setNotes


  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    /* const image = form.get("image"); */
    const data = {
      auditor: form.get("auditor"),
      period: form.get("period"),
      username: form.get("username"),
      afe: form.get("afe"),
      process: form.get("process"),
      error: form.get("error"),
      coaching: form.get("coaching"),
      durable: form.get("durable"),

    };
    await client.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id, username }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await remove({ key: username });
    await client.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }
  const [value, setValue] = useState('');
  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">
  
          <TextField
            name="auditor"
            placeholder="Auditor"
            label="Auditor"
            onChange={(e) => setValue(e.target.value)}
            required
          />
  
          <TextField
            name="period"
            placeholder="Period"
            label="Period"
            onChange={(e) => setValue(e.target.value)}
            required
          />
  
          <TextField
            name="username"
            placeholder="Name"
            label="Name"
          
            onChange={(e) => setValue(e.target.value)}
            required
          />
  
          <TextField
            name="afe"
            placeholder="AFE"
            label="AFE"
            onChange={(e) => setValue(e.target.value)}
            required
          />
  
          <TextField
            name="process"
            placeholder="Process"
            label="Process"
            onChange={(e) => setValue(e.target.value)}
            required
          />
  
          <TextField
            name="error"
            placeholder="Error"
            label="Error"
            onChange={(e) => setValue(e.target.value)}
            required
          />
  
          <TextField
            name="coaching"
            placeholder="Coaching"
            label="Coaching"
            onChange={(e) => setValue(e.target.value)}
            required
          />
  
          <TextField
            name="durable"
            placeholder="Personalized Coaching"
            label="Personalized Coaching"
            onChange={(e) => setValue(e.target.value)}
            required
          />
  
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {/* Display Auditor */}
            <Text as="strong" fontWeight={700} padding="0 1rem">
              {note.auditor}
            </Text>

            {/* Display Period */}
            <Text as="strong" fontWeight={700} padding="0 1rem">
              {note.period}
            </Text>

            {/* Display Username */}
            <Text as="strong" fontWeight={700} padding="0 1rem">
              {note.username}
            </Text>

            {/* Display AFE */}
            <Text as="strong" fontWeight={700} padding="0 1rem">
              {note.afe}
            </Text>

            {/* Display Process */}
            <Text as="strong" fontWeight={700} padding="0 1rem">
              {note.process}
            </Text>

            {/* Display Error */}
            <Text as="strong" fontWeight={700} padding="0 1rem">
              {note.error}
            </Text>

            {/* Display Coaching */}
            <Text as="strong" fontWeight={700} padding="0 1rem">
              {note.coaching}
            </Text>

            {/* Display Personalized Coaching/Durable */}
            <Text padding="0 1rem">
              {note.durable}
            </Text>

            {/* Optional: Display Image if exists */}
            {note.image && (
              <Image
                src={note.image}
                alt={`visual aid for ${note.username}`}
                style={{ width: 400, margin: "0 1rem" }}
              />
            )}

            {/* Delete Note Button */}
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>


      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
