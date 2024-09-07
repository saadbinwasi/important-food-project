import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    try {
      const response = await fetch(url, config);
  
      // If response is empty, throw an error
      if (!response.ok) {
        const errorMessage = await response.text(); // Read response text to handle non-JSON error messages
        throw new Error(errorMessage || 'Something went wrong, failed to send request.');
      }
  
      // Check if the response has content
      const textData = await response.text(); // Read the response as text first
      if (!textData) {
        throw new Error('Empty response from server.');
      }
  
      const resData = JSON.parse(textData); // Then parse as JSON if content is present
  
      return resData;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch data.');
    }
  } 
  

export default function useHttp(url,config,initialData){
  const [data,setData]= useState(initialData);
  const [error,setError] =  useState();
  const [loading,setLoading] =  useState();

  function clearData(){
    setData(initialData);
  }


 const sendRequest =  useCallback(async function sendRequest (data){
setLoading(true)
    try{
    const resData = await sendHttpRequest(url,{...config, body: data});  
    setData(resData)
    } catch(error) {
     setError(error.message || 'Something went Wrong!')
    }
setLoading(false)
},[url,config])

useEffect(() => {

    if(config && (config.method === 'GET' || !config.method) || !config){
        sendRequest();
    }

},[sendRequest,config])

return {
    data,
    loading,
    error,
    sendRequest,
    clearData
}
}