interface ErrorMessageProps {
    error: string;
}

const ErrorMessage = (props: ErrorMessageProps) => {
    const style = props.error ? { 'color': 'red' } : { 'display': 'none' };

    return (
        <p style={style}>{props.error}</p>
    )
}

export default ErrorMessage;