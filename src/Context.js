import { createContext, useState } from 'react';
import { themoviedb } from './component/Instance'; // Fixed the import path

export const MyContext = createContext();

function Context({ children }) {
  const [data, setState] = useState(0);

  const dataTrans = async (type,url)=>{
    let res;
    res = await themoviedb(url);
    setState(res.data.result);
  }

  return (
    <MyContext.Provider value={data}>
      {children}
    </MyContext.Provider>
  );
}

export default Context;