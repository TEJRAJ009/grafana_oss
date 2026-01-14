import { SingleDashboardView } from './SingleDashboardView';

const ReportsInsightsPage = () => {
    return (
        <SingleDashboardView
            title="You haven't created any Reports & Insights dashboards yet"
            subtitle="Create dashboards to generate reports and gain insights from your data."
            navId="reports-insights"
            folderTitle="Reports & Insights"
            createButtonText="Create dashboard"
        />
    );
};

export default ReportsInsightsPage;
