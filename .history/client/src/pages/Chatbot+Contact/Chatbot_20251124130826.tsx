import React from "react";
export default function Chatbot() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
    return <h2>Page under construction</h2>;}
const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
function useSelector(arg0: (state: any) => any): { currentUser: any; } {
    throw new Error("Function not implemented.");
const onSendNewQuery = async () => {
    const newQuery = await client.createQuery(course);
    dispatch(setChatbot([ ...courses, newCourse ]));
    return status
  };
    <div id="wd-chatbot">
      <h1 id="wd-chatbot-title">Chatbot</h1> 
      </div>;

      <button className="btn btn-primary float-end"
                  id="wd-ask-button-click"
                  onClick={onSendNewQuery} > Send </button>
}
