import { SingleDashboardView } from './SingleDashboardView';

const AutomationHubPage = () => {
    return (
        <SingleDashboardView
            title="You haven't created any Automation Hub dashboards yet"
            subtitle="Create dashboards for centralized automation workflows and runbooks."
            navId="automation-hub"
            folderTitle="Automation Hub"
            createButtonText="Create dashboard"
        />
    );
};

export default AutomationHubPage;
