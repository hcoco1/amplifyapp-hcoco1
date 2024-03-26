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
    const image = form.get("image");
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
    if (!!data.image) await uploadData({
      key: data.username,
      data: image
    });
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

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">

          <SelectField label="auditor">
            <option value="ivan">Ivan</option>
            <option value="yoanly">Yoanli</option>
            <option value="guest">Guest</option>
          </SelectField>

          <SelectField label="period">
            <option value="1">1 (6:30 -10:00 PM)</option>
            <option value="2">2 (10:30 PM -02:00 AM)</option>
            <option value="3">3 (2:30 AM -05:00 AM)</option>
            <option value="4">4 (5:15 AM -07:00 AM)</option>
          </SelectField>


          <TextField
            name="username"
            placeholder="Name"
            label="Name"
            labelHidden
            variation="quiet"
            required
          />
          <SelectField label="afe">
            <option value="afe1">AFE1</option>
            <option value="afe2">AFE2</option>
            <option value="afe3">AFE3</option>
          </SelectField>

          <SelectField label="process">
            <option value="pack">Pack</option>
            <option value="rebin">Rebin</option>
            <option value="induct">Induct</option>
            <option value="smartpack">Smartpac</option>
            <option value="pack-singles">Pack Singles</option>
          </SelectField>

          <SelectField label="error">
            <option value="rebinerror">Rebin Error Ind</option>
            <option value="inducterror">Induct Error Ind</option>
            <option value="inductshortage">Induct Shortage</option>
            <option value="wrongbox">Wrong Box</option>
            <option value="slam">Slam Kickout</option>
            <option value="missing">Item Missing</option>
            <option value="damaged">Item Damaged</option>
            <option value="unscannable">Item Unscannable</option>
            <option value="shipexception">Shipment Exception</option>
          </SelectField>

          <SelectField label="coaching">
            <option value="The auditor coached the associate, focusing on item shortages, scanning inaccuracies, placement errors, and the mishandling of damaged goods. The coaching emphasized enhancing observation, adhering to the 'one piece flow' principle for scanning accuracy, ensuring precise item placement in trays, and promptly reporting damaged items.">Induct</option>
            <option value="The associate was coached explicitly on the importance of carefully verifying chute IDs against the screen instructions before placement, emphasizing a methodical approach over speed to ensure accuracy.">Rebin</option>
            <option value="The team undertook a comprehensive audit of the Pack process to evaluate overall efficiency and accuracy, focusing on critical stages, including box assembly, item scanning, placement, and the final steps of sealing and labeling packages.">Pack</option>
            <option value="The associate faced an audit for repeated kick-outs related to incorrect label placements, including hazmat and spoon labels. The coaching focused on accurately applying labels and adherence to system instructions to decrease kick-outs.">Slam Kickout</option>
            <option value="none"></option>
          </SelectField>


          <TextField
            name="durable"
            placeholder="Personalized Coaching"
            label="Personalized Coaching"
            labelHidden
            variation="quiet"
            required
          />
{/*           <View
            name="image"
            as="input"
            type="file"
            style={{ alignSelf: "end" }}
          /> */}
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id || note.username}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
          <SelectField as="strong" fontWeight={700}>
          {note.auditor}
          </SelectField>

          <SelectField as="strong" fontWeight={700}>
          {note.period}
          </SelectField>

            <Text as="strong" fontWeight={700}>
              {note.username}
            </Text>

            <SelectField as="strong" fontWeight={700}>
          {note.afe}
          </SelectField>

          <SelectField as="strong" fontWeight={700}>
          {note.process}

          </SelectField>

          <SelectField as="strong" fontWeight={700}>
          {note.error}
          </SelectField>

          <SelectField as="strong" fontWeight={700}>
          {note.coaching}
          </SelectField>

            <Text as="span">{note.durable}</Text>
            {note.image && (
              <Image
                src={note.image}
                alt={`visual aid for ${notes.username}`}
                style={{ width: 400 }}
              />
            )}
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