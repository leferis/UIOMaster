import React, { FC, useState } from 'react';
import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { MuiFileInput } from 'mui-file-input'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { ImageReuqest } from '../../../../Classes/ImageRequest';

interface SettingsImageUploadProps {
   images: any;
   setImages:any;
}

function SettingsImageUpload(props: SettingsImageUploadProps) {


   const [uploadingFile, setUpload] = useState(false);
   const [file, setFile] = React.useState(null)
   const [newImage, setNewImage] = React.useState(new ImageReuqest())

   const handleChange = (newValue: any) => {
      setFile(newValue)
   }

   function uploadImage() {
      const formData = new FormData();
      setUpload(true);
      if (file != null) {
         formData.append('image', file);
      }
      const requestOptions = {
         method: 'POST',
         body: formData
      };
      var path = Object.entries(newImage).map(([key, val]) => `${key}=${val}`).join('&');
      const response = fetch("https://cjmlanalyzerbackend.onrender.com/images/upload?" + path, requestOptions).then(response => response.text()).then((value) => {
         let elemets = {Group: newImage.group, Name: newImage.name, Location:value, Default: newImage.default, Main: newImage.main};
         let copy = props.images;
         copy.Images[newImage.elementType-1].Images.push(elemets);
         props.setImages(copy);
      }).finally(()=> {setUpload(false)})
   }
   const listOfGroups = Array.from(new Set<string>(props.images.Images[0].Images.map((item:any) => item.Group)))
   return (<Grid style={{
      background: "#f1f2f4",
      borderRadius: "20px",
   }} container spacing={1} justifyContent="center"
      alignItems="center" >
      <Grid item xs={"auto"}><h2>Image Upload</h2></Grid>
      <Grid item xs={9} />
      <Grid item xs={3}> <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Touchpoint</InputLabel>
         <Select
            label="Related to:"
            defaultValue={Number(newImage.elementType)}
            onChange={(value) => {
               let img = newImage;
               img.elementType = Number(value.target.value);
               setNewImage(img);
            }}
         >
            <MenuItem value={1}>Actor</MenuItem>
            <MenuItem value={2}>Touchpoint</MenuItem>

         </Select>
      </FormControl></Grid>
      <Grid item xs={1} />
      <Grid item xs={3}>
         <TextField fullWidth label="Image Name" defaultValue={""}
            onChange={(value) => {
               let img = newImage;
               img.name = value.target.value;
               setNewImage(img);
            }}
         />
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={3}> <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Default</InputLabel>
         <Select
            label="Related to:"
            defaultValue={newImage.default}
            onChange={(value) => {
               let img = newImage;
               img.default = Boolean(value.target.value);
               setNewImage(img);
            }}
         >
            <MenuItem value={"true"}>Yes</MenuItem>
            <MenuItem value={"false"}>No</MenuItem>

         </Select>
      </FormControl></Grid>
      <Grid item xs={1} />
      <Grid item xs={3}> <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Show it in drop downs</InputLabel>
         <Select
            label="Related to:"
            defaultValue={newImage.main}
            onChange={(value) => {
               let img = newImage;
               img.main = Boolean(value.target.value);
               setNewImage(img);
            }}
         >
            <MenuItem value={"true"}>Yes</MenuItem>
            <MenuItem value={"false"}>No</MenuItem>

         </Select>
      </FormControl></Grid>
      <Grid item xs={1} />
      <Grid item xs={3}>
         <Autocomplete
            id="free-solo-demo"
            freeSolo
            onInput={(value: any) => {
               let img = newImage;
               img.group = value.target.defaultValue;
               setNewImage(img);
            }}
            onChange={(value: any) => {
               let img = newImage;
               img.group = value.target.outerText;
               setNewImage(img);
            }}
            options={listOfGroups}
            renderInput={(params) => <TextField {...params} label="Group select" />}
         /> </Grid><Grid item xs={12}>
         <MuiFileInput value={file} onChange={handleChange}
            size="small"
            variant="outlined"
            label="Upload File"
            InputProps={{
               inputProps: {
                  accept: '.png, .jpeg'
               },
               startAdornment: <AttachFileIcon />
            }}

         /> </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={12}>
         <Button style={{ top: "15px" }} variant="contained" color="primary" disabled={uploadingFile}
            onClick={() => {
               uploadImage()
            }}
         >Create</Button>
      </Grid>
      <Grid item xs={12} />
   </Grid>);
}

export default SettingsImageUpload;
