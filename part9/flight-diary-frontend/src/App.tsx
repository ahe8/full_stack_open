import { useEffect, useState } from "react";
import { NonSensitiveDiaryEntry } from "./types";
import diaryService from "./services/diaryService";
import DiaryEntries from "./components/DiaryEntries";
import NewDiaryEntryForm from "./components/NewDiaryEntryForm";

const App = () => {
    const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

    useEffect(() => {
        const fetchDiaryEntries = async () => {
            const diaries = await diaryService.getNonSensitiveEntries();
            setDiaries(diaries);
          };
          void fetchDiaryEntries();
    }, []);

    return (
        <>
            <NewDiaryEntryForm setDiaries={setDiaries}/>
            <DiaryEntries diaries={diaries}/>
        </>
    );
};

export default App;