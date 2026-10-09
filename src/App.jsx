import { useEffect, useState } from "react";
import styles from "./App.module.css";
import SiteHeader from "./components/siteHeader";
import SiteFooter from "./components/siteFooter";
import BackToTop from "./components/backToTop";
import CalorieIntakeEstimator from "./components/calorieIntakeEstimator";

const repository = "https://github.com/a2rp/calorie-intake-estimator";
const App = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);
    useEffect(() => {
        const onScroll = () => setShowBackToTop(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return <div className={styles["app-shell"]} id="top">
        <SiteHeader title="Fuelwise" mark="F" navItems={[["Estimator", "#estimator"], ["How it works", "#method"]]} repoUrl={repository} />
        <main className={styles.pageContent}><CalorieIntakeEstimator /></main>
        <SiteFooter repoUrl={repository} />
        <BackToTop visible={showBackToTop} />
    </div>;
};
export default App;