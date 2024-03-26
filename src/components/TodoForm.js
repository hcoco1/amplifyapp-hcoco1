// Updated TodoForm.js
import React from 'react';
import FormInput from './form/FormInput';
import FormSelect from './form/FormSelect';
import FormTextarea from './form/FormTextarea';

function TodoForm({ addTodo, newTodo, setNewTodo }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({ ...newTodo, [name]: value });
  };

  return (
    <form onSubmit={addTodo}>
      <div className="form-row">

      <FormSelect
          name="auditor"
          
          onChange={(e) => setValue(e.target.value)}
          options={[
            { label: 'Auditor', value: '' },
            { label: 'Ivan', value: 'ivan' },
            { label: 'Yoanli', value: 'yoanli' },
 
          ]}
        />

      <FormSelect
          name="period"
         
          onChange={(e) => setValue(e.target.value)}
          options={[
            { label: 'Period', value: '' },
            { label: '1 (6:30 -10:00 PM)', value: '1' },
            { label: '2 (10:30 PM -02:00 AM)', value: '2' },
            { label: '3 (2:30 AM -05:00 AM)', value: '3' },
            { label: '4 (5:15 AM -07:00 AM)', value: '4' },
          ]}
        />
        <FormInput
          name="username"
          placeholder="Username"
          
          onChange={(e) => setValue(e.target.value)}
        />



        <FormSelect
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
          name="error"
        
          onChange={(e) => setValue(e.target.value)}
          options={[
            { label: 'Error', value: '' },
            { label: 'Rebin Error Ind', value: 'Reb Err Ind' },
            { label: 'Ind Error Ind', value: 'Ind Err Ind' },
            { label: 'Induct Shortage', value: 'Ind Shor' },
            { label: 'Wrong Box', value: 'Wrong Box' },
            { label: 'Slam Kickout', value: 'Slam Kic' },
            { label: 'Item Missing ', value: 'Item Miss' },
            { label: 'Item Damaged', value: 'Item Dam' },
            { label: 'Item Unscannable', value: 'Item Unsca' },
            { label: 'Ship Exception', value: 'Ship Exce' },
          ]}
        />
      </div>

      <FormSelect
        name="coaching"
      
        onChange={(e) => setValue(e.target.value)}
        options={[
          { label: 'General pre-build coaching', value: '' },
          { label: 'Induct', value: "The auditor coached the associate, focusing on item shortages, scanning inaccuracies, placement errors, and the mishandling of damaged goods. The coaching emphasized enhancing observation, adhering to the 'one piece flow' principle for scanning accuracy, ensuring precise item placement in trays, and promptly reporting damaged items." },
          { label: 'Rebin', value: "The associate was coached explicitly on the importance of carefully verifying chute IDs against the screen instructions before placement, emphasizing a methodical approach over speed to ensure accuracy." },
          { label: 'Pack', value: "The team undertook a comprehensive audit of the Pack process to evaluate overall efficiency and accuracy, focusing on critical stages, including box assembly, item scanning, placement, and the final steps of sealing and labeling packages." },
          { label: 'Slam Kickout', value: "The associate faced an audit for repeated kick-outs related to incorrect label placements, including hazmat and spoon labels. The coaching focused on accurately applying labels and adherence to system instructions to decrease kick-outs." },
          { label: 'None', value: " " },
        ]}
      />
      <FormTextarea
        name="durable"
        placeholder="Personalized Coaching"
       
        onChange={(e) => setValue(e.target.value)}
        rows="2"
      />
      <button type="submit">Add Audit</button>
    </form>
  );
}

export default TodoForm;