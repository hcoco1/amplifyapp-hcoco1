import React, { useState, useEffect } from "react";
import './App.css';

import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Heading,
  Text,
  View,
  withAuthenticator,

} from "@aws-amplify/ui-react";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import { generateClient } from 'aws-amplify/api';
import { getUrl, remove } from 'aws-amplify/storage';
import AFESummary from "./components/AFESummary";
import ErrorSummary from './components/ErrorSummary';
import PeriodSummary from './components/PeriodSummary';
import ReportGenerator from "./components/ReportGenerator";
import AuditForm from "./components/AuditForm";




const client = generateClient();

const App = ({ signOut }) => {
  const [filter, setFilter] = useState('');
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
      /* auditor: form.get("auditor"), */
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
 


  function formatTimestampToUTC(timestamp) {
    const date = new Date(timestamp);
    // Specify Eastern Time zone, which will automatically adjust for EST/EDT as needed
    return date.toLocaleString('en-US', { timeZone: 'America/New_York' });

  }

  return (

    <View className="App">
      <View>
        <Heading level={1} style={{ textAlign: 'center' }}>Notes Taking App </Heading>

       
        <button onClick={signOut} className="signOutButton"><strong>Sign Out</strong></button>
      </View>
      <Heading level={1} style={{ textAlign: 'center' }}>Total Audits:{notes.length} </Heading>
      
      <div>
        <PeriodSummary notes={notes} />
        <AFESummary notes={notes} />
        <ErrorSummary notes={notes} />
      </div>
      <AuditForm onSubmit={createNote} />
      <View>
        <Heading level={2} style={{ textAlign: 'center' }}><strong>Total Audits: {notes.length}</strong></Heading>
        {notes && notes.length > 0 && (
          <div style={{ textAlign: 'right' }} >
            <ReportGenerator notes={notes} />
          </div>
        )}
        <View>
          <input
            type="text"
            placeholder="Filter by username..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-input" // Assume you have styling for this
          />
        </View>
      </View>
      <View className="NotesContainer">
        {notes.filter((note) => {
          return filter === '' || note.username?.toLowerCase().includes(filter.toLowerCase());
        }).map((note, index) => (
          <React.Fragment key={note.id}> {/* Move the key prop here */}
            <div className="NoteCardContent">
              <div className="note-group">
                <Text className="NoteText">
                  - <strong>N:</strong> <strong><span style={{ color: 'red' }}>{index + 1}</span></strong>
                </Text>
                <Text className="NoteText">- <strong>Created At:</strong> {formatTimestampToUTC(note.createdAt)}</Text>
              </div>
              <div className="note-group">
                <Text className="NoteText">- <strong>Period:</strong> {note.period}</Text>
                <Text className="NoteText">- <strong>Associate:</strong> {note.username}</Text>
                <Text className="NoteText">- <strong>AFE:</strong> {note.afe}</Text>
                <Text className="NoteText">- <strong>Process:</strong> {note.process}</Text>
                <Text className="NoteText">- <strong>Error:</strong> {note.error}</Text>
              </div>
              <div className="note-group">
                <Text className="NoteText">- <strong>🖌Coaching:</strong> {note.coaching}</Text>
                <Text className="NoteText">- <strong>💣Observations:</strong> {note.durable}</Text>
              </div>
            </div>
            <Button
              onClick={() => deleteNote(note)}
              className="DeleteButton"
              style={{ marginBottom: '1rem', color: "white", backgroundColor: "red" }}
            >
              Delete Audit N:{index + 1}
            </Button>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};
export default withAuthenticator(App);