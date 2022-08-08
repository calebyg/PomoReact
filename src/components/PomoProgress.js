import { useContext } from "react";
import SettingsContext from "../hooks/SettingsContext";
import BackButton from "../ui/BackButton";

const PomoProgress = () => {
  const settingsInfo = useContext(SettingsContext);
  return (
    <section>
      <div>Progress</div>
      <BackButton onClick={() => settingsInfo.setShowProgress(false)} />
    </section>
  );
};

export default PomoProgress;
