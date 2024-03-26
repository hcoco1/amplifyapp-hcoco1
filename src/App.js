import React, { useState, useEffect } from "react";
import './App.css';

import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Flex,
  Heading,
  Text,

  Image,
  View,
  withAuthenticator,

} from "@aws-amplify/ui-react";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import { generateClient } from 'aws-amplify/api';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
import FormSelect from "./components/form/FormSelect";
import FormInput from "./components/form/FormInput";
import FormTextarea from "./components/form/FormTextarea";
import AFESummary from "./components/AFESummary";
import ErrorSummary from './components/ErrorSummary';
import PeriodSummary from './components/PeriodSummary';
import ReportGenerator from "./components/ReportGenerator";

const client = generateClient();

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([
    { id: 1, afe: 'AFE1', process: 'Pack' },
    { id: 2, afe: 'AFE2', process: 'Induct' },
    // Add more notes as per your application's functionality
  ]);

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
      <Heading level={1}>Notes Taking App </Heading>
      <Heading level={1}>Total Audits:{notes.length} </Heading>
      <Button onClick={signOut} className="SignOutButton">Sign Out</Button>
      <ReportGenerator notes={notes} />


      
<div>
<PeriodSummary notes={notes} />
      <AFESummary notes={notes} />
      <ErrorSummary notes={notes} />
</div>
  

      <View as="form" margin="3rem 0" onSubmit={createNote}>

        <div className="form">

          <FormSelect
            className="form-select"
            name="auditor"
            onChange={(e) => setValue(e.target.value)}
            options={[
              { label: 'Auditor', value: '' },
              { label: 'Ivan', value: 'ivan' },
              { label: 'Yoanli', value: 'yoanli' },
            ]}
          />
          <FormSelect
            className="form-select"
            name="period"
            onChange={(e) => setValue(e.target.value)}
            options={[
              { label: 'Period', value: '' },
              { label: '(18:30-22:00)', value: '(18:30-22:00)' },
              { label: '(22:30-02:00)', value: '(22:30-02:00)' },
              { label: '(2:30-05:00)', value: '(2:30-05:00)' },
              { label: '(5:15-07:00)', value: '(5:15-07:00)' },
            ]}
          />
          <FormInput
            className="form-input"
            name="username"
            placeholder="Username"
            onChange={(e) => setValue(e.target.value)}
          />
          <FormSelect
            className="form-select"
            name="afe"
            onChange={(e) => setValue(e.target.value)}
            options={[
              { label: 'AFE', value: '' },
              { label: 'AFE1', value: 'AFE1' },
              { label: 'AFE2', value: 'AFE2' },
              { label: 'AFE3', value: 'AFE3' },
            ]}
          />
          <FormSelect
            className="form-select"
            name="process"
            onChange={(e) => setValue(e.target.value)}
            options={[
              { label: 'Process', value: '' },
              { label: 'Pack', value: 'Pack' },
              { label: 'Induct', value: 'Induct' },
              { label: 'Rebin', value: 'Rebin' },
              { label: 'Pack Other', value: 'Other' },
              { label: 'Smartpac', value: 'Smartpac' },
            ]}
          />
          <FormSelect
            className="form-select"
            name="error"
            onChange={(e) => setValue(e.target.value)}
            options={[
              { label: 'Error', value: '' },
              { label: 'Rebin Error Ind', value: 'Rebin Error Ind' },
              { label: 'Ind Error Ind', value: 'Ind Error Ind' },
              { label: 'Induct Shortage', value: 'Induct Shortage' },
              { label: 'Wrong Box', value: 'Wrong Box' },
              { label: 'Slam Kickout', value: 'Slam Kickout' },
              { label: 'Item Missing', value: 'Item Missing' },
              { label: 'Item Damaged', value: 'Item Damaged' },
              { label: 'Item Unscannable', value: 'Item Unscannable' },
              { label: 'Ship Exception', value: 'Ship Exception' },
            ]}
          />
          <FormSelect
            className="form-select"
            name="coaching"
            onChange={(e) => setValue(e.target.value)}
            options={[
              { label: 'Coaching', value: '' },
              { label: 'Induct', value: "The auditor coached the associate, focusing on item shortages, scanning inaccuracies, placement errors, and the mishandling of damaged goods. The coaching emphasized enhancing observation, adhering to the 'one piece flow' principle for scanning accuracy, ensuring precise item placement in trays, and promptly reporting damaged items." },
              { label: 'Rebin', value: "The associate was coached explicitly on the importance of carefully verifying chute IDs against the screen instructions before placement, emphasizing a methodical approach over speed to ensure accuracy." },
              { label: 'Pack', value: "The team undertook a comprehensive audit of the Pack process to evaluate overall efficiency and accuracy, focusing on critical stages, including box assembly, item scanning, placement, and the final steps of sealing and labeling packages." },
              { label: 'Slam Kickout', value: "The associate faced an audit for repeated kick-outs related to incorrect label placements, including hazmat and spoon labels. The coaching focused on accurately applying labels and adherence to system instructions to decrease kick-outs." },
              { label: 'None', value: " " },
            ]}
          />
        </div>
        <div className="form">




                <FormTextarea
          className="form-textarea form-textarea-large" // Assuming you have a separate component or logic to handle textareas
          name="durable"
          placeholder="Observations"
          onChange={(e) => setValue(e.target.value)}
        />
        </div>




  
        <div>

          <button type="submit">Add Audit</button>
        </div>


      </View>


      <Heading level={2}>Current Audits ({notes.length})</Heading>
     
      
{notes && notes.length > 0 && <ReportGenerator  notes={notes} />}



      <View className="NotesContainer">

        {notes.map((note, index) => (
          <>
                      <div className="NoteCardContent" key={note.id}>
              <div className="note-group">
              <Text className="NoteText">- <strong>N:</strong> {index + 1}</Text>

              </div>

              <div className="note-group">
                <Text className="NoteText">- <strong> 🥷Auditor:</strong> {note.auditor}</Text>
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
              className="DeleteButton" // Apply or adjust CSS for styling the button
              style={{ marginBottom: '1rem', color:"white", backgroundColor: "red" }} // Add spacing above the button
            >
              Delete Audit
            </Button>
          </>
         


       
        ))}
      </View>
      
    </View>
  );
};

export default withAuthenticator(App);