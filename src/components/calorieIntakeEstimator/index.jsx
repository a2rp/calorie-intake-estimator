import { useMemo, useState } from "react";
import { FiActivity, FiArrowUpRight, FiInfo, FiTarget, FiZap } from "react-icons/fi";
import styles from "./styles.module.css";

const activityLevels = [
    { label: "Mostly sitting", detail: "Little planned movement", factor: 1.2 },
    { label: "A few active days", detail: "Light exercise 1-3 days/week", factor: 1.375 },
    { label: "Regular training", detail: "Moderate exercise 3-5 days/week", factor: 1.55 },
    { label: "Training most days", detail: "Hard exercise 6-7 days/week", factor: 1.725 },
    { label: "Very demanding days", detail: "Hard training and active work", factor: 1.9 },
];
const goals = [
    { id: "reduce", label: "Reduce", adjustment: -300 },
    { id: "maintain", label: "Maintain", adjustment: 0 },
    { id: "gain", label: "Gain", adjustment: 250 },
];
const format = (value) => Math.round(value).toLocaleString("en-US");
const inRange = (value, minimum, maximum) => {
    if (value.trim() === "") return false;
    const number = Number(value);
    return Number.isFinite(number) && number >= minimum && number <= maximum;
};

const CalorieIntakeEstimator = () => {
    const [profile, setProfile] = useState({ age: "", weight: "", height: "", sex: "", activity: "", goal: "maintain" });
    const selectedActivity = activityLevels.find((item) => item.factor === Number(profile.activity));
    const activity = selectedActivity || activityLevels[0];
    const profileStarted = Boolean(profile.age || profile.weight || profile.height || profile.sex || profile.activity);
    const profileIsValid = inRange(profile.age, 19, 78) && inRange(profile.weight, 20, 350) && inRange(profile.height, 100, 250) && ["female", "male"].includes(profile.sex) && Boolean(selectedActivity);
    const result = useMemo(() => {
        if (!profileIsValid) return null;
        const age = Number(profile.age);
        const weight = Number(profile.weight);
        const height = Number(profile.height);
        const resting = 10 * weight + 6.25 * height - 5 * age + (profile.sex === "male" ? 5 : -161);
        const maintenance = resting * Number(profile.activity);
        const goal = goals.find((item) => item.id === profile.goal) || goals[1];
        const target = Math.max(0, maintenance + goal.adjustment);
        const proteinCalories = Math.min(weight * 1.6 * 4, target);
        const fatCalories = Math.min(target * 0.28, target - proteinCalories);
        const carbsCalories = Math.max(0, target - proteinCalories - fatCalories);
        const protein = proteinCalories / 4;
        const fat = fatCalories / 9;
        const carbs = carbsCalories / 4;
        return { resting, maintenance, target, protein, fat, carbs, goal };
    }, [profile, profileIsValid]);
    const setValue = (key, value) => setProfile((current) => ({ ...current, [key]: value }));
    const share = (value) => Math.max(0, Math.min(100, value / Math.max(result?.target ?? 0, 1) * 100));

    return <section className={styles.calorieEstimator} id="estimator">
        <div className={styles.hero}>
            <div><p className={styles.context}>A STARTING POINT, BUILT AROUND YOU</p><h1>Find your daily<br /><span>fuel target.</span></h1><p className={styles.description}>A simple estimate from your body, your movement, and your goal.</p></div>
            <div className={styles.formulaNote}><span className={styles.formulaIcon}><FiActivity aria-hidden="true" /></span><div><strong>One clear estimate</strong><small>Based on a widely used resting-energy equation</small></div><FiArrowUpRight aria-hidden="true" /></div>
        </div>

        <div className={styles.calculator}>
            <section className={styles.profilePanel} aria-labelledby="profile-heading">
                <div className={styles.panelHeading}><span className={styles.panelIcon}><FiTarget aria-hidden="true" /></span><div><h2 id="profile-heading">Your details</h2><p>Adjust any field to update the estimate.</p></div><span className={styles.stepCount}>01 / 02</span></div>
                <div className={styles.measurements}>
                    <label>Age<div className={styles.inputWithUnit}><input type="number" inputMode="numeric" min="19" max="78" value={profile.age} onChange={(event) => setValue("age", event.target.value)} aria-label="Age in years" aria-invalid={profileStarted && !inRange(profile.age, 19, 78)} aria-describedby="profile-validation" /><span>years</span></div></label>
                    <label>Weight<div className={styles.inputWithUnit}><input type="number" inputMode="decimal" min="20" max="350" step="0.1" value={profile.weight} onChange={(event) => setValue("weight", event.target.value)} aria-label="Weight in kilograms" aria-invalid={profileStarted && !inRange(profile.weight, 20, 350)} aria-describedby="profile-validation" /><span>kg</span></div></label>
                    <label>Height<div className={styles.inputWithUnit}><input type="number" inputMode="numeric" min="100" max="250" value={profile.height} onChange={(event) => setValue("height", event.target.value)} aria-label="Height in centimeters" aria-invalid={profileStarted && !inRange(profile.height, 100, 250)} aria-describedby="profile-validation" /><span>cm</span></div></label>
                    <label>Equation setting<select value={profile.sex} onChange={(event) => setValue("sex", event.target.value)} aria-label="Equation setting" aria-invalid={profileStarted && !["female", "male"].includes(profile.sex)}><option value="">Choose a setting</option><option value="female">Female</option><option value="male">Male</option></select><small>Used by the selected equation</small></label>
                </div>
                <p id="profile-validation" className={styles.validationHint} hidden={!profileStarted || profileIsValid}>Enter age 19–78 years, weight 20–350 kg, height 100–250 cm, an equation setting, and a typical activity level.</p>
                <fieldset className={styles.activityChoice}><legend>Typical activity</legend><div>{activityLevels.map((item) => <button type="button" key={item.factor} className={Number(profile.activity) === item.factor ? styles.selectedActivity : ""} aria-pressed={Number(profile.activity) === item.factor} onClick={() => setValue("activity", item.factor)}><span>{item.label}</span><small>{item.detail}</small></button>)}</div></fieldset>
                <fieldset className={styles.goalChoice}><legend>Your focus</legend><div>{goals.map((item) => <button type="button" key={item.id} className={profile.goal === item.id ? styles.selectedGoal : ""} aria-pressed={profile.goal === item.id} onClick={() => setValue("goal", item.id)}>{item.label}</button>)}</div></fieldset>
            </section>

            <section className={styles.resultPanel} aria-live="polite" aria-label="Estimated daily calorie needs">
                <div className={styles.resultHeading}><span><FiZap aria-hidden="true" /> YOUR DAILY ESTIMATE</span><span className={styles.liveDot}>LIVE</span></div>
                <div className={styles.targetResult}><div><small>{result ? `${result.goal.label} target` : "Complete your profile"}</small><strong>{result ? format(result.target) : "—"}<span> kcal</span></strong><p>Estimated daily energy</p></div><div className={styles.energyRing} style={{ "--resting-share": share(result?.resting ?? 0) + "%" }}><span><FiZap aria-hidden="true" /></span></div></div>
                {result ? <div className={styles.rangeCard}><div><span>Resting need</span><strong>{format(result.resting)} kcal</strong></div><div><span>Maintain weight</span><strong>{format(result.maintenance)} kcal</strong></div><div><span>Selected activity</span><strong>{activity.label}</strong></div></div> : <p className={styles.validationMessage}>Enter valid measurements and choose an equation setting and activity level to display the estimate.</p>}
                {result && result.target <= 800 && <p className={styles.lowTargetWarning} role="alert">This estimate is 800 kcal/day or lower. Some very-low-calorie plans require close medical supervision. Talk with a qualified clinician before acting on this estimate. <a href="https://www.niddk.nih.gov/-/media/Files/Weight-Management/Choosingprogram0208.pdf" target="_blank" rel="noopener noreferrer">NIDDK guidance</a></p>}
                {result && result.target > 800 && <div className={styles.macroSection}><div className={styles.macroHeading}><h3>Example macro split</h3><span>for one day</span></div>
                    {[["Protein", result.protein, "#d2ef77"], ["Carbs", result.carbs, "#82bea0"], ["Fat", result.fat, "#f08c61"]].map(([label, value, color]) => <div className={styles.macroRow} key={label}><div><span>{label}</span><strong>{Math.round(value)} g</strong></div><div className={styles.macroTrack}><i style={{ width: share(Number(value) * (label === "Protein" || label === "Carbs" ? 4 : 9)) + "%", backgroundColor: color }} /></div></div>)}
                </div>}
                {result && <p className={styles.adjustment}><FiInfo aria-hidden="true" /> {result.goal.adjustment === 0 ? "Your estimate is set to maintenance." : `${Math.abs(result.goal.adjustment)} kcal ${result.goal.adjustment < 0 ? "below" : "above"} estimated maintenance for this planning goal.`}</p>}
            </section>
        </div>

        <div className={styles.method} id="method"><span className={styles.methodIcon}><FiInfo aria-hidden="true" /></span><div><strong>How this estimate works</strong><p>Resting needs use the Mifflin-St Jeor equation. A selected activity factor estimates maintenance; your focus adds a fixed planning adjustment. <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener noreferrer">See the original study.</a></p></div><span className={styles.methodTag}>ESTIMATE ONLY</span></div>
        <p className={styles.disclaimer}>The original equation study covered healthy adults aged 19–78. This estimate is for general education, not medical advice, diagnosis, or a prescribed diet. Ask a qualified health professional for individual guidance, especially during pregnancy or with a medical condition.</p>
    </section>;
};

export default CalorieIntakeEstimator;
