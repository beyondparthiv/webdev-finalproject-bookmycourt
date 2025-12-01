import React, { useState } from "react";
export default function Chatbot() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
    return <h2>Page under construction</h2>;}
const dispatch = useDispatch();
  const [showAllConversation, setShowAllConversation] = useState(false);
function useSelector(arg0: (state: any) => any): { currentUser: any; } {
    throw new Error("Function not implemented.");
const onSendNewQuery = async () => {
    const newQuery = await client.createQuery(query);
    dispatch(setShowAllConversation([ ...conversation, newQuery ]));
    return status
  };
    <div id="wd-chatbot">
      <h1 id="wd-chatbot-title">Chatbot</h1> 
      </div>;

      <button className="btn btn-primary float-end"
                  id="wd-ask-button-click"
                  onClick={onSendNewQuery} > Send </button>
}
