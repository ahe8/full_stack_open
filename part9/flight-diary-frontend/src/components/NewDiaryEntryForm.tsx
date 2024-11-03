import { useState } from "react";
import diaryService from "../services/diaryService";
import { NonSensitiveDiaryEntry, Weather, Visibility } from "../types";
import ErrorMessage from './ErrorMessage';
import { AxiosError } from "axios";

interface NewDiaryEntryFormProps {
    setDiaries: React.Dispatch<React.SetStateAction<Array<NonSensitiveDiaryEntry>>>;
}

const NewDiaryEntryForm = (props: NewDiaryEntryFormProps) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const newDiaryObj = {
            date,
            visibility,
            weather,
            comment
        };
        try {
            const data = await diaryService.create(newDiaryObj)
            const nonSensitiveData = {
                id: data.id,
                date: data.date,
                weather: data.weather,
                visibility: data.visibility
            };
            props.setDiaries(prevState => ([...prevState, nonSensitiveData]));
            setDate('');
            setVisibility('');
            setWeather('');
            setComment('');
            setError('');
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data);
            } else {
                console.log(err);
            }
        }
    }

    return (
        <div>
            <h2>Add new entry</h2>
            <ErrorMessage error={error} />
            <form onSubmit={handleSubmit}>
                <div>date<input type='date' value={date} onChange={(e) => setDate(e.target.value)} /></div>
                <div>
                    <label>
                        visibility
                        {
                            Object.values(Visibility).map((visibility) => {
                                return (
                                    <span key={visibility} style={{ marginLeft: '0.5em' }}>
                                        {visibility}<input type="radio" value={visibility} onChange={() => setVisibility(visibility)} name="visibility" />
                                    </span>)
                            })
                        }
                    </label>
                </div>
                <div>
                    <label>
                        weather
                        {
                            Object.values(Weather).map((weather) => {
                                return (
                                    <span key={weather} style={{ marginLeft: '0.5em' }}>
                                        {weather}<input type="radio" value={weather} onChange={() => setWeather(weather)} name="weather" />
                                    </span>)
                            })
                        }
                    </label>
                </div>
                <div>comment<input value={comment} onChange={(e) => setComment(e.target.value)} /></div>
                <button>add</button>
            </form>
        </div>
    );
};

export default NewDiaryEntryForm;