import SessionLog from "./SessionLog";
const SessionLogList = (props) => {
  const session_log_data = props.data;
  return (
    <ul>
      {session_log_data.map((session) => (
        <li key={session.id}>
          <SessionLog
            taskName={session.taskName}
            timerMinute={session.timerMinute}
          />
        </li>
      ))}
    </ul>
  );
};

export default SessionLogList;
