// AuditForm.js
import React, { useState } from "react";
import FormSelect from "./form/FormSelect";
import FormInput from "./form/FormInput";
import FormTextarea from "./form/FormTextarea";

const AuditForm = ({ onSubmit }) => {
    const [value,  setValue] = useState('');
    
    return (

        <form margin="3rem 0" onSubmit={onSubmit}>
        <div className="form">

        <FormSelect
        className="form-select"
          name="auditor"
          onChange={(e) => setValue(e.target.value)}
          options={[
            { label: 'Auditor', value: '' },
            { label: 'Ivan', value: 'Ivan' },
            { label: 'Yoanli', value: 'Yoanli' },
            { label: 'Guest', value: 'Guest' },
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
              { label: 'Rebin Error Indicator', value: 'Rebin Error Indicator' },
              { label: 'Induct Error Indicator', value: 'Induct Error Indicator' },
              { label: 'Induct Shortage', value: 'Induct Shortage' },
              { label: 'Wrong Box', value: 'Wrong Box' },
              { label: 'Slam Kickout', value: 'Slam Kickout' },
              { label: 'Item Missing', value: 'Pack Item Missing' },
              { label: 'Item Damaged', value: 'Pack Item Damaged' },
              { label: 'Item Unscannable', value: 'Pack Item Unscannable' },
              { label: 'Shipment Exception', value: 'Shipment Exception' },
            ]}
          />
          <FormSelect
            className="form-select"
            name="coaching"
            onChange={(e) => setValue(e.target.value)}
            options={[
              { label: 'Coaching', value: '' },
              { label: 'Induct', value: "The auditor coached the associate, focusing on item shortages, scanning inaccuracies, placement errors, and the mishandling of damaged goods. The coaching emphasized enhancing observation, adhering to the 'one piece flow' principle for scanning accuracy, ensuring precise item placement in trays, and promptly reporting damaged items." },
              { label: 'Induct Trays issues', value: "The auditor coached the associate, focusing on the crucial steps of accurately scanning items and ensuring their correct placement in trays. Accurate placement is critical for maintaining operational efficiency and preventing errors and missing items." },
              { label: 'Rebin', value: "The associate was coached explicitly on the importance of carefully verifying chute IDs against the screen instructions before placement, emphasizing a methodical approach over speed to ensure accuracy." },
              { label: 'Pack General', value: "The team undertook a comprehensive audit of the Pack process to evaluate overall efficiency and accuracy, focusing on critical stages, including box assembly, item scanning, placement, and the final steps of sealing and labeling packages." },
              { label: 'Pack Missing', value: "The team initiated an audit focusing on the procedures for locating missing items (COIN Method). The associate was coached in checking multiple potential locations for missing items, including the floor, alternative chutes, and within the PS (Problem Solve) tote." },
              { label: 'Pack Damaged', value: "The associate was coached regarding the handling and reporting procedures for damaged items to assess the integrity and effectiveness of standard work protocols." },
              { label: 'Pack Wrong Box', value: "The team noted that the associate needed to match the recommended box size (displayed on the screen) with the actual size. Clear and concise instructions regarding box size matching were reiterated to the associate through an audit. The employee was reminded of the potential consequences of non-compliance, including increased kick-outs and operational disruptions." },
              { label: 'Pack Unscannable', value: "The associate was coached to improve the procedures for managing unscannable items, with a particular emphasis on implementing a 'six-side check' by associates on each item and a thorough inspection to verify the presence of a scannable barcode, thereby identifying potential scanning impediments." },
              { label: 'Pack Shipment Exceptions', value: "The associate was coached on the importance of promptly addressing shipment exceptions, like slip printer malfunctions, that can delay the packing process" },
              { label: 'Slam Kickout', value: "The associate faced an audit for repeated kick-outs related to incorrect label placements, including hazmat and spoon labels. The coaching focused on accurately applying labels and adherence to system instructions to decrease kick-outs." },
              { label: 'None', value: " " },
            ]}
          />

          <FormTextarea
            className="form-textarea form-textarea-large" // Assuming you have a separate component or logic to handle textareas
            name="durable"
            placeholder="Observations"
            onChange={(e) => setValue(e.target.value)}
          />


        </div>


      

          <button type="submit">Add Audit</button>
       


      </form>

      
    );
};

export default AuditForm;
