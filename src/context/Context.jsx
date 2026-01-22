import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({children}) => {

    const [input, setInput] = useState("");
    const [recentPrompts, setRecentPrompts] = useState("");
    const [prevPromts, setPrevPromts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function() {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
    };

    const onSent = async (prompt) => {
        try {
            setResultData("");
            setLoading(true);
            setShowResult(true);

            // Determine the input state or a passed-in prompt (from Sidebar/Cards)
            let currentPrompt = prompt !== undefined ? prompt : input;
            
            if (!prompt) {
                setPrevPromts(prev => [...prev, input]);
            }
            setRecentPrompts(currentPrompt);

            // Fetch real data from Gemini
            const response = await runChat(currentPrompt);

            // Formatting: Bold text (**) and Line breaks (*)
            let respAry = response.split("**");
            let newResp = "";
            for (let i = 0; i < respAry.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResp += respAry[i];
                } else {
                    newResp += "<b>" + respAry[i] + "</b>";
                }
            }
            let formattedResp = newResp.split("*").join("<br>");

            // Typing Animation
            let wordsArray = formattedResp.split(" ");
            for (let i = 0; i < wordsArray.length; i++) {
                delayPara(i, wordsArray[i] + " ");
            }

            setLoading(false);
            setInput("");

        } catch (error) {
            console.error("Context Error:", error);
            setLoading(false);
        }
    };

    const contextValue = {
        prevPromts,
        onSent,
        setRecentPrompts,
        recentPrompts,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;