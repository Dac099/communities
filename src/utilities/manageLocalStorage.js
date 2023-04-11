export const saveData = (objectData, identifier) => {  
  //Verify for the existence of the data
  let prevData = localStorage.getItem(identifier);
  if(prevData){
    const prevDataObject = JSON.parse(prevData);
    const newValueToStore = JSON.stringify({
      ...objectData,
      ...prevDataObject
    });
    localStorage.setItem(identifier, newValueToStore);
    return;
  }
  
  //If it's new data
  //Transform objecData to string
  const objectDataToString = JSON.stringify(objectData);
  localStorage.setItem(identifier, objectDataToString);
}

export const getAnItem = (identifier) => {
  const item = JSON.parse(localStorage.getItem(identifier));
  if(!item){
    return false;
  }
  return item;
}