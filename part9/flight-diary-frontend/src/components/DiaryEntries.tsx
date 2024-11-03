import { NonSensitiveDiaryEntry } from "../types";

interface DiaryEntriesProps {
    diaries: NonSensitiveDiaryEntry[];
};


const DiaryEntries = (props: DiaryEntriesProps): JSX.Element => {
    const { diaries } = props;

    return (
        <div>
            <h2>Diary entries</h2>
            {
                diaries.map(diary => {
                    return (
                        <div key={diary.id}>
                            <h2>{diary.date}</h2>
                            <div>visibility: {diary.visibility}</div>
                            <div>weather: {diary.weather}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DiaryEntries;